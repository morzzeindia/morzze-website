/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";
import { NextResponse } from "next/server";
import { checkUserFirstOrder, createOrder } from "@/helper";
import { RAZORPAY_KEY_SECRET } from "@/env";
import { getProfile } from "@/helper/user/action";
import {
  notifyFirstOrderEmail,
  notifyOrderConfirmationEmail,
} from "@/lib/email-notifications";

export async function POST(req: Request) {
  const body = await req.json();
  const {userId,email,fullName}: any = await getProfile();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    items,
    address,
    amount,
    coupon,
  } = body;

  // 1️⃣ Verify signature
  const generated_signature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const existingOrder = await checkUserFirstOrder(userId);
  if (existingOrder.length === 0) {
    try {
      await notifyFirstOrderEmail({
        email,
        customerName: fullName,
      });
    } catch (emailError) {
      console.error("Unable to send first order email:", emailError);
    }
  }


  const result:any = await createOrder({
    userId,
    items,
    fixedAmount: amount,
    address,
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    coupon: coupon || undefined,
  });

  const currentDate = new Date().toLocaleDateString();

  try {
    const productNames = Array.isArray(items)
      ? items
          .map((item: any) => item?.name || item?.productName || item?.title)
          .filter(Boolean)
          .join(", ")
      : "";

    await notifyOrderConfirmationEmail({
      email,
      customerName: fullName,
      orderId: result?.orderId,
      orderDate: currentDate,
      productNames,
      orderTotal: amount,
    });
  } catch (emailError) {
    console.error("Unable to send order confirmation email:", emailError);
  }

  return NextResponse.json(result);
}
