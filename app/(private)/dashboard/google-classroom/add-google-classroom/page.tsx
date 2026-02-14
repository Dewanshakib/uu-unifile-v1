import AddGoogleClassroomForm from "@/components/sections/dashboard/goolgeClassroom/add-google-classroom-form";
import { db } from "@/drizzle/db";
import { subject } from "@/drizzle/schema";

export default async function AddGoogleClassroomPage() {
  const subjects = (await db
    .select({ name: subject.name })
    .from(subject)) as Array<{ name: string }>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add Google Classroom</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Link your class. Only semesters & years {"1–4"} allowed.
        </p>
      </div>
      <AddGoogleClassroomForm subjects={subjects} />
    </div>
  );
}

