from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=100, default=None)
    tagline = models.CharField(max_length=100, default=None)
    text = models.CharField(max_length=500, default=None)
    image = models.CharField(max_length=500, default=None)
    image_extra = models.CharField(max_length=500, default=None)
    created_at = models.DateField(auto_now_add=True)
    article_likes = models.ManyToManyField("jwt_auth.User", related_name='article_likes')

    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name = "articles",
        on_delete= models.CASCADE,
        default='',
    )


    def __str__(self):
        return f"{self.title}"
    

