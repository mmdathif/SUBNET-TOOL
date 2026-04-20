import React from 'react'
import SubnetIP from './components/SubnetIP'
import SubnetSplitter from './components/SubnetSplitter'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/Dashboard';
const App = () => {
  return (
    <div>
      <Router>
      <Routes>
        {/* Main Dashboard */}
        <Route path="/*" element={<Dashboard/>} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/calculate" />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App