from django.contrib import admin
from .models import Function, FunctionRate, Event, EventDayWork, Addition, AdditionRate


admin.site.register(Function)
admin.site.register(FunctionRate)
admin.site.register(Event)
admin.site.register(EventDayWork)
admin.site.register(Addition)
admin.site.register(AdditionRate)
