"""User Entity Unit Tests."""

import pytest

from app.domain.user.entity import User


class TestUserCreate:
    def test_create_valid_user(self):
        user = User.create(email="test@example.com", name="Test User")

        assert user.email == "test@example.com"
        assert user.name == "Test User"
        assert user.status == "pending"
        assert user.id  # UUID가 생성되었는지 확인

    def test_create_lowercases_email(self):
        user = User.create(email="Test@EXAMPLE.COM", name="Test")
        assert user.email == "test@example.com"

    def test_create_rejects_invalid_email(self):
        with pytest.raises(ValueError, match="Invalid email"):
            User.create(email="not-an-email", name="Test")

    def test_create_rejects_empty_email(self):
        with pytest.raises(ValueError, match="Invalid email"):
            User.create(email="", name="Test")


class TestUserStatusTransitions:
    def test_activate_from_pending(self):
        user = User.create(email="test@example.com", name="Test")
        user.activate()
        assert user.status == "active"

    def test_activate_from_active_raises(self):
        user = User.create(email="test@example.com", name="Test")
        user.activate()
        with pytest.raises(ValueError, match="Only pending users"):
            user.activate()

    def test_deactivate_from_active(self):
        user = User.create(email="test@example.com", name="Test")
        user.activate()
        user.deactivate()
        assert user.status == "inactive"

    def test_deactivate_from_pending_raises(self):
        user = User.create(email="test@example.com", name="Test")
        with pytest.raises(ValueError, match="Only active users"):
            user.deactivate()
