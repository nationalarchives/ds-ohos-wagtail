# Generated by Django 3.1.8 on 2021-06-08 14:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("records", "0002_recordpage_is_digitised"),
    ]

    operations = [
        migrations.AddField(
            model_name="recordpage",
            name="parent",
            field=models.JSONField(null=True),
        ),
    ]
