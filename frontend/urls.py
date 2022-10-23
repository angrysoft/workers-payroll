from django.urls import path, re_path
from .views import index


urlpatterns = [
    path("", index),
    re_path(r"^event", index),
    re_path(r"^login/", index),
    re_path(r"^workers/", index),
]
