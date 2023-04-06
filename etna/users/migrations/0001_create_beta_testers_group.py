# Generated by Django 3.1.8 on 2021-07-30 09:46

from django.db import migrations


def create_beta_testers_group(apps, schema_editor):
    Group = apps.get_model("auth.Group")

    Group.objects.create(name="Beta Testers")


def remove_beta_testers_group(apps, schema_editor):
    Group = apps.get_model("auth.Group")

    Group.objects.get(name="Beta Testers").delete


class Migration(migrations.Migration):
    dependencies = [
        ("wagtailcore", "0040_page_draft_title"),
    ]

    operations = [
        migrations.RunPython(create_beta_testers_group, remove_beta_testers_group),
    ]
