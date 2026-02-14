"use client";
import { Loader } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

export default function GlobalLoaderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true); // Start with true to show the loader immediately!

  useEffect(() => {
    const LOADER_DELAY = 2000;

    const timer = setTimeout(() => {
      setLoading(false);
    }, LOADER_DELAY);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen grid place-items-center text-2xl bg-white dark:bg-black">
        <Loader
          size={50}
          className="animate-spin" // Splash of color for fun; swap to your theme.
          aria-label="Loading content, please wait" // Accessibility win—screen readers love this.
        />
      </div>
    );
  }

  return <>{children}</>; // Fragment for clean rendering; no extra div if not needed.
}