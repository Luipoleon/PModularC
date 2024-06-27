from rest_framework import serializers
from user.models import Problema, ProblemaEnCurso, Notification
from login.models import CustomUser


class ProblemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problema
        fields = '__all__'
        
class ProblemaEnCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemaEnCurso
        fields = '__all__'

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__' 