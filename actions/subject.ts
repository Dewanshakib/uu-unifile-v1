"use server";

import { db } from "@/drizzle/db";
import { subject } from "@/drizzle/schema";
import { SubjectSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function addSubject(formData: FormData) {
  const subjectName = formData.get("subject") as string;

  //   console.log(category)

  const { data, success } = SubjectSchema.safeParse({ subject: subjectName });

  if (!success) {
    return;
  }

  await db.insert(subject).values({ name: data.subject });

  revalidatePath("/dashboard/subject");
}

export async function updateSubject(id: number, formData: FormData) {
  const subjectName = formData.get("subject") as string;

  const { data, success } = SubjectSchema.safeParse({ subject: subjectName });

  if (!success) {
    return;
  }

  await db.update(subject).set({ name: data.subject }).where(eq(subject.id, id));

  revalidatePath("/dashboard/subject");
}
