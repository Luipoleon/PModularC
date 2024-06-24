from django.urls import path
from . import views

urlpatterns = [
    path('problema/', views.problema, name="problema"),
    path('problema/<int:id>/', views.problema, name="problema_con_id"),
    path('notificacion/', views.notificacion, name="notificacion"),
]