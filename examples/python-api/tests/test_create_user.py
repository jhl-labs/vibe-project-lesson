"""CreateUserUseCase Unit Tests."""

from unittest.mock import AsyncMock
import pytest

from app.application.user.use_cases import CreateUserUseCase
from app.application.user.dtos import CreateUserDto
from app.domain.user.entity import User


@pytest.fixture
def mock_repo():
    repo = AsyncMock()
    repo.find_by_email.return_value = None
    repo.save.return_value = None
    return repo


@pytest.fixture
def use_case(mock_repo):
    return CreateUserUseCase(user_repository=mock_repo)


@pytest.mark.asyncio
async def test_create_user_success(use_case, mock_repo):
    dto = CreateUserDto(email="test@example.com", name="Test User")
    result = await use_case.execute(dto)

    assert result.email == "test@example.com"
    assert result.name == "Test User"
    assert result.status == "pending"
    mock_repo.save.assert_called_once()


@pytest.mark.asyncio
async def test_create_user_duplicate_email(use_case, mock_repo):
    mock_repo.find_by_email.return_value = User(
        id="existing", email="test@example.com", name="Existing", status="active"
    )

    dto = CreateUserDto(email="test@example.com", name="New User")
    with pytest.raises(ValueError, match="Email already exists"):
        await use_case.execute(dto)

    mock_repo.save.assert_not_called()


@pytest.mark.asyncio
async def test_create_user_invalid_email(use_case):
    dto = CreateUserDto(email="bad-email", name="Test")
    with pytest.raises(ValueError, match="Invalid email"):
        await use_case.execute(dto)


@pytest.mark.asyncio
async def test_create_user_lowercases_email(use_case):
    dto = CreateUserDto(email="Test@EXAMPLE.COM", name="Test")
    result = await use_case.execute(dto)
    assert result.email == "test@example.com"
