# Generated by Django 3.1.8 on 2021-06-08 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='recordpage',
            name='is_digitised',
            field=models.BooleanField(default=False),
        ),
    ]