"""User API integration tests."""

import pytest


@pytest.mark.asyncio
async def test_health_endpoint(client):
    response = await client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.asyncio
async def test_create_and_get_user(client):
    create_response = await client.post(
        "/api/v1/users/",
        json={"email": "test@example.com", "name": "Test User"},
    )
    assert create_response.status_code == 201
    created = create_response.json()

    get_response = await client.get(f"/api/v1/users/{created['id']}")
    assert get_response.status_code == 200
    fetched = get_response.json()

    assert fetched["id"] == created["id"]
    assert fetched["email"] == "test@example.com"
    assert fetched["name"] == "Test User"
    assert fetched["status"] == "pending"


@pytest.mark.asyncio
async def test_create_user_rejects_case_insensitive_duplicate_email(client):
    first = await client.post(
        "/api/v1/users/",
        json={"email": "test@example.com", "name": "User One"},
    )
    assert first.status_code == 201

    duplicate = await client.post(
        "/api/v1/users/",
        json={"email": "TEST@EXAMPLE.COM", "name": "User Two"},
    )
    assert duplicate.status_code == 409
    assert duplicate.json()["detail"] == "Email already exists"
