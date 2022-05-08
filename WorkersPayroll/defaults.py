from typing import Any, Dict, List
from workers.models import User


def get_default_results(
    results: List[Any] = [], status: bool = True, error: str = ""
) -> Dict[str, Any]:
    if error:
        status = False
    return_results: Dict[str, Any] = {
        "results": results,
        "status": status,
        "error": error,
    }
    return return_results.copy()


def get_default_user_results(user: User):
    results: Dict[str, Any] = {
        "is_authenticated": user.is_authenticated,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "is_coordinator": user.is_coordinator,
        "is_account_manager": user.is_account_manager,
    }
    return results.copy()
