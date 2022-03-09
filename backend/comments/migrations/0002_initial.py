# Generated by Django 4.0.3 on 2022-03-09 15:39

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('comments', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='comment_likes',
            field=models.ManyToManyField(default=None, related_name='comment_likes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='comment',
            name='owner',
            field=models.ManyToManyField(related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
    ]
