import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT;

  if (!endpoint) {
    return NextResponse.json(
      {
        error:
          "NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT environment variable is required",
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GraphQL proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from GraphQL endpoint" },
      { status: 500 }
    );
  }
}
