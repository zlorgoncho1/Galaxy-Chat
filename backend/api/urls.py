from django.contrib import admin
from django.urls import include, path
from .viewsets import *

urlpatterns = [
    path('insert/', InsertViewSet.as_view()),
    path('connect/', hello_world),
    path('postMessage/', PostMessageViewSet.as_view()),
    path('getMessages/', GetMessagesViewset.as_view())
]
