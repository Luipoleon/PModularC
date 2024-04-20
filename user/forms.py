from django import forms

class sendreportform(forms.Form):

    TipoEdificio = forms.CharField(label="TipoEdificio", max_length=100)
    NombreEdificioS= forms.CharField(label="NombreEdificioS", max_length=1)
    NumeroEdificioS = forms.IntegerField(label="NumeroEdificioS")
    Tipo_Problema = forms.CharField(label="Tipo_Problema", max_length=100)
    Gravedad_Problema = forms.CharField(label="Gravedad_Problema", max_length=100)
    Descripcion_Problema= forms.CharField(label="Descripcion_Problema", max_length=100)
    Ubicacion_Exacta = forms.CharField(label="Ubicacion_Exacta", max_length=100)