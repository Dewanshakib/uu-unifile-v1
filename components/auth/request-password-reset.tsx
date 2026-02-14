"use client";
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
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  RequestPasswordResetSchema,
  RequestPasswordResetSchemaType,
} from "@/lib/schema";
import {zodResolver} from "@hookform/resolvers/zod"
import { requestPasswordReset } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";

export default function RequestPasswordReset() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestPasswordResetSchemaType>({
    resolver: zodResolver(RequestPasswordResetSchema),
  });

  const onSubmit = async (userData: RequestPasswordResetSchemaType) => {
    try {
      const { data, error } = await requestPasswordReset({
        email: userData.email,
        redirectTo: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL!}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success(data?.message);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  };

  return (
    <Card className="max-w-126 w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Forget Password</CardTitle>
        <CardDescription>
          <p>
            Please enter your email address to request a password reset link.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label>Email Address</Label>
            <Input
              {...register("email")}
              className="mt-2 placeholder:text-sm"
              type="email"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="">
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? "Sending reset link..." : "Send Reset Link"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full">
          Remember your password?{" "}
          <Link href="/sign-in" className="font-semibold underline">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
