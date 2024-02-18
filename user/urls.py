from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_index, name = "user_index"),
    path('UserInfo/', views.user_infomration, name = "user_information")
]