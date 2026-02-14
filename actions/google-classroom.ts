"use server";

import { db } from "@/drizzle/db";
import { googleClassroom } from "@/drizzle/schema";
import { GoogleClassroomSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function addGoogleClassroom(formData: FormData) {
  const course = formData.get("course");
  const code = formData.get("code");
  const instructor = formData.get("instructor");
  const subject = formData.get("subject");
  const section = formData.get("section");
  const semester = formData.get("semester");
  const year = formData.get("year");

  const body = {
    course,
    code,
    instructor,
    subject,
    section,
    semester,
    year,
  };

  const { data, success } = GoogleClassroomSchema.safeParse(body);

  if (!success) {
    return;
  }

  await db.insert(googleClassroom).values({
    subject: data.subject,
    code: data.code,
    instructor: data.instructor,
    section: data.section,
    course: data.course,
    semester: Number(data.semester),
    year: Number(data.year),
  });

  // console.log(body);

  revalidatePath("/dashboard/google-classroom");
}
