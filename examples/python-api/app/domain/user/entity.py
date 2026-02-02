"""User Entity - Domain model."""

from dataclasses import dataclass
import re
import uuid


@dataclass
class User:
    id: str
    email: str
    name: str
    status: str = "pending"

    @classmethod
    def create(cls, email: str, name: str) -> "User":
        if not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email):
            raise ValueError(f"Invalid email: {email}")
        return cls(
            id=str(uuid.uuid4()),
            email=email.lower(),
            name=name,
            status="pending",
        )

    def activate(self) -> None:
        if self.status != "pending":
            raise ValueError("Only pending users can be activated")
        self.status = "active"

    def deactivate(self) -> None:
        if self.status != "active":
            raise ValueError("Only active users can be deactivated")
        self.status = "inactive"
