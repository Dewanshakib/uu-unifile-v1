import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function SectionPage() {
  const sections = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
    { id: 5, name: "E" },
  ];

  return (
    <div className="mt-5">
      <h1 className="text-2xl font-semibold">Choose your section</h1>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-5">
        {sections.map((s) => (
          <Link
            key={s.id}
            href={`/google-classrooms/year/1/semister/1/section/${s.name}/subject`}
          >
            <Card className="p-10 hover:scale-[108%] duration-200">
              <CardContent>
                <div className="grid place-items-center">
                  <h2 className="text-lg font-medium">{s.name}</h2>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
