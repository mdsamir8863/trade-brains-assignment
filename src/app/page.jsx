"use client";

import SearchBar from "./components/SearchBar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        TradeBrains Stock Ticker
      </h1>

      {/* Subtitle */}
      <p className="mb-8 text-center text-gray-300 text-lg max-w-lg mx-auto">
        Search stock symbols and get real-time prices with interactive charts
        to help you trade smarter.
      </p>

      {/* Search bar */}
      <SearchBar />

      {/* Favorites link */}
      <Link
        href="/favorites"
        className="mt-6 text-emerald-400 hover:text-emerald-300 transition text-sm"
      >
        View Your Favorites →
      </Link>
    </main>
  );
}
