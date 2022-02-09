# Generated by Django 3.1.8 on 2021-07-09 15:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("alerts", "0001_initial"),
        ("collections", "0006_add_record_teaser_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="explorerindexpage",
            name="alert",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="+",
                to="alerts.alert",
            ),
        ),
        migrations.AddField(
            model_name="resultspage",
            name="alert",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="+",
                to="alerts.alert",
            ),
        ),
        migrations.AddField(
            model_name="timeperiodexplorerpage",
            name="alert",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="+",
                to="alerts.alert",
            ),
        ),
        migrations.AddField(
            model_name="topicexplorerpage",
            name="alert",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="+",
                to="alerts.alert",
            ),
        ),
    ]
