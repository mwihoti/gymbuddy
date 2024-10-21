import { NextResponse } from "next/server";
import { prisma } from '../../../../lib/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(
    request: Request,
    { params }: { params: { action: string } }
) {
    const { action } = params;
    const body = await request.json();

    if (action === 'signup') {
        const {name, username, email, password } = body;

        // check if user already exists

        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }] },
        });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });

        }
        const hashedPassword = await bcrypt.hash(password, 8);

        // create new user
        const newUser = await prisma.user.create({ data: { name, username, email, password: hashedPassword } });
        // Generate new token
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        const response = NextResponse.json({ user: newUser, token }, { status: 201 });
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600, // 1 hour
            path: '/',
        });

        return response;



    }
    else if (action === 'signin') {
        const { email, password } = body;

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      

        const response = NextResponse.json({ user, token }, { status: 200 });
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600, // 1 hour
            path: '/',
        });
        return response;
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}