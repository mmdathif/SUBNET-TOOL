import React, { useState } from "react";
import axios from "axios";
import "../style/subnetIP.css";

function SubnetIP() {
  const [ip, setIp] = useState("");
  const [cidr, setCidr] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/calculate", {
        ip,
        cidr: Number(cidr),
      });
      setResult(res.data);
    } catch (err) {
      alert("Error calculating subnet");
    }
  };

  return (
    <div className="subnet-container">
      <h2 className="subnet-title">📊 Subnet Calculator</h2>

      <div className="subnet-form">
        <input
          className="subnet-input"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP (e.g., 192.168.1.1)"
        />

        <input
          className="subnet-input"
          value={cidr}
          onChange={(e) => setCidr(e.target.value)}
          placeholder="Enter CIDR (e.g., 24)"
        />

        <button className="subnet-button" onClick={handleCalculate}>
          Calculate
        </button>
      </div>

      {result && (
        <div className="subnet-result">
          <p><strong>Network:</strong> {result.network}</p>
          <p><strong>Broadcast:</strong> {result.broadcast}</p>
          <p><strong>Total Hosts:</strong> {result.hosts}</p>
        </div>
      )}
    </div>
  );
}

export default SubnetIP;