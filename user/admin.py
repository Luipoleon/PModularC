from django.contrib import admin
from .models import  Problema, ProblemaEnCurso, Notification

# Register your models here.


class ProblemasAdmin(admin.ModelAdmin):

    model = Problema
    list_display = [ 'id', 'tipo_edificio', 'id_usuario', 'fecha_creacion', 'estatus_problematica']
    list_filter = ['tipo_edificio', 'estatus_problematica', 'fecha_creacion']
    search_fields = ['tipo_edificio', 'id_usuario__email', 'estatus_problematica']

    
    def get_fields(self, request, obj=None):
        shared_fields = ('tipo_problema', 'gravedad_problema', 'descripcion_problema', 'ubicacion_exacta', 'estatus_problematica')
        if obj and obj.tipo_edificio == 'Academico':
            return ('letra_edificio', 'numero_salon') + shared_fields   
        elif obj and obj.tipo_edificio == 'Baños':
            return ('piso_baño', 'tipo_baño', 'edificio_baño') + shared_fields
        elif obj and obj.tipo_edificio == 'AreasComunes':
            return ('tipo_area', 'ubicacion_area') + shared_fields
        elif obj and obj.tipo_edificio == 'Departamento':
            return ('tipo_departamento', 'tipo_edificio_departamento', 'ubicacion_departamento') + shared_fields
        else:
            return super().get_fields(request, obj)
class ProblemasencursoAdmin(admin.ModelAdmin):

    model = ProblemaEnCurso
    list_display = [ 'id']

    
admin.site.register(ProblemaEnCurso,ProblemasencursoAdmin)
admin.site.register(Problema, ProblemasAdmin)
admin.site.register(Notification)

