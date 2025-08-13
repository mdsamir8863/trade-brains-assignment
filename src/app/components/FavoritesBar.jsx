'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFavs, removeFav } from '../lib/favs.js';

export default function FavoritesBar() {
  const [items, setItems] = useState([]);

  function load() {
    setItems(getFavs());
  }

  useEffect(() => {
    // initially sab load hoga.
    load();

    // listen to updates across tabs/pages
    const onStorage = (e) => {
      if (e.key === 'tb_favs') load();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!items.length) return null;

  return (
    <div className="w-full max-w-3xl mt-6">
      <div className="text-sm text-gray-300 mb-2">Your favorites</div>
      <div className="flex flex-wrap gap-2">
        {items.map(({ symbol, name }) => (
          <div
            key={symbol}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10
                       hover:bg-white/10 text-gray-200"
          >
            <Link
              href={`/stock/${symbol}`}
              className="font-medium tracking-wide hover:underline"
            >
              {symbol}
            </Link>
            <span className="text-xs text-gray-400">{name}</span>
            <button
              onClick={() => {
                removeFav(symbol);
                setItems((prev) => prev.filter((i) => i.symbol !== symbol));
              }}
              className="ml-1 text-gray-400 hover:text-red-400 transition"
              title="Remove"
              aria-label={`Remove ${symbol}`}
            >
              ×cc
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
