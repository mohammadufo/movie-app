import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_READ_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN

export async function GET(request: Request) {
  if (!API_READ_ACCESS_TOKEN) {
    return NextResponse.json(
      { message: 'Server configuration error: Missing API token' },
      { status: 500 }
    )
  }

  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json(
      { message: 'Query parameter is required' },
      { status: 400 }
    )
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`,
      options
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch data from TMDB' },
      { status: 500 }
    )
  }
}
