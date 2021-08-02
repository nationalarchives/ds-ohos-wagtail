# Generated by Django 3.1.8 on 2021-07-27 13:55

from django.db import migrations

from ..models import CATEGORIES_ICON_PATH

CATEGORIES = (
    ("Discover our records", f"{CATEGORIES_ICON_PATH}/search-white.svg"),
    ("Podcasts", f"{CATEGORIES_ICON_PATH}/headphones-white.svg"),
    ("Research", f"{CATEGORIES_ICON_PATH}/book-open-white.svg"),
    ("Blog", f"{CATEGORIES_ICON_PATH}/comment-white.svg"),
    ("Video", f"{CATEGORIES_ICON_PATH}/video-white.svg"),
)


def create_categories(apps, schema_editor):
    Category = apps.get_model("categories.category")

    for name, icon in CATEGORIES:
        Category.objects.create(name=name, icon=icon)


def remove_categories(apps, schema_editor):
    Category = apps.get_model("categories.category")

    for name, icon in CATEGORIES:
        try:
            Category.objects.get(name=name).delete()
        except Category.DoesNotExist:
            # Skip, category doesn't exist
            ...


class Migration(migrations.Migration):

    dependencies = [
        ("categories", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_categories, remove_categories),
    ]