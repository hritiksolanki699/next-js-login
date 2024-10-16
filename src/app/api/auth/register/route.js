import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectToDatabase from '@/lib/mongodb';

export async function POST(request) {
  const { mobile, password, name, email } = await request.json();
  await connectToDatabase();

  const existingUser = await User.findOne({ mobile });
  if (existingUser) return NextResponse.json({ message: 'User already exists' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ mobile, password: hashedPassword, name, email });

  await newUser.save();
  return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
