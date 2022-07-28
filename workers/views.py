import json
from typing import Any, Dict, List
from django.http import HttpRequest, JsonResponse
from django.shortcuts import get_object_or_404
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate

from WorkersPayroll.generic_views import GenericListView
from .models import Token, User
from payroll.models import FunctionRate
from .forms import LoginForm, CreateWorkerForm, UpdateWorkerForm
from django.core.paginator import Paginator, Page
from WorkersPayroll.decorators import auth_required
from WorkersPayroll.defaults import get_default_results


class LoginView(View):
    # @method_decorator(csrf_exempt)
    def post(self, request: HttpRequest):
        data = json.loads(request.body)
        login_form = LoginForm(data)
        results = get_default_results()
        if login_form.is_valid():
            user = authenticate(
                request,
                username=login_form.cleaned_data.get("username"),
                password=login_form.cleaned_data.get("password"),
            )
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                token.generate_new_token()
                token.save()
                results["token"] = token.get_jwt_token()
                results["user_id"] = user.pk
                results["results"] = user.serialize()
            else:
                results["ok"] = False
                results["error"] = "Wrong login or password"

        else:
            results["ok"] = False
            results["error"] = login_form.errors.as_text()

        return JsonResponse(results)


@require_POST
@auth_required
def logout_view(request: HttpRequest):
    results = get_default_results()
    Token.objects.filter(user=request.user).delete()
    return JsonResponse(results)


@auth_required
def is_authenticated(request: HttpRequest):
    return JsonResponse(request.user.serialize())


class UserView(View):
    @method_decorator(auth_required)
    def get(self, request: HttpRequest, userid: int):
        status_code: int = 200
        results = get_default_results()
        if not request.user.is_superuser and not request.user.is_coordinator:
            results = get_default_results(error="Coordinator or  Admin rights required")
            status_code = 401
        else:
            user = get_object_or_404(User, pk=userid)
            results["results"] = user.serialize()
        return JsonResponse(results, status=status_code)

    @method_decorator(auth_required)
    def post(self, request: HttpRequest):
        status_code = 201
        results = get_default_results()
        data = json.loads(request.body)

        create_worker_form = CreateWorkerForm(data)
        if create_worker_form.is_valid():
            user = User.objects.create_user(
                username=create_worker_form.cleaned_data.get("username"),
                email=create_worker_form.cleaned_data.get("email"),
                first_name=create_worker_form.cleaned_data.get("first_name"),
                last_name=create_worker_form.cleaned_data.get("last_name"),
                password=create_worker_form.cleaned_data.get("password"),
                is_coordinator=create_worker_form.cleaned_data.get("is_coordinator"),
            )
            for func in create_worker_form.cleaned_data.get("functions", []):
                user.functions.add(func)
            user.save()
            results["results"] = user.serialize()
        else:
            status_code: int = self.return_error(results, create_worker_form)
        return JsonResponse(results, status=status_code)

    @method_decorator(auth_required)
    def put(self, request: HttpRequest, userid: int):
        user = get_object_or_404(User, pk=userid)
        status_code = 201
        results = get_default_results()
        user_data = user.serialize()
        data = json.loads(request.body)
        user_data.update(data)
        update_worker_form = UpdateWorkerForm(user_data, instance=user)
        if update_worker_form.is_valid():
            update_worker_form.save()
        else:
            status_code: int = self.return_error(results, update_worker_form)

        return JsonResponse(results, status=status_code)

    @method_decorator(auth_required)
    def delete(self, request: HttpRequest, userid: int):
        user = get_object_or_404(User, pk=userid)
        user.delete()
        return JsonResponse(get_default_results())

    def return_error(self, results: Dict[str, Any], create_worker_form) -> int:
        results["error"] = create_worker_form.errors.as_text()
        results["ok"] = False
        status_code: int = 400
        return status_code


class WorkersList(GenericListView):
    def _get_parameters(self, request: HttpRequest) -> Dict[str, Any]:
        params = super()._get_parameters(request)
        try:
            params["account_type"] = request.GET.get("account_type", "worker")
        except ValueError:
            params["account_type"] = "worker"
        return params

    def _get_items(self, params: Dict[str, Any]) -> list[Dict[Any, Any]]:
        worker_list: List[Any] = []
        actions = {
            "worker": self._get_workers,
            "coordinator": self._get_coordinators,
            "account_manager": self._get_account_managers,
            "all": self._get_all,
        }
        worker_list = list(
            actions.get(params.get("account_type", "none"), self._get_none)()
        )
        return worker_list

    def _get_none(self) -> List[Any]:
        return []

    def _get_all(self):
        all = User.objects.all()
        return all

    def _get_workers(self):
        workers = (
            User.objects.all()
            .filter(is_coordinator__exact=False, is_account_manager__exact=False)
            .order_by("username")
        )

        return workers

    def _get_coordinators(self):
        coordinators = (
            User.objects.all().filter(is_coordinator__exact=True).order_by("username")
        )
        return coordinators

    def _get_account_managers(self):
        account_manager = (
            User.objects.all()
            .filter(is_account_manager__exact=True)
            .order_by("username")
        )
        return account_manager

    def _get_current_page(self, current_page: Page) -> List[Dict[str, Any]]:
        return [post.serialize_short() for post in current_page.object_list]


@auth_required
def user_rate_list(request: HttpRequest, userid: int):
    results = get_default_results()
    user = get_object_or_404(User, pk=userid)
    results["results"] = [rate.serialize() for rate in user.functionrate_set.all()]
    return JsonResponse(results, safe=False)


@auth_required
def user_rate_update(request: HttpRequest, userid: int):
    if request.method == "PUT":
        results = get_default_results()
        data = json.loads(request.body)
        if data:
            for rate_id, rate_fields in data.items():
                user = get_object_or_404(User, pk=userid)
                rate = FunctionRate.objects.filter(worker=user.pk, pk=rate_id).get()
                for _name, _value in rate_fields.items():
                    setattr(rate, _name, _value)
                rate.save()
                results["results"].append(rate_id)  # type: ignore
        results["ok"] = results["results"] == list(data.keys())
        return JsonResponse(results, safe=False)
