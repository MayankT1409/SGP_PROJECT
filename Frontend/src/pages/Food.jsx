import React, { useEffect, useState } from "react";
import foodData from "../data/indian_food.json";

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    setFoods(foodData);
    setFilteredFoods(foodData);
  }, []);

  // Get unique and sorted states
  const states = [...new Set(foodData.map((food) => food.state))]
    .filter((state) => state !== "-1") // optional, to remove "-1"
    .sort((a, b) => a.localeCompare(b));

  const handleStateClick = (state) => {
    setSelectedState(state);
    const filtered = foodData.filter((food) => food.state === state);
    setFilteredFoods(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const clearFilter = () => {
    setSelectedState("");
    setFilteredFoods(foodData);
  };

  return (
    <div className="flex bg-stone-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 pt-20 bg-white p-6 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Find by State</h2>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search state..."
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <div className="h-[400px] overflow-y-auto space-y-2">
          {states
            .filter((state) =>
              state.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((state, index) => (
              <button
                key={index}
                onClick={() => handleStateClick(state)}
                className={`block w-full text-left px-3 py-2 rounded-lg ${
                  selectedState === state
                    ? "bg-amber-700 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {state}
              </button>
            ))}
        </div>

        {selectedState && (
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
          Culinary Heritage of India
        </h1>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredFoods.map((food, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {food.name}
              </h3>
              <p className="text-amber-700 text-sm">{food.state}</p>
              <p className="text-gray-600 text-sm mt-2">{food.ingredients}</p>
              <p className="text-gray-400 text-xs mt-1">{food.region}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Food;
