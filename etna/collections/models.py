from django.db import models
from django.utils.functional import cached_property

from wagtail.admin.edit_handlers import FieldPanel
from wagtail.core.models import Page

from ..teasers.models import TeaserImageMixin


class ExplorerIndexPage(TeaserImageMixin, Page):
    """Collection Explorer landing page.

    This page is the starting point for a user's journey through the collection
    explorer.
    """

    introduction = models.CharField(max_length=200, blank=False)

    content_panels = Page.content_panels + [FieldPanel("introduction")]
    promote_panels = Page.promote_panels + TeaserImageMixin.promote_panels

    parent_page_types = ["home.HomePage"]
    subpage_types = [
        "collections.TopicExplorerPage",
        "collections.TimePeriodExplorerPage",
    ]

    @cached_property
    def topic_pages(self):
        """Fetch child topic explorer pages.

        Result should be suitable for rendering on the front end.
        """
        return (
            self.get_children()
            .type(TopicExplorerPage)
            .order_by("title")
            .live()
            .public()
            .specific()
        )

    @cached_property
    def time_period_pages(self):
        """Fetch child time period explorer pages.

        Result should be suitable for rendering on the front end.
        """
        return (
            self.get_children()
            .type(TimePeriodExplorerPage)
            .order_by("title")
            .live()
            .public()
            .specific()
        )


class TopicExplorerPage(TeaserImageMixin, Page):
    """Topic explorer page.

    This page represents one of the many categories a user may select in the
    collection explorer.

    A category page is responsible for listing its child pages, which may be either
    another CategoryPage (to allow the user to make a more fine-grained choice) or a
    single ResultsPage (to output the results of their selection).
    """

    introduction = models.CharField(max_length=200, blank=False)

    content_panels = Page.content_panels + [FieldPanel("introduction")]
    promote_panels = Page.promote_panels + TeaserImageMixin.promote_panels

    @property
    def results_pages(self):
        """Fetch child results period pages for rendering on the front end."""
        return (
            self.get_children()
            .type(ResultsPage)
            .order_by("title")
            .live()
            .public()
            .specific()
        )

    parent_page_types = [
        "collections.ExplorerIndexPage",
        "collections.TopicExplorerPage",
    ]
    subpage_types = ["collections.TopicExplorerPage", "collections.ResultsPage"]


class TimePeriodExplorerPage(TeaserImageMixin, Page):
    """Time period page.

    This page represents one of the many categories a user may select in the
    collection explorer.

    A category page is responsible for listing its child pages, which may be either
    another CategoryPage (to allow the user to make a more fine-grained choice) or a
    single ResultsPage (to output the results of their selection).
    """

    introduction = models.CharField(max_length=200, blank=False)
    start_year = models.IntegerField(blank=False)
    end_year = models.IntegerField(blank=False)

    content_panels = Page.content_panels + [
        FieldPanel("introduction"),
        FieldPanel("start_year"),
        FieldPanel("end_year"),
    ]
    promote_panels = Page.promote_panels + TeaserImageMixin.promote_panels

    @property
    def results_pages(self):
        """Fetch child results period pages for rendering on the front end."""
        return (
            self.get_children()
            .type(ResultsPage)
            .order_by("title")
            .live()
            .public()
            .specific()
        )

    parent_page_types = [
        "collections.ExplorerIndexPage",
        "collections.TimePeriodExplorerPage",
    ]
    subpage_types = ["collections.TimePeriodExplorerPage", "collections.ResultsPage"]


class ResultsPage(TeaserImageMixin, Page):
    """Results page.

    This page is a placeholder for the results page at the end of a user's
    journey through the collection explorer.

    Eventually this page will run an editor-defined query against the
    collections API and display the results.
    """
    introduction = models.CharField(max_length=200, blank=False)

    content_panels = Page.content_panels + [
        FieldPanel("introduction"),
    ]
    promote_panels = Page.promote_panels + TeaserImageMixin.promote_panels

    max_count_per_parent = 1
    parent_page_types = []
    subpage_types = []