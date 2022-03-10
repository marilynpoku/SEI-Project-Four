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

        # CHANGED BELOW FROM () TO [] DUE TO THIS ERROR:
        # You cannot call `.save()` on a serializer with invalid data.
        # {'owner': {'non_field_errors': [ErrorDetail(string='Invalid data. Expected a dictionary, but got int.', code='invalid')]}}
        # Unprocessable Entity: /api/comments/

        fields = ("id", "email", "username", "first_name", "last_name", "profile_image", "password", "password_confirmation")
