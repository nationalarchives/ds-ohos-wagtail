# Generated by Django 5.0.2 on 2024-03-13 14:08

import etna.core.blocks.paragraph
import wagtail.blocks
import wagtail.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("generic_pages", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="generalpage",
            name="body",
            field=wagtail.fields.StreamField(
                [
                    (
                        "paragraph",
                        wagtail.blocks.StructBlock(
                            [
                                (
                                    "text",
                                    etna.core.blocks.paragraph.APIRichTextBlock(
                                        features=["bold", "italic", "link", "ol", "ul"]
                                    ),
                                )
                            ]
                        ),
                    )
                ],
                blank=True,
                null=True,
            ),
        ),
    ]
