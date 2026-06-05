"""User Repository Interface."""

from typing import Protocol

from app.domain.user.entity import User


class UserRepository(Protocol):
    """Domain Layer가 정의하는 Repository 인터페이스.
    Infrastructure Layer에서 구현합니다."""

    async def find_by_id(self, user_id: str) -> User | None: ...
    async def find_by_email(self, email: str) -> User | None: ...
    async def save(self, user: User) -> None: ...
