"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryInput, CategorySchema } from "@/lib/schema";
import { toast } from "sonner";
import { updateCategory } from "@/actions/category";
import { useState } from "react";

interface ICategory {
  id: number;
  name: string | null;
  createdAt: Date;
}

export default function EditCategory({ category }: { category: ICategory }) {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      category: category.name as string,
    },
  });

  const onSubmit = async (data: CategoryInput) => {
    try {
      const formData = new FormData();
      formData.set("category", data.category);

      await updateCategory(category.id, formData);

      toast.success("Category updated");
      setOpen(false);
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Server error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>Update the category name.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("category")}
                placeholder="eg. Exam, Routine, General etc"
              />
              {errors.category && (
                <p className="text-sm font-medium text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <Loader className=" animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}