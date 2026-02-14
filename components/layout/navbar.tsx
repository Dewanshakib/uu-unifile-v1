"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Compass, FolderOpen, LogIn, ShieldUser } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import SignOut from "../auth/sign-out";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  // private routes
  const privatePaths = usePathname();

  if (
    privatePaths.startsWith("/dashboard") ||
    privatePaths.startsWith("/sign-in") ||
    privatePaths.startsWith("/sign-up")
  ) {
    return "";
  }

  // console.log(session);

  return (
    <div className="p-4 border-b">
      <div className="flex w-full justify-between items-center">
        <Label className="text-2xl text-[#9b2c2c] font-semibold">
          <FolderOpen size={32} color="brown" />
          Unifile{" "}
        </Label>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && (
                <Link href={"/dashboard"}>
                  <Button variant={"default"}>
                    <h2 className=" hidden md:block">Dashboard</h2>{" "}
                    <ShieldUser />{" "}
                  </Button>
                </Link>
              )}

              <Link href={"/"}>
                <Button variant={"secondary"}>
                  <h2 className=" hidden md:block">Browse</h2> <Compass />{" "}
                </Button>
              </Link>
              <SignOut />
            </>
          ) : (
            <Link href={"/sign-in"}>
              <Button>
                Sign in
                <LogIn />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}