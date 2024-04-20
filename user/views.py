from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .forms import sendreportform
from .models import Academicos

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
            form = sendreportform(request.POST)
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
            return HttpResponse("Baños")



















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

