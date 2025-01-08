import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
  const user = await getCurrentUser(request);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  const userId = user.id;
  return NextResponse.json({ user: { ...user, userId} });
  
} catch (error) {
  console.error("Error fetching user:", error);
  return NextResponse.json({ error: 'An error occurred while fetching user' }, { status: 500 });
}
}

export async function PUT(request: NextRequest) {
  try {
  const user = await getCurrentUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized: usere not authenticated"}, {status: 401});

  }
  // parse body request
  const { name, email} = await request.json();
  const userId = user.id;

  await prisma.user.update({
    where: {id: user.id}, 
    data: { name, email},
  });

  return NextResponse.json({ message: "Profile updated successfully"}, {status: 200});
  } catch (error) {
    console.error('Error updating user profile', error);
    return NextResponse.json({ error: "Failed to update profile"}, {status: 500});
  }

  
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ error: "unauthorized user not authenticated"}, {status: 500});
    }
    const userId = user.id;

    await prisma.user.delete({
      where: {id: userId}
    })
    return NextResponse.json({ message: "Account deleted successfully"}, { status: 200});
    
 
} catch (error) {
  console.error('Error deleting user account', error);
  return NextResponse.json({ error: "Failed to delete account"}, {status: 500});

}
}