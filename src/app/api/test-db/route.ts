import { NextResponse } from "next/server";
import { clickhouse } from "@/lib/clickhouse";

export async function GET() {
  try {
    // A simple ping to see if the database responds
    const resultSet = await clickhouse.query({
      query: "SELECT 1 AS is_working, version() AS version",
      format: "JSONEachRow",
    });

    const data = await resultSet.json();

    return NextResponse.json({
      success: true,
      message: "ClickHouse is connected!",
      data,
    });
  } catch (error) {
    console.error("ClickHouse Connection Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to connect to ClickHouse" },
      { status: 500 },
    );
  }
}
