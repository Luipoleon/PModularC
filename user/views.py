from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .forms import sendreportformAcademicos, sendreportformBaños, sendreportformAreasComunes, sendreportformDepartamento
from .models import Academicos, Baños, AreasComunes, Departamento

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
    return render(request, 'user_cuenta.html', {})




#Sending report
def sendreport(request):
    if request.method == "POST":
        # get the form variables

        tipoEdificio = request.POST.get("TipoEdificio")
        if tipoEdificio == "Academico":
            form = sendreportformAcademicos(request.POST)
            if form.is_valid():
                report=Academicos.objects.create(
                    id_usuario=request.user,
                    letra_edificio=form.cleaned_data["NombreEdificioS"],
                    numero_salon=form.cleaned_data["NumeroEdificioS"],
                    tipo_problema=form.cleaned_data["Tipo_Problema"],
                    gravedad_problema=form.cleaned_data["Gravedad_Problema"],
                    descripcion_problema=form.cleaned_data["Descripcion_Problema"],
                    ubicacion_exacta=form.cleaned_data["Ubicacion_Exacta"]
                )
                report.save()
                return HttpResponse("Report sent!")
            else:
                return HttpResponse("Form is not valid!")
        elif tipoEdificio == "Baños":
            form = sendreportformBaños(request.POST)
            if form.is_valid():
                report=Baños.objects.create(
                    id_usuario=request.user,
                    tipo_baño=form.cleaned_data["TipoBañoS"],
                    letra_edificio=form.cleaned_data["EdificioBañoS"],
                    piso_baño=form.cleaned_data["PlantaBañoS"],
                    tipo_problema=form.cleaned_data["Tipo_Problema"],
                    gravedad_problema=form.cleaned_data["Gravedad_Problema"],
                    descripcion_problema=form.cleaned_data["Descripcion_Problema"],
                    ubicacion_exacta=form.cleaned_data["Ubicacion_Exacta"]
                )
                report.save()
                return HttpResponse("Report sent baños!")
            else:
                return HttpResponse("Form is not valid!")
        elif tipoEdificio == "AreasComunes":
            form = sendreportformAreasComunes(request.POST)
            if form.is_valid():
                report=AreasComunes.objects.create(
                    id_usuario=request.user,
                    TipoArea=form.cleaned_data["TipoAreaComun"],
                    UbicacionArea=form.cleaned_data["UAreaVerdeS"],
                    TipoProblema=form.cleaned_data["Tipo_Problema"],
                    GravedadProblema=form.cleaned_data["Gravedad_Problema"],
                    DescripcionProblema=form.cleaned_data["Descripcion_Problema"],
                    UbicacionExacta=form.cleaned_data["Ubicacion_Exacta"]
                )
                report.save()
                return HttpResponse("Report sent Areas Comunes!")
            else:
                return HttpResponse("Form is not valid!")
        elif tipoEdificio == "Departamento":
            form = sendreportformDepartamento(request.POST)
            if form.is_valid():
                TDepartamento=form.cleaned_data["TipoDepartamentos"]
                if TDepartamento == "Administrativos":
                    report=Departamento.objects.create(
                        id_usuario=request.user,
                        TipoDepartamento=form.cleaned_data["TipoDepartamento"],
                        TipoEdificio=form.cleaned_data["UAdministrativosS"],
                        UbicacionDepartamento="No aplica",
                        TipoProblema=form.cleaned_data["Tipo_Problema"],
                        GravedadProblema=form.cleaned_data["Gravedad_Problema"],
                        DescripcionProblema=form.cleaned_data["Descripcion_Problema"],
                        UbicacionExacta=form.cleaned_data["Ubicacion_Exacta"]
                    )
                elif TDepartamento == "Biblioteca":
                    report=Departamento.objects.create(
                        id_usuario=request.user,
                        TipoDepartamento=form.cleaned_data["TipoDepartamentos"],
                        TipoEdificio="No aplica",
                        UbicacionDepartamento=form.cleaned_data["UBibliotecaS"],
                        TipoProblema=form.cleaned_data["Tipo_Problema"],
                        GravedadProblema=form.cleaned_data["Gravedad_Problema"],
                        DescripcionProblema=form.cleaned_data["Descripcion_Problema"],
                        UbicacionExacta=form.cleaned_data["Ubicacion_Exacta"]
                    )
                elif TDepartamento == "Coordinacion":
                    report=Departamento.objects.create(
                        id_usuario=request.user,
                        TipoDepartamento=form.cleaned_data["TipoDepartamentos"],
                        TipoEdificio="No aplica",
                        UbicacionDepartamento=form.cleaned_data["UCoordinacionS"],
                        TipoProblema=form.cleaned_data["Tipo_Problema"],
                        GravedadProblema=form.cleaned_data["Gravedad_Problema"],
                        DescripcionProblema=form.cleaned_data["Descripcion_Problema"],
                        UbicacionExacta=form.cleaned_data["Ubicacion_Exacta"]
                    )
                elif TDepartamento == "Cubiculos":
                    report=Departamento.objects.create(
                        id_usuario=request.user,
                        TipoDepartamento=form.cleaned_data["TipoDepartamentos"],
                        TipoEdificio="No aplica",
                        UbicacionDepartamento=form.cleaned_data["UCubicoloS"],
                        TipoProblema=form.cleaned_data["Tipo_Problema"],
                        GravedadProblema=form.cleaned_data["Gravedad_Problema"],
                        DescripcionProblema=form.cleaned_data["Descripcion_Problema"],
                        UbicacionExacta=form.cleaned_data["Ubicacion_Exacta"]
                    )
                report.save()
                return HttpResponse("Report sent Departamentos!")
            else:
                return HttpResponse("Form is not valid!")
















    #     form = RegisterForm(request.POST)
    #     if form.is_valid():

    #        print(userExists(email))
           
    #        if not userExists(email):
    #             user = CustomUser.objects.create_user(email=email, password = password)
    #             user.first_name = firstname
    #             user.last_name = lastname
    #             user.save()
    #             # Specify the backend
    #             # backend = 'django.contrib.auth.backends.ModelBackend'
    #             # user.backend = backend
    #             login(request, user, backend='django.contrib.auth.backends.ModelBackend')
    #             validUser["registered"] = True
    #        else:
    #            validUser["registered"] = False
    #        return JsonResponse(validUser);


    # else:
    #     return HttpResponse("Method not valid!")

