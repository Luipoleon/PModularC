from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User (models.Model):
    firstname = models.CharField(max_length = 60)
    lastname = models.CharField(max_length = 60)
    email = models.EmailField(max_length = 60)
    password = models.CharField(max_length = 60, default="")

    def __str__(self):
        return f"{self.id}"