# Generated by Django 4.0.3 on 2022-03-04 15:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_article_owner'),
        ('comments', '0006_alter_comment_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='articles',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articles', to='articles.article'),
        ),
    ]
