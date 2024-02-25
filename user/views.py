from django.shortcuts import render

# Create your views here.

def user_index(request):
    return render(request, 'user_index.html', {})

def user_reportes(request):
    return render(request, 'user_reportes.html', {})

def user_reportar(request):
    return render(request, 'user_reportar.html', {})