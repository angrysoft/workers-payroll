from datetime import datetime, timedelta
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.utils import timezone
from payroll.models import Event, EventDayWork, Function
from workers.models import User


USER_API = "/api/v1/user"


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
        )

        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertIn("token", response_data)

    def test_is_user_auth(self):
        response = self.c.post(
            f"{USER_API}/auth/login",
            {"username": self.usr_name, "password": self.usr_passwd},
        )
        response_data = response.json()

        get_response = self.c.get(f"{USER_API}/1")
        self.assertEqual(get_response.status_code, 401)

        get_response = self.c.get(
            f"{USER_API}/1", HTTP_AUTHORIZATION=response_data["token"]
        )
        self.assertEqual(get_response.status_code, 200)

    def test_user_logout(self):
        response = self.c.get(f"{USER_API}/auth/logout")
        self.assertEqual(response.status_code, 401)

        response = self.c.post(
            f"{USER_API}/auth/login",
            {"username": self.usr_name, "password": self.usr_passwd},
        )
        response_data = response.json()
        logout_response = self.c.get(
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
        self.usr = User.objects.create_user(
            username=self.usr_name,
            email="test@example.net",
            password=self.usr_passwd,
        )
        self.client = Client()
        response = self.client.post(
            "/api/v1/user/auth/login",
            {"username": self.usr_name, "password": self.usr_passwd},
        )
        response_data = response.json()
        self.token = response_data["token"]

    def test_add_event(self):
        response = self.client.post(
            "/api/v1/user/auth/login",
            {"username": self.usr_name, "password": self.usr_passwd},
        )


class TestWorkerReport(TestCase):
    def setUp(self) -> None:
        worker = User.objects.create_user(
            "worker",
            first_name="Janet",
            last_name="FooBar",
            email="janet.foobar@example.net",
            password="foobar1234"
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
        ev = Event()
        ev.number = "22-101"
        ev.name = "PollandRock"
        ev.coordinator = coordinator
        ev.account_manager = account_manager
        ev.save()
        test_func = Function(name="f1")
        test_func.save()
        worker.functions.add(test_func)
        # start_day = timezone.localtime(timezone.datetime(2022, 1, 1, 8, 0, 0))
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
            day.function = test_func
            day.save()

        self.c = Client()
        response_login = self.c.post(
            f"{USER_API}/auth/login",
            {"username": "worker", "password": "foobar1234"},
        )
        self.token = response_login.json()["token"]

    def test_get_worker_month_report(self):
        response = self.c.get(
            "/api/v1/event/report/2022/1",
            HTTP_AUTHORIZATION=self.token,
        )
        print(response.json())

