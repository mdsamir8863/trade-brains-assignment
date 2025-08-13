"use client";

import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StockLoader from "@/app/components/StockLoader";
import ErrorPage from "@/app/components/ErrorPage";
import FavoriteButton from "./FavoriteButton";
export default function PricesTableAndChart({ params }) {
  const { symbol } = React.use(params);

  const [pricesData, setPricesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPrices() {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        const response = await fetch(
          `${baseUrl}/api/assignment/stock/${symbol}/prices?days=5&type=INTRADAY&limit=30`
        );
        if (!response.ok) throw new Error("Failed to fetch prices");
        const data = await response.json();
        console.log(">>>>", data);

        setPricesData(data || []);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }

    fetchPrices();
  }, [symbol]);

  // Formatting date nicely for table and chart
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Date & Time",
        cell: (info) => formatDate(info.getValue()),
      },
      {
        accessorKey: "open",
        header: "Open",
        cell: (info) => info.getValue().toFixed(2),
      },
      {
        accessorKey: "high",
        header: "High",
        cell: (info) => info.getValue().toFixed(2),
      },
      {
        accessorKey: "low",
        header: "Low",
        cell: (info) => info.getValue().toFixed(2),
      },
      {
        accessorKey: "close",
        header: "Close",
        cell: (info) => info.getValue().toFixed(2),
      },
      {
        accessorKey: "change",
        header: "Change",
        cell: (info) => {
          const val = info.getValue();
          return (
            <span className={val >= 0 ? "text-green-600" : "text-red-600"}>
              {val.toFixed(2)}
            </span>
          );
        },
      },
      {
        accessorKey: "percent",
        header: "Percent (%)",
        cell: (info) => {
          const val = info.getValue();
          return (
            <span className={val >= 0 ? "text-green-600" : "text-red-600"}>
              {val.toFixed(2)}
            </span>
          );
        },
      },
      {
        accessorKey: "volume",
        header: "Volume",
        cell: (info) => info.getValue().toLocaleString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: pricesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <StockLoader />;
  if (error) return <ErrorPage message={error} />;

  return (
    <>
      <Head>
        <title>{`${name} (${symbol}) - Stock Details`}</title>
        <meta
          name="description"
          content={`View ${name} (${symbol}) live stock price, charts, and historical performance.`}
        />
        <meta
          name="keywords"
          content={`${symbol}, ${name}, stock price, live chart, historical data`}
        />
      </Head>

      <div className="p-5 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 ">
          {/* <h2 className="text-3xl font-bold text-gray-100">
            {symbol.toUpperCase()}
            <span className="text-gray-400">({symbol.toUpperCase()})</span>
          </h2> */}
          <h2 className="text-3xl font-bold text-gray-900">
            Stock Prices for {symbol.toUpperCase()}
          </h2>
          <FavoriteButton symbol={symbol} />
        </div>
        {/* Responsive Table */}
        <div className="overflow-x-auto shadow-lg rounded border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      style={{
                        color:
                          cell.column.id === "change" ||
                          cell.column.id === "percent"
                            ? row.original[cell.column.id] >= 0
                              ? "#16a34a"
                              : "#dc2626"
                            : undefined,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Combined Bar and Line Chart */}
        <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-900">
          Price and Volume Trend
        </h3>

        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart
            data={pricesData}
            margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={(str) => {
                const date = new Date(str);
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#4f46e5"
              tick={{ fontSize: 12 }}
              domain={["auto", "auto"]}
              allowDataOverflow={true}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#10b981"
              tick={{ fontSize: 12 }}
              domain={["auto", "auto"]}
              allowDataOverflow={true}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
              }}
              labelFormatter={(label) => formatDate(label)}
            />
            <Legend />
            {/* Close Price Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="close"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={false}
              name="Close Price"
            />
            {/* Volume Bar */}
            <Bar
              yAxisId="right"
              dataKey="volume"
              barSize={20}
              fill="#10b981"
              opacity={0.6}
              name="Volume"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
