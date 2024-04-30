from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse
from .forms import formAcademicos, formBaños, formAreasComunes, formDepartamento, formProblemData
from .models import Problemas, ProblemasCompletados, ProblemasRechazados

# Create your views here.

@login_required
def user_index(request):
    current_user = request.user
    return render(request, 'user_index.html', {'user':current_user})

def user_reportes(request):
    return render(request, 'user_reportes.html', {})

def user_reportar(request):
    return render(request, 'user_reportar.html', {})

def user_cuenta(request):
    current_user = request.user
    return render(request, 'user_cuenta.html', {'user':current_user})




#Sending report
def sendreport(request):
    if request.method == "POST":
        tipoEdificio = request.POST.get("tipo_edificio")
        if tipoEdificio == "Academico":
            form = formAcademicos(request.POST)
        elif tipoEdificio == "Baños":
            form = formBaños(request.POST)
        elif tipoEdificio == "AreasComunes":
            form = formAreasComunes(request.POST)
        elif tipoEdificio == "Departamento":
            form = formDepartamento(request.POST)
      
        if form.is_valid():
            report=Problemas.objects.create(
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
            return HttpResponse("Report sent!")
        return HttpResponse("Error")
    