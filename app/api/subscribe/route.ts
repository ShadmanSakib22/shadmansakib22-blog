// app/api/subscribe/route.ts

import { NextRequest, NextResponse } from "next/server";

const SHEET_SUBMIT_URL = process.env.SHEET_SUBMIT_URL;
const EMAIL_FIELD_KEY = process.env.EMAIL_FIELD_KEY;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email address is required." },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams();
    formData.append(EMAIL_FIELD_KEY!, email);

    const response = await fetch(SHEET_SUBMIT_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (response.ok) {
      // Data successfully proxied to Google Forms.
      return NextResponse.json(
        { message: "Subscription successful!" },
        { status: 200 }
      );
    } else {
      console.error("Submission Failed. Status:", response.status);
      return NextResponse.json(
        { message: "Subscription failed due to external service error." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Proxy Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
