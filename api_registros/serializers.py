from rest_framework import serializers
from user.models import Problema, ProblemaEnCurso, Notification


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
