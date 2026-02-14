import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function FileHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Files</h1>

      <Link href="/dashboard/file/add-file">
        <Button variant="outline" className="gap-2">
          Add <Plus className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
