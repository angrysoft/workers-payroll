from django.urls import path
from .views import EventDayWorkView

urlpatterns = [
    path("events", EventDayWorkView.as_view(), name="events"),
    path("events/<int:event_id>", EventDayWorkView.as_view(), name="events_get"),
]
