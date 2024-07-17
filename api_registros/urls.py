from django.urls import path, re_path
from . import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from drf_yasg.generators import OpenAPISchemaGenerator

class CustomSchemaGenerator(OpenAPISchemaGenerator):
    def get_schema(self, request=None, public=False):
        schema = super().get_schema(request, public)
        schema.schemes = ['http', 'https']  # Allowed schemes
        return schema

schema_view = get_schema_view(
    openapi.Info(
        title="API de registros",
        default_version='v1',
        description="""API de registros para interactuar con la base de datos de la aplicación, utilizar el método adecuado HTTP o HTTPS para acceder a los recursos, según sea el caso pare evitar errores.""",
        terms_of_service="https://www.yourapp.com/terms/",
        contact=openapi.Contact(email="contacto@cuceimantein.com"),
        license=openapi.License(name="Your License"),
    ),
    generator_class=CustomSchemaGenerator,  # Use CustomSchemaGenerator
    public=True,
    permission_classes=(permissions.IsAdminUser,),
)

urlpatterns = [
    path('notificacion/', views.NotificacionesAPIView.as_view(), name="notificacion"),
    path('notificacion/<int:id>/', views.NotificacionAPIView.as_view(), name="notificacion_con_id"),
    path('problema/', views.ProblemasAPIView.as_view(), name="problema"),
    path('problema/<int:id>/', views.ProblemaAPIView.as_view(), name="problema_con_id"),
    path('problema_en_curso/', views.ProblemasEnCursoAPIView.as_view(), name="problema_en_curso"),
    path('problema_en_curso/<int:id_problema>/', views.ProblemaEnCursoAPIView.as_view(), name="problema_en_curso_con_id"),
    path('usuario/', views.UsuariosAPIView.as_view(), name="usuarios"),
    path('usuario/<int:id>/', views.UsuarioAPIView.as_view(), name="usuario_con_id"),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

]