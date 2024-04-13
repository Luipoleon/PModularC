from django import forms


class LoginForm(forms.Form):
    emailL = forms.CharField(label="emailL", max_length=100)
    passwordL = forms.CharField(label="passwordL", max_length=100)


class RegisterForm(forms.Form):
    emailR = forms.CharField(label="emailR", max_length=100)
    passwordR = forms.CharField(label="passwordR", max_length=100)
    firstname = forms.CharField(label="fistname", max_length=100)
    lastname = forms.CharField(label="lastname", max_length=100)