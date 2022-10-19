from django.urls import path
from .views import index


urlpatterns = [
    path("", index),
    path("/events/", index),
    path("/workers/", index)
]
