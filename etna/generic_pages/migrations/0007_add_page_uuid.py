# Generated by Django 4.1.8 on 2023-04-27 10:58

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("generic_pages", "0006_alter_generalpage_search_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="generalpage",
            name="uuid",
            field=models.UUIDField(null=True),
        ),
    ]