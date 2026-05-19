ALTER TABLE "order" ADD COLUMN "shipping_provider" varchar DEFAULT 'envia';--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "tracking_number" varchar;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "tracking_url" text;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipping_status" varchar DEFAULT 'processing';--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipment_id" varchar;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "courier_name" varchar;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "estimated_delivery_date" timestamp;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipped_at" timestamp;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "delivered_at" timestamp;