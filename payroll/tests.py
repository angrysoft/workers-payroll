from django.test import TestCase
from .models import Event
from workers.models import User


# class TestEvent(TestCase):
#     def test_add_event_and_create_default_functions_rates(self):
#         coordinator = User.objects.create_user('coordinator1', first_name="John", last_name="Doe", email="john.doe@example.net")
#         account_manager = User.objects.create_user('account_man', first_name="Jane", last_name="Foo", email="jane.foo@example.net")
#         worker = User.objects.create_user('worker', first_name="Jane", last_name="Foo", email="jane.foo@example.net")
#         e = Event()
#         e.number = "22-101"
#         e.name = "PollandRock"
#         e.coordinator = coordinator
#         e.account_manager = account_manager
#         e.save()

#         test_func = Function(name="f1")
#         test_func.save()
#         worker.function.add(test_func)

#         day = EventDayWork()
#         day.worker = worker
#         day.


class TestEvent(TestCase):
    def setUp(self):
        coordinator = User.objects.create_user('coordinator1', first_name="John", last_name="Doe", email="john.doe@example.net")
        account_manager = User.objects.create_user('account_man', first_name="Jane", last_name="Foo", email="jane.foo@example.net")
        self.e = Event()
        self.e.number = "22-101"
        self.e.name = "PollandRock"
        self.e.coordinator = coordinator
        self.e.account_manager = account_manager
        self.e.save()

    def test_add_event(self):
        self.assertEqual(str(self.e), "22-101-PollandRock")

    def test_event_unique(self):
        pass
