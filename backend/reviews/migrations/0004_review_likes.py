# Generated by Django 4.0.3 on 2022-03-04 17:21

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('reviews', '0003_alter_review_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='likes',
            field=models.ManyToManyField(related_name='review_likes', to=settings.AUTH_USER_MODEL),
        ),
    ]
