import factory
from etna.articles import models as app_models
from etna.core.factories import BasePageFactory
from wagtail_factories import ImageFactory


class ArticlePageFactory(BasePageFactory):
    hero_image = factory.SubFactory(ImageFactory)
    hero_image_caption = "<p>Hero image caption</p>"

    class Meta:
        model = app_models.ArticlePage
