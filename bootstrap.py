from django.contrib.auth.models import Group
from payroll.models import Function, AdditionRate
from workers.models import User

def creates_objects(obj, names_list):
    for item in names_list:
        new_item, created = obj.objects.get_or_create(name=item)


creates_objects(Group, ["workers", "coordinators", "sales"])
creates_objects(
    Function, ["Technician", "Chief", "Multimedia Designer", "Lighting Designer"]
)
creates_objects(AdditionRate, ["Work at height", "Driver", "Follow Spot Operator"])

User.objects.create_superuser(
    username="admin",
    first_name="Admin",
    last_name="Nimda",
    email="admin@example.net",
    password="admin",
    is_coordinator=True,
)
