import Redis from "ioredis";

class Cache {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: "localhost",
      port: 6379,
    });

    this.client.on("error", (error) => console.error("Redis Error:", error));
    this.client.on("connect", () => console.log("Connected to Redis!"));
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return null;
    }
  }

  async set<T>(key: string, value: T, expiration = 3600): Promise<boolean> {
    try {
      await this.client.set(key, JSON.stringify(value), "EX", expiration);
      return true;
    } catch (error) {
      console.error("Redis SET Error:", error);
      return false;
    }
  }

  async deleteByPattern(pattern: string): Promise<number> {
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
      return keys.length;
    } catch (error) {
      return 0;
    }
  }
}

// Export an instance for easy use
const cache = new Cache();
export default cache;
