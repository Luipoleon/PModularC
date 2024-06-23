from django.urls import path
from . import views

urlpatterns = [
    path('problema/', views.problema, name = "problema"),
]