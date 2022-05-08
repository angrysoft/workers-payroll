from audioop import reverse
import re
from typing import Any, Dict
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404
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
        create_worker_form = ManageWorkerForm()
        if create_worker_form.is_valid():
            user = create_worker_form.save()
            return HttpResponse("ok")
            # return HttpResponseRedirect("/login")
        else:
            results = get_default_results(error=create_worker_form.errors.as_text())
            return JsonResponse(results, status=400)

    @method_decorator(auth_required)
    def put(self, request: HttpRequest, userid: int):
        user = get_object_or_404(User, pk=userid)

        update_worker_form = ManageWorkerForm(request.POST, instance=user)
        if update_worker_form.is_valid():
            update_worker_form.save()
            return HttpResponseRedirect(reverse("user", kwargs={"userid": userid}))
        else:
            results: Dict[str, Any] = get_default_results(
                error=update_worker_form.errors.as_text()
            )
            return JsonResponse(results)

    @method_decorator(auth_required)
    def delete(self, request: HttpRequest, userid: int):
        user = get_object_or_404(User, pk=userid)
        user.delete()
        return JsonResponse(get_default_results())


# @auth_required
# def user_view(request: HttpRequest):
#     results = {"errors": "", "results": {}}
#     results["results"]["user"] = {
#         "is_authenticated": request.user.is_authenticated,
#         "username": request.user.username,
#         "email": request.user.email,
#         "first_name": request.user.first_name,
#         "last_name": request.user.last_name,
#         "is_coordinator": request.user.is_coordinator,
#         "is_account_manager": request.user.is_account_manager
#     }
#     return JsonResponse(results)
