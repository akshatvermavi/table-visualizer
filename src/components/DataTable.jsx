import { useState } from "react";
import mockData from "../data/mockData";

export default function DataTable() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [ascending, setAscending] = useState(true);

  const handleSort = (key) => {
    if (sortKey === key) {
      setAscending(!ascending);
    } else {
      setSortKey(key);
      setAscending(true);
    }
  };

  const filteredData = mockData
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return ascending ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return ascending ? 1 : -1;
      return 0;
    });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">User Activity Table</h1>
      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 w-full border border-gray-300 rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {["id", "name", "email", "role", "activity"].map((key) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="p-2 cursor-pointer hover:bg-gray-200 text-left"
              >
                {key.toUpperCase()} {sortKey === key ? (ascending ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
