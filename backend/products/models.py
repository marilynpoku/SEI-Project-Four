from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100, default=None)
    brand = models.CharField(max_length=100, default=None)
    product_details = models.CharField(max_length=500, default=None)
    price = models.IntegerField(default=None)
    image_right  = models.CharField(max_length=500, default=None)
    image_left = models.CharField(max_length=500, default=None)
    image_top = models.CharField(max_length=500, default=None)
    image_bottom = models.CharField(max_length=500, default=None)
    image_angle = models.CharField(max_length=500, default=None)
    image_angle_extra = models.CharField(max_length=500, default=None)
    release_date = models.DateTimeField(auto_now_add=False, default=None)
    likes = models.ManyToManyField("jwt_auth.User", related_name='product_likes')



    def __str__(self):
        return f"{self.name} ({self.brand})"


# def number_of_likes(self):
#         return self.likes.count()