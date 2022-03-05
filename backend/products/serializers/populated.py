from .common import ProductSerializer
from reviews.serializers.common import ReviewSerializer

# Serializers
class PopulatedProductSerializer(ProductSerializer):
    reviews = ReviewSerializer(many=True)