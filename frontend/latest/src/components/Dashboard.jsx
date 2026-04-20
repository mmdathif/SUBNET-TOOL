import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "../style/dashboard.css";

import SubnetCalculator from "./SubnetIP";
import SubnetSplitter from "./SubnetSplitter";
import HistoryExport from "./HistoryExport";

function Dashboard() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-container">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">🌐 NetTool</h2>

        <nav>
          <Link
            to="/calculate"
            className={`sidebar-link ${isActive("/calculate") ? "active" : ""}`}
          >
            📊 Subnet Calculator
          </Link>

          <Link
            to="/split"
            className={`sidebar-link ${isActive("/split") ? "active" : ""}`}
          >
            ✂️ Subnet Splitter
          </Link>

          <Link
            to="/history"
            className={`sidebar-link ${isActive("/history") ? "active" : ""}`}
          >
            📁 History & Export
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        
        {/* Header */}
        <div className="header">
          <h1>Dashboard</h1>
          <p>Manage subnet calculations and network planning</p>
        </div>

        {/* Content Card */}
        <div className="content-card">
          <Routes>
            <Route path="/calculate" element={<SubnetCalculator />} />
            <Route path="/split" element={<SubnetSplitter />} />
            <Route path="/history" element={<HistoryExport />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;