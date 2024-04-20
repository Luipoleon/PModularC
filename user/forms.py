from django import forms

class sendreportformAcademicos(forms.Form):

    TipoEdificio = forms.CharField(label="TipoEdificio", max_length=100)
    NombreEdificioS= forms.CharField(label="NombreEdificioS", max_length=1)
    NumeroEdificioS = forms.IntegerField(label="NumeroEdificioS")
    Tipo_Problema = forms.CharField(label="Tipo_Problema", max_length=100)
    Gravedad_Problema = forms.CharField(label="Gravedad_Problema", max_length=100)
    Descripcion_Problema= forms.CharField(label="Descripcion_Problema", max_length=100)
    Ubicacion_Exacta = forms.CharField(label="Ubicacion_Exacta", max_length=100,required=False)

class sendreportformBaños(forms.Form):

    TipoEdificio = forms.CharField(label="TipoEdificio", max_length=100)
    TipoBañoS = forms.CharField(label="TipoBañoS", max_length=100)
    EdificioBañoS = forms.CharField(label="EdificioBañoS", max_length=10)
    PlantaBañoS = forms.CharField(label="PlantaBañoS", max_length=10)
    Tipo_Problema = forms.CharField(label="Tipo_Problema", max_length=100)
    Gravedad_Problema = forms.CharField(label="Gravedad_Problema", max_length=100)
    Descripcion_Problema= forms.CharField(label="Descripcion_Problema", max_length=100)
    Ubicacion_Exacta = forms.CharField(label="Ubicacion_Exacta", max_length=100,required=False)


class sendreportformAreasComunes(forms.Form):

    TipoEdificio = forms.CharField(label="TipoEdificio", max_length=100)
    TipoAreaComun = forms.CharField(label="TipoAreaComun", max_length=100)
    UAreaVerdeS = forms.CharField(label="UAreaVerdeS", max_length=100)
    UAreaEstacionamientoS = forms.CharField(label="UAreaEstacionamientoS", max_length=100)
    UAreaComedorS = forms.CharField(label="UAreaComedorS", max_length=100)
    Tipo_Problema = forms.CharField(label="Tipo_Problema", max_length=100)
    Gravedad_Problema = forms.CharField(label="Gravedad_Problema", max_length=100)
    Descripcion_Problema= forms.CharField(label="Descripcion_Problema", max_length=100)
    Ubicacion_Exacta = forms.CharField(label="Ubicacion_Exacta", max_length=100,required=False)

class sendreportformDepartamento(forms.Form):
    TipoEdificio = forms.CharField(label="TipoEdificio", max_length=100)
    TipoDepartamentos = forms.CharField(label="TipoDepartamentos", max_length=100)
    UCubicoloS = forms.CharField(label="UCubicolosS", max_length=100,required=False)
    UAdministrativosS = forms.CharField(label="UAdministrativosS", max_length=100,required=False)
    UBibliotecaS= forms.CharField(label="UBibliotecaS", max_length=100,required=False)
    UCoordinacionS= forms.CharField(label="UCoordinacionS", max_length=100,required=False)
    Tipo_Problema = forms.CharField(label="Tipo_Problema", max_length=100)
    Gravedad_Problema = forms.CharField(label="Gravedad_Problema", max_length=100)
    Descripcion_Problema= forms.CharField(label="Descripcion_Problema", max_length=100)
    Ubicacion_Exacta = forms.CharField(label="Ubicacion_Exacta", max_length=100,required=False)