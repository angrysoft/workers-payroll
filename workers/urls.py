from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views


urlpatterns = [
    path("", csrf_exempt(views.UserView.as_view()), name="user_p"),
    path("<int:userid>", csrf_exempt(views.UserView.as_view()), name="user"),
    path("auth/login", csrf_exempt(views.LoginView.as_view()), name="login"),
    path("auth/logout", csrf_exempt(views.logout_view), name="logout"),
]