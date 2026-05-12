/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { referralCoinHistory, users } from "@/db/schema";
import { cognitoAdminGetUser, cognitoSignUp } from "@/helper/cognito";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name, phone, ref } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    const existingUser = await cognitoAdminGetUser({ email });

    if (existingUser?.UserStatus === "CONFIRMED") {
      return NextResponse.json(
        { message: "User already exists. Please login." },
        { status: 409 },
      );
    }

    await cognitoSignUp({
      email,
      password,
      userAttribute: [{ Name: "email", Value: email }],
    });

    return NextResponse.json(
      {
        message: "OTP resent to your email.",
        data: { email },
      },
      { status: 200 },
    );
  } catch (error: any) {
    if (error.__type === "UserNotFoundException") {
      try {
        await cognitoSignUp({
          email,
          password,
          userAttribute: [{ Name: "email", Value: email }],
        });

        const safeName = name || "New User";
        const safePhone = phone || "0000000000";
        const dummyPassword = "COGNITO_AUTH";

        const [existingDbUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        let userRes;

        if (!existingDbUser) {
          [userRes] = await db
            .insert(users)
            .values({
              name: safeName,
              email,
              phone: safePhone,
              password: dummyPassword,
              referralCoins: ref ? 200 : 0,
            })
            .returning();
        } else {
          userRes = existingDbUser;
        }

        return NextResponse.json(
          {
            message: "Signup successful. OTP sent to email.",
            data: {
              userId: userRes.id,
              email,
            },
          },
          { status: 201 },
        );
      } catch (signupError: any) {
        console.error("Signup error:", signupError);

        return NextResponse.json(
          { message: signupError.message },
          { status: 500 },
        );
      }
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
