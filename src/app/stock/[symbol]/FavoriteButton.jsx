"use client";

import { useEffect, useState } from "react";
import { isFav, toggleFav } from "../../lib/favs.js";

export default function FavoriteButton({ symbol, name }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!symbol) return;
    setActive(isFav(symbol));
  }, [symbol]);

  function onToggle() {
    const next = toggleFav({ symbol, name });
    setActive(next);
  }

  return (
    <>
      <button
        onClick={onToggle}
        aria-pressed={active}
        className={`flex  justify-center items-center cursor-pointer  gap-1 px-4 py-2 border rounded transition
        ${
          active
            ? "bg-gray-100 text-green-400 ring-1 ring-green-500/40"
            : "bg-white text-gray-400 ring-1 ring-white/10 hover:border-green-500"
        }`}
        title={active ? "Remove from favorites" : "Save to favorites"}
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${
            active ? "fill-green-400 stroke-green-400" : "stroke-gray-300"
          }`}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path d="M11.48 3.499a.75.75 0 011.04 0l2.59 2.59a.75.75 0 00.53.22h3.66a.75.75 0 01.44 1.36l-2.96 2.15a.75.75 0 00-.28.84l1.13 3.48a.75.75 0 01-1.15.84l-3.09-2.25a.75.75 0 00-.88 0l-3.09 2.25a.75.75 0 01-1.15-.84l1.13-3.48a.75.75 0 00-.28-.84l-2.96-2.15a.75.75 0 01.44-1.36h3.66a.75.75 0 00.53-.22l2.59-2.59z" />
        </svg> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className={`h-4 w-4 ${
            active ? "fill-green-400 stroke-green-400" : "stroke-gray-300"
          }`}
        >
          <path d="M3.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.28.53L8 10.06l3.72 3.72a.75.75 0 0 0 1.28-.53V2.75a.75.75 0 0 0-.75-.75h-8.5Z" />
        </svg>

        <span className="text-sm font-medium">{active ? "Saved" : "Save"}</span>
      </button>
    </>
  );
}
