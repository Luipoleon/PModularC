from django.shortcuts import render
from django.contrib.auth.decorators import login_required

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