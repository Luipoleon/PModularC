from django import forms

class formProblemData(forms.Form):
    tipo_edificio = forms.CharField(label="tipo_edificio", max_length=100)
    tipo_problema = forms.CharField(label="tipo_problema", max_length=100)
    gravedad_problema = forms.CharField(label="gravedad_problema", max_length=100)
    descripcion_problema = forms.CharField(label="descripcion_problema", max_length=100)
    ubicacion_exacta = forms.CharField(label="ubicacion_exacta", max_length=100, required = False)
   
class formAcademicos(formProblemData):
    letra_edificio = forms.CharField(label="letra_edificio", max_length=1)
    numero_salon = forms.CharField(label="numero_salon")


class formBaños(formProblemData):
    piso_baño = forms.CharField(label="piso_baño", max_length=100)
    tipo_baño = forms.CharField(label="tipo_baño", max_length=100)
    edificio_baño = forms.CharField(label="edificio_baño", max_length=100)


class formAreasComunes(formProblemData):
    tipo_area_comun = forms.CharField(label="tipo_area_comun", max_length=100)
    ubicacion_area = forms.CharField(label="ubicacion_area", max_length=100)
   

class formDepartamento(formProblemData):
    tipo_departamento = forms.CharField(label="tipo_departamento", max_length=100)
    tipo_edificio_departamento = forms.CharField(label="tipo_edificio", max_length=100, required=False)
    ubicacion_departamento = forms.CharField(label="ubicacion_departamento", max_length=100, required=False)
