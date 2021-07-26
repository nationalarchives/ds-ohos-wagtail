# Generated by Django 3.1.8 on 2021-07-26 16:05

from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('wagtailimages', '0023_add_choose_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('role', models.CharField(blank=True, max_length=100, null=True)),
                ('summary', wagtail.core.fields.RichTextField(blank=True, null=True)),
                ('bio_link', models.URLField(help_text='Link to external bio page')),
                ('bio_link_label', models.CharField(help_text='Button text for bio link', max_length=50)),
                ('image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image')),
            ],
            options={
                'verbose_name_plural': 'Authors',
            },
        ),
    ]
