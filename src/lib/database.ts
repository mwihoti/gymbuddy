import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

export const prisma = new PrismaClient();


export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD, 
})

export async function getDataWithCache(key: string, fetchFn: () => Promise<any>, expireTime = 3600) {
    
}