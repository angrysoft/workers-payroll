from workers.models import User
from payroll.models import Event, EventDayWork, Function, FunctionRate
import requests
from random import randint, choice, sample
from datetime import datetime, timedelta
from django.utils import timezone

RATES = {
    "Technician": 600,
    "Chief": 800,
    "Lighting Designer": 900,
    "Multimedia Designer": 900,
}

DATES = [
    1610085128,
    1610699703,
    1611674166,
    1612355511,
    1612530260,
    1612841906,
    1614148053,
    1614757976,
    1616696705,
    1617383874,
    1620269318,
    1621163232,
    1621363682,
    1622776740,
    1623024608,
    1624120087,
    1624201270,
    1624897464,
    1626067482,
    1629942162,
    1630294981,
    1632273003,
    1633957196,
    1634359368,
    1634925493,
    1636425557,
    1636804272,
    1637648542,
    1637711002,
    1638690208,
]


def add_users():
    # coordinator
    User.objects.create_user(
        username="coor",
        first_name="Franek",
        last_name="Kimono",
        email="franek@kimono.pl",
        password="test1234",
        is_coordinator=True,
    )

    # sales
    User.objects.create_user(
        username="salesman",
        email="salesman_user@example.net",
        first_name="FooA",
        last_name="BarA",
        password="foobar1234",
        is_account_manager=True,
    )

    r = requests.get("https://randomuser.me/api?results=20")
    results = r.json()["results"]
    functions = Function.objects.all()
    for u in results:
        # func_tech = Function.objects.filter(name="Technician").first()
        # func_chief = Function.objects.filter(name="Chief").first()
        usr = User.objects.create_user(
            username=u["login"]["username"],
            first_name=u["name"]["first"],
            last_name=u["name"]["last"],
            email=u["email"],
            password="test1234",
        )
        # usr.functions.add(func_tech)
        # usr.functions.add(func_chief)
        usr.save()

        for func in functions:
            usr.functions.add(func)
            rate = FunctionRate.objects.get(worker=usr, function=func)
            rate.value = RATES.get(func.name, 600)
            rate.overtime = round(rate.value * 0.1)
            rate.save()


def add_events():
    coordinator = User.objects.filter(is_coordinator=True).first()
    account_manager = User.objects.filter(is_account_manager=True).first()

    for i in range(1, 30):
        e = Event()
        e.name = f"Event{i}"
        e.number = f"21-{i:02}"
        e.coordinator = coordinator
        e.account_manager = account_manager
        e.save()


def gen_workdays():
    workers = list(
        User.objects.filter(
            is_coordinator=False, is_account_manager=False, is_superuser=False
        ).all()
    )
    # r = requests.get("https://api.lrs.org/random-date-generator?year=2021")
    # dates = r.json()["data"]
    events_list = Event.objects.all()
    func = Function.objects.all()
    days_batch = []
    for event in events_list:
        # print("Event: ", event)
        # TODO for events need individials date for workers
        dates_list = sample(DATES, k=randint(0, len(DATES)))
        print(dates_list)
        for date in DATES:
            # print("  Date: ", str(datetime.fromtimestamp(date["unix"])))
            days_batch.extend(get_days(date, event, func, workers))
    print("Batch Sizie", len(days_batch))
    EventDayWork.objects.bulk_create(days_batch)


def get_days(date, event, func, workers):
    gen_for_no_workers = randint(0, len(workers))
    day_start = datetime.fromtimestamp(date)
    day_end = day_start + timedelta(hours=randint(8, 24))
    batch = []
    workers_list = sample(workers, k=gen_for_no_workers)
    for worker in workers_list:
        day = EventDayWork()
        day.event = event
        day.start = timezone.make_aware(day_start)
        day.end = timezone.make_aware(day_end)
        day.worker = worker
        day.function = choice(func)
        batch.append(day)
    return batch


add_users()
add_events()
gen_workdays()
