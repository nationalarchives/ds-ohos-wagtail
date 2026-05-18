from django.apps import apps
from django.conf import settings
from django.urls import include, path, register_converter
from django.views.decorators.cache import never_cache
from django.views.generic import RedirectView
from wagtail import urls as wagtail_urls
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls
from wagtail.utils.urlpatterns import decorate_urlpatterns

from etna.errors import views as errors_view
from etna.records import converters
from etna.records import views as records_views
from etna.search import views as search_views

register_converter(converters.ReferenceNumberConverter, "reference_number")
register_converter(converters.IDConverter, "id")


# Used by /sentry-debug/
def trigger_error(request):
    # Raise a ZeroDivisionError
    return 1 / 0


handler404 = "etna.errors.views.custom_404_error_view"
handler500 = "etna.errors.views.custom_500_error_view"
handler503 = "etna.errors.views.custom_503_error_view"

# Private URLs that are not meant to be cached.
private_urls = [
    path("admin/", include(wagtailadmin_urls)),
    # DISABLED_AUTH:
    # Disabled authentication routes:
    # - user login is not enabled for this application
    # - removed due to open redirect issue identified by Wiz
    # - if re-enabled, ensure logout redirects validate `next` parameters
    # path("accounts/", include("allauth.urls")),
    path("documents/", include(wagtaildocs_urls)),
    path("feedback/", include("etna.feedback.urls")),
    path("healthcheck/", include("etna.healthcheck.urls")),
]

# Public URLs that are meant to be cached.
public_urls = [
    path(
        r"catalogue/id/<id:id>/",
        records_views.record_detail_view,
        name="details-page-machine-readable",
    ),
    path(
        r"catalogue/ref/<reference_number:reference_number>/",
        records_views.record_disambiguation_view,
        name="details-page-human-readable",
    ),
    path(
        r"search/",
        RedirectView.as_view(pattern_name="search-catalogue", permanent=False),
        name="search",
    ),
    path(
        r"search/catalogue/",
        search_views.CatalogueSearchView.as_view(),
        name="search-catalogue",
    ),
    path(
        r"search/catalogue/long-filter-chooser/<str:field_name>/",
        search_views.CatalogueSearchLongFilterView.as_view(),
        name="search-catalogue-long-filter-chooser",
    ),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    public_urls += staticfiles_urlpatterns()
    public_urls += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

public_urls += [
    path(
        r"404/",
        errors_view.custom_404_error_view,
        kwargs={"exception": Exception("Bad Request!")},
    ),
    path(r"500/", errors_view.custom_500_error_view),
    path(r"503/", errors_view.custom_503_error_view),
]

# Update private URLs to use the "never cache" cache settings.
private_urls = decorate_urlpatterns(private_urls, never_cache)

# Join private and public URLs.
urlpatterns = (
    private_urls
    + public_urls
    + [
        # Wagtail URLs are added at the end.
        # cache-control is applied to the page models's serve methods
        path("", include(wagtail_urls)),
    ]
)

if apps.is_installed("debug_toolbar"):
    urlpatterns = [
        path("__debug__/", include("debug_toolbar.urls")),
    ] + urlpatterns
