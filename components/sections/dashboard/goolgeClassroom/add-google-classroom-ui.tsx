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
import { Loader2 as Loader, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { addGoogleClassroom } from "@/actions/google-classroom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoogleClassroomInput, GoogleClassroomSchema } from "@/lib/schema";

interface GoogleClassroomProps {
  subjects: Array<{ name: string }>;
}

export default function AddGoogleClassroom({ subjects }: GoogleClassroomProps) {
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    reset,
    watch, // ← WATCH VALUES
    formState: { errors, isSubmitting },
  } = useForm<GoogleClassroomInput>({
    resolver: zodResolver(GoogleClassroomSchema),
    mode: "onChange",
    defaultValues: {
      course: "",
      code: "",
      instructor: "",
      subject: "",
      section: "",
      semester: "",
      year: "",
    },
  });

  // Watch all select fields
  const subjectValue = watch("subject");
  const sectionValue = watch("section");
  const semesterValue = watch("semester");
  const yearValue = watch("year");

  const onSubmit = async (data: GoogleClassroomInput) => {
    try {
      const formData = new FormData();
      formData.set("course", data.course);
      formData.set("code", data.code);
      formData.set("instructor", data.instructor);
      formData.set("subject", data.subject);
      formData.set("section", data.section);
      formData.set("semester", data.semester);
      formData.set("year", data.year);

      await addGoogleClassroom(formData);

      toast.success("Google Classroom added successfully!");

      // FULL RESET — NOW SELECTS WILL ACTUALLY CLEAR
      reset({
        course: "",
        code: "",
        instructor: "",
        subject: "",
        section: "",
        semester: "",
        year: "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add classroom"
      );
    }
  };

  const handleSelectChange = (
    field: keyof GoogleClassroomInput,
    value: string
  ) => {
    setValue(field, value, { shouldValidate: true });
    trigger(field);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          Add <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add Google Classroom
          </DialogTitle>
          <DialogDescription>
            Link your class. Only semesters & years 1–4 allowed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* TITLE */}
          <div className="grid gap-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              {...register("course")}
              placeholder="e.g. ZNT_CSE0613101_Fall_2025"
              className="placeholder:text-sm placeholder:md:text-base"
            />
            {errors.course && (
              <p className="text-sm text-red-500">{errors.course.message}</p>
            )}
          </div>

          {/* CODE */}
          <div className="grid gap-2">
            <Label htmlFor="code">Classroom Code</Label>
            <Input
              {...register("code")}
              placeholder="e.g. 5yhjg3"
              className="font-mono placeholder:text-sm placeholder:md:text-base"
            />
            {errors.code && (
              <p className="text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>

          {/* INSTRUCTOR */}
          <div className="grid gap-2">
            <Label htmlFor="instructor">Instructor</Label>
            <Input
                {...register("instructor")}
              placeholder="e.g. Mr. Rahim, Mrs. Sara"
              className="placeholder:text-sm placeholder:md:text-base"
            />
            {errors.instructor && (
              <p className="text-sm text-red-500">
                {errors.instructor.message}
              </p>
            )}
          </div>

          {/* SUBJECT */}
          <div className="grid gap-2">
            <Label>Subject</Label>
            <Select
              value={subjectValue} // ← CONTROLLED
              onValueChange={(value) => handleSelectChange("subject", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((sub, idx) => (
                  <SelectItem key={idx} value={sub.name}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>

          {/* SECTION & SEMESTER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Section</Label>
              <Select
                value={sectionValue} // ← CONTROLLED
                onValueChange={(value) => handleSelectChange("section", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose section" />
                </SelectTrigger>
                <SelectContent>
                  {["A", "B", "C", "D", "E"].map((s) => (
                    <SelectItem key={s} value={s}>
                      Section {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.section && (
                <p className="text-sm text-red-500">{errors.section.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Semester</Label>
              <Select
                value={semesterValue} // ← CONTROLLED
                onValueChange={(value) => handleSelectChange("semester", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="1 to 4" />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3", "4"].map((s) => (
                    <SelectItem key={s} value={s}>
                      Semester {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.semester && (
                <p className="text-sm text-red-500">
                  {errors.semester.message}
                </p>
              )}
            </div>
          </div>

          {/* YEAR */}
          <div className="grid gap-2">
            <Label>Year</Label>
            <Select
              value={yearValue} // ← CONTROLLED
              onValueChange={(value) => handleSelectChange("year", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="1st to 4th Year" />
              </SelectTrigger>
              <SelectContent>
                {["1", "2", "3", "4"].map((y) => (
                  <SelectItem key={y} value={y}>
                    Year {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.year && (
              <p className="text-sm text-red-500">{errors.year.message}</p>
            )}
          </div>

          <DialogFooter className="flex gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Classroom"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}