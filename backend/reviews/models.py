from django.db import models

# Create your models here.
class Review(models.Model):
    text = models.TextField(max_length=300, default=None, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField("jwt_auth.User", related_name='review_likes', default=None)

    product = models.ForeignKey(
        "products.Product",
        related_name = "reviews",
        on_delete= models.CASCADE
    )

    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name = "reviews",
        on_delete= models.CASCADE,
    )

    def __str__(self):
        return f"{self.text}"


