import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { subject } from "@/drizzle/schema";
import Link from "next/link";

export default async function Subject({
  params,
}: {
  params: Promise<{ subject: string; section: string }>;
}) {
  const { subject: subjectParam, section } = await params;

  // Drizzle — clean, fast, typed
  const subjects = await db
    .select({ name: subject.name, id: subject.id })
    .from(subject);

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-semibold">Choose your category</h2>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-5">
        {subjects.length > 0 ? (
          subjects.map((c) => (
            <Link
              href={`/google-classrooms/year/1/semister/1/section/${section}/subject/${encodeURIComponent(
                c?.name?.trim() as string
              )}/files`}
              key={c.id}
            >
              <Card className="p-10">
                <CardContent>
                  <div className="grid place-items-center">
                    <h2 className="text-lg font-medium">{c.name}</h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h2 className="text-lg text-gray-600">No category added yet</h2>
          </div>
        )}
      </div>
    </div>
  );
}
