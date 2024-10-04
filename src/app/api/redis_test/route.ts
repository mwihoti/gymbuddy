import  { NextResponse } from 'next/server';
import { Redis } from 'ioredis';


const redis = new Redis({
    host: 'localhost',
    port: 6379,
    
  })

  export async function GET  ()  {
   try {await redis.set('foo', 'bar');
    const data = await redis.get('foo');
    
    return NextResponse.json({ message: 'Redis working', data });
    } catch (error) {
      console.log(error);
      return NextResponse.json({error: 'Error occured', details:error}, {status: 500});
    }
  }