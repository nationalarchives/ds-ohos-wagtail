from wagtail import blocks

from etna.core.blocks import ParagraphBlock


class EventPageBlock(blocks.StreamBlock):
    paragraph = ParagraphBlock()