"use server";
import { db } from "@/db";
import {
  wishlist,
  wishlistItem,
  product,
} from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { requireUserWithRefresh } from "../user/action";

async function getDbUserId(): Promise<string> {
  const { userId } = await requireUserWithRefresh();
  if (!userId) throw new Error("UNAUTHORIZED");
  return userId;
}

export async function addToWishlistDB(productId: string) {
  const userId = await getDbUserId();

  await db.transaction(async (tx) => {
    let userWishlist = await tx
      .select()
      .from(wishlist)
      .where(eq(wishlist.userId, userId))
      .limit(1)
      .then((r) => r[0]);

    if (!userWishlist) {
      userWishlist = await tx
        .insert(wishlist)
        .values({ userId })
        .returning()
        .then((r) => r[0]);
    }

    if (!userWishlist) {
      throw new Error("Unable to create wishlist");
    }

    await tx.execute(sql`SELECT id FROM wishlist WHERE id = ${userWishlist.id} FOR UPDATE`);

    const existing = await tx
      .select({ id: wishlistItem.id })
      .from(wishlistItem)
      .where(
        and(
          eq(wishlistItem.wishlistId, userWishlist.id),
          eq(wishlistItem.productId, productId)
        )
      )
      .limit(1);

    if (existing.length > 0) return;

    await tx.insert(wishlistItem).values({
      wishlistId: userWishlist.id,
      productId,
    });
  });
}

export async function removeFromWishlistDB(productId: string) {
  const userId = await getDbUserId();

  const userWishlist = await db
    .select()
    .from(wishlist)
    .where(eq(wishlist.userId, userId))
    .limit(1);

  if (!userWishlist.length) return;

  await db
    .delete(wishlistItem)
    .where(
      and(
        eq(wishlistItem.wishlistId, userWishlist[0].id),
        eq(wishlistItem.productId, productId)
      )
    );
}

export async function getWishlistDB() {
  const userId = await getDbUserId();

  const result = await db
    .select({
      id: product.id,
      productId: wishlistItem.productId,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      basePrice: product.basePrice,
      price: product.basePrice,
      strikethroughPrice: product.strikethroughPrice,
      image: product.bannerImage,
      isInStock: product.isInStock,
      rateing4Star: product.rateing4Star,
      rateing5Star: product.rateing5Star,
    })
    .from(wishlistItem)
    .innerJoin(product, eq(product.id, wishlistItem.productId))
    .innerJoin(wishlist, eq(wishlist.id, wishlistItem.wishlistId))
    .where(eq(wishlist.userId, userId));

  return result;
}
