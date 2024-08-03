from django.shortcuts import render, HttpResponseRedirect, HttpResponse, redirect
from login.models import CustomUser, CodigoSeguridad
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views import View
from mailersend import emails
import secrets
import string
import json
from .forms import LoginForm, RegisterForm

# Código para recuperar constraseña
def generar_codigo_seguridad(length=6):
    alphabet = string.ascii_letters + string.digits
    codigo = ''.join(secrets.choice(alphabet) for i in range(length))
    return codigo

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



def enviar_correo(destinatario_email, destinatario_nombre, asunto, mensaje):
    mailer = emails.NewEmail("mlsn.a977aab3339211488d1f0a777df5e0666718feb65538b05bb27e12defab96d3a")

    # define an empty dict to populate with mail values
    mail_body = {}

    mail_from = {
        "name": "Luis Hernández",
        "email": "MS_cGk1rl@cuceimantein.site",
    }

    recipients = [
        {
            "name": destinatario_nombre,
            "email": destinatario_email,
        }
    ]

    reply_to = {
        "name": "Luis Hernández",
        "email": "contacto@cuceimantein.site",
    }

    mailer.set_mail_from(mail_from, mail_body)
    mailer.set_mail_to(recipients, mail_body)
    mailer.set_subject(asunto, mail_body)
    mailer.set_html_content(mensaje, mail_body)
    mailer.set_plaintext_content("T", mail_body)
    mailer.set_reply_to(reply_to, mail_body)

    # using print() will also return status code and data
    mailer.send(mail_body)


# views.py

def enviar_codigo_recuperacion(request):
    email =  json.loads(request.body).get('email')
    try:
        usuario = CustomUser.objects.get(email=email)
        request.session['user'] = usuario.id
        codigo_obj = CodigoSeguridad.objects.get(usuario=usuario)
        codigo = codigo_obj.codigo
    except CustomUser.DoesNotExist:
        return JsonResponse({'message': 'Correo no registrado', 'error': True})
    except CodigoSeguridad.DoesNotExist:
        codigo = generar_codigo_seguridad()
        CodigoSeguridad.objects.create(usuario=usuario, codigo=codigo)

    # Send the email with the code
    #enviar_correo(usuario.email, usuario.first_name, "Recuperación de contraseña", f"Su código de recuperación es: {codigo}")

    return JsonResponse({'message': 'Correo enviado con éxito', 'error': False})

def validar_codigo_recuperacion(request):
    codigo = json.loads(request.body).get('code')
    usuario = request.session['user']
    try:
        codigo_obj = CodigoSeguridad.objects.get(usuario=usuario, codigo=codigo)
        codigo_obj.codigo_verificado = True
        codigo_obj.save()
        return JsonResponse({'message': 'Código correcto', 'error': False})
    except CodigoSeguridad.DoesNotExist:
        return JsonResponse({'message': 'Código incorrecto', 'error': True})

def recuperar_contraseña(request):
    if request.method == 'POST':
        
        usuario = CustomUser.objects.get(id=request.session['user'])
        nueva_contraseña = json.loads(request.body).get('password')
        
        try:
            codigo_obj = CodigoSeguridad.objects.get(usuario=usuario.id, codigo_verificado=True)
            usuario.set_password(nueva_contraseña)
            usuario.save()
            codigo_obj.delete()
            return HttpResponse('Contraseña actualizada con éxito')
        except CodigoSeguridad.DoesNotExist:
            return HttpResponse('Código incorrecto')
    return render(request, 'recuperar_contraseña.html')