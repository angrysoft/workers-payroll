from workers.models import User
from payroll.models import Event, EventDayWork, Function
import requests
from random import randint, choice, sample
from datetime import datetime, timedelta
from django.utils import timezone


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
    for u in results:
        func_tech = Function.objects.filter(name="Technician").first()
        func_chief = Function.objects.filter(name="Chief").first()
        usr = User.objects.create_user(
            username=u["login"]["username"],
            first_name=u["name"]["first"],
            last_name=u["name"]["last"],
            email=u["email"],
            password="test1234",
        )
        usr.functions.add(func_tech)
        usr.functions.add(func_chief)
        usr.save()
        # TODO add rates


def add_events():
    coordinator = User.objects.filter(is_coordinator=True).first()
    account_manager = User.objects.filter(is_account_manager=True).first()

    for i in range(1, 100):
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
    r = requests.get("https://api.lrs.org/random-date-generator?year=2021")
    dates = r.json()["data"]
    events_list = Event.objects.all()
    func = Function.objects.all()
    days_batch = []
    for event in events_list:
        # print("Event: ", event)
        for date in sample(list(dates.values()), k=randint(0, len(dates))):
            # print("  Date: ", str(datetime.fromtimestamp(date["unix"])))
            days_batch.extend(get_days(date["unix"], event, func, workers))
    print("Batch Sizie", len(days_batch))
    EventDayWork.objects.bulk_create(days_batch)


def get_days(date, event, func, workers):
    gen_for_no_workers = randint(0, len(workers))
    day_start = datetime.fromtimestamp(date)
    day_end = day_start + timedelta(hours=randint(8, 24))
    batch = []
    for worker in sample(workers, k=gen_for_no_workers):
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
