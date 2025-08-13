"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${baseUrl}/api/assignment/search?keyword=${encodeURIComponent(query)}&length=10`
        );
        if (!res.ok) throw new Error("Failed to fetch search results");
        const data = await res.json();
        console.log(">>searchBar Data>>", data);
        
        setResults(data || []);
        setIsOpen(true);
      } catch (error) {
        setResults([]);
        setIsOpen(false);
      }
      setLoading(false);
    };

    const debounceTimeout = setTimeout(fetchResults, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query, baseUrl]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate to selected stock details page
  const handleSelect = (symbol) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/stock/${symbol}`);
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <input
        type="text"
        className="w-full border border-gray-300 text-gray-50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Search stocks..."
        value={query}
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
        aria-label="Search stocks"
        autoComplete="off"
      />
      {loading && (
        <div className="absolute right-3 top-3 text-gray-500 animate-spin">
          {/* Simple spinner */}
          <svg
            className="h-5 w-5 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}
      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-auto mt-1 shadow-lg">
          {results.map((stock) => (
            <li
              key={stock.symbol}
              onClick={() => handleSelect(stock.symbol)}
              className="cursor-pointer px-4 py-2 hover:bg-blue-600 hover:text-white"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelect(stock.symbol);
              }}
            >
              <span className="font-semibold">{stock.symbol}</span> - {stock.name}
            </li>
          ))}
        </ul>
      )}
      {isOpen && results.length === 0 && !loading && (
        <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-md mt-1 px-4 py-2 text-gray-500">
          No results found.
        </div>
      )}
    </div>
  );
}
