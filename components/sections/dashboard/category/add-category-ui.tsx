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
import { Loader, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryInput, CategorySchema } from "@/lib/schema";
import { toast } from "sonner";
import { addCategory } from "@/actions/category";

export default function AddCategory() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
  });

  const onSubmit = async (data: CategoryInput) => {
    try {
      const formData = new FormData();
      formData.set("category", data.category);

      await addCategory(formData);

      toast.success("Category added");
      reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Server error");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Add <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>{}</DialogDescription>
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
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
