"""
Application configuration using Pydantic Settings.
Loads from environment variables and .env file.
"""
from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, validator


class Settings(BaseSettings):
    """Application settings."""

    # Application
    APP_NAME: str = "Smart Lodge Budget"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    ENVIRONMENT: str = "development"

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # Database
    DATABASE_URL: str
    DATABASE_POOL_SIZE: int = 5
    DATABASE_MAX_OVERFLOW: int = 10

    # Redis (Optional - for caching)
    REDIS_URL: Optional[str] = None
    REDIS_CACHE_TTL: int = 3600

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Google Gemini AI
    GEMINI_API_KEY: str
    GEMINI_MODEL: str = "gemini-1.5-pro"
    GEMINI_MAX_TOKENS: int = 8192

    # File Upload
    MAX_UPLOAD_SIZE: int = 52428800  # 50MB
    ALLOWED_EXTENSIONS: str = ".pdf"
    UPLOAD_DIR: str = "/tmp/uploads"

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:3001"
    ALLOWED_METHODS: str = "GET,POST,PUT,DELETE,OPTIONS"
    ALLOWED_HEADERS: str = "*"

    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 1000
    RATE_LIMIT_PERIOD: int = 3600

    @validator("ALLOWED_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: str) -> List[str]:
        """Convert comma-separated string to list."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v

    @validator("ALLOWED_METHODS", pre=True)
    def assemble_methods(cls, v: str) -> List[str]:
        """Convert comma-separated string to list."""
        if isinstance(v, str):
            return [method.strip() for method in v.split(",")]
        return v

    class Config:
        env_file = ".env"
        case_sensitive = True


# Create global settings instance
settings = Settings()
