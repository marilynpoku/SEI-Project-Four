from .common import ArticleSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from jwt_auth.serializers.common import UserSerializer

# Serializers


class PopulatedArticleSerializer(ArticleSerializer):
    comments = PopulatedCommentSerializer(many=True)
    owner = UserSerializer()
