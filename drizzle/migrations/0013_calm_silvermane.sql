ALTER TABLE "order" ADD COLUMN "subtotal_amount" integer;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "discount_amount" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "coupon_code" varchar;