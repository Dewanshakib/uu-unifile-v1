import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { file } from "@/drizzle/schema";
import { and, eq, asc } from "drizzle-orm";
import { BookOpen } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default async function Files({
  params,
}: {
  params: Promise<{
    year: string;
    semister: string;
    section: string;
    category: string;
  }>;
}) {
  const { year, semister, section, category } = await params;

  // console.log(year, section, semister, category);

  const files = await db
    .select()
    .from(file)
    .where(
      and(
        eq(file.year, Number(year)),
        eq(file.semester, Number(semister)), // map semister to semester
        eq(file.section, section.toUpperCase()),
        eq(file.category, category.toLowerCase())
      )
    )
    .orderBy(asc(file.title));

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-semibold mb-5">Files</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {files.length > 0 ? (
          files.map((f) => (
            <Card key={f.id} className="h-full flex flex-col">
              <CardHeader className="flex-1">
                <div className="flex flex-row justify-between items-start gap-2">
                  <h2 className="text-sm md:text-base">
                    <span className="font-medium">{f.title}</span>
                  </h2>
                  <Badge variant="secondary">
                    {f.fileType?.toUpperCase() || "N/A"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                <a href={f.link} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" size="sm">
                    View <BookOpen className="ml-2 h-4 w-4" />
                  </Button>
                </a>
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
          <div className="col-span-full text-center py-12">
            <h2 className="text-lg text-muted-foreground">No files found</h2>
          </div>
        )}
      </div>
    </div>
  );
}
