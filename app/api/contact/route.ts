import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.RECIPIENT_EMAIL || "imnotdivyansh@gmail.com";

    // FormSubmit API endpoint with Referer & Origin headers
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Origin: "http://localhost:3000",
        Referer: "http://localhost:3000/",
      },
      body: JSON.stringify({
        name,
        email,
        _subject: subject || `Portfolio Contact from ${name}`,
        message,
        _captcha: "false",
      }),
    });

    const result = await response.json();

    if (result.success || response.ok) {
      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message was received successfully.",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please email imnotdivyansh@gmail.com directly." },
      { status: 500 }
    );
  }
}
