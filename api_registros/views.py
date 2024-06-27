from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from user.models import Problema, ProblemaEnCurso, Notification
import pytz
from rest_framework.permissions import IsAuthenticated
from api_registros.forms import formAcademicos, formBaños, formAreasComunes, formDepartamento
from login.models import CustomUser
import json
from django.core.exceptions import ObjectDoesNotExist
from .serializers import ProblemaSerializer, ProblemaEnCursoSerializer, NotificacionSerializer, UsuarioSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from login.forms import LoginForm, RegisterForm
# Zona horaria de México
timezone = pytz.timezone('America/Mexico_City')

class NotificacionesAPIView(APIView):
    """
    View for handling both list and retrieve operations based on the request type.
    """
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    def get(self, request, *args, **kwargs):
        # List all objects
        queryset = Notification.objects.filter(user=request.user).order_by('id')
        serializer = NotificacionSerializer(queryset, many=True)
        return Response(serializer.data)
    
   
class NotificacionAPIView(APIView):

    """
    View for handling both list and retrieve operations based on the request type.
    """
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access

    def get(self, request, *args, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            # Retrieve a single object
            try:
                instance = Notification.objects.get(id=id)
                if(instance.user != request.user):
                    return Response({'error': 'Notification does not belong to user'}, status=400)
                serializer = NotificacionSerializer(instance)
                return Response(serializer.data)
            except Problema.DoesNotExist:
                return Response({'error': 'Object not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
          return Response({'error': 'ID not provided.'}, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        operation_summary="Mark a notification as read",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['id'],  # Specify required fields here
            properties={
                'id': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID of the notification'),
            },
        ),
        responses={
            200: "Notification marked as read",
            400: "Invalid data"
        }
    )
    def put(self, request, *args, **kwargs):
        notification_id = kwargs.get('id')
        notification = Notification.objects.get(id=notification_id)
        if(notification.user != request.user):
            return Response({'error': 'Notification does not belong to user'}, status=400)
        notification.read_status = True
        notification.save()
        return Response({'message': 'Notification marked as read'}, status=200)
    
    @swagger_auto_schema(
        operation_summary="Delete a notification",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
        ),
        responses={
            200: "Notification deleted successfully",
            400: "Invalid data"
        }
    )
    def delete(self, request, *args, **kwargs):
        try:
            # Parse JSON body
            notification_id = kwargs.get('id')

            # Check if ID is provided
            if not notification_id:
                return Response({'error': 'Notification ID not provided'}, status=400)
            
            try:
                # Retrieve notification by ID
                notification = Notification.objects.get(id=notification_id)
                if(notification.user != request.user):
                    return Response({'error': 'Notification does not belong to user'}, status=400)
                notification.delete()
                return Response({'message': 'Notification deleted successfully'}, status=200)
            
            except ObjectDoesNotExist:
                return Response({'error': 'Notification not found'}, status=404)
        
        except json.JSONDecodeError:
            return Response({'error': 'Invalid JSON'}, status=400)
        
        except Exception as e:
            return Response({'error': str(e)}, status=500)  
        

class ProblemasAPIView(APIView):
    """
    View for handling both list and retrieve operations based on the request type.
    """
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    def get(self, request, *args, **kwargs):
        # List all objects
        queryset = Problema.objects.all().order_by('id')
        serializer = ProblemaSerializer(queryset, many=True)
        list = serializer.data.copy()
        
        if request.user.is_staff:
            # Add user.email to every dict in list
            if request.user.is_staff:
                # Add user.email to every dict in list
                for item in list:
                    item['user_email'] = request.user.email
           
        return Response(list)
    
    @swagger_auto_schema(
        operation_summary="Create a new Problema object",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['id_usuario', 'tipo_edificio', 'tipo_problema', 'gravedad_problema', 'descripcion_problema', 'ubicacion_exacta'],  # Specify required fields here
            properties={
                'id_usuario': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID of the user'),
                'tipo_edificio': openapi.Schema(type=openapi.TYPE_STRING, description='Type of building'),
                'estatus_problematica': openapi.Schema(type=openapi.TYPE_STRING, description='Status of the problem', default='Procesando'),
                'letra_edificio': openapi.Schema(type=openapi.TYPE_STRING, description='Letter of the building', default=None, blank=True, null=True),
                'numero_salon': openapi.Schema(type=openapi.TYPE_INTEGER, description='Number of the salon', default=None, blank=True, null=True),
                'piso_baño': openapi.Schema(type=openapi.TYPE_STRING, description='Floor of the bathroom', default=None, blank=True, null=True),
                'tipo_baño': openapi.Schema(type=openapi.TYPE_STRING, description='Type of bathroom', default=None, blank=True, null=True,),
                'edificio_baño': openapi.Schema(type=openapi.TYPE_STRING, description='Building of the bathroom', default=None, blank=True, null=True),
                'tipo_area': openapi.Schema(type=openapi.TYPE_STRING, description='Type of common area', default=None, blank=True, null=True),
                'ubicacion_area': openapi.Schema(type=openapi.TYPE_STRING, description='Location of the common area', default=None, blank=True, null=True),
                'tipo_departamento': openapi.Schema(type=openapi.TYPE_STRING, description='Type of department', default=None, blank=True, null=True),
                'tipo_edificio_departamento': openapi.Schema(type=openapi.TYPE_STRING, description='Type of building for department', default=None, blank=True, null=True),
                'ubicacion_departamento': openapi.Schema(type=openapi.TYPE_STRING, description='Location of the department', default=None, blank=True, null=True),
                'tipo_problema': openapi.Schema(type=openapi.TYPE_STRING, description='Type of problem'),
                'gravedad_problema': openapi.Schema(type=openapi.TYPE_STRING, description='Severity of the problem'),
                'descripcion_problema': openapi.Schema(type=openapi.TYPE_STRING, description='Description of the problem'),
                'ubicacion_exacta': openapi.Schema(type=openapi.TYPE_STRING, description='Exact location of the problem', default=None, blank=True, null=True),
            },
        ),
        responses={
            201: ProblemaSerializer,
            400: "Invalid data"
        }
    )

    def post(self, request, *args, **kwargs):
        tipoEdificio = request.POST.get("tipo_edificio")

        if tipoEdificio == "Academico":
            form = formAcademicos(request.POST)
        elif tipoEdificio == "Baños":
            form = formBaños(request.POST)
        elif tipoEdificio == "Áreas comunes":
            form = formAreasComunes(request.POST)
        elif tipoEdificio == "Departamento":
            form = formDepartamento(request.POST)
        
        if form.is_valid():

            data = form.cleaned_data
            data['id_usuario'] = request.user.id
            serializer = ProblemaSerializer(data=data)
            if serializer.is_valid():
                report = serializer.save()
                reporteEnProceso = ProblemaEnCursoSerializer(data={
                    'id_problema': report.id,
                    'id_administrador': 1,
                    'info_adicional': '...'
                })
                if reporteEnProceso.is_valid():
                    reporteEnProceso.save()
                else:
                    return Response(reporteEnProceso.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(reporteEnProceso.errors, status=status.HTTP_400_BAD_REQUEST)

            return HttpResponseRedirect('/user/reportar?success=true')
        
        return HttpResponseRedirect('/user/reportar?success=false')
        

class ProblemaAPIView(APIView):
    """
    View for handling both list and retrieve operations based on the request type.
    """
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access

    def get(self, request, *args, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            # Retrieve a single object
            try:
                instance = Problema.objects.get(id=id)
                serializer = ProblemaSerializer(instance)
                return Response(serializer.data)
            except Problema.DoesNotExist:
                return Response({'error': 'Object not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
          return Response({'error': 'ID not provided.'}, status=status.HTTP_400_BAD_REQUEST)
    

    @swagger_auto_schema(
        operation_summary="Change problem status",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['estatus'],  # Specify required fields here
            properties={
                'estatus': openapi.Schema(type=openapi.TYPE_STRING, description='Status of the problem'),
                'info_adicional' : openapi.Schema(type=openapi.TYPE_STRING, description='Status of the problem', default='...'),
            },
        ),
        responses={
            201: ProblemaSerializer,
            400: "Invalid data"
        }
    )
    def put(self, request, *args, **kwargs):
        id = kwargs.get('id')
        estatus = request.data['status']
        info_adicional = request.data["info_adicional"]
        if id is not None:
            try:
                instance = Problema.objects.get(id=id)
                instance.estatus_problematica = estatus
                instance.info_adicional = info_adicional
                instance.save()
                return Response({'message': 'Status changed'}, status=200)
                
            except Problema.DoesNotExist:
                return Response({'error': 'Object not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'ID not provided.'}, status=status.HTTP_400_BAD_REQUEST)
   

class ProblemasEnCursoAPIView(APIView):
    """
    View for handling both list and retrieve operations based on the request type.
    """
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    def get(self, request, *args, **kwargs):
        # List all objects
        queryset = ProblemaEnCurso.objects.all().order_by('id')
        serializer = ProblemaEnCursoSerializer(queryset, many=True)
        return Response(serializer.data)
    
    
class ProblemaEnCursoAPIView(APIView):
    """
    View for handling both list and retrieve operations based on the request type.
    """
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    @swagger_auto_schema(
    operation_summary="Retrieve a single Problema object",
        responses={
            200: ProblemaSerializer,
            404: "Object not found"
        }
    )


    def get(self, request, *args, **kwargs):
        id_problema = kwargs.get('id_problema')
        if id_problema is not None:
            # Retrieve a single object
            try:
                instance = ProblemaEnCurso.objects.get(id_problema=id_problema)
                serializer = ProblemaEnCursoSerializer(instance)
                dict = serializer.data.copy()
                problema = Problema.objects.get(id=dict['id_problema'])
                serializer = ProblemaSerializer(problema)

                dict['problema'] = serializer.data
                dict['adminName'] = instance.id_administrador.first_name
                dict.pop('id_problema', None)
                return Response(dict)
            except ProblemaEnCurso.DoesNotExist:
                return Response({'error': 'Object not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'ID not provided.'}, status=status.HTTP_400_BAD_REQUEST)

class UsuariosAPIView(APIView):
    """
    View for handling both list and retrieve operations based on the request type.
    """
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    def get(self, request, *args, **kwargs):
        # List all objects
        queryset = CustomUser.objects.all().order_by('id')
        serializer = UsuarioSerializer(queryset, many=True)
        return Response(serializer.data)
    
    # @swagger_auto_schema(
    #     operation_summary="Create a new user",
    #     request_body=openapi.Schema(
    #         type=openapi.TYPE_OBJECT,
    #         required=['email', 'first_name', 'last_name', 'password'],  # Specify required fields here
    #         properties={
    #             'email': openapi.Schema(type=openapi.TYPE_STRING, description='Email of the user'),
    #             'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='First name of the user'),
    #             'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='Last name of the user'),
    #             'password': openapi.Schema(type=openapi.TYPE_STRING, description='Password of the user'),
    #         },
    #     ),
    #     responses={
    #         201: UsuarioSerializer,
    #         400: "Invalid data"
    #     }
    # )

    # def post():
    #     pass

    
class UsuarioAPIView(APIView):
    """
    View for handling both list and retrieve operations based on the request type.
    """
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    def get(self, request, *args, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            # Retrieve a single object
            try:
                instance = CustomUser.objects.get(id=id)
                serializer = UsuarioSerializer(instance)
                return Response(serializer.data)
            except CustomUser.DoesNotExist:
                return Response({'error': 'Object not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
          return Response({'error': 'ID not provided.'}, status=status.HTTP_400_BAD_REQUEST)
        
    @swagger_auto_schema(
        operation_summary="Change user data and password",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['password', 'current_password'],  # Specify required fields here
            properties={
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='New password'),
                'current_password': openapi.Schema(type=openapi.TYPE_STRING, description='Current password'),
            },
        ),
        responses={
            200: "Password changed",
            400: "Invalid data"
        }
    )
    def put(self, request, *args, **kwargs):
        id = kwargs.get('id')
        password = request.data['password']
        current_password = request.data['current_password']
        if id is not None:
            try:
                instance = CustomUser.objects.get(id=id)
                if not instance.check_password(current_password):
                    return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
                instance.set_password(password)
                instance.save()
                return Response({'message': 'Password changed'}, status=200)
                
            except CustomUser.DoesNotExist:
                return Response({'error': 'Object not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'ID not provided.'}, status=status.HTTP_400_BAD_REQUEST)