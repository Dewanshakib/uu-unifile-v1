"use server";

import { db } from "@/drizzle/db";
import { file } from "@/drizzle/schema";
import { FileSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function addFile(formData: FormData) {
  try {
    const category = formData.get("category") as string | null;
    const title = formData.get("title") as string | null;
    const link = formData.get("link") as string | null;
    const fileType = formData.get("fileType") as string | null;
    const section = formData.get("section") as string | null;
    const semester = formData.get("semester") as string | null;
    const year = formData.get("year") as string | null;

    const body = {
      category: category || "",
      title: title || "",
      link: link || "",
      section: section || "",
      semester: semester || "",
      year: year || "",
      fileType: fileType || "",
    };

    const { data, success } = FileSchema.safeParse(body);

    if (!success) {
      return;
    }

    // console.log(data)

    await db.insert(file).values({
      title: data.title,
      link: data.link,
      category: data.category,
      fileType: data.fileType,
      section: data.section,
      semester: Number(data.semester),
      year: Number(data.year),
    });

    revalidatePath("/dashboard/file");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function updateFile(id: number, formData: FormData) {
  try {
    const category = formData.get("category") as string | null;
    const title = formData.get("title") as string | null;
    const link = formData.get("link") as string | null;
    const fileType = formData.get("fileType") as string | null;
    const section = formData.get("section") as string | null;
    const semester = formData.get("semester") as string | null;
    const year = formData.get("year") as string | null;

    const body = {
      category: category || "",
      title: title || "",
      link: link || "",
      section: section || "",
      semester: semester || "",
      year: year || "",
      fileType: fileType || "",
    };

    const { data, success } = FileSchema.safeParse(body);

    if (!success) {
      return;
    }

    await db.update(file).set({
      title: data.title,
      link: data.link,
      category: data.category,
      fileType: data.fileType,
      section: data.section,
      semester: Number(data.semester),
      year: Number(data.year),
    }).where(eq(file.id, id));

    revalidatePath("/dashboard/file");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
