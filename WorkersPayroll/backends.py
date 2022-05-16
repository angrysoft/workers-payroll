from typing import Optional
from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from workers.models import User, Token
from django.http import HttpRequest
from django.db.models import Model
import jwt


class TokenBackend(BaseBackend):
    def authenticate(self, request: HttpRequest) -> User | None:
        try:
            jwt_token = request.headers.get("Authorization")
            payload = jwt.decode(jwt_token, settings.JWTKEY, algorithms=["HS256"])
            token = Token.objects.get(token__exact=payload.get("token"))
            return token.user
        except Token.DoesNotExist:
            pass
        except jwt.exceptions.InvalidTokenError:
            pass
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def has_perm(
        self,
        user_obj: User,
        perm: str,
        obj: Optional[Model] = ...) -> bool:
        if not user_obj.is_active or user_obj.is_anonymous:
            return False

        try:
            app_label, codename = perm.split(".")
        except ValueError:
            raise ValueError(
                "Permission name should be in the form "
                "app_label.permission_codename."
            )

        if user_obj.is_coordinator:
            return True

        if user_obj.is_account_manager and codename == "view_eventdaywork":
            return True

        if obj is not None and obj.worker == user_obj:
            return True

        return False
