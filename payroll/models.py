from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


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
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="event_coordinator",
        verbose_name=_("Coordinator"),
    )
    account_manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="event_sales",
        verbose_name=_("Sales"),
    )
    is_readonly = models.BooleanField(default=False)

    def natural_key(self):
        return {"number": self.number, "name": self.name, "id": self.pk}

    def __str__(self):
        return f"{self.number}-{self.name}"


class AdditionRate(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name=_("Name"))
    value = models.IntegerField(default=0)
    is_multiplied = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Addition(models.Model):
    addition = models.OneToOneField(AdditionRate, on_delete=models.CASCADE)
    value = models.IntegerField(default=0)

    def natural_key(self):
        return {
            "name": self.addition.name,
            "rate": self.addition.value,
            "value": self.value,
            "is_multiplied": self.addition.is_multiplied,
        }

    def __str__(self):
        return f"{self.addition.name}"


class FunctionRate(models.Model):
    worker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    function = models.OneToOneField(Function, on_delete=models.CASCADE)
    value = models.IntegerField(default=0)
    overtime = models.IntegerField(default=0)
    overtime_after = models.IntegerField(default=12)

    def __str__(self) -> str:
        return f"{self.worker.username} - {self.function.name}"


class EventDayWork(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    function = models.ForeignKey(
        Function, on_delete=models.PROTECT, verbose_name=_("Function")
    )
    worker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    start = models.DateTimeField()
    end = models.DateTimeField()
    additions = models.ManyToManyField(Addition, blank=True)

    def natural_key(self):
        return self.event

    class Meta:
        ordering = ["start", "worker"]
