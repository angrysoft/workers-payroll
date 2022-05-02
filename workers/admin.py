from tabnanny import verbose
from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    filter_horizontal = (
        "groups",
        "functions",
    )


admin.site.register(User, UserAdmin)
