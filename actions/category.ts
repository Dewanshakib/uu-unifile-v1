"use server";

import { db } from "@/drizzle/db";
import { category } from "@/drizzle/schema";
import { CategorySchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function addCategory(formData: FormData) {
  const categoryName = formData.get("category") as string;

  //   console.log(category)

  const { data, success } = CategorySchema.safeParse({ category: categoryName });

  if (!success) {
    return;
  }

  await db.insert(category).values({ name: data.category });

  revalidatePath("/dashboard/category");
}

export async function updateCategory(id: number, formData: FormData) {
  const categoryName = formData.get("category") as string;

  const { data, success } = CategorySchema.safeParse({ category: categoryName });

  if (!success) {
    return;
  }

  await db.update(category).set({ name: data.category }).where(eq(category.id, id));

  revalidatePath("/dashboard/category");
}
