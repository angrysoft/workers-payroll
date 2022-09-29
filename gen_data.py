from workers.models import User
from payroll.models import Event, EventDayWork, Function
import requests


def add_workers():
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


def add_events():
    coordinator = User.objects.create_user(
            username="coor",
            first_name="Franek",
            last_name="Kimono",
            email="franek@kimono.pl",
            password="test1234",
            is_coordinator=True,
        )

    account_manager = User.objects.create_user(
        username="salesman",
        email="salesman_user@example.net",
        first_name="FooA",
        last_name="BarA",
        password="foobar1234",
        is_account_manager=True,
    )
    for i in range(1, 100):
        e = Event()
        e.name = f"Event{i}"
        e.number = f"22-{i:02}"
        e.coordinator = coordinator
        e.account_manager = account_manager
        e.save()


def gen_workdays():
    for ev in 
    day = EventDayWork()


add_workers()
add_events()
