import { NextResponse } from "next/server";
import { prisma } from '../../../../lib/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonWebtoken';

export async function POST(
    request: Request,
    { params }: { params: { action: string}}
) {
    const { action } = params;
    const body = await request.json();

    if ( action === 'signup') {
        const { username, email, password} = body;

        // check if user already exists

        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ username }, { email }]},
        });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists'}, { status: 400});

        }
        const hashedPassword = await bcrypt.hash(password, 8);

        // create new user
        const newUser = await prisma.user.create({ data: { username, email, pasword: hashedPassword}});
        // Generate new token
        const token = jwt.sign({ userId: newUser.id}, process.env.JWT_SECRET!, {expiresIn: '1h'});

        return NextResponse.json({ user: newUser, token}, { status: 201});
    }
    else if (action === 'signin') {
        const { email, password} = body;

        // Find user
        const user = await prisma.user.findUnique({ where: { email }});

        if (!user) {
            return NextResponse.json({ error: 'User not found'}, { status: 404});
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!)
    }
}