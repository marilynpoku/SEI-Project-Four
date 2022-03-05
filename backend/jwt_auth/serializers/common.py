from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation 
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password 

# User model
User = get_user_model()

# Serializers

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)


    def validate(self, data):

        print('Data', data)

        if data.get('password'):
        
            password = data.pop('password')
            password_confirmation = data.pop('password_confirmation')


            if password != password_confirmation:
                raise ValidationError({ 'password_confirmation': 'Does not match password' })

            try:
                password_validation.validate_password(password)
            except ValidationError as error:
                print(error)
                raise ValidationError({ 'password': error })

            data['password'] = make_password(password)
            print('Hashed password', data['password'])
            return data

    class Meta:
        model = User
        fields = ("id", "email", "username", "first_name", "last_name", "profile_image", "password", "password_confirmation")


# class UserToUpdateSerializer(serializers.ModelSerializer):

#     username = serializers.CharField(write_only=True)
#     first_name =serializers.CharField(write_only=True)
#     last_name =serializers.CharField(write_only=True)
#     profile_image = serializers.CharField(write_only=True)
