from django.db import models
from django.utils.translation import gettext_lazy as _
from workers.models import User


class Function(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name=_("Name"))

    def __str__(self):
        return self.name

    def natural_key(self):
        return self.name

    class Meta:
        verbose_name = _("Function")


class Event(models.Model):
    name = models.CharField(max_length=100, verbose_name=_("Event name"))

    number = models.CharField(
        max_length=50, verbose_name=_("Event number"), unique=True
    )
    coordinator = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="event_coordinator",
        verbose_name=_("Coordinator"),
    )
    sales = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="event_sales",
        verbose_name=_("Sales"),
    )

    def natural_key(self):
        return {"number": self.number, "name": self.name}

    def __str__(self):
        return f"{self.number}-{self.name}"


class Addition(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name=_("Name"))
    value = models.IntegerField(default=0)
    is_multiplied = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def natural_key(self):
        return {
            "name": self.name,
            "value": self.value,
            "is_multiplied": self.is_multiplied,
        }


class FunctionRate(models.Model):
    worker = models.ForeignKey(User, on_delete=models.CASCADE)
    function = models.OneToOneField(Function, on_delete=models.CASCADE)
    value = models.IntegerField(default=0)
    overtime = models.IntegerField()


class Accounting(models.Model):
    name = models.CharField(max_length=50, unique=True)
    overtime = models.IntegerField()


class EventWorker(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    function = models.ForeignKey(
        Function, on_delete=models.PROTECT, verbose_name=_("Function")
    )
    worker = models.ForeignKey(User, on_delete=models.PROTECT)
    start = models.DateTimeField()
    end = models.DateTimeField()
    additions = models.ManyToManyField(Addition)

    def natural_key(self):
        return self.event


class AdditionsRates(models.Model):
    addition = models.OneToOneField(Addition, on_delete=models.CASCADE)
    value = models.IntegerField(default=0)
