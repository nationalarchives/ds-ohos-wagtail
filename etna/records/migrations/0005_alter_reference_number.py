# Generated by Django 3.1.8 on 2021-06-24 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("records", "0004_recordpage_arrangement"),
    ]

    operations = [
        migrations.AlterField(
            model_name="recordpage",
            name="reference_number",
            field=models.TextField(),
        ),
    ]
