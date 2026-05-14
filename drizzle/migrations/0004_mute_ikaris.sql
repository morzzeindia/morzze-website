CREATE TABLE "coupons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" varchar(100) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"coupon_code" varchar(100) NOT NULL,
	"discount_value" varchar(50) NOT NULL,
	"minimum_order" varchar(100),
	"valid_until" timestamp,
	"terms_pdf" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now()
);
