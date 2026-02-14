import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/drizzle/db";
import { file } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import { revalidatePath } from "next/cache";

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

                  <form action={deleteFile} className="mt-auto">
                    <Input name="id" type="hidden" value={file.id} />
                    <Button
                      type="submit"
                      className="w-full"
                      variant={"destructive"}
                    >
                      Delete <Trash />
                    </Button>
                  </form>
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
