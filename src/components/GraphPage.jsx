// src/components/GraphPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphPage = () => {
  const { state } = useLocation();
  const { filteredData } = state || [];

  // Prepare data for the graph
  const chartData = {
    labels: filteredData.map(item => item.Product),
    datasets: [
      {
        label: 'Sales',
        data: filteredData.map(item => item.Sales),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Profit',
        data: filteredData.map(item => item.Profit),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales and Profit by Product',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="container">
      <h1>Graph Page</h1>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default GraphPage;
