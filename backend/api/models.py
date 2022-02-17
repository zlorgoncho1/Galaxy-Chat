from django.db import models

class User(models.Model):
	username = models.CharField(max_length=20, unique=True)
	sexe = models.CharField(max_length=1)
	password = models.CharField(max_length=40)
	isConnected = models.BooleanField()

	def __str__(self):
		return self.username

class Message(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, unique=False)
	content = models.CharField(max_length=200)
	date = models.CharField(max_length=20)
	token = models.CharField(max_length=30)