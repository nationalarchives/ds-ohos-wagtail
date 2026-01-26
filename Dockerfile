ARG IMAGE=ghcr.io/nationalarchives/tna-python
ARG IMAGE_TAG=1

FROM "$IMAGE":"$IMAGE_TAG"

ENV NPM_BUILD_COMMAND=compile
ENV DJANGO_SETTINGS_MODULE=config.settings.production

# Copy application code
COPY --chown=app . .

# Install Python dependencies AND the 'etna' app
RUN tna-build

# Copy the assets from the @nationalarchives/frontend repository
RUN mkdir -p /app/templates/static/assets; \
  cp -R /app/node_modules/@nationalarchives/frontend/nationalarchives/assets/* /app/templates/static/assets

RUN tna-clean

CMD ["tna-wsgi", "config.wsgi:application"]
