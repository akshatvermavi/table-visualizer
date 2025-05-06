//import DataTable from "./components/DataTable";
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataTable from './components/DataTable';
import GraphPage from './components/GraphPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="/graph" element={<GraphPage />} />
      </Routes>
    </Router>
  );
};

export default App;

// function App() {
//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       <DataTable />
//     </div>
//   );
// }

// export default App;
