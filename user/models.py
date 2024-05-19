from django.db import models
from login.models import CustomUser

# Create your models here.


class Problema(models.Model):
    id_usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    tipo_edificio = models.CharField(max_length=100) # este es el si es academico, baño etc..
    estatus_problematica = models.CharField(max_length=100, default="Procesando") # estatus aceptado, rechazado etc.. al estar completado crea un registro en otra tabla
    fecha_creacion = models.DateTimeField(auto_now_add=True) #fecha de creacion
    letra_edificio = models.CharField(max_length=1, blank=True, null=True) #especial academico
    numero_salon = models.IntegerField(blank=True, null=True) #especial academico y baño
    piso_baño = models.CharField(max_length=100, blank=True, null=True) #especial baño
    tipo_baño = models.CharField(max_length=100, blank=True, null=True) #especial baño
    edificio_baño = models.CharField(max_length=10, blank=True, null=True) #especial baño
    tipo_area = models.CharField(max_length=100, blank=True, null=True) #especial areas comunes
    ubicacion_area = models.CharField(max_length=100, blank=True, null=True) #especial areas comunes
    tipo_departamento = models.CharField(max_length=100, blank=True, null=True) #especial departamento
    tipo_edificio_departamento = models.CharField(max_length=100, blank=True, null=True) #especial departamento
    ubicacion_departamento = models.TextField(blank=True, null=True) #especial departamento
    tipo_problema = models.CharField(max_length=100)
    gravedad_problema = models.CharField(max_length=100)  
    descripcion_problema = models.TextField()
    ubicacion_exacta = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.tipo_edificio
    
class ProblemaAceptado(models.Model):
    id_problema = models.ForeignKey(Problema, on_delete=models.CASCADE)
    id_administrador = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    info_adicional = models.TextField(blank=True)
    fecha_aceptado = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.id_problema)
    
class ProblemaRechazado(models.Model):
    id_problema = models.ForeignKey(Problema, on_delete=models.CASCADE)
    id_administrador = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    info_adicional = models.TextField(blank=True)
    fecha_rechazado = models.DateTimeField(auto_now_add=True)
    reaceptado = models.BooleanField(default=False)
    def __str__(self):
        return self.id_problema