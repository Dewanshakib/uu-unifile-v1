"use client";
import { signIn } from "@/lib/auth-client";
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
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, type SignInSchemaType } from "@/lib/schema";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [isShow, setIsShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignInSchemaType) => {
    try {
      const res = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      toast.success("Sign In successful");
      router.push("/");
    } catch (error) {
      // console.log(error instanceof Error ? error.message : "Server error");
      throw new Error(error instanceof Error ? error.message : "Server error");
    }
  };

  return (
    <Card className="max-w-126 mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
        <CardDescription>
          <p>Please enter your details to sign in</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          {/* email address */}
          <div className="">
            <Label>Email Address</Label>
            <Input
              {...register("email")}
              className="mt-3 placeholder:text-sm"
              placeholder="eg. 2244082225@uttara.ac.bd"
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
              className="mt-2"
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

          <div className="ml-auto">
            <Link
              href="/request-password-reset"
              className="text-sm font-semibold underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* submit button */}
          <div className="w-full">
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="underline text-gray-900 font-semibold"
          >
            Sign up
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
