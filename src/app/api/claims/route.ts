import { NextResponse } from "next/server";
import { clickhouse } from "@/lib/clickhouse"; // Ensure your clickhouse client is here

export async function GET() {
  try {
    const resultSet = await clickhouse.query({
      query:
        "SELECT * FROM ahrefs_claim_checks ORDER BY checked_at DESC LIMIT 10",
      format: "JSONEachRow",
    });

    const data = await resultSet.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database Error:", error);
    // Return detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: "Failed to fetch data", details: errorMessage },
      { status: 500 },
    );
  }
}
