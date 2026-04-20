import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../style/subnetchart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function SubnetChart({ subnets }) {
  if (!subnets || subnets.length === 0) return null;

  const data = {
    labels: subnets.map((s, i) => `Subnet ${i + 1}`),
    datasets: [
  {
    label: "IP Count per Subnet",
    data: subnets.map((s) => {
      const start = ipToNumber(s.network);
      const end = ipToNumber(s.broadcast);
      return end - start + 1;
    }),

    // 🎨 Colorful bars
    backgroundColor: [
      "#4f46e5", // indigo
      "#22c55e", // green
      "#f59e0b", // amber
      "#ef4444", // red
      "#0ea5e9", // sky
      "#a855f7", // purple
      "#14b8a6", // teal
      "#e11d48", // rose
    ],

    borderColor: "#1e293b",
    borderWidth: 1,
    borderRadius: 6,
  },
],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">📊 Subnet Size Visualization</h3>
        </div>

        <div className="chart-wrapper">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

function ipToNumber(ip) {
  return ip
    .split(".")
    .reduce((acc, val) => (acc << 8) + Number(val), 0);
}

export default SubnetChart;