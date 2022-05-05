import re
from typing import Any, Dict
from django.http import HttpRequest, JsonResponse
from django.shortcuts import redirect
from django.views import View
from django.contrib.auth import authenticate
from django.core.serializers import serialize
from .models import Token
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


@auth_required
def user_view(request: HttpRequest):
    results = {"errors": "", "results": {}}
    results["results"]["user"] = {
        "is_authenticated": request.user.is_authenticated,
        "username": request.user.username,
        "email": request.user.email,
        "first_name" : request.user.first_name,
        "last_name" : request.user.last_name,
        "is_coordinator": request.user.is_coordinator,
        "is_account_manager": request.user.is_account_manager
    }
    print("userInfo", request.user.is_authenticated, results)
    return JsonResponse(results)
