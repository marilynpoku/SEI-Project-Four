from functools import partial
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from .serializers.common import UserSerializer
from datetime import datetime, timedelta
import jwt
from django.conf import settings
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# User model
User = get_user_model()

# Create your views here.


# Register

class RegisterView(APIView):

    def post(self, request):
        # user = self.get_user()

        # serialized_user = UserSerializer(user, data=request.data, partial=True)

        user_to_create = UserSerializer(data=request.data)
        print("Data", request.data)
        try:
            user_to_create.is_valid()
            user_to_create.save()
            return Response(user_to_create.data, status=status.HTTP_201_CREATED)
        except AssertionError as error:
            return Response({"detail": user_to_create.errors}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# Login


class LoginView(APIView):

    def post(self, request):
        print(request.data)
        try:
            user_to_login = User.objects.get(
                username=request.data.get('username'))
        except User.DoesNotExist:
            return PermissionDenied(detail="Unauthorised")

        if not user_to_login.check_password(request.data.get('password')):
            return PermissionDenied(detail="Unauthorised")

        dt = datetime.now() + timedelta(days=7)
        print('Date time', int(dt.strftime('%s')))

        token = jwt.encode({
            'sub': user_to_login.id,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, 'HS256')
        print('Token', token)

        return Response({
            'token': token,
            'message': f"Welcome back {user_to_login.first_name}"
        }, status.HTTP_202_ACCEPTED)

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound(detail="User not found")

        # Edit user
    def put(self, request, pk):

        user = self.get_user(pk=pk)

        serialized_user = UserSerializer(user, data=request.data, partial=True)

        try:
            serialized_user.is_valid()
            serialized_user.save()
            return Response(serialized_user.data, status=status.HTTP_202_ACCEPTED)

        except AssertionError as error:
            return Response({"detail": serialized_user.errors}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class UserDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound(detail="User not found")

    def get(self, _request, pk):
        user = self.get_user(pk=pk)
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        user = self.get_user(pk=pk)
        if request.user.id != user.id:
            raise PermissionDenied(detail='Unauthorized')
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        user_to_update = self.get_user(pk=pk)

        if request.user.id != user_to_update.id:
            raise PermissionDenied(detail='Unauthorized')

        serialized_user = UserSerializer(
            user_to_update, data=request.data, partial=True)

        try:
            serialized_user.is_valid()
            serialized_user.save()
            return Response(serialized_user.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response(
                "Unprocessable Entity",
                status=status.HTTP_422_UNPROCESSABLE_ENTITY)
