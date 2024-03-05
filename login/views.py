from django.shortcuts import render, HttpResponseRedirect, HttpResponse
from login.models import CustomUser
from django.contrib.auth import authenticate, login, logout
from django.views import View
from .forms import LoginForm, RegisterForm
from django.shortcuts import redirect

# Create your views here.

class Login(View):

    template_name = "login.html"

    def get(self, request):
        return render(request, 'login.html', {})
    def post(self, request):
        form = LoginForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
           email = form.cleaned_data["email"]
           password = form.cleaned_data["password"]

           user = authenticate(email = email,  password =  password)
        
           if user is not None:
                login(request, user)
                return HttpResponseRedirect("/user")
           else:
               return HttpResponseRedirect("/");
               
def register(requests):
    if requests.method == "POST":
        form = RegisterForm(requests.POST)
        if form.is_valid():
           email = form.cleaned_data["email"]
           password = form.cleaned_data["password"]
           firstname = form.cleaned_data["firstname"]
           lastname = form.cleaned_data["lastname"]
        
           if not userExists(email):
                user = CustomUser.objects.create_user(email=email, password = password)
                user.first_name = firstname
                user.last_name = lastname
                user.save()
                return HttpResponseRedirect("/user")
           else:
               return HttpResponseRedirect("/");


    else:
        return HttpResponse("Method not valid!")


def userExists(email):
    try:
        user  =  CustomUser.objects.get(username = email)
        return True
    except:
        return False


def logout_view(request):
    logout(request)
    return redirect('login')





    
