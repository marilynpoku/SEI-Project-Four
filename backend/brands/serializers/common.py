from rest_framework import serializers
from ..models import Brand

# Serializers
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'