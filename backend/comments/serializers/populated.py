from .common import CommentSerializer
from jwt_auth.serializers.common import UserSerializer

# Serializers
class PopulatedCommentSerializer(CommentSerializer):
    owner = UserSerializer(many=True)