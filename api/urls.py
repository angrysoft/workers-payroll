from django.urls import path, include

urlpatterns = [
    path("user/", include("workers.urls")),
    path("event/", include("payroll.urls")),
]
