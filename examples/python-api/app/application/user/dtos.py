"""User Application DTOs."""

from dataclasses import dataclass

from app.domain.user.entity import User


@dataclass(frozen=True)
class CreateUserDto:
    email: str
    name: str


@dataclass(frozen=True)
class UserResponseDto:
    id: str
    email: str
    name: str
    status: str

    @classmethod
    def from_entity(cls, user: User) -> "UserResponseDto":
        return cls(
            id=user.id,
            email=user.email,
            name=user.name,
            status=user.status,
        )
