import { NextResponse } from "next/server";
import { db } from "@/db";
import { coupons } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code = (body.code ?? "").toString().trim().toUpperCase();

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Coupon code is required." },
        { status: 400 }
      );
    }

    const data = await db
      .select()
      .from(coupons)
      .where(eq(coupons.couponCode, code));

    const coupon = data[0];

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: "Invalid coupon code." },
        { status: 404 }
      );
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        { success: false, message: "This coupon is not active." },
        { status: 400 }
      );
    }

    if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
      return NextResponse.json(
        { success: false, message: "This coupon has expired." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      coupon: {
        couponCode: coupon.couponCode,
        discountValue: coupon.discountValue,
        upto: coupon.upto,
        minimumOrder: coupon.minimumOrder,
        title: coupon.title,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to validate coupon." },
      { status: 500 }
    );
  }
}
