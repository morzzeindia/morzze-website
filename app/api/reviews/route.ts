import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { review } from "@/db/schema";
import { getProfile } from "@/helper/user/action";


// GET REVIEWS
export async function GET() {

  try {

    const data = await db.select().from(review);

    return NextResponse.json(data);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );

  }

}


// CREATE REVIEW
export async function POST(req: NextRequest) {

  try {

    const body = await req.json();
    const { userId, fullName, email } = await getProfile();

    const newReview = await db
      .insert(review)
      .values({
        userId,
        name: fullName,
        email,
        productId: body.productId,
        rating: body.rating,
        message: body.message,
      })
      .returning();

    return NextResponse.json(newReview);

  } catch (error) {

    console.error(error);

    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );

  }

}
