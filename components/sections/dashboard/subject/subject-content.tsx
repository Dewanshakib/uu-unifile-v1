import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/drizzle/db";
import { subject } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { TrashIcon } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function SubjectContent() {
  const subjects = await db.select().from(subject);

  const deleteSubject = async (formData: FormData) => {
    "use server";
    const subjectId = formData.get("id") as string;

    await db.delete(subject).where(eq(subject.id, Number(subjectId)));
    revalidatePath("/dashboard/subject");
  };

  return (
    <div className="mt-5 ">
      {subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject, idx: number) => (
            <Card key={subject.id}>
              <CardContent>
                <div className="flex w-full justify-between items-center">
                  <h2 className="font-medium text-lg flex flex-row items-center gap-x-2">
                    {idx + 1}. {subject.name}
                  </h2>
                  <form action={deleteSubject}>
                    <Input name="id" type="hidden" value={subject.id} />
                    <Button
                      type="submit"
                      size={"icon-sm"}
                      variant={"destructive"}
                    >
                      <TrashIcon />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-red-500 font-medium text-lg">
          No subjects added yet.
        </div>
      )}
    </div>
  );
}
