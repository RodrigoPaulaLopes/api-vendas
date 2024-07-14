import { RedisOptions } from 'ioredis';

interface IRedisConf {
    config: {
        redis: RedisOptions
    },
    driver: string
}

export default {
    config: {
        redis: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD
        }
    },
    driver: 'redis'
} as IRedisConf;
