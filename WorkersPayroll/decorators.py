from functools import wraps
from django.contrib.auth import authenticate
from django.http import HttpRequest, JsonResponse, HttpResponse


def auth_required(view_func) -> HttpResponse:
    @wraps(view_func)
    def _wrapped_view(request: HttpRequest, *args, **kwargs):
        user = authenticate(request)
        if user:
            request.user = user
            return view_func(request, *args, **kwargs)
        else:
            return JsonResponse(
                {"results": {}, "errors": "Authentications failed"}, status=401
            )

    return _wrapped_view
