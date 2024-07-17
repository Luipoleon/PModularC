from django.contrib import admin
from login.models import CustomUser, CodigoSeguridad

# Register your models here.
class AdminCustomUser(admin.ModelAdmin):
    model = CustomUser
    list_display = [ 'get_id', 'first_name', 'last_name', 'email', 'is_staff']

    def get_id(self, obj):
        return obj.id
    
    get_id.admin_order_field  = 'id'  #Allows column order sorting

    get_id.short_description = 'ID'  #Renames column head

    #Filtering on side - for some reason, this works
    list_filter = ['is_staff']



class AdminCodigoSeguridad(admin.ModelAdmin):
    model = CodigoSeguridad
    list_display = ['id', 'usuario', 'codigo', 'creado_en']
    list_filter = ['creado_en']

    def usuario(self, obj):
        return obj.usuario.username

    usuario.admin_order_field = 'usuario__username'  # permite ordenar por nombre de usuario

admin.site.register(CustomUser, AdminCustomUser)
admin.site.register(CodigoSeguridad, AdminCodigoSeguridad)