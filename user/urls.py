from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_index, name = "user_index"),
    path('reportes/', views.user_reportes, name = "user_reportes"),
    path('reportar/', views.user_reportar, name = "user_edificios")    
]