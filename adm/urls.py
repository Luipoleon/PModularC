from django.urls import path
from . import views

urlpatterns = [
    path('', views.admlogin, name="inicio"),
    path('reportes/', views.admReportes, name="reportes"),
    path('info/', views.admInfo, name="info"),
    path('edificios/', views.admEdificios, name="edificios"),
    path('seguimiento/', views.admSeguimiento, name="seguimiento"),
]
