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

# User model
User = get_user_model()

# Create your views here.

# Register
class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        print("Data", request.data)
        try:
            user_to_create.is_valid()
            user_to_create.save()
            return Response(user_to_create.data, status=status.HTTP_201_CREATED)
        except: 
            return Response("Failed to create user", status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# Login
class LoginView(APIView):

    def post(self, request):
        print(request.data)
        try:
            user_to_login = User.objects.get(username=request.data.get('username'))
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
            return Response({ "detail": serialized_user.errors }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

