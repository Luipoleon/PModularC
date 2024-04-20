from django.shortcuts import render

# Create your views here.

def admlogin(request):
    return render(request, 'inicioAdministrador.html', {})

def admReportes(request):
    return render(request, 'adm_reportes.html', {})

def admInfo(request):
    return render(request, 'adm_informacion.html', {})

def admEdificios(request):
    return render(request, 'adm_edificios.html', {})

def admSeguimiento(request):
    return render(request, 'adm_seguimiento.html', {})

def admGetEdificio(request, letra):
    return render(request, 'adm_edificios_info.html', {"letra": letra})