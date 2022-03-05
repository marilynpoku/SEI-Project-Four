from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100, default=None)
    brand = models.CharField(max_length=100, default=None)
    product_details = models.CharField(max_length=500, default=None)
    price = models.IntegerField(default=None)
    image = models.CharField(max_length=500, default=None)
    likes = models.ManyToManyField("jwt_auth.User", related_name='product_likes')


    def __str__(self):
        return f"{self.name}"


# def number_of_likes(self):
#         return self.likes.count()