from django import template
from django.conf import settings

from ...ciim.constants import LevelKeys
from ..field_labels import FIELD_LABELS
from ..models import Record

register = template.Library()


@register.simple_tag
def record_url(record: Record, is_editorial: bool = False) -> str:
    """
    Return the URL for the provided `record`, which should always be a
    fully-transformed `etna.records.models.Record` instance.

    Handling of Iaid as priority to allow Iaid in disambiguation pages when
    returning more than one record
    """
    if is_editorial and settings.FEATURE_RECORD_LINKS_GO_TO_DISCOVERY and record.iaid:
        return f"https://discovery.nationalarchives.gov.uk/details/r/{record.iaid}"
    return record.url


@register.simple_tag
def is_page_current_item_in_hierarchy(page: Record, hierarchy_item: Record):
    """Checks whether given page matches item from a record's hierarchy"""
    return page.reference_number == hierarchy_item.reference_number


@register.filter
def as_label(record_field_name: str) -> str:
    """returns human readable label for pre configured record field name, otherwise Invalid name"""
    return FIELD_LABELS.get(record_field_name, "UNRECOGNISED FIELD NAME")


@register.simple_tag
def level_name(level_code: int) -> str:
    """returns level as a human readable string"""
    return LevelKeys["LEVEL_" + str(level_code)].value
