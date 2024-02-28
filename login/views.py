from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views import View


# Create your views here.

class Login(View):

    template_name = "login.html"

    def get(self, request):
        return render(request, 'login.html', {})
    def post(self, request):
        user = authenticate(email="luis.luigis.9999@gmail.com", password="")
        user = User.objects.create_user("john", "lennon@thebeatles.com", "johnpassword")
        return render(request, 'login.html', {})
      





    
