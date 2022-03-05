from .common import BrandSerializer
from products.serializers.common import ProductSerializer
from articles.serializers.common import ArticleSerializer

# Serializers
class PopulatedBrandSerializer(BrandSerializer):
    related_products = ProductSerializer()
    related_articles = ArticleSerializer()