import AddFileForm from "@/components/sections/dashboard/file/add-file-form";
import { db } from "@/drizzle/db";
import { category } from "@/drizzle/schema";

export default async function AddFilePage() {
  const categories = (await db
    .select({ name: category.name })
    .from(category)) as Array<{ name: string }>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add New File</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload study materials (PDF or IMAGE only). All fields required.
        </p>
      </div>
      <AddFileForm categories={categories} />
    </div>
  );
}

