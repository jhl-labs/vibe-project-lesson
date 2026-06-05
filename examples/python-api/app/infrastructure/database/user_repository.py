"""SQLAlchemy User Repository Implementation."""

from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.user.entity import User
from app.infrastructure.database.models import UserModel


class SQLAlchemyUserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def find_by_id(self, user_id: str) -> User | None:
        result = await self.session.execute(
            select(UserModel).where(UserModel.id == user_id)
        )
        row = result.scalar_one_or_none()
        return self._to_domain(row) if row else None

    async def find_by_email(self, email: str) -> User | None:
        normalized_email = email.strip().lower()
        result = await self.session.execute(
            select(UserModel).where(func.lower(UserModel.email) == normalized_email)
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
        try:
            await self.session.commit()
        except IntegrityError as error:
            await self.session.rollback()
            raise ValueError("Email already exists") from error

    def _to_domain(self, model: UserModel) -> User:
        return User(
            id=model.id,
            email=model.email,
            name=model.name,
            status=model.status,
        )
