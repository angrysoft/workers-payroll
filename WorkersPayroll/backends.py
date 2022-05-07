from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from workers.models import User, Token
from django.http import HttpRequest
import jwt


class TokenBackend(BaseBackend):
    def authenticate(self, request: HttpRequest) -> User | None:
        try:
            jwt_token = request.headers.get("Authorization")
            print("auth", jwt_token)
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
