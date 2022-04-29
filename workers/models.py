from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    nickname = models.CharField(max_length=50, verbose_name=_("Nickname"))

    def __str__(self):
        return f"{self.first_name} {self.last_name} <{self.nickname}>"

    def natural_key(self):
        return (f"{self.first_name} {self.last_name} <{self.nickname}>")

    class Meta:
        unique_together = [["first_name", "last_name"]]
