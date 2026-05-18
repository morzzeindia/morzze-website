/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { and, asc, ilike, sql, eq } from "drizzle-orm";
import { pageSize } from "@/const/globalconst";
import { review, product } from "@/db/schema";
import ReviewClient from "./reviewClient";

interface PageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    search?: string;
  };
}

  const PAGE_SIZE = pageSize


const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const pageSize = Number(params.page_size ?? PAGE_SIZE);
  const text = params.search ?? "";

  const filters = [];

  if (text && text.trim() !== "") {
    filters.push(ilike(review.name, `%${text}%`));
  }
  const whereClause = filters.length > 0 ? and(...filters) : undefined;
  const offset = (page - 1) * pageSize;

  const reviews = await db
    .select({
      id: review.id,
      name: review.name,
      email: review.email,
      rating: review.rating,
      message: review.message,
      isAdminApproved: review.isAdminApproved,
      productId: review.productId,
      createdAt: review.createdAt,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.bannerImage,
    })
    .from(review)
    .leftJoin(product, eq(review.productId, product.id))
    .orderBy(asc(review.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset)
    .where(whereClause);

  const totalReviews = await db
    .select({
      count: sql`count(*)`,
    })
    .from(review)
    .where(whereClause);

  const totalPages = Math.ceil((totalReviews[0].count as any) / PAGE_SIZE);

  return (
    <ReviewClient reviews={reviews} total={totalPages} currentPage={page} />
  );
};

export default Page;
