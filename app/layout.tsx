import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/navbar";
import DashboardWrapper from "@/components/layout/dashboard-wrapper";

const IBM_PLEX_MONO = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Unifile • Modern solution for messy file management",
  description:
    "Unfile is a file management system where students can easily find there relative & important documents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${IBM_PLEX_MONO.className} antialiased`}>
        <>
          <section>
            <header className="backdrop-blur-sm border-b bg-white/20 z-20 sticky top-0">
              <Navbar />
            </header>
            <main className=" mx-auto w-full">
              <DashboardWrapper>{children}</DashboardWrapper>
              <Toaster />
            </main>
          </section>
        </>
      </body>
    </html>
  );
}