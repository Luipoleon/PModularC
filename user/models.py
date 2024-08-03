from django.db import models
from login.models import CustomUser

# Create your models here.


class Problema(models.Model):
    id_usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    tipo_edificio = models.CharField(max_length=100) # este es el si es academico, baño etc..
    estatus_problematica = models.CharField(max_length=100, default="Procesando") # estatus aceptado, rechazado etc.. al estar completado crea un registro en otra tabla
    fecha_creacion = models.DateTimeField(auto_now_add=True) #fecha de creacion
    fecha_actualizado = models.DateTimeField(auto_now=True) #fecha de actualizacion
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
    
class ProblemaEnCurso(models.Model):
    id_problema = models.ForeignKey(Problema, on_delete=models.CASCADE)
    id_administrador = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null = True)
    info_adicional = models.TextField(blank=True)
    fecha_aceptado = models.DateTimeField(auto_now_add=True)
    fecha_completado = models.DateTimeField(blank=True, null=True)
    comentario_completado = models.TextField(blank=True, null=True)
    def __str__(self):
        return str(self.id_problema)

# Notificaciones
class Notification(models.Model):  
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    admin_u = models.CharField(max_length=50,default='')
    type = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    read_status = models.BooleanField(default=False)
    def __str__(self):
        return f"Notification to {self.user}: {self.title}"


