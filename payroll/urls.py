from django.urls import path

from payroll.views import EventDayWorkView

urlpatterns = [
    path("", EventDayWorkView.as_view(), name="events"),
    path("<int:event_id>", EventDayWorkView.as_view(), name="events_get"),
    path("day/<int:event_id>", EventDayWorkView.as_view(), name="events_get"),
]
