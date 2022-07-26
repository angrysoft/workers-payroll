from datetime import timedelta
from unittest import result
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.utils import timezone
from payroll.models import (
    AdditionRate,
    Event,
    EventDayWork,
    Function,
    FunctionRate,
    Addition,
)
from workers.models import User

API = "/api/v1"
USER_API = f"{API}/user"
EVENT_API = f"{API}/event"


class TestUserEndpoint(TestCase):
    def setUp(self) -> None:
        self.usr_name = "test"
        self.usr_passwd = "foobar1234"
        self.email = ("test@example.net",)

        User = get_user_model()
        self.usr = User.objects.create_superuser(
            username=self.usr_name,
            email="test@example.net",
            password=self.usr_passwd,
            is_superuser=True,
        )
        self.c = Client()

    def test_user_login(self):
        response = self.c.post(
            f"{USER_API}/auth/login",
            {"username": self.usr_name, "password": self.usr_passwd},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertIn("token", response_data)

    def test_is_user_auth(self):
        response = self.c.post(
            f"{USER_API}/auth/login",
            {"username": self.usr_name, "password": self.usr_passwd},
            content_type="application/json",
        )
        response_data = response.json()

        get_response = self.c.get(f"{USER_API}/auth")
        self.assertEqual(get_response.status_code, 401)

        get_response = self.c.get(
            f"{USER_API}/auth", HTTP_AUTHORIZATION=response_data["token"]
        )
        self.assertEqual(get_response.status_code, 200)

    def test_user_logout(self):
        response = self.c.post(f"{USER_API}/auth/logout")
        self.assertEqual(response.status_code, 401)

        response = self.c.post(
            f"{USER_API}/auth/login",
            {"username": self.usr_name, "password": self.usr_passwd},
            content_type="application/json",
        )
        response_data = response.json()
        logout_response = self.c.post(
            f"{USER_API}/auth/logout",
            HTTP_AUTHORIZATION=response_data["token"],
        )
        self.assertEqual(logout_response.status_code, 200)

    def test_add_user(self):
        username = "test_user"
        password = "foobar1234"
        email = "test_user@example.net"
        first_name = "FooOne"
        last_name = "BarOne"

        response_login = self.c.post(
            f"{USER_API}/auth/login",
            {"username": self.usr_name, "password": self.usr_passwd},
            content_type="application/json",
        )
        token = response_login.json()["token"]
        response = self.c.post(
            f"{USER_API}/",
            {
                "username": username,
                "password": password,
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
            },
            content_type="application/json",
            HTTP_AUTHORIZATION=token,
        )
        self.assertEqual(response.status_code, 201)

    def test_update_user(self):
        new_email = "new@example.net"
        new_first_name = "Foo"
        new_last_name = "Bar"
        response_login = self.c.post(
            f"{USER_API}/auth/login",
            {"username": self.usr_name, "password": self.usr_passwd},
            content_type="application/json",
        )
        data = response_login.json()

        response = self.c.put(
            f"{USER_API}/{data['user_id']}",
            {
                "email": new_email,
                "first_name": new_first_name,
                "last_name": new_last_name,
            },
            content_type="application/json",
            HTTP_AUTHORIZATION=data["token"],
        )
        self.assertEqual(response.status_code, 201)


class TestEventEndpoint(TestCase):
    def setUp(self) -> None:
        self.usr_name = "test"
        self.usr_passwd = "foobar1234"
        User = get_user_model()
        self.coor = User.objects.create_user(
            username=self.usr_name,
            first_name="John",
            last_name="Doe",
            email="test@example.net",
            password=self.usr_passwd,
            is_coordinator=True,
        )

        self.accoount_manager = User.objects.create_user(
            username="sales1",
            first_name="Sal",
            last_name="Man",
            email="sales1@example.net",
            password=self.usr_passwd,
            is_account_manager=True,
        )

        self.client = Client()
        response = self.client.post(
            f"{USER_API}/auth/login",
            {"username": self.usr_name, "password": self.usr_passwd},
            content_type="application/json",
        )
        response_data = response.json()
        self.token = response_data["token"]

    def test_add_event(self):
        event_response = self.client.post(
            f"{EVENT_API}/",
            {
                "name": "first",
                "number": "01-2022",
                "coordinator": self.coor.pk,
                "account_manager": self.accoount_manager.pk,
            },
            content_type="application/json",
            HTTP_AUTHORIZATION=self.token,
        )

        self.assertEqual(event_response.status_code, 201)

    def test_get_event(self):
        event_response = self.client.post(
            f"{EVENT_API}/",
            {
                "name": "first",
                "number": "01-2022",
                "coordinator": self.coor.pk,
                "account_manager": self.accoount_manager.pk,
            },
            content_type="application/json",
            HTTP_AUTHORIZATION=self.token,
        )
        event_id = event_response.json().get("results", {}).get("event_id")

        event = self.client.get(
            f"{EVENT_API}/{event_id}",
            HTTP_AUTHORIZATION=self.token,
        )
        results = event.json().get("results")
        self.assertEqual(
            {"name": results.get("name"), "number": results.get("number")},
            {"name": "first", "number": "01-2022"}
        )

    def test_update_event(self):
        event_response = self.client.post(
            f"{EVENT_API}/",
            {
                "name": "first",
                "number": "01-2022",
                "coordinator": self.coor.pk,
                "account_manager": self.accoount_manager.pk,
            },
            content_type="application/json",
            HTTP_AUTHORIZATION=self.token,
        )
        event_id = event_response.json().get("results", {}).get("event_id")

        event_update = self.client.put(
            f"{EVENT_API}/{event_id}",
            {
                "name": "first",
                "number": "02-2022",
                "coordinator": self.coor.pk,
                "account_manager": self.accoount_manager.pk,
            },
            content_type="application/json",
            HTTP_AUTHORIZATION=self.token,
        )

        event = self.client.get(
            f"{EVENT_API}/{event_id}",
            HTTP_AUTHORIZATION=self.token,
        )

        results = event.json().get("results")
        self.assertEqual(
            {"name": results.get("name"), "number": results.get("number")},
            {"name": "first", "number": "02-2022"}
        )
    


class TestWorkerReport(TestCase):
    def setUp(self) -> None:
        worker, coordinator, account_manager = self.create_users()
        ev = self.create_event(coordinator, account_manager)
        func = self.set_user_rates(worker)
        additions = self.set_user_additions()
        start_day = timezone.make_aware(timezone.datetime(2022, 1, 1, 8, 0, 0))
        for _ in range(10):
            day = EventDayWork()
            day.worker = worker
            day.event = ev
            start = start_day
            end = start + timedelta(hours=12)
            day.start = start
            day.end = end
            start_day += timedelta(days=1)
            day.function = func
            day.save()
            for add in additions:
                addition = Addition()
                addition.addition = add
                addition.worker = worker
                if add.is_multiplied:
                    addition.value = 150
                addition.save()
                day.additions.add(addition)

        self.c = Client()
        response_login = self.c.post(
            f"{USER_API}/auth/login",
            {"username": "worker", "password": "foobar1234"},
            content_type="application/json",
        )
        self.token = response_login.json()["token"]

    def set_user_rates(self, worker):
        test_func = Function(name="f1")
        test_func.save()
        worker.functions.add(test_func)
        func_rate = FunctionRate.objects.get(function=test_func)
        func_rate.function = test_func
        func_rate.value = 550
        func_rate.overtime = 55
        func_rate.overtime_after = 10
        func_rate.worker = worker
        func_rate.save()
        return test_func

    def create_event(self, coordinator, account_manager):
        ev = Event()
        ev.number = "22-101"
        ev.name = "PollandRock"
        ev.coordinator = coordinator
        ev.account_manager = account_manager
        ev.save()
        return ev

    def create_users(self):
        worker = User.objects.create_user(
            "worker",
            first_name="Janet",
            last_name="FooBar",
            email="janet.foobar@example.net",
            password="foobar1234",
        )

        coordinator = User.objects.create_user(
            "coordinator1",
            first_name="John",
            last_name="Doe",
            email="john.doe@example.net",
        )
        account_manager = User.objects.create_user(
            "account_man",
            first_name="Jane",
            last_name="Foo",
            email="jane.foo@example.net",
        )

        return worker, coordinator, account_manager

    def set_user_additions(self):
        results = []
        results.append(AdditionRate.objects.create(name="Work on high", value=100))
        results.append(
            AdditionRate.objects.create(name="Drive car", value=2, is_multiplied=True)
        )
        return results

    def test_get_worker_month_report(self):
        response = self.c.get(
            "/api/v1/event/report/2022/1",
            HTTP_AUTHORIZATION=self.token,
        )
        self.assertEqual(len(response.json().get("results", [])), 10)
