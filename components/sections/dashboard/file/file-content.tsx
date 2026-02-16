import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/drizzle/db";
import { file } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Trash, Edit } from "lucide-react";
import { Route } from "next";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function FileContent() {
  const files = await db.select().from(file);

  const deleteFile = async (formData: FormData) => {
    "use server";
    const fileId = formData.get("id");

    await db.delete(file).where(eq(file.id, Number(fileId)));
    revalidatePath("/dashboard/file");
  };

  return (
    <div className="mt-5">
      {files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {files.map((file) => (
            <Card key={file.id} className="w-full h-full flex flex-col">
              <CardContent className="flex flex-col justify-between h-full">
                <div>
                  <h2>
                    Name: <span className="font-medium">{file.title}</span>
                  </h2>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <h2>
                    File Type:{" "}
                    <span className="font-medium">
                      {file.fileType?.toUpperCase() || "N/A"}
                    </span>
                  </h2>
                  <h2>
                    Section: <span className="font-medium">{file.section}</span>
                  </h2>
                  <h2>
                    Year: <span className="font-medium">{file.year}</span>
                  </h2>
                  <h2>
                    Semister:{" "}
                    <span className="font-medium">{file.semester}</span>
                  </h2>

                  <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-y-0 md:gap-x-2 mt-5">
                    <Link className="w-full block flex-1" href={`/dashboard/file/edit-file/${file.id as number}` as Route}>
                      <Button className="w-full" variant="secondary" size="sm">
                       Edit <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <form action={deleteFile} className="">
                      <Input name="id" type="hidden" value={file.id} />
                      <Button
                        type="submit"
                        className="w-full"
                        variant={"destructive"}
                        size="sm"
                      >
                       Remove <Trash className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-red-500 font-medium text-lg">
            No files added yet
          </h2>
        </div>
      )}
    </div>
  );
}
