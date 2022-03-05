from django.db import models

# Create your models here.
class Brand(models.Model):
    name = models.CharField(max_length=50)
    logo = models.CharField(max_length=500)

    related_articles = models.ForeignKey(
        "articles.article",
        related_name = "brands",
        on_delete= models.CASCADE,
    )

    related_products = models.ForeignKey(
        "products.product",
        related_name = "brands",
        on_delete= models.CASCADE,
    )

    def __str__(self):
        return f"{self.name}"