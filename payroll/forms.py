from django import forms
from .models import EventDayWork, Event


class EventDayWorkFrom(forms.ModelForm):
    class Meta:
        model = EventDayWork
        fields = ["event", "function", "worker", "start", "end", "additions"]


class ManageEventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = "__all__"
