from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework import status
from django.db import IntegrityError
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Serializers
from .serializers.common import CommentSerializer
from .serializers.populated import PopulatedCommentSerializer
# Models 
from .models import Comment


# Create your views here.
class CommentListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # Add comment
    def post(self, request):

        request.data["owner"] = request.user.id

        serialized_comment = CommentSerializer(data=request.data)
        try:
            print(serialized_comment) 
            serialized_comment.is_valid()
            serialized_comment.save()
            return Response(serialized_comment.data, status=status.HTTP_201_CREATED)
        # return Response(serialized_comment.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        except AssertionError as error:
            print(str(error))
            print(serialized_comment.errors)
            return Response({
                "detail": serialized_comment.errors
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        except:
            return Response({
                "detail": "Unprocessable Entity"
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class CommentDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )


    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound(detail="Comment not found")

# Get single Comment
    def get(self, _request, pk):
        comment = self.get_comment(pk=pk)
        serialized_comment = PopulatedCommentSerializer(comment)
        return Response(serialized_comment.data, status=status.HTTP_200_OK)


    # Delete comment
    def delete(self, request, pk):
        try:
            comment_to_delete = Comment.objects.get(pk=pk)

            if comment_to_delete.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")

            comment_to_delete.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except Comment.DoesNotExist:
            raise NotFound(detail="Comment not found")
            
        except:
            return Response({
                "detail": "Failed to delete comment"
            }, status=status.HTTP_401_UNAUTHORIZED)

    # Edit comment
    def put(self, request, pk):

        request.data["owner"] = request.user.id
        
        comment_to_update = self.get_comment(pk=pk)

        if comment_to_update.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")

        serialized_comment = PopulatedCommentSerializer(comment_to_update, data=request.data)
        
        try:
            serialized_comment.is_valid()
            serialized_comment.save()
            return Response(serialized_comment.data, status=status.HTTP_202_ACCEPTED)

        except AssertionError as error:
            return Response({"detail": str(error) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        
        except:
            return Response(
                {"detail": "Unprocessable Entity"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        
