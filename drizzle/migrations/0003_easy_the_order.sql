CREATE TABLE "catalogues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"short_description" text NOT NULL,
	"image" varchar NOT NULL,
	"pdf_file" varchar NOT NULL,
	"total_pages" integer NOT NULL,
	"file_size" varchar NOT NULL,
	"publish_year" varchar NOT NULL,
	"category" varchar NOT NULL,
	"is_featured" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "catalogues_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "catalogue_slug_idx" ON "catalogues" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "catalogue_category_idx" ON "catalogues" USING btree ("category");--> statement-breakpoint
CREATE INDEX "catalogue_featured_idx" ON "catalogues" USING btree ("is_featured");