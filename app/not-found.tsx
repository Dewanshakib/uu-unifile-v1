import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-[90vh] grid place-items-center">
      <div className="max-w-3xl w-full text-center flex flex-col gap-y-2">
        <h2 className=" text-9xl font-bold">404</h2>
        <p className="text-3xl font-semibold opacity-80">Page not found</p>
        <h3 className="font-medium opacity-90">
          Please go back to{" "}
          <Link href={"/"} className=" underline font-semibold">
            home
          </Link>
        </h3>
      </div>
    </div>
  );
}