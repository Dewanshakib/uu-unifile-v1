import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function GoogleClassroomHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Google Classrooms</h1>

      <Link href="/dashboard/google-classroom/add-google-classroom">
        <Button variant="outline" className="gap-2">
          Add <Plus className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
