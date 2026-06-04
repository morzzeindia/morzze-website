ALTER TABLE "products" ADD COLUMN "is_hidden" boolean DEFAULT false;--> statement-breakpoint
CREATE INDEX "hidden_idx" ON "products" USING btree ("is_hidden");