from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserCreationForm

# from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

from workers.models import User, Token


class CreationUserForm(forms.ModelForm):
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="Password confirmation", widget=forms.PasswordInput
    )

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "is_coordinator",
            "is_account_manager",
            "is_active",
            "is_superuser",
        )

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "is_coordinator",
            "is_account_manager",
            "password",
            "is_active",
            "is_superuser",
        )


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    # add_form = CreationUserForm

    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
    )
    list_filter = ("is_superuser", "is_coordinator", "is_account_manager")
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Worker info", {"fields": ("email", "first_name", "last_name", "functions")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_superuser",
                    "is_coordinator",
                    "is_account_manager",
                    # "user_permissions",
                )
            },
        ),
    )
    add_fieldsets = fieldsets
    search_fields = ("username", "last_name", "first_name")
    ordering = ("last_name", "first_name")
    filter_horizontal = ("functions", "user_permissions")


admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
admin.site.register(Token)
