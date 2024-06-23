from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from user.models import Problema, ProblemaEnCurso
from django.forms.models import model_to_dict
import pytz
from datetime import datetime
timezone = pytz.timezone('America/Mexico_City')
# Create your views here.


@login_required(login_url='/')
def problema(request):
    if request.method == 'GET':
        current_problemas = Problema.objects.all().order_by('id')
        current_problemas_list = [model_to_dict(problema) for problema in current_problemas]
        # Add date to field
        for i in range(len(current_problemas)):
            # Ajusta la fecha y hora a la zona horaria de México
            fecha_mexico = current_problemas[i].fecha_creacion.astimezone(timezone)
            # Formatea la fecha en el formato día/mes/año (por ejemplo, 22/06/2024)
            fecha_formateada = fecha_mexico.strftime('%d/%m/%Y')
            current_problemas_list[i]['fecha_creacion'] = fecha_formateada
            current_problemas_list[i]['user_first_name'] = current_problemas[i].id_usuario.first_name
            

        return JsonResponse(current_problemas_list, safe=False)
        
    return HttpResponse("Hello, world. You're at the polls index.")
