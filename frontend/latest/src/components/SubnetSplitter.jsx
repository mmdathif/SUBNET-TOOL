import React, { useState } from "react";
import axios from "axios";
import SubnetChart from "./SubnetChart";
import "../style/subnetsplitter.css";

function SubnetSplitter() {
  const [ip, setIp] = useState("");
  const [oldCidr, setOldCidr] = useState("");
  const [newCidr, setNewCidr] = useState("");
  const [subnets, setSubnets] = useState([]);

  const handleSplit = async () => {
    if (!ip || !oldCidr || !newCidr) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/subnets", {
        ip,
        oldCidr: Number(oldCidr),
        newCidr: Number(newCidr),
      });
      setSubnets(res.data);
    } catch (err) {
      alert("Error splitting subnet");
    }
  };

  return (
    <div className="splitter-container">
      <h2 className="splitter-title">✂️ Subnet Splitter</h2>

      {/* Form */}
      <div className="splitter-form">
        <input
          className="splitter-input"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP (e.g., 192.168.1.0)"
        />

        <input
          className="splitter-input"
          value={oldCidr}
          onChange={(e) => setOldCidr(e.target.value)}
          placeholder="Old CIDR (e.g., 24)"
        />

        <input
          className="splitter-input"
          value={newCidr}
          onChange={(e) => setNewCidr(e.target.value)}
          placeholder="New CIDR (e.g., 26)"
        />

        <button className="splitter-button" onClick={handleSplit}>
          Split Subnet
        </button>
      </div>

      {/* Subnet List */}
      <div className="subnet-list">
        {subnets.map((s, i) => (
          <div key={i} className="subnet-card">
            <h4>Subnet {i + 1}</h4>
            <p><strong>Network:</strong> {s.network}</p>
            <p><strong>Broadcast:</strong> {s.broadcast}</p>
            <p>
              <strong>Range:</strong> {s.firstHost} - {s.lastHost}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      {subnets.length > 0 && (
        <div className="chart-section">
          <h3 className="chart-title">📊 Visualization</h3>
          <SubnetChart subnets={subnets} />
        </div>
      )}
    </div>
  );
}

export default SubnetSplitter;