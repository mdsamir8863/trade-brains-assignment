'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFavs, removeFav } from '../lib/favs.js';

export default function FavoritesPage() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    setFavs(getFavs());
  }, []);

  if (!favs.length) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-200 p-6">
        <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>
        <p className="text-gray-400">No favorites saved yet.</p>
        <Link href="/" className="mt-6 text-emerald-400 hover:underline">
          Go back home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>

        {/* Responsive table */}
        <div className="overflow-x-auto rounded ring-1 ring-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-gray-900/70">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Symbol</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Name</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {favs.map(({ symbol, name }) => (
                <tr key={symbol} className="hover:bg-white/5 transition">
                  <td className="px-4 py-3 font-medium text-emerald-400">
                    <Link href={`/stock/${symbol}`} className="hover:underline">
                      {symbol}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{name}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        removeFav(symbol);
                        setFavs((prev) => prev.filter((f) => f.symbol !== symbol));
                      }}
                      className="text-red-400 hover:cursor-pointer hover:text-red-300 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link href="/" className="block mt-6 text-emerald-400 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
