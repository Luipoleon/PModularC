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

class Baños(models.Model):
    id_usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    tipo_baño = models.CharField(max_length=100, blank=False)
    letra_edificio = models.CharField(max_length=100, blank=False)
    piso_baño = models.CharField(max_length=100, blank=False)
    tipo_problema = models.CharField(max_length=100, blank=False)
    gravedad_problema = models.CharField(max_length=100, blank=False)
    descripcion_problema = models.TextField(blank=False)
    ubicacion_exacta = models.TextField()
    def __str__(self):
        return self.letra_edificio
    
class AreasComunes(models.Model):
    id_usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    TipoArea = models.CharField(max_length=100, blank=False)
    UbicacionArea = models.CharField(max_length=100, blank=False)
    TipoProblema = models.CharField(max_length=100, blank=False)
    GravedadProblema = models.CharField(max_length=100, blank=False)
    DescripcionProblema = models.TextField(blank=False)
    UbicacionExacta = models.TextField()
    def __str__(self):
        return self.TipoArea
        
class Departamento(models.Model):
    id_usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    TipoDepartamento = models.CharField(max_length=100, blank=False)
    TipoEdificio = models.CharField(max_length=100, blank=True)
    UbicacionDepartamento = models.CharField(max_length=100, blank=True)
    TipoProblema = models.CharField(max_length=100, blank=False)
    GravedadProblema = models.CharField(max_length=100, blank=False)
    DescripcionProblema = models.TextField(blank=False)
    UbicacionExacta = models.TextField()

    def __str__(self):
        return self.TipoEdificio