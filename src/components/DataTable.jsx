// import { useState } from "react";
// import mockData from "../data/mockData";
// import { Chart } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function DataTable() {
//   const [search, setSearch] = useState("");
//   const [sortKey, setSortKey] = useState("id");
//   const [ascending, setAscending] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const handleSort = (key) => {
//     if (sortKey === key) {
//       setAscending(!ascending);
//     } else {
//       setSortKey(key);
//       setAscending(true);
//     }
//   };

//   const filteredData = mockData
//     .filter((item) =>
//       item.name.toLowerCase().includes(search.toLowerCase()) ||
//       item.email.toLowerCase().includes(search.toLowerCase()) ||
//       item.role.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (a[sortKey] < b[sortKey]) return ascending ? -1 : 1;
//       if (a[sortKey] > b[sortKey]) return ascending ? 1 : -1;
//       return 0;
//     });

//   // Pagination logic
//   const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   // Chart data: User activity distribution
//   const chartData = {
//     labels: mockData.map((item) => item.name),
//     datasets: [
//       {
//         label: 'User Activity',
//         data: mockData.map((item) => item.activity),
//         backgroundColor: '#4CAF50',
//         borderColor: '#388E3C',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       title: {
//         display: true,
//         text: 'User Activity Distribution',
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => `${context.raw} activities`,
//         },
//       },
//     },
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4 text-center">User Activity Table</h1>
      
//       {/* Search input */}
//       <input
//         type="text"
//         placeholder="Search..."
//         className="mb-4 p-2 w-full border border-gray-300 rounded-md"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
      
//       {/* Data Table */}
//       <table className="w-full table-auto border border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             {["id", "name", "email", "role", "activity"].map((key) => (
//               <th
//                 key={key}
//                 onClick={() => handleSort(key)}
//                 className="p-2 cursor-pointer hover:bg-gray-200 text-left"
//               >
//                 {key.toUpperCase()} {sortKey === key ? (ascending ? "▲" : "▼") : ""}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedData.map((user) => (
//             <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50">
//               <td className="p-2">{user.id}</td>
//               <td className="p-2">{user.name}</td>
//               <td className="p-2">{user.email}</td>
//               <td className="p-2">{user.role}</td>
//               <td className="p-2">{user.activity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="mt-4 flex justify-between items-center">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           className="px-4 py-2 bg-gray-200 rounded-md"
//         >
//           Previous
//         </button>
//         <span>Page {currentPage}</span>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)))}
//           className="px-4 py-2 bg-gray-200 rounded-md"
//         >
//           Next
//         </button>
//       </div>

//       {/* Chart: User Activity */}
//       <div className="mt-8">
//         <Chart type="bar" data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// }


// src/components/DataTable.jsx

import React, { useState } from 'react';
import mockData from '../data/mockData';

const DataTable = () => {
  // State to store the data
  const [data, setData] = useState(mockData);

  // State to store filter values for each column
  const [filters, setFilters] = useState({
    ID: '',
    Product: '',
    Category: '',
    Region: '',
    Date: '',
    Sales: '',
    Profit: '',
  });

  // Filter the data based on the filter state
  const filteredData = data.filter(item => {
    return Object.keys(filters).every(key => {
      if (!filters[key]) return true;
      if (key === 'Sales' || key === 'Profit') {
        return item[key] >= filters[key];
      }
      return item[key].toString().toLowerCase().includes(filters[key].toLowerCase());
    });
  });

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1>Data Table with Filters</h1>
      <div className="filters">
        {Object.keys(filters).map((filter) => (
          <div key={filter} className="filter">
            <label>{filter}</label>
            <input
              type="text"
              name={filter}
              value={filters[filter]}
              onChange={handleFilterChange}
              placeholder={`Filter by ${filter}`}
            />
          </div>
        ))}
      </div>
      <table className="table">
        <thead>
          <tr>
            {['ID', 'Product', 'Category', 'Region', 'Date', 'Sales', 'Profit'].map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.ID}>
              <td>{row.ID}</td>
              <td>{row.Product}</td>
              <td>{row.Category}</td>
              <td>{row.Region}</td>
              <td>{row.Date}</td>
              <td>{row.Sales}</td>
              <td>{row.Profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
