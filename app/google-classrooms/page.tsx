import { Card, CardContent } from "@/components/ui/card";
import { Route } from "next";
import Link from "next/link";

export default function Files() {
  return (
    <div className="mt-5">
      <h2 className="text-2xl font-semibold">Choose your current year?</h2>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-5">
        {yearData.map((y) => (
          <Link href={y.link as Route} key={y.id}>
            <Card className="p-10 hover:scale-[108%] duration-200">
              <CardContent>
                <div className="grid place-items-center">
                  <h2 className="text-xl font-medium">{y.year}</h2>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

const yearData = [
  {
    id: 1,
    year: "1st",
    link: "/google-classrooms/year/1/semister",
  },
  {
    id: 2,
    year: "2nd",
    link: "/google-classrooms/year/2/semister",
  },
  {
    id: 3,
    year: "3rd",
    link: "/google-classrooms/year/3/semister",
  },
  {
    id: 4,
    year: "4th or Final",
    link: "/google-classrooms/year/4/semister",
  },
];
