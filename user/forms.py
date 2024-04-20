from django import forms

class sendreportform(forms.Form):
    id=forms.InlineForeignKeyField(label="id", max_length=100)
    letra_edificio=forms.CharField(label="letra_edificio", max_length=100)
    numero_edificio=forms.CharField(label="numero_edificio", max_length=100)
    tipo_problema=forms.CharField(label="tipo_problema", max_length=100)
    gravedad_problema=forms.CharField(label="gravedad_problema", max_length=100)
    descripcion_problema=forms.Textarea(label="descripcion_problema", max_length=100)
    ubicacion_exacta=forms.Textarea(label="ubicacion_exacta", max_length=100)