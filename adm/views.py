from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden


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
    return render(request, 'adm_reportes.html', {})

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
