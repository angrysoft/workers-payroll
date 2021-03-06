from django import forms
from .models import User


class LoginForm(forms.Form):
    username = forms.CharField(required=True)
    password = forms.CharField(required=True)


class CreateWorkerForm(forms.ModelForm):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
            "functions",
            "first_name",
            "last_name",
            "is_coordinator",
            "is_account_manager",
        )


class UpdateWorkerForm(forms.ModelForm):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "functions",
            "first_name",
            "last_name",
            "is_coordinator",
            "is_account_manager",
        )
