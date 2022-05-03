from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404
from django.views import View
from django.core.serializers import serialize
from payroll.models import EventDayWork


class EventDayWorkView(View):
    def get(self, request: HttpRequest, event_id: int):
        """Get all events / get event by id"""
        results = {
            "results": []
        }
        work_days = get_list_or_404(EventDayWork, event=event_id)
        if request.user.has_perm("read", work_days):
            results = serialize(
                "json",
                work_days,
                use_natural_foreign_keys=True,
                use_natural_primary_keys=True,
            )
            print(results)
        
        return HttpResponse(results, content_type="application/json")
            
    def post(self, request: HttpRequest):
        pass


class EventListView(View):
    pass
