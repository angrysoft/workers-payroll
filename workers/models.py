from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save

from payroll.models import Function


class User(AbstractUser):
    nickname = models.CharField(max_length=50, verbose_name=_("Nickname"))
    functions = models.ManyToManyField(Function)

    def __str__(self):
        return f"{self.first_name} {self.last_name} <{self.nickname}>"

    def natural_key(self):
        return f"{self.first_name} {self.last_name} <{self.nickname}>"

    class Meta:
        unique_together = [["first_name", "last_name"]]


def post_save_receiver(sender, instance, created, **kwargs):
    print(sender, instance, created)


post_save.connect(post_save_receiver, sender=settings.AUTH_USER_MODEL)
# m2m_changed.connect(toppings_changed, sender=Pizza.toppings.through)