from django.shortcuts import render

# Create your views here.

def admlogin(request):
    return render(request, 'inicioAdministrador.html', {})

def admReportes(request):
    return render(request, 'adm_reportes.html', {})

def admInfo(request):
    return render(request, 'adm_informacion.html', {})