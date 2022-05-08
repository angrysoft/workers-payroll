from django.http import HttpRequest, JsonResponse
from django.shortcuts import get_list_or_404
from django.views import View

from payroll.forms import EventDayWorkFrom
from .models import EventDayWork


class EventDayWorkView(View):
    def get(self, request: HttpRequest, event_id: int):
        """Get all events / get event by id"""
        results = {"errors": "", "results": []}
        work_days = get_list_or_404(EventDayWork, event=event_id)
        if request.user.has_perm("read", work_days):
            work_days_obj = serialize(
                "python",
                work_days,
                use_natural_foreign_keys=True,
                use_natural_primary_keys=True,
            )
            for day in work_days_obj:
                results["results"].append(day.get("fields"))

        # return HttpResponse(results, content_type="application/json")
        return JsonResponse(results)

    def post(self, request: HttpRequest):
        event_day_work = EventDayWorkFrom(request.POST)
        if event_day_work.is_valid():
            event_day_work.save()
            return JsonResponse(
                {"errors": "", "results": {"status": "created"}}, status=201
            )
        return JsonResponse(
            {"errors": event_day_work.errors.as_text(), "results": {"status": "error"}},
            status=400,
        )

    def put(self, request: HttpRequest, event_day_work_id: int):
        day_work = EventDayWork.objects.get(pk=event_day_work_id)
        event_day_work = EventDayWorkFrom(request.POST, instance=day_work)
        if event_day_work.is_valid():
            event_day_work.save()
            return JsonResponse({"errors": "", "results": {"status": "created"}})
        return JsonResponse(
            {"errors": event_day_work.errors.as_text(), "results": {"status": "error"}},
            status=400,
        )


class EventListView(View):
    pass
