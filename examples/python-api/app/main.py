"""FastAPI Application Entry Point"""

from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.core.database import engine
from app.infrastructure.database.models import Base
from app.presentation.api.users import router as users_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 시작 시 테이블 생성
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(title="Clean Architecture API", lifespan=lifespan)
app.include_router(users_router)
