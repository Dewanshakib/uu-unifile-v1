import ResetPassword from "@/components/auth/reset-password";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const token = (await searchParams).token;
  return (
    <div className="w-screen h-screen grid place-items-center px-5 md:px-0">
      <ResetPassword token={token} />
    </div>
  );
}
