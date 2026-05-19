ALTER TABLE "product_filter" DROP CONSTRAINT "product_filter_product_id_filter_pk";--> statement-breakpoint
ALTER TABLE "product_filter" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_filter" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
CREATE INDEX "type_idx" ON "product_filter" USING btree ("type");