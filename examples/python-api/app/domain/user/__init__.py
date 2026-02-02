"""User domain module"""

from app.domain.user.entity import User
from app.domain.user.repository import UserRepository

__all__ = [
    "User",
    "UserRepository",
]
