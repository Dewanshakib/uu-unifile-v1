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
import { SubjectInput, SubjectSchema } from "@/lib/schema";
import { toast } from "sonner";
import { updateSubject } from "@/actions/subject";
import { useState } from "react";

interface ISubject {
  id: number;
  name: string | null;
  createdAt: Date;
}

export default function EditSubject({ subject }: { subject: ISubject }) {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubjectInput>({
    resolver: zodResolver(SubjectSchema),
    defaultValues: {
      subject: subject.name as string,
    },
  });

  const onSubmit = async (data: SubjectInput) => {
    try {
      const formData = new FormData();
      formData.set("subject", data.subject);

      await updateSubject(subject.id, formData);

      toast.success("Subject updated");
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
          <DialogTitle>Edit subject</DialogTitle>
          <DialogDescription>Update the subject name.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("subject")}
                placeholder="eg. Computer Science, Mathematics etc"
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
              {isSubmitting ? <Loader className=" animate-spin" /> : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
