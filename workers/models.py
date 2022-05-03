from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models.signals import m2m_changed

from payroll.models import Function, FunctionRate


class WorkerUserManager(BaseUserManager):
    def create_user(self, username, email, first_name="", last_name="", password=None):

        if not username or not email:
            raise ValueError("Users must have an email address and username")

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, username, email, first_name="", last_name="", password=None
    ):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            username,
            email,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True, verbose_name=_("Username"))
    email = models.EmailField(
        max_length=255, unique=True, verbose_name=_("Email address")
    )
    first_name = models.CharField(max_length=100, verbose_name=_("First name"))
    last_name = models.CharField(max_length=100, verbose_name=_("Last name"))
    functions = models.ManyToManyField(Function, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_coordinator = models.BooleanField(
        default=False, verbose_name=_("Is Coordinator")
    )
    is_account_manager = models.BooleanField(
        default=False, verbose_name=_("Is Account Manager")
    )

    objects = WorkerUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return f"{self.first_name} {self.last_name} <{self.username}>"

    def has_perm(self, perm, obj=None) -> bool:
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label) -> bool:
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

    def natural_key(self):
        return f"{self.first_name} {self.last_name} <{self.username}>"

    class Meta:
        unique_together = [["first_name", "last_name"]]


def functions_changed(
    sender, instance, action, reverse, model, pk_set, using, **kwargs
):
    print("fired m2m change :", action, reverse, model, pk_set)
    actions = {"post_remove": remove_rates, "post_add": add_rates}
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


m2m_changed.connect(functions_changed, sender=User.functions.through)
