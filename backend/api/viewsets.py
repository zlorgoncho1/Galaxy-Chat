from rest_framework import viewsets, generics, mixins, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import Http404

from .serializers import *
from .models import *


class MessageViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):

    queryset = Message.objects.all()
    serializer_class = MessagesSerializer
    def get(self, request):
        return self.list(request)

    def post(self, request, format=None):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
            except:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InsertViewSet(mixins.CreateModelMixin, generics.GenericAPIView):

    def post(self, request, format=None):
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