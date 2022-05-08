from django.test import TestCase, Client
from django.contrib.auth import get_user_model

USER_API = "/api/v1/user"


class TestUserEndpoint(TestCase):
    def setUp(self) -> None:
        self.usr_name = "test"
        self.usr_passwd = "foobar1234"
        self.email = ("test@example.net",)

        User = get_user_model()
        self.usr = User.objects.create_user(
            username=self.usr_name,
            email="test@example.net",
            password=self.usr_passwd,
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
        response_login = self.c.post(
            f"{USER_API}/auth/login",
            {"username": self.usr_name, "password": self.usr_passwd},
        )
        token = response_login.json()["token"]
        response = self.c.put(
            f"{USER_API}/1",
            {
                "email": new_email,
                "first_name": "Foo",
                "last_name": "Bar"
            },
            content_type="application/json",
            HTTP_AUTHORIZATION=token,
        )
        print(response, response.json())
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
