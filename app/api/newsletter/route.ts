import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Admin Mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Newsletter Subscription - Morzze",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Newsletter Subscriber</h2>

          <p>
            <strong>Email:</strong> ${email}
          </p>
        </div>
      `,
    });

    // Confirmation Mail to User
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Morzze",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 30px;">
          
          <h1 style="color: #CBA14D; margin-bottom: 20px;">
            Welcome to Morzze
          </h1>

          <p style="font-size: 15px; line-height: 1.7;">
            Thank you for subscribing to the Morzze newsletter.
          </p>

          <p style="font-size: 15px; line-height: 1.7;">
            You'll now receive updates, insights, offers, and exclusive content directly in your inbox.
          </p>

          <div style="margin-top: 30px;">
            <p style="color: #888888;">
              — Team Morzze
            </p>
          </div>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}