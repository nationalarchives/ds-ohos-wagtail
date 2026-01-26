import os

from .base import *  # noqa: F401, F403

DEBUG = False

# TODO: Ensure that certificates are always checked by the Client API in production
# CLIENT_VERIFY_CERTIFICATES = True

SECRET_KEY = os.getenv("SECRET_KEY")
# Need to get the IP of the load balancer or reverse proxy
ALLOWED_HOSTS = ["*"]

try:
    from .local import *  # noqa: F401, F403
except ImportError:
    pass
