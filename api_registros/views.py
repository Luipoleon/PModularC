from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from user.models import Problema, ProblemaEnCurso, Notification
from django.forms.models import model_to_dict
import pytz
from api_registros.forms import formAcademicos, formBaños, formAreasComunes, formDepartamento
from login.models import CustomUser
import json
from django.core.exceptions import ObjectDoesNotExist

# Zona horaria de México
timezone = pytz.timezone('America/Mexico_City')

# Problema
@login_required(login_url='/')
def problema(request, id = None):
    if request.method == 'GET':
        # Obtiene un problema en específico
        if id:
            problema_aceptado = get_object_or_404(ProblemaEnCurso, id_problema=id)
            problema_aceptado_dict = model_to_dict(problema_aceptado)
            # Agregando bug de fecha aceptado
            fechaAceptado=problema_aceptado.fecha_aceptado
            problema_aceptado_dict["fecha_aceptado"]=fechaAceptado
            # Agregando al diccionario con CustumUser
            idAdminCustom = problema_aceptado_dict['id_administrador']
            nameAdminCustomObj = get_object_or_404(CustomUser, id=idAdminCustom)
            nameAdminCustom= nameAdminCustomObj.first_name + " "+ nameAdminCustomObj.last_name
            problema_aceptado_dict["adminName"]=nameAdminCustom
            #agregando datos tabla problema
            problemaUserObj = get_object_or_404(Problema, id=id)
            problema_dict=model_to_dict(problemaUserObj)
            problema_aceptado_dict["ProblemasTabla"]=problema_dict

            response = JsonResponse(problema_aceptado_dict, safe=False) # esta respuesta tiene los datos usados para mostrar en el modal
            return response
        
        # Obtiene todos los problemas
        problemas = Problema.objects.all().order_by('id')
        problemas_lista = [model_to_dict(problema) for problema in problemas]
        # Agregar fecha a campo fecha_creacion
        for i in range(len(problemas)):
            # Ajusta la fecha y hora a la zona horaria de México
            fecha_mexico = problemas[i].fecha_creacion.astimezone(timezone)
            # Formatea la fecha en el formato día/mes/año (por ejemplo, 22/06/2024)
            fecha_formateada = fecha_mexico.strftime('%d/%m/%Y')
            problemas_lista[i]['fecha_creacion'] = fecha_formateada
            problemas_lista[i]['user_first_name'] = problemas[i].id_usuario.first_name

        return JsonResponse(problemas_lista, safe=False)
    
    # Crea un nuevo problema
    if request.method == 'POST':

        tipoEdificio = request.POST.get("tipo_edificio")

        if tipoEdificio == "Academico":
            form = formAcademicos(request.POST)
        elif tipoEdificio == "Baños":
            form = formBaños(request.POST)
        elif tipoEdificio == "Áreas comunes":
            form = formAreasComunes(request.POST)
        elif tipoEdificio == "Departamento":
            form = formDepartamento(request.POST)
      
        if form.is_valid():
            report=Problema.objects.create(
                id_usuario=request.user,
                tipo_edificio=tipoEdificio,
                tipo_problema=form.cleaned_data["tipo_problema"],
                gravedad_problema=form.cleaned_data["gravedad_problema"],
                descripcion_problema=form.cleaned_data["descripcion_problema"],
                ubicacion_exacta=form.cleaned_data["ubicacion_exacta"]
            )
            reporteEnProceso = ProblemaEnCurso.objects.create(
                id_problema=report,
                id_administrador=CustomUser.objects.get(id=1),
                info_adicional="...",
            )
            if tipoEdificio == "Academico":
                report.letra_edificio=form.cleaned_data["letra_edificio"]
                report.numero_salon=form.cleaned_data["numero_salon"]
            elif tipoEdificio == "Baños":
                report.piso_baño=form.cleaned_data["piso_baño"]
                report.tipo_baño=form.cleaned_data["tipo_baño"]
                report.edificio_baño=form.cleaned_data["edificio_baño"]
            elif tipoEdificio == "Áreas comunes":
                report.tipo_area=form.cleaned_data["tipo_area_comun"]
                report.ubicacion_area=form.cleaned_data["ubicacion_area"]
            elif tipoEdificio == "Departamento":
                tipo_edificio_departamento = form.cleaned_data["tipo_edificio_departamento"]
                ubicacion_departamento = report.ubicacion_departamento=form.cleaned_data["ubicacion_departamento"]
                report.tipo_departamento=form.cleaned_data["tipo_departamento"]
                if tipo_edificio_departamento == '':
                    report.ubicacion_departamento=form.cleaned_data["ubicacion_departamento"]
                elif ubicacion_departamento == '':
                    report.tipo_edificio_departamento=form.cleaned_data["tipo_edificio_departamento"]

            report.save()
            reporteEnProceso.save()

            return HttpResponseRedirect('/user/reportar?success=true')
        
        return HttpResponseRedirect('/user/reportar?success=false')
    
    # Actualiza el estado de un problema
    if request.method == "PUT":
        if not id:
            return JsonResponse({'message': 'No se ha proporcionado un ID'}, status=400)
        # Parse JSON body
        datos = json.loads(request.body)
        problema_id = id
        estatus_problema = datos.get('status')
        info_adicional = datos.get('info_adicional')

        problema = Problema.objects.get(id = problema_id)
        problema_en_curso = ProblemaEnCurso.objects.get(id_problema = problema)

        problema.estatus_problematica = estatus_problema
        problema_en_curso.info_adicional = info_adicional

        problema.save()
        problema_en_curso.save()

        return JsonResponse({'message': 'Reporte actualizado exitosamente'}, status=200)
    
    return HttpResponse("Hello, world. You're at the polls index.")

@login_required(login_url='/')
def notificacion(request):
    if request.method == "GET":
        notifications = Notification.objects.filter(user=request.user).values(
            'id', 'user', 'type', 'title', 'message', 'created_at', 'updated_at', 'read_status'
        )
        notifications_list = list(notifications)
        return JsonResponse(notifications_list, safe=False)
    
    if request.method == "PUT":
        data = json.loads(request.body)
        notification = Notification.objects.get(id=data['id'])
        notification.read_status = True
        notification.save()
        return JsonResponse({'message': 'Notificación marcada como leída'}, status=200)
    
    if request.method== "DELETE":
        try:
            # Parse JSON body
            data = json.loads(request.body)
            notification_id = data.get('id')

            # Check if ID is provided
            if not notification_id:
                return JsonResponse({'error': 'Notification ID not provided'}, status=400)
            
            try:
                # Retrieve notification by ID
                notification = Notification.objects.get(id=notification_id)
                notification.delete()
                return JsonResponse({'message': 'Notification deleted successfully'}, status=200)
            
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Notification not found'}, status=404)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)