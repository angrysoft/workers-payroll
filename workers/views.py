from typing import Any, Dict
from django.http import HttpRequest, JsonResponse
from django.shortcuts import get_object_or_404
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate
from .models import Token, User
from .forms import LoginForm
from WorkersPayroll.decorators import auth_required


class LoginView(View):
    # @method_decorator(csrf_exempt)
    def post(self, request: HttpRequest):
        login_form = LoginForm(request.POST)
        results: Dict[str, Any] = {"results": {}}
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
                results["results"]["token"] = token.get_jwt_token()

        else:
            results["error"] = login_form.errors.as_text()

        return JsonResponse(results)


@auth_required
def logoutView(request: HttpRequest):
    results = {"results": {}}
    Token.objects.filter(user=request.user).delete()
    results["results"]["status"] = "logout success"
    return JsonResponse(results)


class UserView(View):
    @method_decorator(auth_required)
    def get(self, request: HttpRequest, userid: int):
        user = get_object_or_404(User, pk=userid)

        results = {"errors": "", "results": {}}
        results["results"]["user"] = {
            "is_authenticated": user.is_authenticated,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_coordinator": user.is_coordinator,
            "is_account_manager": user.is_account_manager
        }
        return JsonResponse(results)

    @method_decorator(auth_required)
    def post(self, request: HttpRequest):
        createWorkerFrom = CreateWorkerForm(request.POST)
        if createWorkerFrom.is_valid():
            createWorkerFrom.save()

    @method_decorator(auth_required)
    def put(self, request: HttpRequest, userid:int):
        user = get_object_or_404(User, pk=userid)

        createWorkerFrom = CreateWorkerForm(request.POST, instace=user)
        if createWorkerFrom.is_valid():
            createWorkerFrom.save()

    @method_decorator(auth_required)
    def delete(self, request: HttpRequest, userid: int):
        user = get_object_or_404(User, pk=userid)
        user.delete()


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
