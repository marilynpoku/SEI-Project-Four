# Generated by Django 4.0.3 on 2022-03-04 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0004_rename_article_comment_articles'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='text',
            field=models.TextField(blank=True, default=None, max_length=300),
        ),
    ]
