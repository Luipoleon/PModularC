from django.shortcuts import render,get_object_or_404
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse,JsonResponse
from .forms import formAcademicos, formBaños, formAreasComunes, formDepartamento, formProblemData
from .models import Problema, ProblemaAceptado, ProblemaRechazado
from login.models import CustomUser
import json

# Create your views here.

@login_required(login_url='/')
def user_index(request):
    current_user = request.user
    return render(request, 'user_index.html', {'user':current_user})

@login_required(login_url='/')
def user_reportes(request):
    current_user = request.user
    current_problemas=Problema.objects.filter(id_usuario=current_user)
    return render(request, 'user_reportes.html', {'user':current_user,'problemas':current_problemas}) 


@login_required(login_url='/')
def user_reportar(request):
    return render(request, 'user_reportar.html', {})

@login_required(login_url='/')
def user_cuenta(request):
    current_user = request.user
    return render(request, 'user_cuenta.html', {'user':current_user})




#Sending report
# tabla aceptados
@login_required(login_url='/')
def tablareport_aceptado(request):
    if request.method == "GET":
        problema_id = request.GET.get('id')
        if problema_id:
            problema_aceptado = get_object_or_404(ProblemaAceptado, id_problema=problema_id)
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
            problemaUserObj = get_object_or_404(Problema, id=problema_id)
            problema_dict=model_to_dict(problemaUserObj)
            problema_aceptado_dict["ProblemasTabla"]=problema_dict

            response = JsonResponse(problema_aceptado_dict, safe=False) # esta respuesta tiene los datos usados para mostrar en el modal
            return response
        else:
            return JsonResponse({'error': 'ID no proporcionado'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    

# enviando reporte user
def sendreport(request):
    if request.method == "POST":
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
            if tipoEdificio == "Academico":
                report.letra_edificio=form.cleaned_data["letra_edificio"]
                report.numero_salon=form.cleaned_data["numero_salon"]
            elif tipoEdificio == "Baños":
                report.piso_baño=form.cleaned_data["piso_baño"]
                report.tipo_baño=form.cleaned_data["tipo_baño"]
                report.edificio_baño=form.cleaned_data["edificio_baño"]
            elif tipoEdificio == "AreasComunes":
                report.tipo_area=form.cleaned_data["tipo_area_comun"]
                report.ubicacion_area=form.cleaned_data["ubicacion_area"]
            elif tipoEdificio == "Departamento":
                report.tipo_departamento=form.cleaned_data["tipo_departamento"]
                report.tipo_edificio_departamento=form.cleaned_data["tipo_edificio_departamento"]
                report.ubicacion_departamento=form.cleaned_data["ubicacion_departamento"]
            report.save()
            return HttpResponseRedirect('/user/reportar?success=true')
        return HttpResponseRedirect('/user/reportar?success=false')
    