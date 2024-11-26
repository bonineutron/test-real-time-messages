import { connectDB } from '@/database/mongodb';
import users from '@/database/models/users';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
   await connectDB();

   const { username, password } = await request.json();

   const user = await users.findOne({ username });

   if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
   }

   const isMatch = password === user.password;

   if (!isMatch) {
      return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
   }

   return NextResponse.json({ username: user.username, role: user.role });
}
