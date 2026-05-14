"use server";

import { db } from "@/db";
import { coupons } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getCoupons() {
  try {
    const data = await db
      .select()
      .from(coupons)
      .orderBy(desc(coupons.createdAt));

    return data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return [];
  }
}

export async function getCouponById(id: string) {
  try {
    const data = await db
      .select()
      .from(coupons)
      .where(eq(coupons.id, id));

    return data[0] || null;
  } catch (error) {
    console.error("Error fetching coupon:", error);
    return null;
  }
}

export async function createCoupon(formData: FormData) {
  try {
    const category = formData.get("category") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const couponCode = formData.get("couponCode") as string;
    const discountValue = formData.get("discountValue") as string;
    const minimumOrder = formData.get("minimumOrder") as string;
    const validUntil = formData.get("validUntil") as string;
    const termsPdf = formData.get("termsPdf") as string;
    const isActive = formData.get("isActive") === "on";

    await db.insert(coupons).values({
      category,
      title,
      description,
      couponCode,
      discountValue,
      minimumOrder,
      validUntil: validUntil ? new Date(validUntil) : null,
      termsPdf,
      isActive,
    });

    return {
      success: true,
      message: "Coupon created successfully",
    };
  } catch (error) {
    console.error("Error creating coupon:", error);

    return {
      success: false,
      message: "Failed to create coupon",
    };
  }
}

export async function updateCoupon(id: string, formData: FormData) {
  try {
    const category = formData.get("category") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const couponCode = formData.get("couponCode") as string;
    const discountValue = formData.get("discountValue") as string;
    const minimumOrder = formData.get("minimumOrder") as string;
    const validUntil = formData.get("validUntil") as string;
    const termsPdf = formData.get("termsPdf") as string;
    const isActive = formData.get("isActive") === "on";

    await db
      .update(coupons)
      .set({
        category,
        title,
        description,
        couponCode,
        discountValue,
        minimumOrder,
        validUntil: validUntil ? new Date(validUntil) : null,
        termsPdf,
        isActive,
      })
      .where(eq(coupons.id, id));

    return {
      success: true,
      message: "Coupon updated successfully",
    };
    } catch (error) {
      console.error("Error creating coupon:", error);

      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create coupon",
      };
    }
}

export async function deleteCoupon(id: string) {
  try {
    await db.delete(coupons).where(eq(coupons.id, id));

    return {
      success: true,
      message: "Coupon deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting coupon:", error);

    return {
      success: false,
      message: "Failed to delete coupon",
    };
  }
}