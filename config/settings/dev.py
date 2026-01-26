import logging
import os

from .base import *  # noqa: F401, F403
from .util import strtobool

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = strtobool(os.getenv("DEBUG", "True"))  # noqa: F405

WAGTAILADMIN_BASE_URL = os.getenv("WAGTAILADMIN_BASE_URL", "http://localhost:8000")
WAGTAIL_HEADLESS_PREVIEW = {
    "CLIENT_URLS": {
        "default": "http://localhost:65535/preview",
    },
    "SERVE_BASE_URL": "http://localhost:65535",
}

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "@6gce61jt^(pyj5+l**&*_#zyxfj5v1*71cs5yoetg-!fsz826"

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ["*"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

RECORD_DETAIL_REQUIRE_LOGIN = False
SEARCH_VIEWS_REQUIRE_LOGIN = False
FEATURE_BETA_BANNER_ENABLED = strtobool(
    os.getenv("FEATURE_BETA_BANNER_ENABLED", "True")
)
COOKIE_DOMAIN = "localhost"

MEDIA_ROOT = "/media"

# Silence noisy localization messages/warnings when initializing faker
logging.getLogger("faker").setLevel(logging.ERROR)

try:
    from .local import *  # noqa: F401, F403
except ImportError:
    pass


def show_toolbar(request):
    return True


if DEBUG:
    from .base import LOGGING

    LOGGING["root"]["level"] = "DEBUG"  # noqa: F405

    try:
        import debug_toolbar  # noqa: F401

        INSTALLED_APPS += [  # noqa: F405
            "debug_toolbar",
        ]

        MIDDLEWARE = [
            "debug_toolbar.middleware.DebugToolbarMiddleware",
        ] + MIDDLEWARE  # noqa: F405

        DEBUG_TOOLBAR_CONFIG = {
            "SHOW_COLLAPSED": True,
        }
    except ImportError:
        pass
