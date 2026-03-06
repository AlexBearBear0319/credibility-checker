"use client"; // Marks this as a Client Component so we can use React hooks

import { useEffect, useState } from "react";

// Define the shape of our data
interface ClaimCheck {
  id: string;
  source_url: string;
  claim_text: string;
  llama_credibility_score: number;
  is_flagged: number;
  checked_at: string;
}

export default function Home() {
  const [claims, setClaims] = useState<ClaimCheck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/claims");
        const result = await response.json();
        if (result.success) {
          setClaims(result.data);
        }
      } catch (error) {
        console.error("Error fetching claims:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen p-10 bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          Credibility Analysis Dashboard
        </h1>

        {loading ? (
          <p className="text-lg animate-pulse">
            Checking database connection...
          </p>
        ) : (
          <div className="grid gap-4">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className={`p-6 rounded-lg border shadow-sm ${claim.is_flagged ? "bg-red-50 border-red-200" : "bg-white border-gray-200"}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-semibold text-lg">{claim.claim_text}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${claim.is_flagged ? "bg-red-200 text-red-800" : "bg-green-100 text-green-800"}`}
                  >
                    Score: {claim.llama_credibility_score}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  Source: {claim.source_url}
                </p>
                <p className="text-xs text-gray-400">
                  Checked at: {new Date(claim.checked_at).toLocaleString()}
                </p>
              </div>
            ))}

            {claims.length === 0 && (
              <p className="text-gray-500">
                No data found. Did you insert the sample rows into ClickHouse?
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
