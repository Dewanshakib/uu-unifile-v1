import { Card, CardContent } from "@/components/ui/card";
import { Route } from "next";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-2 max-w-7xl w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {HomeData.map((h) => (
          <Link href={h.src as Route} key={h.id}>
            <Card className="hover:scale-[102%] duration-200">
              <CardContent className=" grid place-items-center p-10 ">
                <h2 className="text-2xl font-semibold">{h.title}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

const HomeData = [
  {
    id: 1,
    title: "Files",
    src: "/files",
  },
  // Temporary off
  // {
  //   id: 2,
  //   title: "Google Classrooms",
  //   src: "/google-classrooms",
  // },
];