"use client";

import Link from "next/link";

export default function ErrorPage({ message = "Failed to fetch prices" }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-red-400 p-6">
      <h1 className="text-4xl font-bold mb-4">Error</h1>
      <p className="text-lg mb-6">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 mb-4 bg-red-600 hover:bg-red-700 rounded text-white transition"
      >
        Retry
      </button>
      <Link
        href="/"
        className="text-red-300 hover:text-red-100 underline"
      >
        Go to Home
      </Link>
    </div>
  );
}
