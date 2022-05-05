from workers.models import User
from payroll.models import Event, EventDayWork
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


def add_events():
    for i in range(1, 100):
        e = Event()
        e.name = f"Event{i}"
        e.number = f"22-{i:02}"
        e.save()


add_workers()
add_events()


