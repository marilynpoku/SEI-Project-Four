from .common import ArticleSerializer
from comments.serializers.common import CommentSerializer

# Serializers 
class PopulatedArticleSerializer(ArticleSerializer):
    comments = CommentSerializer(many=True)