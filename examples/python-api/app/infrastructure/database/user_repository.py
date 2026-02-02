"""SQLAlchemy User Repository Implementation."""

from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.user.entity import User
from app.infrastructure.database.models import UserModel


class SQLAlchemyUserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def find_by_id(self, user_id: str) -> Optional[User]:
        result = await self.session.execute(
            select(UserModel).where(UserModel.id == user_id)
        )
        row = result.scalar_one_or_none()
        return self._to_domain(row) if row else None

    async def find_by_email(self, email: str) -> Optional[User]:
        result = await self.session.execute(
            select(UserModel).where(UserModel.email == email)
        )
        row = result.scalar_one_or_none()
        return self._to_domain(row) if row else None

    async def save(self, user: User) -> None:
        model = UserModel(
            id=user.id,
            email=user.email,
            name=user.name,
            status=user.status,
        )
        self.session.add(model)
        await self.session.commit()

    def _to_domain(self, model: UserModel) -> User:
        return User(
            id=model.id,
            email=model.email,
            name=model.name,
            status=model.status,
        )
