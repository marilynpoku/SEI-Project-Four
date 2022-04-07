from django.db import models

# Create your models here.
class Brand(models.Model):
    name = models.CharField(max_length=50)
    logo = models.CharField(max_length=500)

    related_articles = models.ManyToManyField(
        "articles.article",
        related_name = "brands",
    )

    related_products = models.ManyToManyField(
        "products.product",
        related_name = "brands",
    )

    def __str__(self):
        return f"{self.name}"