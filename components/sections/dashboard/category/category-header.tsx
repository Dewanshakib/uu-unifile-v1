import React from "react";
import AddCategory from "./add-category-ui";

export default function CategoryHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Categories</h1>

      <AddCategory />
    </div>
  );
}
