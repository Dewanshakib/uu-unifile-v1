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
import { ResetPasswordSchema, ResetPasswordSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword({ token }: { token: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const router = useRouter();

  const [isShow, setIsShow] = useState(false);

  const onSubmit = async (userData: ResetPasswordSchemaType) => {
    try {
      const { data, error } = await resetPassword({
        newPassword: userData.password, // required
        token, //
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password reset successfully");
      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  };

  return (
    <Card className="max-w-126 w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          <p>Please enter your new password.</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label>Password</Label>
            <Input
              {...register("password")}
              className="mt-2 placeholder:text-sm"
              type={isShow ? "text" : "password"}
              placeholder="Enter your password"
            />
            <div className="relative">
              <Button
                onClick={() => setIsShow(!isShow)}
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 bottom-0"
              >
                {!isShow ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="">
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? "Reseting password..." : "Reset Password"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full">
          Remember your password?{" "}
          <Link href="/sign-in" className="font-semibold underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
