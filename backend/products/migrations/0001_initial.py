# Generated by Django 4.0.3 on 2022-03-06 11:07

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=100)),
                ('brand', models.CharField(default=None, max_length=100)),
                ('product_details', models.CharField(default=None, max_length=500)),
                ('price', models.IntegerField(default=None)),
                ('image_right', models.CharField(default=None, max_length=500)),
                ('image_left', models.CharField(default=None, max_length=500)),
                ('image_top', models.CharField(default=None, max_length=500)),
                ('image_bottom', models.CharField(default=None, max_length=500)),
                ('image_angle', models.CharField(default=None, max_length=500)),
                ('image_angle_extra', models.CharField(default=None, max_length=500)),
                ('release_date', models.DateTimeField(default=None)),
                ('likes', models.ManyToManyField(related_name='product_likes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
