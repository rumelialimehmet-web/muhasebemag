"""
Main FastAPI application entry point.
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.database import init_db, close_db
from app.core.cache import cache
from app.api.v1.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan events.
    Runs on startup and shutdown.
    """
    # Startup
    print("=" * 60)
    print(f"🚀 Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    print("=" * 60)

    # Initialize database
    await init_db()
    print("✅ Database initialized")

    # Connect to Redis
    await cache.connect()

    print("=" * 60)
    print(f"🌐 Server running on http://{settings.HOST}:{settings.PORT}")
    print(f"📚 API Documentation: http://{settings.HOST}:{settings.PORT}/docs")
    print(f"🔧 Environment: {settings.ENVIRONMENT}")
    print("=" * 60)

    yield

    # Shutdown
    print("\n" + "=" * 60)
    print("🛑 Shutting down...")
    await close_db()
    await cache.disconnect()
    print("✅ Shutdown complete")
    print("=" * 60)


# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered financial analysis platform for Turkish accountants",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
    debug=settings.DEBUG,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=settings.ALLOWED_METHODS,
    allow_headers=[settings.ALLOWED_HEADERS],
)

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    """Root endpoint - health check."""
    return JSONResponse(
        content={
            "message": f"Welcome to {settings.APP_NAME}",
            "version": settings.APP_VERSION,
            "status": "online",
            "environment": settings.ENVIRONMENT,
            "docs": f"http://{settings.HOST}:{settings.PORT}/docs",
        }
    )


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return JSONResponse(
        content={
            "status": "healthy",
            "version": settings.APP_VERSION,
            "environment": settings.ENVIRONMENT,
        }
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info",
    )
