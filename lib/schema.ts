import { z } from "zod/v3";

// signup schema
export const SignUpSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z
    .string()
    .email("Invalid email address")
    .regex(/^[a-z0-9._%+-]+@uttara\.ac\.bd$/i, {
      message: "Please use a valid Uttara University email (@uttara.ac.bd)",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long"),
  batch: z.string().min(2, "Batch must be at least 2 characters long"),
  section: z.string().min(1, "Section must be at least 1 character long"),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

// signin schema
export const SignInSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .regex(/^[a-z0-9._%+-]+@uttara\.ac\.bd$/i, {
      message: "Please use a valid Uttara University email (@uttara.ac.bd)",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long"),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

// request password reset schema

export const RequestPasswordResetSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .regex(/^[a-z0-9._%+-]+@uttara\.ac\.bd$/i, {
      message: "Please use a valid Uttara University email (@uttara.ac.bd)",
    }),
});

export type RequestPasswordResetSchemaType = z.infer<
  typeof RequestPasswordResetSchema
>;

// reset password schema
export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long"),
});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

// category schema
export const CategorySchema = z.object({
  category: z
    .string()
    .trim()
    .max(30, { message: "Category name must be under 30 characters" })
    .refine((c) => c !== "", { message: "Please enter category name" }),
});

export type CategoryInput = z.infer<typeof CategorySchema>;

// subject schema
export const SubjectSchema = z.object({
  subject: z
    .string()
    .trim()
    .max(30, { message: "Subject name must be under 30 characters" })
    .refine((s) => s !== "", { message: "Please enter subject name" }),
});

export type SubjectInput = z.infer<typeof SubjectSchema>;

// file schema
export const FileSchema = z.object({
  title: z
    .string()
    .trim()
    .refine((t) => t !== "", { message: "Please enter file name" }),
  link: z
    .string()
    .trim()
    .startsWith("https://", { message: "Please enter a valid link" })
    .refine((s) => s !== "", {
      message: "Please enter file link",
    }),
  category: z
    .string({ message: "Select the category of the file" })
    .trim()
    .max(50, { message: "Category name must be under 50 characters" })
    .refine((c) => c !== "", {
      message: "Select the category of the file",
    }),
  fileType: z.enum(["PDF", "IMAGE"], {
    required_error: "Please select file type",
    invalid_type_error: "File type must be PDF or IMAGE",
  }),
  section: z
    .string({ message: "Select the section for the file" })
    .trim()
    .length(1, { message: "Section must be exactly 1 character" }),
  semester: z
    .string({ message: "Select the semester for the file" })
    .trim()
    .refine((s) => s !== "", {
      message: "Select the semester for this file",
    }),
  year: z
    .string({ message: "Select the year for the file" })
    .trim()
    .refine((y) => y !== "", {
      message: "Select the year for this file",
    }),
});

export type FileInput = z.infer<typeof FileSchema>;

// google classroom schema
export const GoogleClassroomSchema = z.object({
  course: z
    .string()
    .trim()
    .max(300, { message: "Course title must be under 300 characters" })
    .refine((t) => t !== "", { message: "Please enter course title" }),
  code: z
    .string()
    .trim()
    .min(1, { message: "Code is required" })
    .refine((s) => s !== "", {
      message: "Please enter google classroom code",
    }),
  instructor: z
    .string()
    .trim()
    .max(30, { message: "Instructor name must be under 30 characters" })
    .refine((i) => i !== "", {
      message: "Please enter instructor of this course",
    }),
  subject: z
    .string({ message: "Select the subject of the file" })
    .trim()
    .max(30, { message: "Subject name must be under 30 characters" })
    .refine((c) => c !== "", {
      message: "Select the subject of the file",
    }),
  section: z
    .string({ message: "Select the section for the file" })
    .trim()
    .length(1, { message: "Section must be exactly 1 character" })
    .refine((s) => s !== "", {
      message: "Select the section for this file",
    }),
  semester: z
    .string({ message: "Select the semester for the file" })
    .refine((s) => s.trim() !== "", {
      message: "Select the semester for this file",
    }),
  year: z
    .string({ message: "Select the year for the file" })
    .refine((y) => y.trim() !== "", {
      message: "Select the year for this file",
    }),
});

export type GoogleClassroomInput = z.infer<typeof GoogleClassroomSchema>;
