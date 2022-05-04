from django import forms
from .models import EventDayWork


class EventDayWorkFrom(forms.ModelForm):
    class Meta:
        model = EventDayWork
        fields = ["event", "function", "worker", "start", "end", "additions"]
