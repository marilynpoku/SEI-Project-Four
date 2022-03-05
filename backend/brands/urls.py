from django.urls import path
from .views import BrandListView, BrandDetailView


# Request: /brands /
# Request with id: /brands/:pk

urlpatterns = [
    path('', BrandListView.as_view()),
    path('<int:pk>/', BrandDetailView.as_view())
]