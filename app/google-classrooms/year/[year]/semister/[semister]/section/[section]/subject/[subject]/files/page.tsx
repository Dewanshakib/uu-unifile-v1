import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { googleClassroom } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";

export default async function GoogleClassroomFiles({
  params,
}: {
  params: Promise<{
    year: string;
    semister: string;
    section: string;
    subject: string;
  }>;
}) {
  const { year, semister, section, subject } = await params;
  // console.log(sectionId);

  const files = await db
    .select()
    .from(googleClassroom)
    .where(
      and(
        eq(googleClassroom.year, Number(year)),
        eq(googleClassroom.semester, Number(semister)), // map semister to semester
        eq(googleClassroom.section, section),
        eq(googleClassroom.subject, subject)
      )
    );

  // console.log(files);

  return (
    <div className="mt-5">
      <h2>Google Classrooms</h2>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {files.length > 0 ? (
          files.map((f) => (
            <Card key={f.id} className="flex flex-col">
              <CardHeader className="flex-1">
                <h2 className="truncate">
                  Title:{" "}
                  <span className="text-sm md:text-base font-medium ">
                    {f.course}
                  </span>
                </h2>
                {f.lab && <Badge>LAB</Badge>}
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <h2>
                    Instructor:{" "}
                    <span className="font-medium">{f.instructor}</span>
                  </h2>
                  <h2>
                    Semester: <span className="font-medium">{f.semester}</span>
                  </h2>
                  <h2>
                    Section: <span className="font-medium">{f.section}</span>
                  </h2>

                  <h2>
                    Code: <span className="font-medium">{f.code}</span>
                  </h2>
                </div>
              </CardContent>
              <CardFooter>
                <Badge className="text-xs" variant={"secondary"}>
                  Added {" "}
                  {formatDistanceToNow(new Date(f.createdAt), {
                    addSuffix: true,
                  })}
                </Badge>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="">
            <h2>No files found</h2>
          </div>
        )}
      </div>
    </div>
  );
}
