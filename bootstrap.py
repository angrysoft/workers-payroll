from django.contrib.auth.models import Group
from workers.models import User
from payroll.models import Function, AdditionRate
import requests


def add_workers():
    r = requests.get("https://randomuser.me/api?results=20")
    results = r.json()["results"]
    for u in results:
        usr = User.objects.create_user(
            username=u["login"]["username"],
            first_name=u["name"]["first"],
            last_name=u["name"]["last"],
            email=u["email"],
            password="test1234",
        )


def creates_objects(obj, names_list):
    for item in names_list:
        new_item, created = obj.objects.get_or_create(name=item)


creates_objects(Group, ["workers", "coordinators", "sales"])
creates_objects(
    Function, ["Technician", "Chief", "Multimedia Designer", "Lighting Designer"]
)
creates_objects(AdditionRate, ["Work at height", "Driver", "Follow Spot Operator"])

add_workers()
