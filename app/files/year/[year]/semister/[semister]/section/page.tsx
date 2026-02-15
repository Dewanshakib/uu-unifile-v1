import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function SectionPage({params}:{params:Promise<{year:number,semister:number}>}) {
  const sections = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
    { id: 5, name: "E" },
  ];

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const {year,semister} = await params;
 
  const dynamicSection = session?.user.section as string;

  // console.log(year,semister)

  return (
    <div className="mt-5 px-5">
      <h1 className="text-2xl font-semibold">Choose your section</h1>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-5">
        {sections.map(
          (s) =>
            s.name === dynamicSection && (
              <Link
                key={s.id}
                href={`/files/year/${year}/semister/${semister}/section/${dynamicSection}/category`}
              >
                <Card className="p-10 hover:scale-[108%] duration-200">
                  <CardContent>
                    <div className="grid place-items-center">
                      <h2 className="text-lg font-medium">{s.name}</h2>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ),
        )}
      </div>
    </div>
  );
}
