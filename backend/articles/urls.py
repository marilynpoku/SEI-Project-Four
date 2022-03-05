from django.urls import path
from .views import ArticleListView, ArticleDetailView

# Request: /articles/
# Request with id: /articles/:pk

urlpatterns = [
    path('', ArticleListView.as_view()),
    path('<int:pk>/', ArticleDetailView.as_view())
]