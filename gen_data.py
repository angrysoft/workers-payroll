from workers.models import User
from payroll.models import Event, EventDayWork, Function, FunctionRate
import requests
from random import randint, choice, sample
from datetime import datetime, timedelta
from django.utils import timezone
from pytz.exceptions import AmbiguousTimeError, NonExistentTimeError

RATES = {
    "Technician": 600,
    "Chief": 800,
    "Lighting Designer": 900,
    "Multimedia Designer": 900,
}


def get_dates(no: int):
    for _ in range(no):
        try:
            yield datetime(2021, randint(1, 12), randint(1, 31), randint(0, 23))
        except ValueError:
            pass


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
        usr = User.objects.create_user(
            username=u["login"]["username"],
            first_name=u["name"]["first"],
            last_name=u["name"]["last"],
            email=u["email"],
            password="test1234",
        )
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
    event_batch = []
    for i in range(1, 100):
        e = Event()
        e.name = f"Event{i}"
        e.number = f"21-{i:02}"
        e.coordinator = coordinator
        e.account_manager = account_manager
        event_batch.append(e)
    Event.objects.bulk_create(event_batch)


def gen_workdays():
    workers = list(
        User.objects.filter(
            is_coordinator=False, is_account_manager=False, is_superuser=False
        ).all()
    )
    events_list = Event.objects.all()
    func = Function.objects.all()
    days_batch = []
    used_dates = []
    for event in events_list:
        print(event)
        gen_for_no_workers = randint(0, len(workers))
        workers_list = sample(workers, k=gen_for_no_workers)
        for date in get_dates(randint(1, 10)):
            for worker in workers_list:
                worker_day = f"{worker} {date}"
                try:
                    if worker_day not in used_dates:
                        used_dates.append(worker_day)
                        days_batch.append(get_days(date, event, func, worker))
                except AmbiguousTimeError:
                    print(f"{worker_day} => AmbiguousTimeError")
                except NonExistentTimeError:
                    # change time form summer to winter
                    print(f"{worker_day} => NonExistentTimeError")
    print("Batch Size", len(days_batch))
    EventDayWork.objects.bulk_create(days_batch)


def get_days(day_start, event, func, worker):
    day_end = day_start + timedelta(hours=randint(8, 24))
    day = EventDayWork()
    day.event = event
    day.start = timezone.make_aware(day_start)
    day.end = timezone.make_aware(day_end)
    day.worker = worker
    day.function = choice(func)
    return day


add_users()
add_events()
gen_workdays()
