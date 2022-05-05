import re
from typing import Any, Dict
from django.http import HttpRequest, JsonResponse
from django.shortcuts import redirect
from django.views import View
from django.contrib.auth import authenticate

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


def logoutView(request: HttpRequest):
    status_code = 200
    results = {"results": {}}
    if request.user.is_authenticated:
        Token.objects.filter(user=request.user).delete()
        results["results"]["status"] = "logout success"
    else:
        status_code = 401
        results["results"]["errors"] = "User is not authenticated"

    return JsonResponse(results, status=status_code)


@auth_required
def user_view(request: HttpRequest):
    print("userInfo", request.user.is_authenticated)
    return JsonResponse({"results": {"status": "ok"}})
