from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from payroll.views import (
    EventView,
    EventDayWorkView,
    WorkerEventWorkDayMonthReport,
    event_list,
    function_list,
)

urlpatterns = [
    path("", csrf_exempt(EventView.as_view()), name="event"),
    path("<int:event_id>", csrf_exempt(EventView.as_view()), name="event_p"),
    path("list", event_list, name="event_list"),
    path("day/", csrf_exempt(EventDayWorkView.as_view()), name="event_day"),
    path("day/<int:_event_id>", EventDayWorkView.as_view(), name="events_get"),
    path(
        "report/<int:year>/<int:month>",
        WorkerEventWorkDayMonthReport.as_view(),
        name="worker_month_report",
    ),
    path("functions", function_list, name="function_list"),
]
