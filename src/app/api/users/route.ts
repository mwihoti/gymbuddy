import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const targetUserId = searchParams.get('userId');

    // If the user is an admin, they can view any user profile
    if (user.role === 'TRAINER' && targetUserId) {
      const targetUser = await prisma.user.findUnique({
        where: { id: parseInt(targetUserId) },
      });
      if (!targetUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ user: targetUser });
    }

    // Regular users can only view their own profile
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching user' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: user not authenticated' }, { status: 401 });
    }

    const { name, email, targetUserId } = await request.json();

    // Allow admin to update any user's profile
    if (user.role === 'TRAINER' && targetUserId) {
      await prisma.user.update({
        where: { id: parseInt(targetUserId) },
        data: { name, email },
      });
      return NextResponse.json({ message: 'Profile updated successfully by admin' }, { status: 200 });
    }

    // Regular users can only update their own profile
    const userId = user.id;
    await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: user not authenticated' }, { status: 401 });
    }

    const { targetUserId } = await request.json();

    // Allow admin to delete any user
    if (user.role === 'TRAINER' && targetUserId) {
      await prisma.user.delete({
        where: { id: parseInt(targetUserId) },
      });
      return NextResponse.json({ message: 'User account deleted successfully by admin' }, { status: 200 });
    }

    // Regular users can only delete their own account
    const userId = user.id;
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'Account deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user account:', error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
