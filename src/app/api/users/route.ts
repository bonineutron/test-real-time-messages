import { connectDB } from '@/database/mongodb';
import users from '@/database/models/users';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
   await connectDB();

   const body = await request.json();

   const user = await users.create(body);

   return NextResponse.json(user);
}
