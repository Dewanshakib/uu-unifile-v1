"use client";
import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, type SignUpSchemaType } from "@/lib/schema";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [isShow, setIsShow] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      batch: "",
      section: "",
    },
  });

  const sectionInput = watch("section");
  const batchInput = watch("batch");

  const router = useRouter();

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      const res = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        batch: data.batch,
        role: "USER",
        section: data.section,
      });

      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      toast.success("Sign Up successful");
      router.push("/sign-in");
      reset();
    } catch (error) {
      // console.log(error instanceof Error ? error.message : "Server error");
      throw new Error(error instanceof Error ? error.message : "Server error");
    }
  };

  const handleSelectInput = (field: keyof SignUpSchemaType, value: string) => {
    setValue(field, value, { shouldValidate: true });
    trigger(field);
  };

  return (
    <Card className="max-w-126 mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
        <CardDescription>
          <p>Please enter your details to sign up</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          {/* name */}
          <div className="">
            <Label>Name</Label>
            <Input
              {...register("name")}
              className="mt-3 placeholder:text-sm"
              placeholder="eg. Dewan Shakib"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* email address */}
          <div className="">
            <Label>Email Address</Label>
            <Input
              {...register("email")}
              className="mt-3 placeholder:text-sm"
              placeholder="eg. shakib@uttara.ac.bd"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* password */}
          <div className="relative">
            <Label>Password</Label>
            <Input
              type={isShow ? "text" : "password"}
              className="mt-3"
              placeholder="************************"
              {...register("password")}
            />
            <div className="absolute right-0 top-[40%]">
              <Button
                variant={"ghost"}
                onClick={() => setIsShow(!isShow)}
                type="button"
              >
                {isShow ? <Eye /> : <EyeOff />}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* section & batch */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 w-full md:gap-10">
            {/* section */}
            <div>
              <Label className="mb-3">Section</Label>
              <Select
                value={sectionInput}
                onValueChange={(value) => handleSelectInput("section", value)}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select your section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sections</SelectLabel>
                    {["A", "B", "C", "D", "E"].map((s: string, idx: number) => (
                      <SelectItem key={idx} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.section && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.section.message}
                </p>
              )}
            </div>
            {/* batch */}
            <div className="">
              <Label className="mb-3">Batch</Label>
              <Select
                value={batchInput}
                onValueChange={(value) => handleSelectInput("batch", value)}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select your batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Batch</SelectLabel>
                    {["65", "66"].map((b: string, idx: number) => (
                      <SelectItem key={idx} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.batch && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.batch.message}
                </p>
              )}
            </div>
          </div>

          {/* submit button */}
          <div className="mt-2 w-full">
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="underline text-gray-900 font-semibold"
          >
            Sign in
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
