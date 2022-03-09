from .common import ArticleSerializer
from comments.serializers.common import CommentSerializer
from jwt_auth.serializers.common import UserSerializer

# Serializers 
class PopulatedArticleSerializer(ArticleSerializer):
    comments = CommentSerializer(many=True)
    owner = UserSerializer()