from django.contrib.auth.models import Group
from workers.models import User
from payroll.models import Function
import requests

# r = requests.get("https://randomuser.me/api?results=10")

# print(r.json(), type(r))
# print(f"added Post no : {no}")


def generate_gropus():
    group_list = ["technicians", "coordinators", "sales"]
    for grp in group_list:
        new_group, created = Group.objects.get_or_create(name=grp)


def generate_functions():
    function_list = [
        "Technician",
        "Chief",
        "Multimedia Designer",
        "Lighting Designer",
        "",
    ]
    for func in function_list:
        f = Function()
        f.name = func
        f.save()


def generate_additions():
    additions_list = ["Work at height", "Driver", "Follow Spot Operator"]
