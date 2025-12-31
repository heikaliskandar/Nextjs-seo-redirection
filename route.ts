import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 307 Temporary
  return NextResponse.redirect(new URL('/temporary-location', request.url), {
    status: 307,
  });

  // 308 Permanent
  // return NextResponse.redirect(new URL('/permanent-new-location', request.url), {
  //   status: 308,
  // });
}
