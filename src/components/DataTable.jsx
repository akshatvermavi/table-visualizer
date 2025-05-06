// src/components/DataTable.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockData from "../data/mockData";

const DataTable = () => {
  const [data, setData] = useState(mockData);
  const [filters, setFilters] = useState({
    ID: "",
    Product: "",
    Category: "",
    Region: "",
    Date: "",
    Sales: "",
    Profit: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  // Filter the data based on filter values
  const filteredData = data.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      if (key === "Sales" || key === "Profit") {
        return item[key] >= filters[key];
      }
      return item[key].toString().toLowerCase().includes(filters[key].toLowerCase());
    });
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle submit and navigate to graph page with filtered data
  const handleSubmit = () => {
    navigate("/graph", { state: { filteredData } });
  };

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Data Table with Filters</h1>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Object.keys(filters).map((filter) => (
              <div key={filter} className="flex flex-col">
                <label htmlFor={filter} className="text-sm font-medium text-gray-700 mb-2">
                  {filter}
                </label>
                <input
                  type="text"
                  name={filter}
                  value={filters[filter]}
                  onChange={handleFilterChange}
                  id={filter}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={`Filter by ${filter}`}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
        >
          Submit
        </button>

        {/* Table Display */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto rounded-lg shadow-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                {["ID", "Product", "Category", "Region", "Date", "Sales", "Profit"].map((col) => (
                  <th key={col} className="py-2 px-4 text-left text-sm font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <tr key={row.ID} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-2 px-4 text-sm text-gray-800">{row.ID}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{row.Product}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{row.Category}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{row.Region}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{row.Date}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{row.Sales}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{row.Profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
