from django.shortcuts import render

# Create your views here.

def user_index(request):
    return render(request, 'user_index.html', {})

def user_infomration(request):
    return render(request, 'user_information.html', {})