"""User Use Cases."""

from app.domain.user.entity import User
from app.domain.user.repository import UserRepository
from app.application.user.dtos import CreateUserDto, UserResponseDto


class CreateUserUseCase:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    async def execute(self, dto: CreateUserDto) -> UserResponseDto:
        # 1. 비즈니스 검증: 이메일 중복 확인
        existing = await self.user_repository.find_by_email(dto.email)
        if existing:
            raise ValueError("Email already exists")

        # 2. 도메인 엔터티 생성
        user = User.create(email=dto.email, name=dto.name)

        # 3. 영속화
        await self.user_repository.save(user)

        # 4. 응답 DTO 변환
        return UserResponseDto.from_entity(user)


class GetUserUseCase:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    async def execute(self, user_id: str) -> UserResponseDto:
        user = await self.user_repository.find_by_id(user_id)
        if not user:
            raise ValueError(f"User not found: {user_id}")
        return UserResponseDto.from_entity(user)
