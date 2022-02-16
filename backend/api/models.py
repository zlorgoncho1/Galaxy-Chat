from django.db import models

class User(models.Model):
	username = models.CharField(max_length=20)
	sexe = models.CharField(max_length=1)
	password = models.CharField(max_length=40)
	isConnected = models.BooleanField()

class Message(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, unique=False)
	content = models.CharField(max_length=200)
	date = models.CharField(max_length=20)
	token = models.CharField(max_length=30)