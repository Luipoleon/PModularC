from django import forms

class sendreportform(forms.Form):

    TipoDepartamentos = forms.CharField(label="TipoDepartamentos", max_length=100)
    PlantaBañoS = forms.CharField(label="PlantaBañoS", max_length=100)
    TipoAreaComun = forms.CharField(label="TipoAreaComun", max_length=100)
    UAreaVerdeS = forms.CharField(label="UAreaVerdeS", widget=forms.Textarea)
    # UAreaComedorS = forms.CharField(label="UAreaComedorS", widget=forms.Textarea)
    # id=forms.IntegerField(label="id")