from django.urls import path
from . import views

urlpatterns = [
    path('', views.Login.as_view(template_name = "login.html"), name="login"),
    path('register/', views.register, name="register"),
    path('logout/', views.logout_view, name="logout"),
    path('send-code/', views.enviar_codigo_recuperacion, name="send-code"),
    path('validate-code/', views.validar_codigo_recuperacion, name="validatecode"),
    path('change-password/', views.recuperar_contraseña, name="changepassword"),
]