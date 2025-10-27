"""
Redis cache configuration and utilities.
"""
import json
from typing import Optional, Any
import redis.asyncio as redis
from app.core.config import settings


class RedisCache:
    """Redis cache manager."""

    def __init__(self):
        self.redis_client: Optional[redis.Redis] = None

    async def connect(self):
        """Connect to Redis."""
        self.redis_client = await redis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True,
        )
        print(f"✅ Redis connected: {settings.REDIS_URL}")

    async def disconnect(self):
        """Disconnect from Redis."""
        if self.redis_client:
            await self.redis_client.close()
            print("✅ Redis disconnected")

    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache."""
        if not self.redis_client:
            return None

        value = await self.redis_client.get(key)
        if value:
            try:
                return json.loads(value)
            except json.JSONDecodeError:
                return value
        return None

    async def set(
        self,
        key: str,
        value: Any,
        expire: Optional[int] = None,
    ) -> bool:
        """Set value in cache with optional expiration."""
        if not self.redis_client:
            return False

        if expire is None:
            expire = settings.REDIS_CACHE_TTL

        if isinstance(value, (dict, list)):
            value = json.dumps(value)

        await self.redis_client.set(key, value, ex=expire)
        return True

    async def delete(self, key: str) -> bool:
        """Delete key from cache."""
        if not self.redis_client:
            return False

        await self.redis_client.delete(key)
        return True

    async def exists(self, key: str) -> bool:
        """Check if key exists in cache."""
        if not self.redis_client:
            return False

        return await self.redis_client.exists(key) > 0

    async def clear_pattern(self, pattern: str) -> int:
        """Clear all keys matching pattern."""
        if not self.redis_client:
            return 0

        keys = await self.redis_client.keys(pattern)
        if keys:
            return await self.redis_client.delete(*keys)
        return 0


# Create global cache instance
cache = RedisCache()
