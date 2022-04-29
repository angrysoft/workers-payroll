from payroll.models import Event, EventWorker
from django.core.serializers import serialize


s = serialize(
    "json",
    Event.objects.all(),
    use_natural_foreign_keys=True,
    use_natural_primary_keys=True,
    indent=2,
)
print(s)

e = Event.objects.get(pk=1)
# ss = serialize('json', e, use_natural_foreign_keys=True, use_natural_primary_keys=True)
# print(ss)

sss = serialize(
    "json",
    e.eventworker_set.all(),
    use_natural_foreign_keys=True,
    use_natural_primary_keys=True,
    indent=2,
)
print(sss)


e = Event.objects.get(pk=2)
# ss = serialize('json', e, use_natural_foreign_keys=True, use_natural_primary_keys=True)
# print(ss)

sss = serialize(
    "json",
    e.eventworker_set.all().order_by("start"),
    use_natural_foreign_keys=True,
    use_natural_primary_keys=True,
    indent=2,
)
print(sss)

work_from_2022_01 = (
    EventWorker.objects.filter(start__year=2022, start__month=1, worker__pk=2)
    .order_by("start")
    .all()
)
work = serialize(
    "json",
    work_from_2022_01,
    use_natural_foreign_keys=True,
    use_natural_primary_keys=True,
    indent=2,
)
print(f"work from month {work}")
