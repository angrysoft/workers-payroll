from django.test import TestCase
from django.contrib.auth import get_user_model


class UserManagerTest(TestCase):
    def test_create_user(self):
        User = get_user_model()
        usr = User.objects.create_user(
            email="test@example.net",
            password="foobar1234",
        )
        self.assertEqual(usr.email, "test@example.net")
        self.assertTrue(usr.is_active)

    def test_create_superuser(self):
        User = get_user_model()
        admin_usr = User.objects.create_superuser(
            email="admin@example.net",
            password="adminFooBar1234",
        )
        self.assertEqual(admin_usr.email, "admin@example.net")
        self.assertTrue(admin_usr.is_active)
        self.assertTrue(admin_usr.is_staff)
        self.assertTrue(admin_usr.is_admin)