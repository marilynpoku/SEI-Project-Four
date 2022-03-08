from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db import IntegrityError

from articles.models import Article

from articles.serializers.common import ArticleSerializer
from .serializers.populated import PopulatedArticleSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Create your views here.

# Get all articles
class ArticleListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    
    def get(self, _request):
        articles = Article.objects.all()
        serialized_articles = PopulatedArticleSerializer(articles, many=True)

        return Response(serialized_articles.data, status=status.HTTP_200_OK)


# Post new article
    def post(self, request):
        request.data["owner"] = request.user.id
        
        serialized_data = ArticleSerializer(data=request.data)
        try:
            serialized_data.is_valid()
            serialized_data.save()
            return Response(serialized_data.data, status=status.HTTP_201_CREATED)

        except IntegrityError as error:
            return Response({
                "detail": str(error)
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        except AssertionError as error:
            return Response({
                "detail": str(error)
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        except:
            return Response(
                {"detail": "Unprocessable Entity"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )


class ArticleDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_article(self, pk):
        try:
            return Article.objects.get(pk=pk)
        except Article.DoesNotExist:
            raise NotFound(detail="Article not found")

# Get single article
    def get(self, _request, pk):
        article = self.get_article(pk=pk)
        serialized_article = PopulatedArticleSerializer(article)
        return Response(serialized_article.data, status=status.HTTP_200_OK)


# Delete article
    def delete(self, _request, pk):
        article = self.get_article(pk=pk)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Edit article
    def put(self, request, pk):
        article_to_update = self.get_article(pk=pk)
        serialized_article = ArticleSerializer(article_to_update, data=request.data)
        try:
            serialized_article.is_valid()
            serialized_article.save()
            return Response(serialized_article.data, status=status.HTTP_202_ACCEPTED)

        except AssertionError as error:
            return Response({"detail": str(error) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        
        except:
            return Response(
                {"detail": "Unprocessable Entity"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        
