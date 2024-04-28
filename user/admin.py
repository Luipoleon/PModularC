from django.contrib import admin
from .models import Academicos, Baños, AreasComunes, Departamento, Problemas, ProblemasCompletados, ProblemasRechazados

# Register your models here.

admin.site.register(Academicos)
admin.site.register(Baños)
admin.site.register(AreasComunes)
admin.site.register(Departamento)
admin.site.register(Problemas)
admin.site.register(ProblemasCompletados)
admin.site.register(ProblemasRechazados)
