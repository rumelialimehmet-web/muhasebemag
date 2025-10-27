"""
Main API v1 router.
Aggregates all endpoint routers.
"""
from fastapi import APIRouter
from app.api.v1.endpoints import health, documents, analysis

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(
    health.router,
    prefix="/health",
    tags=["health"]
)

api_router.include_router(
    documents.router,
    prefix="/documents",
    tags=["documents"]
)

api_router.include_router(
    analysis.router,
    prefix="/analysis",
    tags=["analysis"]
)
