# Interactive Data Table & Graph Visualization

This is a responsive and interactive frontend project built with **React**, **Tailwind CSS**, and **Chart.js**. It features a dynamic data table with filtering, pagination, and navigation to a graph page for visual insights using bar charts. The data is mock data stored locally and managed via React state.

---

## Features

### Data Table Page (`/`)

- **Filterable Columns**: Search and filter by `ID`, `Product`, `Category`, `Region`, `Date`, `Sales`, and `Profit`.
- **Range Filtering**: For `Sales` and `Profit`, it supports filtering values greater than or equal to the entered amount.
- **Pagination**: Navigate through data with "Previous" and "Next" buttons.
- **Responsive Design**: Clean and adaptable UI using Tailwind CSS.
- **Submit to Graph View**: Click "Submit" to visualize the currently filtered data on the Graph page.

### Graph Page (`/graph`)

- **Bar Chart**: Displays `Sales` and `Profit` for each product using Chart.js.
- **Color Coded Bars**: Two datasets with distinct colors for better visualization.
- **Stacked View**: Makes it easier to compare Sales vs Profit.
- **Mobile-Friendly Layout**: Maintains readability and usability on smaller screens.

---

## Tech Stack

- **React.js** – UI library for building user interfaces.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **React Router DOM** – For navigation between the table and graph pages.
- **Chart.js** + `react-chartjs-2` – For rendering bar charts.
- **Mock Data** – Simulated dataset used for demonstration and filtering.

---

## Folder Structure

project-root/

├── src/

│   ├── components/

│   │   ├── DataTable.jsx      # Main table page with filters and pagination

│   │   ├── GraphPage.jsx      # Chart page displaying filtered data

│   ├── data/

│   │   └── mockData.js        # Local JSON-like array for mock sales data

│   ├── App.jsx                # Route setup

│   ├── index.jsx              # Entry point

│   └── index.css              # Tailwind and custom styling

├── public/

│   └── index.html

├── package.json

└── README.md



## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/data-table-visualization.git
   cd data-table-visualization
   npm install
   npm start
   Now open- http://localhost:5173/
   ```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
