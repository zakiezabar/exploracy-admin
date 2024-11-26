import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');
  const validApiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Check if the API key is valid
  if (apiKey === validApiKey) {
    // Allow access if the API key is valid
    return NextResponse.next();
  }

  // Return Unauthorized if API key is invalid or missing
  return new NextResponse(
    JSON.stringify({ error: 'Unauthorized access: Invalid API key' }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  );
}

export const config = {
  matcher: ['/api/:path*'], // Apply to all routes under /api
};
