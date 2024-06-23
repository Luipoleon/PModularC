from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from user.models import Problema, ProblemaEnCurso


# Create your views here.


@login_required(login_url='/')
def admlogin(request):
    if not request.user.is_staff:
        return HttpResponseForbidden("Access denied")
    return render(request, 'inicioAdministrador.html', {})

@login_required(login_url='/')
def admReportes(request):
    if not request.user.is_staff:
        return HttpResponseForbidden("Access denied")
    current_problemas = Problema.objects.filter(estatus_problematica='Procesando').order_by('id').iterator()
    current_problemas = list(current_problemas)[:10]
    return render(request, 'adm_reportes.html', {'problemas':current_problemas}) 

@login_required(login_url='/')
def admInfo(request):
    if not request.user.is_staff:
        return HttpResponseForbidden("Access denied")
    return render(request, 'adm_informacion.html', {})

@login_required(login_url='/')
def admEdificios(request):
    if not request.user.is_staff:
        return HttpResponseForbidden("Access denied")
    return render(request, 'adm_edificios.html', {})

@login_required(login_url='/')
def admSeguimiento(request):
    if not request.user.is_staff:
        return HttpResponseForbidden("Access denied")
    return render(request, 'adm_seguimiento.html', {})

def admTerminados(request):
    return render(request, 'adm_terminados.html', {})

@login_required(login_url='/')
def admGetEdificio(request, letra):
    if not request.user.is_staff:
        return HttpResponseForbidden("Access denied")
    return render(request, 'adm_edificios_info.html', {"letra": letra})


# def tabla_reportes(request):
#     if request.method == "GET":
#         problema_id = request.GET.get('id')
#         if problema_id:
#             problema_aceptado = get_object_or_404(ProblemaEnCurso, id_problema=problema_id)
#             problema_aceptado_dict = model_to_dict(problema_aceptado)
#             # Agregando bug de fecha aceptado
#             fechaAceptado=problema_aceptado.fecha_aceptado
#             problema_aceptado_dict["fecha_aceptado"]=fechaAceptado
#             # Agregando al diccionario con CustumUser
#             idAdminCustom = problema_aceptado_dict['id_administrador']
#             nameAdminCustomObj = get_object_or_404(CustomUser, id=idAdminCustom)
#             nameAdminCustom= nameAdminCustomObj.first_name + " "+ nameAdminCustomObj.last_name
#             problema_aceptado_dict["adminName"]=nameAdminCustom
#             #agregando datos tabla problema
#             problemaUserObj = get_object_or_404(Problema, id=problema_id)
#             problema_dict=model_to_dict(problemaUserObj)
#             problema_aceptado_dict["ProblemasTabla"]=problema_dict

#             response = JsonResponse(problema_aceptado_dict, safe=False) # esta respuesta tiene los datos usados para mostrar en el modal
#             return response
#         else:
#             return JsonResponse({'error': 'ID no proporcionado'}, status=400)
#     else:
#         return JsonResponse({'error': 'Método no permitido'}, status=405)
    