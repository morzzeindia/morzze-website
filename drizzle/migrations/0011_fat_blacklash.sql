ALTER TABLE "product_filter" ALTER COLUMN "type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "coupons" ADD COLUMN "upto" varchar(100);