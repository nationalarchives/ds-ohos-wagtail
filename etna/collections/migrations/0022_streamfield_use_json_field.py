# Generated by Django 3.2.14 on 2022-07-25 10:53

from django.db import migrations
import etna.collections.blocks
import wagtail.blocks
import wagtail.fields


class Migration(migrations.Migration):

    dependencies = [
        ("collections", "0021_add_feature_insights"),
    ]

    operations = [
        migrations.AlterField(
            model_name="explorerindexpage",
            name="body",
            field=wagtail.fields.StreamField(
                [
                    (
                        "time_period_explorer_index",
                        wagtail.blocks.StructBlock(
                            [
                                (
                                    "heading",
                                    wagtail.blocks.CharBlock(
                                        default="Explore by time period", max_length=100
                                    ),
                                ),
                                (
                                    "sub_heading",
                                    wagtail.blocks.CharBlock(
                                        default="Discover 1,000 years of British history through time periods including:",
                                        max_length=200,
                                    ),
                                ),
                                (
                                    "page",
                                    wagtail.blocks.PageChooserBlock(
                                        page_type=[
                                            "collections.TimePeriodExplorerIndexPage"
                                        ]
                                    ),
                                ),
                            ]
                        ),
                    ),
                    (
                        "topic_explorer_index",
                        wagtail.blocks.StructBlock(
                            [
                                (
                                    "heading",
                                    wagtail.blocks.CharBlock(
                                        default="Explore by topic", max_length=100
                                    ),
                                ),
                                (
                                    "sub_heading",
                                    wagtail.blocks.CharBlock(
                                        default="Browse highlights of the collection through topics including:",
                                        max_length=200,
                                    ),
                                ),
                                (
                                    "page",
                                    wagtail.blocks.PageChooserBlock(
                                        page_type=["collections.TopicExplorerIndexPage"]
                                    ),
                                ),
                            ]
                        ),
                    ),
                ],
                blank=True,
                use_json_field=True,
            ),
        ),
        migrations.AlterField(
            model_name="timeperiodexplorerindexpage",
            name="body",
            field=wagtail.fields.StreamField(
                [
                    (
                        "topic_explorer_index",
                        wagtail.blocks.StructBlock(
                            [
                                (
                                    "heading",
                                    wagtail.blocks.CharBlock(
                                        default="Explore by topic", max_length=100
                                    ),
                                ),
                                (
                                    "sub_heading",
                                    wagtail.blocks.CharBlock(
                                        default="Browse highlights of the collection through topics including:",
                                        max_length=200,
                                    ),
                                ),
                                (
                                    "page",
                                    wagtail.blocks.PageChooserBlock(
                                        page_type=["collections.TopicExplorerIndexPage"]
                                    ),
                                ),
                            ]
                        ),
                    )
                ],
                blank=True,
                use_json_field=True,
            ),
        ),
        migrations.AlterField(
            model_name="timeperiodexplorerpage",
            name="body",
            field=wagtail.fields.StreamField(
                [
                    (
                        "collection_highlights",
                        wagtail.blocks.StructBlock(
                            [
                                (
                                    "heading",
                                    wagtail.blocks.CharBlock(
                                        default="Collection Highlights", max_length=100
                                    ),
                                )
                            ]
                        ),
                    ),
                    (
                        "promoted_pages",
                        wagtail.blocks.StructBlock(
                            [
                                ("heading", wagtail.blocks.CharBlock(max_length=100)),
                                (
                                    "sub_heading",
                                    wagtail.blocks.CharBlock(max_length=200),
                                ),
                                (
                                    "promoted_items",
                                    wagtail.blocks.ListBlock(
                                        etna.collections.blocks.PromotedItemBlock,
                                        max=3,
                                        min=3,
                                    ),
                                ),
                            ]
                        ),
                    ),
                ],
                blank=True,
                use_json_field=True,
            ),
        ),
        migrations.AlterField(
            model_name="topicexplorerindexpage",
            name="body",
            field=wagtail.fields.StreamField(
                [
                    (
                        "time_period_explorer_index",
                        wagtail.blocks.StructBlock(
                            [
                                (
                                    "heading",
                                    wagtail.blocks.CharBlock(
                                        default="Explore by time period", max_length=100
                                    ),
                                ),
                                (
                                    "sub_heading",
                                    wagtail.blocks.CharBlock(
                                        default="Discover 1,000 years of British history through time periods including:",
                                        max_length=200,
                                    ),
                                ),
                                (
                                    "page",
                                    wagtail.blocks.PageChooserBlock(
                                        page_type=[
                                            "collections.TimePeriodExplorerIndexPage"
                                        ]
                                    ),
                                ),
                            ]
                        ),
                    )
                ],
                blank=True,
                use_json_field=True,
            ),
        ),
        migrations.AlterField(
            model_name="topicexplorerpage",
            name="body",
            field=wagtail.fields.StreamField(
                [
                    (
                        "collection_highlights",
                        wagtail.blocks.StructBlock(
                            [
                                (
                                    "heading",
                                    wagtail.blocks.CharBlock(
                                        default="Collection Highlights", max_length=100
                                    ),
                                )
                            ]
                        ),
                    ),
                    (
                        "promoted_pages",
                        wagtail.blocks.StructBlock(
                            [
                                ("heading", wagtail.blocks.CharBlock(max_length=100)),
                                (
                                    "sub_heading",
                                    wagtail.blocks.CharBlock(max_length=200),
                                ),
                                (
                                    "promoted_items",
                                    wagtail.blocks.ListBlock(
                                        etna.collections.blocks.PromotedItemBlock,
                                        max=3,
                                        min=3,
                                    ),
                                ),
                            ]
                        ),
                    ),
                ],
                blank=True,
                use_json_field=True,
            ),
        ),
    ]
