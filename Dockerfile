ARG IMAGE=ghcr.io/nationalarchives/tna-python-django
ARG IMAGE_TAG=latest

FROM "$IMAGE":"$IMAGE_TAG"

ENV NPM_BUILD_COMMAND=compile
ENV DJANGO_SETTINGS_MODULE=config.settings.production

HEALTHCHECK CMD curl --fail http://localhost:8080/healthcheck/ || exit 1

# Copy application code
COPY --chown=app . .

# Install Python dependencies AND the 'etna' app
RUN tna-build

# Copy the assets from the @nationalarchives/frontend repository
RUN mkdir -p /app/templates/static/assets; \
  cp -R /app/node_modules/@nationalarchives/frontend/nationalarchives/assets/* /app/templates/static/assets

CMD ["tna-run", "config.wsgi:application"]
