from django.urls import path
from .views import ProductListView, ProductDetailView


# Request: /products/
# Request with id: /products/:pk

urlpatterns = [
    path('', ProductListView.as_view()),
    path('<int:pk>/', ProductDetailView.as_view())
]