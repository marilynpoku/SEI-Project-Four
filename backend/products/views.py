from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db import IntegrityError

from products.models import Product
from products.serializers.common import ProductSerializer
from .serializers.populated import PopulatedProductSerializer



# Create your views here.


# Get all products
class ProductListView(APIView):
    def get(self, _request):
        products = Product.objects.all()
        serialized_products = PopulatedProductSerializer(products, many=True)

        return Response (serialized_products.data, status=status.HTTP_200_OK)

    

class ProductDetailView(APIView):

    def get_product(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise NotFound(detail="Product not found")

# Get single products
    def get(self, _request, pk):
        product = self.get_product(pk=pk)
        serialized_product = PopulatedProductSerializer(product)
        return Response (serialized_product.data, status=status.HTTP_200_OK)


