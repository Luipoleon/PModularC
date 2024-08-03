from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import timedelta
from .managers import CustomUserManager


class CustomUser(AbstractUser):

    username = None
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class CodigoSeguridad(models.Model):
    usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=6)
    codigo_verificado = models.BooleanField(default=False)
    creado_en = models.DateTimeField(auto_now=True)
    # expira_en = models.DateTimeField()  # Expiration time

    # def save(self, *args, **kwargs):
    #     # Calculate expiration time
    #     self.expira_en = self.creado_en + timedelta(minutes=15)
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.codigo