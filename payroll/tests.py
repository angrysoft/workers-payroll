from datetime import datetime, timedelta
from django.test import TestCase, Client
from .models import Event, EventDayWork, Function
from workers.models import User
from django.db.utils import IntegrityError
from django.contrib.auth import get_user_model




class TestEvent(TestCase):
    def setUp(self):
        self.coordinator = User.objects.create_user('coordinator1', first_name="John", last_name="Doe", email="john.doe@example.net")
        self.account_manager = User.objects.create_user('account_man', first_name="Jane", last_name="Foo", email="jane.foo@example.net")
        self.e = Event()
        self.e.number = "22-101"
        self.e.name = "PollandRock"
        self.e.coordinator = self.coordinator
        self.e.account_manager = self.account_manager
        self.e.save()

    def test_add_event(self):
        self.assertEqual(str(self.e), "22-101-PollandRock")

    def test_event_unique(self):
        with self.assertRaises(IntegrityError):
            self.e = Event()
            self.e.number = "22-101"
            self.e.name = "PollandRock"
            self.e.coordinator = self.coordinator
            self.e.account_manager = self.account_manager
            self.e.save()

    def test_add_event_day(self):
        worker = User.objects.create_user('worker', first_name="Janet", last_name="FooBar", email="janet.foobar@example.net")
        test_func = Function(name="f1")
        test_func.save()
        worker.functions.add(test_func)

        day = EventDayWork()
        day.worker = worker
        day.event = self.e
        start = datetime.now()
        end = start + timedelta(hours=12)
        day.start = start
        day.end = end
        self.assertEqual(
            str(day),
            f"{self.e.number}-{self.e.name}-{worker}-{day.start}-{day.end}"
        )


class TestEventEndpoint(TestCase):
    def setUp(self) -> None:
        self.usr_name = "test"
        self.usr_passwd = "foobar1234"
        User = get_user_model()
        self.usr = User.objects.create_user(
            username=self.usr_name,
            email="test@example.net",
            password=self.usr_passwd,
        )
        self.client = Client()
        response = self.client.post('/auth/login', {'username': self.usr_name, 'password': self.usr_passwd})
        response_data = response.json()
        self.token = response_data["results"]["token"]
    
    def test_add_day_work(self):
        response = self.client.post('/auth/login', {'username': self.usr_name, 'password': self.usr_passwd})
        

