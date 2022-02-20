from rest_framework import viewsets, generics, mixins, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import Http404
import re

import json
import time
from pprint import pprint

from .serializers import *
from .models import *


class PostMessageViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):

    def post(self, request, format=None):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
            except:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetMessagesViewset(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):

    def post(self, request, format=None):
        while True:
            messages = [message for message in Message.objects.all()]
            messagesSerialized = MessagesSerializer([message for message in Message.objects.all()], many=True)
            messages = json.loads(json.dumps(messagesSerialized.data))
            if request.data != messages:
                break
        return Response(messagesSerialized.data)


class InsertViewSet(mixins.CreateModelMixin, generics.GenericAPIView):

    def traitement(self, username, password, confirmPassword, sexe):
        if (len(username) < 4):
            errror= "Le nom d'utilisateur est trop court! Minimum: 4 caractères"
            return [False, errror]
        if (len(username) > 20):
            errror= "Le nom d'utilisateur est trop long! Maximum: 20 caractères"
            return [False, errror]
        if (re.sub('[^a-zA-Z0-9 ]', '', username) != username):
            errror= "Le nom d'utilisateur ne doit pas contenir de caractères spéciaux"
            return [False, errror]
        if(sexe != "M" and sexe !="F"):
            errror= "Oups, Vous n'avez pas défini votre sexe!"
            return [False, errror]
        if(len(password) < 6):
            errror= "Le mot de passe est trop court! Minimum: 6 caractères"
            return [False, errror]
        if(password != confirmPassword):
            errror= "Les mots de passe ne correspondent pas!"
            return [False, errror]
        return [True, "no-error"]
    
    def post(self, request, format=None):
        data = request.data
        traitement = self.traitement(data['username'], data['password'], data['confirmPassword'], data['sexe'])
        traitementResponse = traitement[0]
        traitementError = traitement[1]
        if traitementResponse:
            try:
                defaultUser = User.objects.filter(username=data['username'])[0]
                return Response({'error': "Désolé, un d'utilisateur possède déjà ce nom d'utilisateur!"})
            except:
                serializer = InsertSerializer(data=request.data)
                if serializer.is_valid():
                    try:
                        serializer.save()
                    except:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    serializer = UserConnectedSerializer(data=request.data)
                    serializer.is_valid()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': traitementError})

@api_view(['POST'])
def hello_world(request):
    username = request.data['username']
    password = request.data['password']

    try:
        user = User.objects.filter(username=username)[0]
        if (password == user.password):
            user.isConnected = True
            user.save()
            serializer = UserConnectedSerializer(user)
            return Response({
                'status': True,
                'user': serializer.data
                })
        return Response({'status': False})
    except:
        return Response({'Status': False})