"""User API Routes."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.user.use_cases import CreateUserUseCase, GetUserUseCase
from app.application.user.dtos import CreateUserDto
from app.infrastructure.database.user_repository import SQLAlchemyUserRepository
from app.core.database import get_session
from app.presentation.schemas.user import CreateUserRequest, UserResponse

router = APIRouter(prefix="/users", tags=["users"])


# --- 의존성 주입 팩토리 ---
def get_create_user_use_case(
    session: AsyncSession = Depends(get_session),
) -> CreateUserUseCase:
    repo = SQLAlchemyUserRepository(session)
    return CreateUserUseCase(user_repository=repo)


def get_get_user_use_case(
    session: AsyncSession = Depends(get_session),
) -> GetUserUseCase:
    repo = SQLAlchemyUserRepository(session)
    return GetUserUseCase(user_repository=repo)


@router.post("/", response_model=UserResponse, status_code=201)
async def create_user(
    request: CreateUserRequest,
    use_case: CreateUserUseCase = Depends(get_create_user_use_case),
):
    try:
        dto = CreateUserDto(email=request.email, name=request.name)
        result = await use_case.execute(dto)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: str,
    use_case: GetUserUseCase = Depends(get_get_user_use_case),
):
    try:
        result = await use_case.execute(user_id)
        return result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
