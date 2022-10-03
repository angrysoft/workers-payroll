import json
from typing import Any, Dict, List
from django.http import HttpRequest, JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404
from django.views import View
from django.utils.decorators import method_decorator
from WorkersPayroll.generic_views import GenericListView
from payroll.forms import EventDayWorkFrom, ManageEventForm
from .models import EventDayWork, Event, Function
from WorkersPayroll.decorators import auth_required
from WorkersPayroll.defaults import get_default_results
from django.core.paginator import Page


class EventDayWorkBatchView(View):
    @method_decorator(auth_required)
    def put(self, request: HttpRequest):
        data = json.loads(request.body)
        print(data)
        results = get_default_results()
        results["results"] = {
            "update_failed": self.update_days(data.get("days", [])),
            "remove_failed": self.remove_days(data.get("daysIdToRemove", [])),
        }

        status_code = 201
        return JsonResponse(results, status=status_code)

    def update_days(self, days):
        failed = []
        for day in days:
            print(day)
            if day["id"] < 0:
                status, errors = self.__add_day(dict(**day))
            else:
                status, errors = self.__update_day(dict(**day))
            if not status:
                failed.append({"id": status, "errors": errors})

    def __add_day(self, day):
        added = True
        errors = ""
        del day["id"]
        event_day_work = EventDayWorkFrom(day)

        if event_day_work.is_valid():
            event_day_work.save()
        else:
            added = False
            errors = event_day_work.errors.as_text()
        return added, errors

    def __update_day(self, day):
        added = True
        errors = ""

        day_work = EventDayWork.objects.get(pk=day["id"])
        event_day_work_data = day_work.serialize()
        event_day_work_data.update(day)
        event_day_work = EventDayWorkFrom(event_day_work_data, instance=day_work)

        if event_day_work.is_valid():
            event_day_work.save()
        else:
            added = False
            errors = event_day_work.errors.as_text()
        return added, errors

    def remove_days(self, days):
        failed = []
        for day_id in days:
            try:
                day = EventDayWork.objects.get(pk=day_id)
                day.delete()
            except EventDayWork.DoesNotExist:
                failed.append(day_id)
        return failed


class EventDayWorkView(View):
    @method_decorator(auth_required)
    def get(self, request: HttpRequest, event_id: int):
        """Get all events / get event by id"""
        status_code = 200
        results = get_default_results()
        work_days = get_list_or_404(EventDayWork, event=event_id)
        if request.user.is_coordinator:
            for work_day in work_days:
                results["results"].append(work_day.serialize())
        else:
            results["error"] = "Permission"
            results["ok"] = False
            status_code = 403

        return JsonResponse(results, status=status_code)

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
        results["results"] = event.serialize()
        return JsonResponse(results)

    @method_decorator(auth_required)
    def post(self, request: HttpRequest):
        data = json.loads(request.body)
        create_event_form = ManageEventForm(data)
        results = get_default_results()
        status_code = 201

        if create_event_form.is_valid():
            event = create_event_form.save()
            results["results"] = {"event_id": event.pk}
        else:
            status_code: int = self.return_error(results, create_event_form)

        return JsonResponse(results, status=status_code)

    @method_decorator(auth_required)
    def put(self, request: HttpRequest, event_id: int):
        event = get_object_or_404(Event, pk=event_id)
        event_data = event.serialize()
        data = json.loads(request.body)
        event_data.update(data)
        print("event data", event_data)
        update_event_form = ManageEventForm(event_data, instance=event)
        status_code = 200
        results = get_default_results()
        if update_event_form.is_valid():
            update_event_form.save()
            results["results"] = {"event_id": event.pk}
        else:
            status_code: int = self.return_error(results, update_event_form)

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


class WorkerEventWorkDayMonthReport(View):
    @method_decorator(auth_required)
    def get(self, request: HttpRequest, month: str, year: str):
        work_days = (
            EventDayWork.objects.filter(
                worker=request.user,
                start__year=year,
                end__year=year,
                start__month=month,
                end__month=month,
            )
            .order_by("start", "event")
            .all()
        )
        work_days_report = self.get_report(work_days)
        results = get_default_results()
        results["results"] = work_days_report
        return JsonResponse(results)

    def get_report(self, work_days):
        results = []
        for day in work_days:
            results.append(day.calculate_rate())
        return results


@auth_required
def event_work_day_by_event(request: HttpRequest, event_id: int):
    pass


@auth_required
def function_list(request: HttpRequest):
    results = get_default_results()
    functions = get_list_or_404(Function)
    for func in functions:
        results["results"].append(func.serialize())
    return JsonResponse(results)


class EventList(GenericListView):
    def _get_items(self, params: Dict[str, Any]) -> List[Dict[Any, Any]]:
        event_list: List[Any] = list(Event.objects.all().order_by("number", "name"))
        return event_list

    def _get_current_page(self, current_page: Page) -> List[Dict[str, Any]]:
        return [event.serialize_short() for event in current_page.object_list]
