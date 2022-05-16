import json
from typing import Any, Dict
from django.http import HttpRequest, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404
from django.urls import reverse
from django.views import View
from django.utils.decorators import method_decorator
from payroll.forms import EventDayWorkFrom, ManageEventForm
from .models import EventDayWork, Event
from WorkersPayroll.decorators import auth_required
from WorkersPayroll.defaults import get_default_results


class EventDayWorkView(View):
    @method_decorator(auth_required)
    def get(self, request: HttpRequest, event_id: int):
        """Get all events / get event by id"""
        results = get_default_results()
        work_days = get_list_or_404(EventDayWork, event=event_id)
        if request.user.has_perm("view_eventworkday", work_days):
            work_days_obj = serialize(
                "python",
                work_days,
                use_natural_foreign_keys=True,
                use_natural_primary_keys=True,
            )
            for day in work_days_obj:
                results["results"].append(day.get("fields"))

        return JsonResponse(results)

    @method_decorator(auth_required)
    def post(self, request: HttpRequest):
        data = json.loads(request.body)
        event_day_work = EventDayWorkFrom(data)
        results = get_default_results()
        status_code = 201
        if event_day_work.is_valid():
            event_day_work.save()
        else:
            results["errors"] = event_day_work.errors.as_text()
            status_code = 400

        return JsonResponse(results, status=status_code)

    @method_decorator(auth_required)
    def put(self, request: HttpRequest, event_day_work_id: int):
        day_work = EventDayWork.objects.get(pk=event_day_work_id)
        data = json.loads(request.body)
        event_day_work_data = day_work.serialize()
        event_day_work.update(data)
        results = get_default_results()
        event_day_work = EventDayWorkFrom(event_day_work_data, instance=day_work)
        status_code = 201
        if event_day_work.is_valid():
            event_day_work.save()
        else:
            results["errors"] = event_day_work.errors.as_text()
            status_code = 400

        return JsonResponse(results, status=status_code)


class EventView(View):
    @method_decorator(auth_required)
    def get(self, request: HttpRequest, event_id: int):
        event = get_object_or_404(Event, pk=event_id)
        results = get_default_results()
        results["results"].append({"name": event.name, "number": event.number})
        return JsonResponse(results)

    @method_decorator(auth_required)
    def post(self, request: HttpRequest):
        data = json.loads(request.body)
        create_event_form = ManageEventForm(data)
        results = get_default_results()
        status_code = 201

        if create_event_form.is_valid():
            event = create_event_form.save()
        else:
            results = get_default_results(error=create_event_form.errors.as_text())
            status_code = 400

        return JsonResponse(results, status=status_code)

    @method_decorator(auth_required)
    def put(self, request: HttpRequest, event_id: int):
        event = get_object_or_404(Event, pk=event_id)
        data = json.loads(request.body)
        update_event_form = ManageEventForm(data, instance=event)
        status_code = 201
        results = get_default_results()
        if update_event_form.is_valid():
            update_event_form.save()
        else:
            results = get_default_results(error=create_event_form.errors.as_text())
            status_code = 400

        return JsonResponse(results, status=status_code)

    @method_decorator(auth_required)
    def delete(self, request: HttpRequest, event_id: int):
        event = get_object_or_404(Event, pk=event_id)
        event.delete()
        return JsonResponse(get_default_results())

    def return_error(self, results: Dict[str, Any], model_form) -> int:
        results["error"] = model_form.errors.as_text()
        results["ok"] = False
        status_code: int = 400
        return status_code


class EventWorkDayListView(View):
    def get(self, request: HttpRequest, month: str, year: str):
        pass

def event_work_day_month_report(request: HttpRequest):
    pass

def event_work_day_by_event(request: HttpRequest, event_id: int):
    pass

# decorators = [never_cache, login_required]

# @method_decorator(decorators, name='dispatch')
# class ProtectedView(TemplateView):
#     template_name = 'secret.html'

# @method_decorator(never_cache, name='dispatch')
# @method_decorator(login_required, name='dispatch')
# class ProtectedView(TemplateView):
#     template_name = 'secret.html'
