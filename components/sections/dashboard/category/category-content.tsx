import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/drizzle/db";
import { category } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { TrashIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import EditCategory from "./edit-category-ui";

export default async function CategoryContent() {
  const categories = await db.select().from(category);

  const deleteCategory = async (formData: FormData) => {
    "use server";
    const categoryId = formData.get("id") as string;

    await db.delete(category).where(eq(category.id, Number(categoryId)));
    revalidatePath("/dashboard/category");
  };

  return (
    <div className="mt-5 ">
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, idx: number) => (
            <Card key={category.id}>
              <CardContent>
                <div className="flex w-full justify-between items-center">
                  <h2 className="font-medium text-lg flex flex-row items-center gap-x-2">
                    {idx + 1}. {category.name}
                  </h2>
                  <div className="flex gap-2">
                    <EditCategory category={category} />
                    <form action={deleteCategory}>
                      <Input name="id" type="hidden" value={category.id} />
                      <Button
                        type="submit"
                        size={"icon-sm"}
                        variant={"destructive"}
                      >
                        <TrashIcon />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-red-500 font-medium text-lg">
          No category added yet.
        </div>
      )}
    </div>
  );
}
