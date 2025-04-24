
import React, { useEffect, useState, useMemo } from "react";
import festivalData from "../data/indian_festival.json";

const Festival = () => {
  const [festivals, setFestivals] = useState([]);
  const [filteredFestivals, setFilteredFestivals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    setFestivals(festivalData);
    setFilteredFestivals(festivalData);
  }, []);

  // Define the correct month order
  const monthOrder = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Get unique & sorted months (chronologically)
  const months = useMemo(() => {
    return [
      ...new Set(
        festivals.map((festival) => festival.month).filter((m) => m && m !== "-1")
      ),
    ].sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)); // Sort based on index in monthOrder
  }, [festivals]);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    const filtered = festivals.filter((festival) => festival.month === month);
    setFilteredFestivals(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const clearFilter = () => {
    setSelectedMonth("");
    setFilteredFestivals(festivals);
  };

  return (
    <div className="flex bg-stone-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 pt-20 bg-white p-6 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Find by Month</h2>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search month..."
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <div className="h-[400px] overflow-y-auto space-y-2">
          {months
            .filter((month) =>
              month.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((month, index) => (
              <button
                key={index}
                onClick={() => handleMonthClick(month)}
                className={`block w-full text-left px-3 py-2 rounded-lg ${
                  selectedMonth === month
                    ? "bg-amber-700 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {month}
              </button>
            ))}
        </div>

        {selectedMonth && (
          <button
            onClick={clearFilter}
            className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg"
          >
            Clear Filter
          </button>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-21 p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Festivals of India
        </h1>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredFestivals.map((festival, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {festival.name}
                
              </h3>

              <p className="text-gray-600 text-sm mt-2">{festival.Festival_name}</p>
              <p className="text-gray-400 text-xs mt-1">{festival.month}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Festival;
