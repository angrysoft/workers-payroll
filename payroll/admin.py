from django.contrib import admin
from .models import Function, Event, Accounting, EventWorker, Addition


admin.site.register(Function)
admin.site.register(Event)
admin.site.register(Accounting)
admin.site.register(EventWorker)
admin.site.register(Addition)
