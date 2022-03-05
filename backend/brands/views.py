from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from .models import Brand

# Serializers
from .serializers.common import BrandSerializer
from .serializers.populated import PopulatedBrandSerializer

# Create your views here.

class BrandListView(APIView):

    # Get all Brands
    def get(self, _request):
        brands = Brand.objects.all()
        serialized_brands = PopulatedBrandSerializer(brands, many=True)
        return Response(serialized_brands.data, status=status.HTTP_200_OK)


class BrandDetailView(APIView):

    def get_brand(self, pk):
        try:
            return Brand.objects.get(pk=pk)
        except Brand.DoesNotExist:
            raise NotFound(detail="Brand not found")

# Get single Brands
    def get(self, _request, pk):
        brand = self.get_brand(pk=pk)
        serialized_brand = PopulatedBrandSerializer(brand)
        return Response (serialized_brand.data, status=status.HTTP_200_OK)

