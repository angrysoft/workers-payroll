from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import Group, AbstractBaseUser, BaseUserManager
from django.db.models.signals import post_save
from django.conf import settings

from payroll.models import Function


class WorkerUserManager(BaseUserManager):
    def create_user(
        self,
        email,
        password=None,
    ):

        if not email:
            raise ValueError(_("Users must have an email address"))

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        email,
        password=None,
    ):

        user = self.create_user(
            email=email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.CharField(max_length=255, unique=True, verbose_name=_("Email"))
    nickname = models.CharField(max_length=50, unique=True, blank=True, verbose_name=_("Nickname"))
    functions = models.ManyToManyField(Function, blank=True)
    groups = models.ManyToManyField(Group, blank=True)
    first_name = models.CharField(max_length=50, verbose_name=_("Firstname"))
    last_name = models.CharField(max_length=50, verbose_name=_("Lastname"))
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = WorkerUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.first_name} {self.last_name} <{self.nickname}>"

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

    def natural_key(self):
        return f"{self.first_name} {self.last_name} <{self.nickname}>"


    class Meta:
        unique_together = [["first_name", "last_name"]]


def post_save_receiver(sender, instance, created, **kwargs):
    print("Post save")
    if instance.groups.count() == 0:
        workers_group, group_created = Group.objects.get_or_create(name="workers")
        instance.groups.add(workers_group)


post_save.connect(post_save_receiver, sender=settings.AUTH_USER_MODEL)
# m2m_changed.connect(toppings_changed, sender=Pizza.toppings.through)