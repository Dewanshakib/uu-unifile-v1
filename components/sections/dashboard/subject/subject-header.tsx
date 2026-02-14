import React from "react";
import AddSubject from "./add-subject-ui";

export default function SubjectHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Subjects</h1>

      <AddSubject />
    </div>
  );
}
