import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { category } from "@/drizzle/schema";
import { asc } from "drizzle-orm";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  // Drizzle — clean, fast, typed
  const categories = await db
    .select()
    .from(category)
    .orderBy(asc(category.name));

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-semibold">Choose your category</h2>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-5">
        {categories.length > 0 ? (
          categories.map((c) => (
            <Link
              href={`/files/year/1/semister/1/section/${section}/category/${encodeURIComponent(
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
