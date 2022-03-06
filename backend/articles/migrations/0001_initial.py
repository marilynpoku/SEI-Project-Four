# Generated by Django 4.0.3 on 2022-03-06 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default=None, max_length=100)),
                ('tagline', models.CharField(default=None, max_length=100)),
                ('text', models.CharField(default=None, max_length=500)),
                ('image', models.CharField(default=None, max_length=500)),
                ('image_extra', models.CharField(default=None, max_length=500)),
                ('created_at', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
