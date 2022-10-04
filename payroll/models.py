from typing import Any, Dict
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class Function(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name=_("Name"))

    def __str__(self):
        return self.name

    def natural_key(self):
        return {"name": self.name, "rates": ""}

    def serialize(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "id": self.pk,
        }

    class Meta:
        verbose_name = _("Function")


class  Event(models.Model):
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

    def serialize(self) -> Dict[str, Any]:
        return {
            "id": self.pk,
            "name": self.name,
            "number": self.number,
            "coordinator": self.coordinator.serialize_short(),
            "account_manager": self.account_manager.serialize_short(),
            "is_readonly": self.is_readonly,
        }

    def serialize_short(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "number": self.number,
            "is_readonly": self.is_readonly,
        }

    class Meta:
        unique_together = [["name", "number"]]


class AdditionRate(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name=_("Name"))
    value = models.IntegerField(default=0)
    is_multiplied = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Addition(models.Model):
    addition = models.ForeignKey(AdditionRate, on_delete=models.CASCADE)
    value = models.IntegerField(default=0)
    worker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def natural_key(self):
        return {
            "name": self.addition.name,
            "rate": self.addition.value,
            "value": self.value,
            "is_multiplied": self.addition.is_multiplied,
        }

    def serialize(self) -> Dict[str, Any]:
        return {
            "id": self.pk,
            "name": self.addition.name,
            "value": self.value,
            "is_multiplied": self.addition.is_multiplied,
        }

    def __str__(self):
        return f"{self.addition.name}"


class FunctionRate(models.Model):
    worker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    function = models.ForeignKey(Function, on_delete=models.CASCADE)
    value = models.IntegerField(default=0)
    overtime = models.IntegerField(default=0)
    overtime_after = models.IntegerField(default=12)

    def __str__(self) -> str:
        return f"{self.worker.username} - {self.function.name}"

    # def natural_key(self) -> Dict[str, Any]:
    #     return {
    #         "name": self.function.name,
    #         "value": self.value,
    #         "overtime": self.overtime,
    #         "overtime_after": self.overtime_after
    #     }
    def serialize(self) -> Dict[str, Any]:
        return {
            "id": self.pk,
            "worker_id": self.worker.pk,
            "name": self.function.name,
            "value": self.value,
            "overtime": self.overtime,
            "overtime_after": self.overtime_after,
        }


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

    def __str__(self) -> str:
        return f"{self.event}-{self.worker}-{self.start}-{self.end}"

    def serialize(self) -> Dict[str, Any]:
        return {
            "id": self.pk,
            "event": self.event.serialize_short(),
            "function": self.function.serialize(),
            "start": self.start,
            "end": self.end,
            "worker": self.worker.serialize(),
            "additions": [addition.serialize() for addition in self.additions.all()],
        }

    def calculate_rate(self):
        work_time = self.end - self.start
        work_time_hours = round(work_time.total_seconds() / 3600)
        user_rate = FunctionRate.objects.get(worker=self.worker, function=self.function)
        overtime = work_time_hours - user_rate.overtime_after
        if overtime < 0:
            overtime = 0
        additions = self.calculate_additions()
        result = {
            "work_time": work_time_hours,
            "rate": user_rate.value,
            "overtime": overtime,
            "overtime_rate": overtime * user_rate.overtime,
            "additions": additions,
            "total": self.calculate_total(user_rate, overtime, additions),
        }
        return result

    def calculate_total(self, user_rate, overtime, additions):

        return user_rate.value + overtime * user_rate.overtime

    def calculate_additions(self):
        result = {}
        for add in self.additions.all():
            value = add.addition.value
            if add.addition.is_multiplied:
                value = round(add.addition.value * add.value)
            result[add.addition.name] = value
        return result

    class Meta:
        ordering = ["start", "worker"]
