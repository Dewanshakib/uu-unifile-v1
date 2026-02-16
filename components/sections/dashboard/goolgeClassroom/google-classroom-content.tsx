import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/drizzle/db";
import { googleClassroom } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Trash2, Edit } from "lucide-react";
import { Route } from "next";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function GoogleClassroomContent() {
  const googleClassrooms = await db.select().from(googleClassroom);

  const deleteGoogleClassroom = async (formData: FormData) => {
    "use server";
    const googleClassId = formData.get("id") as string;
    await db.delete(googleClassroom).where(eq(googleClassroom.id, Number(googleClassId)));
    revalidatePath("/dashboard/google-classroom");
  };

  return (
    <div className="mt-5">
      {googleClassrooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {googleClassrooms.map((g) => (
            <Card key={g.id} className="h-full flex flex-col">
              <CardHeader className="flex-1">
                <h2 className="truncate text-sm md:text-base">
                  Course: <span className="font-medium">{g.course}</span>
                </h2>
                {g.lab && <Badge>LAB</Badge>}
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <h2>
                    Instructor:{" "}
                    <span className="font-medium">{g.instructor}</span>
                  </h2>
                  <h2>
                    Year: <span className="font-medium">{g.year}</span>
                  </h2>
                  <h2>
                    Semester: <span className="font-medium">{g.semester}</span>
                  </h2>
                  <h2>
                    Section: <span className="font-medium">{g.section}</span>
                  </h2>
                  <h2>
                    Subject:{" "}
                    <span className="font-medium uppercase">{g.subject}</span>
                  </h2>
                  <h2>
                    Code:{" "}
                    <span className="font-medium">{g.code}</span>
                  </h2>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 w-full flex-1">
                  <Link href={`/dashboard/google-classroom/edit-google-classroom/${g.id}` as Route}>
                    <Button variant="outline" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <form action={deleteGoogleClassroom} className="flex-1">
                    <Input type="hidden" value={g.id} name="id" />
                    <Button
                      type="submit"
                      variant="destructive"
                      className="w-full"
                    >
                      <Trash2 className="ml-2 h-4 w-4" />
                      Delete
                    </Button>
                  </form>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="">
          <h2 className="text-lg font-medium text-gray-600">
            No Google Classrooms added yet
          </h2>
        </div>
      )}
    </div>
  );
}
