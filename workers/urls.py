from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views


urlpatterns = [
    path("", csrf_exempt(views.UserView.as_view()), name="user_p"),
    path("list", views.WorkersList.as_view(), name="user_list"),
    path("<int:userid>", csrf_exempt(views.UserView.as_view()), name="user"),
    path("auth", views.is_authenticated, name="isauth"),
    path("auth/login", csrf_exempt(views.LoginView.as_view()), name="login"),
    path("auth/logout", csrf_exempt(views.logout_view), name="logout"),
    path(
        "rates/<int:userid>",
        csrf_exempt(views.user_rate_update),
        name="user_rate_update",
    ),
    path("rates/list/<int:userid>", views.user_rate_list, name="user_rate_list"),
]
