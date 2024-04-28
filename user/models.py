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
    

class Problemas(models.Model):
    id_usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    tipo_problematica = models.CharField(max_length=100, blank=False) # este es el si es academico, baño etc..
    estatus_problematica = models.CharField(max_length=100, blank=False) # estatus aceptado, rechazado etc.. al estar completado crea un registro en otra tabla
    fecha_creacion = models.DateTimeField(auto_now_add=True) #fecha de creacion
    tipo_problema = models.CharField(max_length=100, blank=False)
    gravedad_problema = models.CharField(max_length=100, blank=False)  
    descripcion_problema = models.TextField(blank=False)
    ubicacion_exacta = models.TextField()
    letra_edificio = models.CharField(max_length=1, blank=True) #especial academico
    numero_salon = models.IntegerField(blank=True) #especial academico y baño
    piso_baño = models.CharField(max_length=100, blank=True) #especial baño
    tipo_baño = models.CharField(max_length=100, blank=True) #especial baño
    TipoArea = models.CharField(max_length=100, blank=True) #especial areas comunes
    UbicacionArea = models.CharField(max_length=100, blank=True) #especial areas comunes
    TipoDepartamento = models.CharField(max_length=100, blank=True) #especial departamento
    TipoEdificio = models.CharField(max_length=100, blank=True) #especial departamento
    UbicacionDepartamento = models.CharField(max_length=100, blank=True) #especial departamento
    def __str__(self):
        return self.tipo_problematica
    
class ProblemasCompletados(models.Model):
    id_problema = models.ForeignKey(Problemas, on_delete=models.CASCADE)
    id_administrador = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    info_adicional = models.TextField(blank=True)
    fecha_completado = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.id_problema
    
class ProblemasRechazados(models.Model):
    id_problema = models.ForeignKey(Problemas, on_delete=models.CASCADE)
    id_administrador = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    info_adicional = models.TextField(blank=True)
    fecha_rechazado = models.DateTimeField(auto_now_add=True)
    reaceptado = models.BooleanField(default=False)
    def __str__(self):
        return self.id_problema