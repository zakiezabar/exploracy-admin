import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';  // Adjust the path according to your project

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    // Fetch user from the database by email
    const user = await getUserByEmail(email);  // Adjust this based on your setup
    if (!user || !user.hashedPassword) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Check if password matches
    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordsMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Return success response
    return NextResponse.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email },
      // Add token or session logic here if needed
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
