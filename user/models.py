from django.db import models
from login.models import CustomUser

# Create your models here.


class Academicos(models.Model):
    id_usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    letra_edificio = models.CharField(max_length=1, blank=False)
    numero_salon = models.IntegerField(blank=False)
    tipo_problema = models.CharField(max_length=100, blank=False)
    gravedad_problema = models.CharField(max_length=100, blank=False)  
    descripcion_problema = models.TextField(blank=False)
    ubicacion_exacta = models.TextField()

    def __str__(self):
        return self.letra_edificio 