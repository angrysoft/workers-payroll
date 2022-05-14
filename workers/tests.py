from django.test import TestCase
from django.contrib.auth import get_user_model
from payroll.models import Function, FunctionRate
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType

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
        self.assertTrue(admin_usr.is_superuser)

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

    def test_has_perm(self):
        User = get_user_model()
        usr = User.objects.create_user(
            username="test",
            email="test@example.net",
            password="foobar1234",
        )
        has_perm = usr.has_perm("add_work_day")
        print(has_perm)
        content_type = ContentType.objects.get(app_label='payroll', model='event')
        add_work_day_perm = Permission.objects.create(
            codename="add_work_day",
            name="Add work day",
            content_type=content_type
        )
        usr.user_permissions.add(add_work_day_perm)
        has_perm = usr.has_perm("add_work_day")
        print(has_perm)


