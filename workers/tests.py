from datetime import datetime, timedelta, tzinfo
from django.test import TestCase
from django.contrib.auth import get_user_model
from payroll.models import Function, FunctionRate, EventDayWork, Event


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
        has_perm = usr.has_perm("payroll.view_eventdaywork")
        self.assertFalse(has_perm)
        usr.is_coordinator = True
        has_perm = usr.has_perm("payroll.view_eventdaywork")
        self.assertTrue(has_perm)

    def test_has_perm_account_manager(self):
        User = get_user_model()
        usr = User.objects.create_user(
            username="account_manager",
            email="accountr@example.net",
            password="foobar1234",
            is_account_manager=True,
        )
        has_perm = usr.has_perm("payroll.view_eventdaywork")
        self.assertTrue(has_perm)

        has_perm = usr.has_perm("payroll.add_eventdaywork")
        self.assertFalse(has_perm)

    def test_has_perm_regular_user(self):
        User = get_user_model()
        usr = User.objects.create_user(
            username="regular_user_for_workday",
            first_name="FooU",
            last_name="BarU",
            email="regular_user@example.net",
            password="foobar1234",
        )

        coordinator = User.objects.create_user(
            username="coordinator_for_workday",
            email="regular_user@example.net",
            first_name="FooC",
            last_name="BarC",
            password="foobar1234",
            is_coordinator=True,
        )

        account_manager = User.objects.create_user(
            username="account_manager_for_workday",
            email="regular_user@example.net",
            first_name="FooA",
            last_name="BarA",
            password="foobar1234",
            is_account_manager=True,
        )

        f1 = Function(name="f1")
        f1.save()

        event = Event(
            name="test_event",
            number="01-2022",
            coordinator=coordinator,
            account_manager=account_manager,
        )
        event.save()
        event_day_work = EventDayWork()
        event_day_work.event = event
        event_day_work.worker = usr
        event_day_work.start = datetime.now()
        event_day_work.end = datetime.now() + timedelta(hours=10)
        event_day_work.function = f1
        event_day_work.save()

        has_perm = usr.has_perm("payroll.view_eventdaywork", event_day_work)
        self.assertTrue(has_perm)

        has_no_perm = usr.has_perm("payroll.add_eventdaywork")
        self.assertFalse(has_no_perm)
