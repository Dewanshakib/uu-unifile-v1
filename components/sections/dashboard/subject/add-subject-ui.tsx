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
import { SubjectInput, SubjectSchema } from "@/lib/schema";
import { toast } from "sonner";
import { addSubject } from "@/actions/subject";

export default function AddSubject() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubjectInput>({
    resolver: zodResolver(SubjectSchema),
  });

  const onSubmit = async (data: SubjectInput) => {
    try {
      const formData = new FormData();
      formData.set("subject", data.subject);

      await addSubject(formData);

      toast.success("Subject added");
      reset();
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
          <DialogTitle>Create subject</DialogTitle>
          <DialogDescription>{}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("subject")}
                placeholder="eg. English, Mathmatics, Physics, CSE or Programming"
              />
              {errors.subject && (
                <p className="text-sm font-medium text-red-500">
                  {errors.subject.message}
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
