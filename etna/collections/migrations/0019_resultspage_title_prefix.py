# Generated by Django 3.1.8 on 2021-08-13 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("collections", "0018_alter_time_period_topic_index_page_body"),
    ]

    operations = [
        migrations.AddField(
            model_name="resultspage",
            name="title_prefix",
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
