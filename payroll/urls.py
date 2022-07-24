from django.urls import path

from payroll.views import (
    EventDayWorkView,
    WorkerEventWorkDayMonthReport,
    event_list,
    function_list,
)

urlpatterns = [
    path("", EventDayWorkView.as_view(), name="events"),
    path("<int:event_id>", EventDayWorkView.as_view(), name="events_get"),
    path("day/<int:event_id>", EventDayWorkView.as_view(), name="events_get"),
    path(
        "report/<int:year>/<int:month>",
        WorkerEventWorkDayMonthReport.as_view(),
        name="worker_month_report",
    ),
    path("functions", function_list, name="function_list"),
    path("list", event_list, name="event_list"),
]
