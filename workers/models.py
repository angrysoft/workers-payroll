from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save, m2m_changed
from django.conf import settings

from payroll.models import Function, FunctionRate


class User(AbstractUser):
    functions = models.ManyToManyField(Function, blank=True)
    is_active = models.BooleanField(default=True)
    is_coordinator = models.BooleanField(
        default=False, verbose_name=_("Is Coordinator")
    )
    is_account_manager = models.BooleanField(
        default=False, verbose_name=_("Is Account Manager")
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} <{self.username}>"

    def natural_key(self):
        return f"{self.first_name} {self.last_name} <{self.username}>"

    class Meta:
        unique_together = [["first_name", "last_name"]]


def post_save_receiver(sender, instance, created, **kwargs):
    print("Saved...")


def functions_changed(
    sender, instance, action, reverse, model, pk_set, using, **kwargs
):
    print("fired m2m change :", action, reverse, model, pk_set)
    actions = {
        "post_remove": remove_rates,
        "post_add": add_rates
    }
    actions.get(action, log_action)(instance, pk_set)


def remove_rates(instance, pk_set):
    print(f"remove {pk_set} from {instance}")
    for func_pk in pk_set:
        FunctionRate.objects.filter(pk=func_pk).delete()


def add_rates(instance, pk_set):
    print(f"add {pk_set} from {instance}")
    for func_pk in pk_set:
        new_function_rate = FunctionRate()
        new_function_rate.worker = instance
        new_function_rate.function = Function.objects.get(pk=func_pk)
        new_function_rate.save()


def log_action(instance, pk_set):
    print(f"do action on {instance} with {pk_set}")


post_save.connect(post_save_receiver, sender=settings.AUTH_USER_MODEL)
m2m_changed.connect(functions_changed, sender=User.functions.through)
