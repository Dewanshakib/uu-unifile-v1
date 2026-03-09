import { db } from "@/drizzle/db";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Lightweight ping query — just enough to keep Supabase active
    await db.execute(sql`SELECT 1`);

    return NextResponse.json({
      ok: true,
      message: "Database keep-alive ping successful",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[keep-alive] DB ping failed:", error);
    return NextResponse.json(
      { ok: false, error: "Database ping failed" },
      { status: 500 },
    );
  }
}
