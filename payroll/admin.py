from django.contrib import admin
from .models import (
    Function,
    FunctionRate,
    Event,
    EventDayWork,
    Addition,
    AdditionRate,
)


# class EventAdmin(admin.ModelAdmin):
#     fields = [
#         "name",
#         "number",
#         "coordinator",
#         "account_manager",
#         "is_readonly",
#     ]


admin.site.register(Function)
admin.site.register(FunctionRate)
admin.site.register(Event)
admin.site.register(EventDayWork)
admin.site.register(Addition)
admin.site.register(AdditionRate)
