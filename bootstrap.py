from django.contrib.auth.models import Group
from payroll.models import Function, AdditionRate



def creates_objects(obj, names_list):
    for item in names_list:
        new_item, created = obj.objects.get_or_create(name=item)


creates_objects(Group, ["workers", "coordinators", "sales"])
creates_objects(
    Function, ["Technician", "Chief", "Multimedia Designer", "Lighting Designer"]
)
creates_objects(AdditionRate, ["Work at height", "Driver", "Follow Spot Operator"])
