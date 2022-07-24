from typing import Any, Dict
import jwt
from secrets import token_urlsafe
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import m2m_changed

from payroll.models import Function, FunctionRate


class User(AbstractUser):
    functions = models.ManyToManyField(Function, blank=True)
    is_coordinator = models.BooleanField(
        default=False, verbose_name=_("Is Coordinator")
    )
    is_account_manager = models.BooleanField(
        default=False, verbose_name=_("Is Account Manager")
    )

    def natural_key(self):
        return f"{self.first_name} {self.last_name} <{self.username}>"

    def serialize(self) -> Dict[str, Any]:
        return {
            "id": self.pk,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_superuser": self.is_superuser,
            "is_coordinator": self.is_coordinator,
            "is_account_manager": self.is_account_manager,
            "is_authenticated": self.is_authenticated,
            "functions": [func.pk for func in self.functions.all()],
        }

    def serialize_short(self) -> Dict[str, Any]:
        return {
            "id": self.pk,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
        }

    class Meta:
        unique_together = [["first_name", "last_name"]]


class Token(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)

    def generate_new_token(self):
        self.token = token_urlsafe(32)

    def get_jwt_token(self):
        if self.token is None:
            raise ValueError("token is not set")

        return jwt.encode(
            {"username": self.user.username, "token": self.token},
            settings.JWTKEY,
            algorithm="HS256",
        )


def functions_changed(
    sender, instance, action, reverse, model, pk_set, using, **kwargs
):
    actions = {"post_remove": remove_rates, "post_add": add_rates}
    actions.get(action, log_action)(instance, pk_set)


def remove_rates(instance, pk_set):
    # print(f"remove {pk_set} from {instance}")
    for func_pk in pk_set:
        FunctionRate.objects.filter(pk=func_pk).delete()


def add_rates(instance, pk_set):
    # print(f"add {pk_set} from {instance}")
    for func_pk in pk_set:
        new_function_rate = FunctionRate()
        new_function_rate.worker = instance
        new_function_rate.function = Function.objects.get(pk=func_pk)
        new_function_rate.save()


def log_action(instance, pk_set):
    pass
    # print(f"do action on {instance} with {pk_set}")


m2m_changed.connect(functions_changed, sender=User.functions.through)
