from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from payroll.models import Function, FunctionRate


class UserManagerTest(TestCase):
    def test_create_user(self):
        User = get_user_model()
        usr = User.objects.create_user(
            username="test",
            email="test@example.net",
            password="foobar1234",
        )
        self.assertEqual(usr.email, "test@example.net")
        self.assertTrue(usr.is_active)

    def test_create_superuser(self):
        User = get_user_model()
        admin_usr = User.objects.create_superuser(
            username="admin",
            email="admin@example.net",
            password="adminFooBar1234",
        )
        self.assertEqual(admin_usr.email, "admin@example.net")
        self.assertTrue(admin_usr.is_active)
        self.assertTrue(admin_usr.is_staff)
        self.assertTrue(admin_usr.is_admin)

    def test_auto_create_function_rates(self):
        User = get_user_model()
        f1 = Function(name="f1")
        f1.save()

        usr = User.objects.create_user(
            username="test",
            email="test@example.net",
            password="foobar1234",
        )

        usr.functions.add(f1)
        usr_rates_count = FunctionRate.objects.filter(worker=usr, function=f1).count()

        self.assertEqual(usr_rates_count, 1)

        usr.functions.remove(f1)
        usr_rates_count = FunctionRate.objects.filter(worker=usr, function=f1).count()
        self.assertEqual(usr_rates_count, 0)


class TestAuth(TestCase):
    def setUp(self) -> None:
        self.usr_name = "test"
        self.usr_passwd = "foobar1234"
        User = get_user_model()
        self.usr = User.objects.create_user(
            username=self.usr_name,
            email="test@example.net",
            password=self.usr_passwd,
        )

    def test_user_login(self):
        c = Client()
        response = c.post('/auth/login', {'username': self.usr_name, 'password': self.usr_passwd})

        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertIn("token", response_data["results"])

    def test_user_logout(self):
        c = Client()
        response = c.get("/auth/logout")
        self.assertEqual(response.status_code, 401)

        response = c.post('/auth/login', {'username': self.usr_name, 'password': self.usr_passwd})
        response_data = response.json()
        print(response_data["results"]["token"])
        header = {"Authorization": response_data["results"]["token"]}
        logout_response = c.get("/auth/logout", **header)
        self.assertEqual(logout_response.status_code, 200)
