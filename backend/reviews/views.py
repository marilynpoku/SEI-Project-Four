from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework import status
from django.db import IntegrityError
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Serializers
from .serializers.common import ReviewSerializer
from .serializers.populated import PopulatedReviewSerializer

# Models 
from .models import Review


# Create your views here.
class ReviewListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    

    # Add review
    def post(self, request):

        request.data["owner"] = request.user.id

        print("data", request.data)

        serialized_review = PopulatedReviewSerializer(data=request.data)
        try:
            serialized_review.is_valid()
            serialized_review.save()
            return Response(serialized_review.data, status=status.HTTP_201_CREATED)
        except AssertionError as error:
            print(str(error))
            return Response({
                "detail": str(error)
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({
                "detail": "Unprocessable Entity"
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ReviewDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_review(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise NotFound(detail="Review not found")

    # Delete review 
    def delete(self, request, pk):
        try:
            review_to_delete = Review.objects.get(pk=pk)

            if review_to_delete.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")

            review_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except Review.DoesNotExist:
            raise NotFound(detail="Review not found")

        except:
            return Response({
                "detail": "Failed to delete review"
            }, status=status.HTTP_401_UNAUTHORIZED)

    # Edit review
    def put(self, request, pk):
        review_to_update = self.get_review(pk=pk)

        if review_to_update.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")

        serialized_review = PopulatedReviewSerializer(review_to_update, data=request.data)
        
        try:
            serialized_review.is_valid()
            serialized_review.save()
            return Response(serialized_review.data, status=status.HTTP_202_ACCEPTED)

        except AssertionError as error:
            return Response({"detail": str(error) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        
        except:
            return Response(
                {"detail": "Unprocessable Entity"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        

