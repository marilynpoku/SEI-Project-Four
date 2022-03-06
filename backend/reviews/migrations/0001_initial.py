# Generated by Django 4.0.3 on 2022-03-06 13:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(blank=True, default=None, max_length=300)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('likes', models.ManyToManyField(related_name='review_likes', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to=settings.AUTH_USER_MODEL)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='products.product')),
            ],
        ),
    ]
