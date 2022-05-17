from django.urls import path

from payroll.views import EventDayWorkView, worker_event_work_day_month_report

urlpatterns = [
    path("", EventDayWorkView.as_view(), name="events"),
    path("<int:event_id>", EventDayWorkView.as_view(), name="events_get"),
    path("day/<int:event_id>", EventDayWorkView.as_view(), name="events_get"),
    path(
        "report/<int:year>/<int:month>",
        worker_event_work_day_month_report,
        name="worker_month_report",
    ),
]
