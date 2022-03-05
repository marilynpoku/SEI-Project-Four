from .common import ReviewSerializer
from jwt_auth.serializers.common import UserSerializer

# Serializers
class PopulatedReviewSerializer(ReviewSerializer):
    owner = UserSerializer()