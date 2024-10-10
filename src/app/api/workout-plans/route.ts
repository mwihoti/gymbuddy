import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import jwt from 'jsonwebtoken';

// Helper function to verify JWT
const verifyToken = (token: string): { userId: number } | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
  } catch (error) {
    return null;
  }
};

export async function POST(request: Request) {
  // Get the token from the Authorization header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const { name, exercises } = await request.json();

  try {
    const workoutPlan = await prisma.workoutPlan.create({
      data: {
        name,
        userId: decoded.userId,
        exercises: {
          create: exercises.map((exercise: any) => ({
            name: exercise.name,
            type: exercise.type,
            muscle: exercise.muscle,
            difficulty: exercise.difficulty,
            instructions: exercise.instructions,
          })),
        },
      },
    });
    return NextResponse.json(workoutPlan);
  } catch (error) {
    console.error('Error saving workout plan:', error);
    return NextResponse.json({ error: 'Failed to save workout plan' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Get the token from the Authorization header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const workoutPlans = await prisma.workoutPlan.findMany({
      where: { userId: decoded.userId },
      include: { exercises: true },
    });
    return NextResponse.json(workoutPlans);
  } catch (error) {
    console.error('Error fetching workout plans:', error);
    return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
  }
}