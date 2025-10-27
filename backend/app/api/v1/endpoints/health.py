"""
Health check endpoints.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.core.database import get_db
from app.core.cache import cache
from app.core.config import settings

router = APIRouter()


@router.get("/")
async def health_check():
    """
    Basic health check endpoint.
    Returns application status.
    """
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
    }


@router.get("/detailed")
async def detailed_health_check(db: AsyncSession = Depends(get_db)):
    """
    Detailed health check with database and cache status.
    """
    # Check database
    db_status = "unhealthy"
    try:
        result = await db.execute(text("SELECT 1"))
        if result:
            db_status = "healthy"
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    # Check Redis
    redis_status = "unhealthy"
    try:
        if cache.redis_client:
            await cache.redis_client.ping()
            redis_status = "healthy"
    except Exception as e:
        redis_status = f"unhealthy: {str(e)}"

    return {
        "status": "healthy" if db_status == "healthy" and redis_status == "healthy" else "degraded",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "components": {
            "database": db_status,
            "cache": redis_status,
        },
    }
