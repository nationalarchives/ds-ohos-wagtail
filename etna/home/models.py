import importlib

from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail.fields import StreamField

from etna.alerts.models import AlertMixin
from etna.core.models import BasePageWithIntro

from ..search.forms import FeaturedSearchForm
from .blocks import HomePageStreamBlock


class HomePage(AlertMixin, BasePageWithIntro):
    body = StreamField(HomePageStreamBlock, blank=True, null=True)

    content_panels = BasePageWithIntro.content_panels + [
        FieldPanel("body"),
    ]

    settings_panels = BasePageWithIntro.settings_panels + AlertMixin.settings_panels

    # DataLayerMixin overrides
    gtm_content_group = "Homepage"

    def get_context(self, request):
        context = super().get_context(request)
        context["form"] = FeaturedSearchForm()
        module = importlib.import_module("etna.search.common")
        context.update(
            map_view_url=module.VIS_URLS.get("map"),
            timeline_view_url=module.VIS_URLS.get("timeline"),
            tag_view_url=module.VIS_URLS.get("tag"),
        )
        return context

    api_fields = [
        APIField("intro"),
        APIField("body"),
    ]
