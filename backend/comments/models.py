from django.db import models

# Create your models here.
class Comment(models.Model):
    text = models.TextField(max_length=300, default=None, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    comment_likes = models.ManyToManyField("jwt_auth.User", related_name='comment_likes')

    articles = models.ForeignKey(
        "articles.Article",
        related_name="comments",
        on_delete= models.CASCADE,
    )

    owner = models.ManyToManyField(
        "jwt_auth.User",
        related_name = "comments",
        # on_delete= models.CASCADE,
        # default='',
    )

    def __str__(self):
        return f"{self.text}"



