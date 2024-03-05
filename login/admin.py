from django.contrib import admin
from login.models import CustomUser

# Register your models here.
class AdminCustomUser(admin.ModelAdmin):
    model = CustomUser
    list_display = [ 'get_id', 'email', 'first_name', 'last_name']

    def get_id(self, obj):
        return obj.id
    
    get_id.admin_order_field  = 'id'  #Allows column order sorting

    get_id.short_description = 'ID'  #Renames column head

    #Filtering on side - for some reason, this works
    # list_filter = ['id']

admin.site.register(CustomUser, AdminCustomUser)
