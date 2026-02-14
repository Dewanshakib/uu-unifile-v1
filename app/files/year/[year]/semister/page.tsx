import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function Semister({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const year = (await params).year;

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-semibold">Choose your current semister?</h2>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-5">
        {semisterData.map((s) => (
          <Link
            href={`/files/year/${year}/semister/${s.id}/section`}
            key={s.id}
          >
            <Card className="p-10 hover:scale-[108%] duration-200">
              <CardContent>
                <div className="grid place-items-center">
                  <h2 className="text-xl font-medium">{s.year}</h2>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

const semisterData = [
  {
    id: 1,
    year: "1st",
  },
  {
    id: 2,
    year: "2nd",
  },
  {
    id: 3,
    year: "3rd",
  },
];
