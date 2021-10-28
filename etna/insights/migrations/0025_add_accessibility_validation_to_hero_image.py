# Generated by Django 3.1.8 on 2021-10-28 12:17

from django.db import migrations, models
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('insights', '0024_add_closing_a_tag_to_help_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='insightspage',
            name='hero_image_alt_text',
            field=models.CharField(blank=True, help_text='Alternative (alt) text describes images when they fail to load, and is read aloud by assistive technologies. Use a maximum of 100 characters to describe your image. Decorative images do not require alt text. <a href=https://html.spec.whatwg.org/multipage/images.html#alt target=_blank>Check the guidance for tips on writing alt text</a>.', max_length=100),
        ),
        migrations.AddField(
            model_name='insightspage',
            name='hero_image_caption',
            field=wagtail.core.fields.RichTextField(blank=True, help_text='An optional caption for non-decorative images, which will be displayed directly below the image. This could be used for image sources or for other useful metadata.'),
        ),
        migrations.AddField(
            model_name='insightspage',
            name='hero_image_decorative',
            field=models.BooleanField(default=False, help_text='Decorative images are used for visual effect and do not add information to the content of a page. <a href=https://www.w3.org/WAI/tutorials/images/decorative/ target=_blank>Check the guidance to see if your image is decorative</a>.'),
        ),
    ]
