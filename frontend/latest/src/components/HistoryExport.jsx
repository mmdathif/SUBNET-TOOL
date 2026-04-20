import React, { useState } from "react";
import axios from "axios";
import "../style/historyexport.css";

function HistoryExport() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/history");
      setHistory(res.data);
    } catch (err) {
      alert("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const exportJSON = () => {
    if (!history || history.length === 0) {
      alert("No history data to export");
      return;
    }

    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "history.json";
    a.click();
  };

  const exportCSV = () => {
  if (!history || history.length === 0) {
    alert("No history data to export");
    return;
  }

  let csv = "Type,IP,CIDR,OldCIDR,NewCIDR,Time,Details\n";

  history.forEach((h) => {
    if (h.type === "split" || h.subnets) {
      csv += `split,${h.ip},,${h.oldCidr},${h.newCidr},${h.time},Subnets:${h.subnets?.length || 0}\n`;
    } else {
      csv += `calculate,${h.ip},${h.cidr},,,${h.time},Hosts:${h.result?.hosts || "N/A"}\n`;
    }
  });

  const blob = new Blob([csv], { type: "text/csv" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "history.csv";
  a.click();
};

  return (
    <div className="history-container">
      <h2 className="history-title">📁 History & Export</h2>

      {/* Buttons */}
      <div className="history-actions">
        <button className="history-button btn-primary" onClick={fetchHistory}>
          {loading ? "Loading..." : "Load History"}
        </button>

        <button className="history-button btn-secondary" onClick={exportJSON}>
          Export JSON
        </button>

        <button className="history-button btn-success" onClick={exportCSV}>
          Export CSV
        </button>
      </div>

      {/* History List */}
      <div className="history-list">
        {history.length === 0 && (
          <p className="empty-text">No history found</p>
        )}

        {history.map((h, i) => (
          <div key={i} className="history-card">
            
            {/* SPLIT */}
            {h.type === "split" || h.subnets ? (
              <>
                <p>
                  <b>
                    {h.ip}/{h.oldCidr} → /{h.newCidr}
                  </b>
                </p>
                <p>Subnets: {h.subnets?.length || 0}</p>
              </>
            ) : (
              /* CALCULATE */
              <>
                <p>
                  <b>
                    {h.ip}/{h.cidr}
                  </b>
                </p>

                <p>Network: {h.result?.network || "N/A"}</p>
                <p>Broadcast: {h.result?.broadcast || "N/A"}</p>
                <p>Hosts: {h.result?.hosts || "N/A"}</p>
              </>
            )}

            <p>
              <b>Time:</b>{" "}
              {h.time ? new Date(h.time).toLocaleString() : "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryExport;