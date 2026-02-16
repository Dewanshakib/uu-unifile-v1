import EditFileForm from "@/components/sections/dashboard/file/edit-file-form";
import { db } from "@/drizzle/db";
import { file, category } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function EditFilePage({ params }: { params: Promise<{ id: string }> }) {
  const fileId =(parseInt((await params).id));
  if (isNaN(fileId)) {
    notFound();
  }

  const fileData = await db.select().from(file).where(eq(file.id, fileId)).limit(1);
  if (fileData.length === 0) {
    notFound();
  }

  const categories = (await db
    .select({ name: category.name })
    .from(category)) as Array<{ name: string }>;

//   console.log("Files ---------->",fileData);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit File</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update the file details. All fields are required.
        </p>
      </div>
      <EditFileForm categories={categories} file={fileData[0]} />
    </div>
  );
}