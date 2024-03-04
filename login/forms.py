from django import forms


class LoginForm(forms.Form):
    email = forms.CharField(label="email", max_length=100)
    password = forms.CharField(label="password", max_length=100)


class RegisterForm(forms.Form):
    email = forms.CharField(label="email", max_length=100)
    password = forms.CharField(label="password", max_length=100)
    firstname = forms.CharField(label="fistname", max_length=100)
    lastname = forms.CharField(label="lastname", max_length=100)