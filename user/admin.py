from django.contrib import admin
from .models import  Problemas, ProblemasCompletados, ProblemasRechazados

# Register your models here.

admin.site.register(Problemas)
admin.site.register(ProblemasCompletados)
admin.site.register(ProblemasRechazados)
