from .common import ProductSerializer
from reviews.serializers.populated import PopulatedReviewSerializer


# Serializers
class PopulatedProductSerializer(ProductSerializer):
    reviews = PopulatedReviewSerializer(many=True)