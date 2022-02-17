from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class UserSexeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'sexe']

class UserConnectedSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'sexe', 'isConnected']

class ConnectSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'sexe']

class InsertSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class MessagesSerializer(serializers.ModelSerializer):
    user = UserSexeSerializer()

    class Meta:
        model = Message
        fields = ['user','content', 'date', 'token']
        depth = 1

class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Message
        fields = ['user','content', 'date', 'token']
        depth = 1

    def create(self, validated_data):
        message = Message(user=User.objects.filter(username=validated_data['user']['username'])[0], content=validated_data['content'], date=validated_data['date'], token=validated_data['token'])
        message.save()
        return message