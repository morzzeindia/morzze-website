"use server";

import { db } from "@/db";
import { catalogue } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCatalogue() {
  try {
    const data = await db.select().from(catalogue);
    return data;
  } catch (error) {
    console.error("Error fetching catalogue:", error);
    return [];
  }
}

/** Active rows for the public catalogue page (admin-managed). */
export async function getActiveCatalogues() {
  try {
    return await db
      .select()
      .from(catalogue)
      .where(eq(catalogue.isActive, true))
      .orderBy(desc(catalogue.isFeatured), desc(catalogue.createdAt));
  } catch (error) {
    console.error("Error fetching active catalogues:", error);
    return [];
  }
}

export async function getCatalogueById(id: string) {
  try {
    const data = await db
      .select()
      .from(catalogue)
      .where(eq(catalogue.id, id));

    return data[0] || null;
  } catch (error) {
    console.error("Error fetching catalogue:", error);
    return null;
  }
}

export async function createCatalogue(formData: FormData) {
  try {
    const title = (formData.get("title") as string)?.trim();
    const slug = (formData.get("slug") as string)?.trim();
    const shortDescription = (formData.get("shortDescription") as string)?.trim();
    const image = (formData.get("image") as string)?.trim();
    const pdfFile = (formData.get("pdfFile") as string)?.trim();
    const totalPagesRaw = formData.get("totalPages") as string;
    const fileSize = (formData.get("fileSize") as string)?.trim();
    const publishYear = (formData.get("publishYear") as string)?.trim();
    const category = (formData.get("category") as string)?.trim();
    const isFeatured = formData.get("isFeatured") === "on";
    const isActive = formData.get("isActive") === "on";

    const totalPages = parseInt(totalPagesRaw, 10);
    if (
      !title ||
      !slug ||
      !shortDescription ||
      !image ||
      !pdfFile ||
      !fileSize ||
      !publishYear ||
      !category ||
      Number.isNaN(totalPages) ||
      totalPages < 1
    ) {
      return { success: false, message: "Invalid or missing fields" };
    }

    await db.insert(catalogue).values({
      title,
      slug,
      shortDescription,
      image,
      pdfFile,
      totalPages,
      fileSize,
      publishYear,
      category,
      isFeatured,
      isActive,
    });

    revalidatePath("/admin/catalogue");
    revalidatePath("/catalogue");

    return {
      success: true,
      message: "Catalogue added successfully",
    };
  } catch (error) {
    console.error("Error creating catalogue:", error);

    return {
      success: false,
      message: "Failed to create catalogue",
    };
  }
}

export async function updateCatalogue(id: string, formData: FormData) {
  try {
    const title = (formData.get("title") as string)?.trim();
    const slug = (formData.get("slug") as string)?.trim();
    const shortDescription = (formData.get("shortDescription") as string)?.trim();
    const image = (formData.get("image") as string)?.trim();
    const pdfFile = (formData.get("pdfFile") as string)?.trim();
    const totalPages = parseInt(formData.get("totalPages") as string, 10);
    const fileSize = (formData.get("fileSize") as string)?.trim();
    const publishYear = (formData.get("publishYear") as string)?.trim();
    const category = (formData.get("category") as string)?.trim();
    const isFeatured = formData.get("isFeatured") === "on";
    const isActive = formData.get("isActive") === "on";

    if (
      !title ||
      !slug ||
      !shortDescription ||
      !image ||
      !pdfFile ||
      !fileSize ||
      !publishYear ||
      !category ||
      Number.isNaN(totalPages) ||
      totalPages < 1
    ) {
      return { success: false, message: "Invalid or missing fields" };
    }

    await db
      .update(catalogue)
      .set({
        title,
        slug,
        shortDescription,
        image,
        pdfFile,
        totalPages,
        fileSize,
        publishYear,
        category,
        isFeatured,
        isActive,
      })
      .where(eq(catalogue.id, id));

    revalidatePath("/admin/catalogue");
    revalidatePath("/catalogue");

    return {
      success: true,
      message: "Catalogue updated successfully",
    };
  } catch (error) {
    console.error("Error updating catalogue:", error);

    return {
      success: false,
      message: "Failed to update catalogue",
    };
  }
}

export async function deleteCatalogue(id: string) {
  try {
    await db.delete(catalogue).where(eq(catalogue.id, id));

    revalidatePath("/admin/catalogue");
    revalidatePath("/catalogue");

    return {
      success: true,
      message: "Catalogue deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting catalogue:", error);

    return {
      success: false,
      message: "Failed to delete catalogue",
    };
  }
}