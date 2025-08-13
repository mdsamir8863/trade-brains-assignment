
export default function StockLoader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Container with 5 bars simulating candlesticks */}
      <div className="flex space-x-2 items-end">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 bg-gradient-to-t from-green-400 to-green-200 rounded-sm animate-pulse
              ${i % 2 === 0 ? "h-6" : "h-10"}`}
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
