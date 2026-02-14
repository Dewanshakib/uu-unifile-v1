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
import { FileInput, FileSchema } from "@/lib/schema";
import { toast } from "sonner";
import { addFile } from "@/actions/file";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ICategory {
  categories: Array<{ name: string }>;
}

export default function AddFile({ categories }: ICategory) {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    trigger,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm<FileInput>({
    resolver: zodResolver(FileSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      link: "",
      category: "",
      section: "",
      semester: "",
      year: "",
    },
  });
  const categoryValue = watch("category");
  const fileTypeValue = watch("fileType");
  const sectionValue = watch("section");
  const semesterValue = watch("semester");
  const yearValue = watch("year");

  const onSubmit = async (data: FileInput) => {
    try {
      const formData = new FormData();
      formData.set("category", data.category);
      formData.set("title", data.title);
      formData.set("link", data.link);
      formData.set("fileType", data.fileType);
      formData.set("section", data.section);
      formData.set("semester", data.semester);
      formData.set("year", data.year);

      await addFile(formData);

      toast.success("File uploaded successfully!");

      // FULL RESET — NOW SELECTS WILL ACTUALLY CLEAR
      reset({
        title: "",
        link: "",
        category: "",
        // fileType: "",
        section: "",
        semester: "",
        year: "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload file"
      );
    }
  };

  const handleSelectChange = (field: keyof FileInput, value: string) => {
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
          <DialogTitle className="text-xl font-bold">Add New File</DialogTitle>
          <DialogDescription>
            Upload study materials (PDF or IMAGE only). All fields required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* TITLE */}
          <div className="grid gap-2">
            <Label htmlFor="title">File Title</Label>
            <Input
              {...register("title")}
              placeholder="e.g. CSE Midterm Notes"
              className="placeholder:text-sm placeholder:md:text-base"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* LINK */}
          <div className="grid gap-2">
            <Label htmlFor="src">Google Drive / OneDrive Link</Label>
            <Input
              {...register("link")}
              placeholder="https://drive.google.com/..."
              className="placeholder:text-sm placeholder:md:text-base"
            />
            {errors.link && (
              <p className="text-sm text-red-500">{errors.link.message}</p>
            )}
          </div>

          {/* CATEGORY - DYNAMIC */}
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              value={categoryValue} // ← CONTROLLED
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                     {categories &&
                  categories.map((cat, idx) => (
                    <SelectItem
                      key={idx}
                      value={cat?.name?.toLowerCase() as string}
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FILE TYPE - PDF or IMAGE */}
            <div className="grid gap-2">
              <Label>File Type</Label>
              <Select
                value={fileTypeValue} // ← CONTROLLED
                onValueChange={(value) => handleSelectChange("fileType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="PDF or IMAGE only" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="IMAGE">IMAGE</SelectItem>
                </SelectContent>
              </Select>
              {errors.fileType && (
                <p className="text-sm text-red-500">
                  {errors.fileType.message}
                </p>
              )}
            </div>

            {/* SECTION */}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SEMESTER - 1 to 4 */}
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

            {/* YEAR - 1 to 4 */}
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
                  Uploading...
                </>
              ) : (
                "Add File"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
