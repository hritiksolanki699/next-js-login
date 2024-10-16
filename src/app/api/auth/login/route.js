import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectToDatabase  from '@/lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { mobile, password } = await request.json();
  await connectToDatabase();

  const user = await User.findOne({ mobile });
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return NextResponse.json({ message: 'Invalid password' }, { status: 401 });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '3d' });

  return NextResponse.json(
    { message: 'Logged in successfully' },
    {
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}; Path=/; HttpOnly; Max-Age=${3 * 24 * 60 * 60}`,
      },
    }
  );
}
