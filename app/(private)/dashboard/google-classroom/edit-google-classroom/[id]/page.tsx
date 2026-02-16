import EditGoogleClassroomForm from "@/components/sections/dashboard/goolgeClassroom/edit-google-classroom-form";
import { db } from "@/drizzle/db";
import { googleClassroom, subject } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function EditGoogleClassroomPage({ params }: { params: { id: string } }) {
  const googleClassroomId = parseInt(params.id);
  if (isNaN(googleClassroomId)) {
    notFound();
  }

  const googleClassroomData = await db.select().from(googleClassroom).where(eq(googleClassroom.id, googleClassroomId)).limit(1);
  if (googleClassroomData.length === 0) {
    notFound();
  }

  const subjects = (await db
    .select({ name: subject.name })
    .from(subject)) as Array<{ name: string }>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit Google Classroom</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update the Google Classroom details. All fields are required.
        </p>
      </div>
      <EditGoogleClassroomForm subjects={subjects} googleClassroom={googleClassroomData[0]} />
    </div>
  );
}