from tokenize import group
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import Group, AbstractBaseUser, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save

from payroll.models import Function


class WorkerUserManager(BaseUserManager):
    def create_user(
        self,
        nickname,
        first_name="",
        last_name="",
        email="",
        functions=[],
        password=None,
    ):
        
        if not nickname:
            raise ValueError(_("Users must have an nickname"))

        user = self.model(
            nickname,
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )
        map(user.functions.add, functions)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        nickname,
        first_name="",
        last_name="",
        email="",
        functions=[],
        password=None,
    ):
        
        user = self.create_user(
            nickname,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            functions=functions,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    nickname = models.CharField(max_length=50, unique=True, verbose_name=_("Nickname"))
    functions = models.ManyToManyField(Function, blank=True)
    first_name = models.CharField(max_length=50, verbose_name=_("Firstname"))
    last_name = models.CharField(max_length=50, verbose_name=_("Lastname"))
    email = models.CharField(max_length=100, blank=True, verbose_name=_("Email"))
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = WorkerUserManager()

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

    USERNAME_FIELD = "nickname"
    REQUIRED_FIELDS = ["functions"]

    class Meta:
        unique_together = [["first_name", "last_name"]]


# class Worker(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     group = models.ForeignKey(Group, on_delete=models.CASCADE)
#     functions = models.ManyToManyField(Function)


def post_save_receiver(sender, instance, created, **kwargs):
    if created:
        print("Adding to default Group")
        workers_group = Group.objects.get_or_create(name="workers")
        instance.groups.add(workers_group)

    if hasattr(instance, "worker"):
        print(dir(instance.worker))
    # print(instance.worker.user)
    # print(instance.worker.group)
    # print(instance.worker.functions)


post_save.connect(post_save_receiver, sender=settings.AUTH_USER_MODEL)
# m2m_changed.connect(toppings_changed, sender=Pizza.toppings.through)
