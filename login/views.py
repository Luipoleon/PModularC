from django.shortcuts import render, HttpResponseRedirect, HttpResponse, redirect
from login.models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views import View
from .forms import LoginForm, RegisterForm



# Create your views here.

class Login(View):

    template_name = "login.html"

    def get(self, request):
        if request.user.is_authenticated:
            return HttpResponseRedirect("/adm" if request.user.is_staff else "/user")
        else:
            return render(request, 'login.html', {})

    def post(self, request):
        form = LoginForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
           email = form.cleaned_data["emailL"]
           password = form.cleaned_data["passwordL"]

           user = authenticate(email = email,  password =  password)
           
           validUser = {'email': email}

           if user is not None:
                validUser['logged_in'] = True
                validUser['is_staff'] = user.is_staff
                login(request, user)
             
           else:
               validUser['logged_in'] = False

           return JsonResponse(validUser)
               
def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
           email = form.cleaned_data["emailR"]
           password = form.cleaned_data["passwordR"]
           firstname = form.cleaned_data["firstname"]
           lastname = form.cleaned_data["lastname"]

           validUser = {'email': email}
           
           if not userExists(email):
                user = CustomUser.objects.create_user(email=email, password = password)
                user.first_name = firstname
                user.last_name = lastname
                user.save()
                # Specify the backend
                # backend = 'django.contrib.auth.backends.ModelBackend'
                # user.backend = backend
                login(request, user, backend='django.contrib.auth.backends.ModelBackend')
                validUser["registered"] = True
           else:
               validUser["registered"] = False
           return JsonResponse(validUser)


    else:
        return HttpResponse("Method not valid!")


def userExists(email):
    try:
        user  =  CustomUser.objects.get(email = email)
        return True
    except:
        return False

def logout_view(request):
    logout(request)
    return redirect('login')





    
