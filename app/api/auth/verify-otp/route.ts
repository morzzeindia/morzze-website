/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { users } from "@/db/schema";
import {
  cognitoConfirmSignUp,
  cognitoUpdateUserAttribute,
} from "@/helper/cognito";
import { sendWelcomeEmail } from "@/helper/emailTemplates/action";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, code } = body;

  if (!email || !code) {
    return NextResponse.json(
      { message: "email and confirmation code are required." },
      { status: 400 },
    );
  }

  try {
    const result = await cognitoConfirmSignUp({ email, code });
    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (!dbUser) {
      return NextResponse.json(
        { message: "User not found.", result },
        { status: 404 },
      );
    }

    await db
      .update(users)
      .set({
        emailVerified: true,
        updatedAt: new Date(),
      })
      .where(eq(users.email, email));

    // putting user id in cognito user attributes
    // Wrapped in try-catch: if custom:userId attribute is not in the Cognito schema,
    // OTP verification should still succeed.
    try {
      await cognitoUpdateUserAttribute({
        email,
        userAttribute: [
          {
            Name: "custom:userId",
            Value: dbUser.id,
          },
        ],
      });
    } catch (attrErr: any) {
      console.error("Failed to set custom:userId attribute:", attrErr.message);
      // Non-fatal: verification still succeeds
    }

    try {
      await sendWelcomeEmail(email, dbUser.name);
    } catch (emailErr: any) {
      console.error("Failed to send welcome email:", emailErr.message);
    }
    return NextResponse.json(
      { message: "Email verified successfully." },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
