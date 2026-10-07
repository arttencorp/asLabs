import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export function GET(request: Request) {
  const headers = request.headers
  const country =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-country-code") ||
    ""

  return NextResponse.json(
    { country: country.toUpperCase() },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  )
}
