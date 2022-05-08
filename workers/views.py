import json
from typing import Any, Dict
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate
from .models import Token, User
from .forms import LoginForm, ManageWorkerForm
from WorkersPayroll.decorators import auth_required
from WorkersPayroll.defaults import get_default_results, get_default_user_results


class LoginView(View):
    # @method_decorator(csrf_exempt)
    def post(self, request: HttpRequest):
        login_form = LoginForm(request.POST)
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

        else:
            results["error"] = login_form.errors.as_text()

        return JsonResponse(results)


@auth_required
def logout_view(request: HttpRequest):
    results = get_default_results()
    Token.objects.filter(user=request.user).delete()
    return JsonResponse(results)


class UserView(View):
    @method_decorator(auth_required)
    def get(self, request: HttpRequest, userid: int):
        user = get_object_or_404(User, pk=userid)
        results = get_default_results()
        results["results"].append(get_default_user_results(user))
        return JsonResponse(results)

    @method_decorator(auth_required)
    def post(self, request: HttpRequest):
        data = json.loads(request.body)
        create_worker_form = ManageWorkerForm(data)
        if create_worker_form.is_valid():
            user = create_worker_form.save()
            # return HttpResponseRedirect(reverse("status", kwargs={"userid": user.pk}), content_type="application/json")
            return HttpResponseRedirect("/api/v1/user/status")
        else:
            results = get_default_results(error=create_worker_form.errors.as_text())
            return JsonResponse(results, status=400)

    @method_decorator(auth_required)
    def put(self, request: HttpRequest, userid: int):
        user = get_object_or_404(User, pk=userid)
        data = json.loads(request.body)
        update_worker_form = ManageWorkerForm(instance=user, data=data)
        if update_worker_form.is_valid():
            update_worker_form.save()
            # return HttpResponseRedirect(reverse("user", kwargs={"userid": userid}))
            return HttpResponseRedirect("/api/v1/user/status")
        else:
            results: Dict[str, Any] = get_default_results(
                error=update_worker_form.errors.as_text()
            )
            return JsonResponse(results, status=400)

    @method_decorator(auth_required)
    def delete(self, request: HttpRequest, userid: int):
        user = get_object_or_404(User, pk=userid)
        user.delete()
        return JsonResponse(get_default_results())


def status(request: HttpRequest):
    # return HttpResponse("ok")
    return JsonResponse(get_default_results())
