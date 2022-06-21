from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin


from workers.models import User, Token


class CustomUserAdmin(UserAdmin):
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
                )
            },
        ),
    )
    add_fieldsets = (
        (None, {"fields": ("username", "password1", "password2")}),
        ("Worker info", {"fields": ("email", "first_name", "last_name", "functions")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_superuser",
                    "is_coordinator",
                    "is_account_manager",
                )
            },
        ),
    )
    search_fields = ("username", "last_name", "first_name")
    ordering = ("last_name", "first_name")
    filter_horizontal = ("functions", "user_permissions")


admin.site.register(User, CustomUserAdmin)
admin.site.unregister(Group)
admin.site.register(Token)
