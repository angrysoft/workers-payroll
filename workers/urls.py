from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views


urlpatterns = [
    path("login", csrf_exempt(views.LoginView.as_view()), name="login"),
    path("logout", csrf_exempt(views.logoutView), name="logout"),
    path("user", views.user_view, name="user"),
]
