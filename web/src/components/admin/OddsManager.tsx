// src/components/admin/AdminRaceManagement.jsx
import { useState } from "react";
import { Badge, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// ── Sample data ───────────────────────────────────────────────────────────────
const initialHorses = [
  { id: "#01", name: "Silver Bullet",   odds: 4.5  },
  { id: "#02", name: "Midnight Dash",   odds: 4.5  },
  { id: "#03", name: "Midnight Dash",   odds: 4.5  },
  { id: "#04", name: "Silver Bullet",   odds: 4.5  },
  { id: "#05", name: "Silver Foroxa",   odds: 4.5  },
  { id: "#06", name: "Silver Granvt",   odds: 3.5  },
  { id: "#07", name: "Midnight Dash",   odds: 3.0  },
  { id: "#08", name: "Silver Bullet",   odds: 4.5  },
  { id: "#09", name: "Silver Kinest",   odds: 3.0  },
  { id: "#10", name: "Midnight Dash",   odds: 4.5  },
  { id: "#11", name: "Driver Lineve",   odds: 4.5  },
  { id: "#12", name: "Roscor Dash",     odds: 4.5  },
  { id: "#13", name: "Silver Bullet",   odds: 4.5  },
];

const initialDeposits = [
  { userId: "User 101", amount:  450.00, status: "approve" },
  { userId: "User 102", amount: -330.00, status: "reject"  },
  { userId: "User 103", amount: -356.00, status: "approve" },
];

// ── Sparkline (pure SVG, no lib needed) ──────────────────────────────────────


const trendData = [40, 55, 48, 65, 58, 72, 68, 85, 78, 90, 82, 100, 95, 110];

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  .arm-root {
    font-family: 'DM Sans', sans-serif;
    background: #0f1117;
    min-height: 100vh;
    padding: 24px;
    color: #e2e8f0;
  }

  /* Live banner */
  .arm-live-banner {
    background: linear-gradient(90deg, #1a1f2e 0%, #151929 100%);
    border: 1px solid #2d3550;
    border-left: 3px solid #f59e0b;
    border-radius: 8px;
    padding: 10px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .arm-live-badge {
    background: #ef4444;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 2px 8px;
    border-radius: 4px;
    animation: pulse 1.5s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.6; }
  }
  .arm-race-title {
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }
  .arm-race-live {
    color: #f59e0b;
    font-weight: 600;
    font-size: 13px;
    margin-left: 10px;
  }
  .arm-remove-btn {
    background: #374151;
    border: none;
    color: #9ca3af;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .arm-remove-btn:hover { background: #ef4444; color: #fff; }

  /* Panel card */
  .arm-panel {
    background: #151929;
    border: 1px solid #1e2640;
    border-radius: 10px;
    overflow: hidden;
    height: 100%;
  }
  .arm-panel-header {
    background: #1a1f30;
    border-bottom: 1px solid #1e2640;
    padding: 12px 16px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #94a3b8;
  }
  .arm-panel-body {
    padding: 0;
    overflow-y: auto;
    max-height: 480px;
    scrollbar-width: thin;
    scrollbar-color: #2d3550 transparent;
  }
  .arm-panel-body::-webkit-scrollbar { width: 4px; }
  .arm-panel-body::-webkit-scrollbar-thumb { background: #2d3550; border-radius: 4px; }

  /* Odds table */
  .arm-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12.5px;
  }
  .arm-table thead th {
    background: #1a1f30;
    color: #64748b;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 8px 12px;
    border-bottom: 1px solid #1e2640;
    white-space: nowrap;
  }
  .arm-table tbody tr {
    border-bottom: 1px solid #1a1f2e;
    transition: background 0.15s;
  }
  .arm-table tbody tr:hover { background: #1e2438; }
  .arm-table tbody td {
    padding: 7px 12px;
    color: #cbd5e1;
    vertical-align: middle;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
  }
  .arm-table tbody td:nth-child(2) {
    font-family: 'DM Sans', sans-serif;
    color: #e2e8f0;
    font-weight: 500;
  }
  .horse-id { color: #475569; font-size: 11px; }

  /* Odds input */
  .odds-input {
    background: #0f1117;
    border: 1px solid #2d3550;
    border-radius: 5px;
    color: #f1f5f9;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    padding: 4px 8px;
    width: 60px;
    text-align: center;
    transition: border-color 0.2s;
  }
  .odds-input:focus {
    outline: none;
    border-color: #1b84ff;
    box-shadow: 0 0 0 2px rgba(27,132,255,0.15);
  }

  /* Update button */
  .update-btn {
    background: #1b84ff;
    border: none;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    white-space: nowrap;
  }
  .update-btn:hover  { background: #3b99ff; }
  .update-btn:active { transform: scale(0.97); }
  .update-btn.saved  { background: #10b981; }

  /* Deposits section */
  .arm-sub-header {
    padding: 12px 16px 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #94a3b8;
    border-bottom: 1px solid #1e2640;
  }

  .deposit-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 16px;
    border-bottom: 1px solid #1a1f2e;
    gap: 8px;
    transition: background 0.15s;
  }
  .deposit-row:hover { background: #1e2438; }
  .deposit-user {
    font-size: 12px;
    color: #94a3b8;
    font-family: 'DM Mono', monospace;
    min-width: 64px;
  }
  .deposit-amount {
    font-family: 'DM Mono', monospace;
    font-size: 12.5px;
    font-weight: 600;
    min-width: 72px;
    text-align: right;
  }
  .deposit-amount.positive { color: #10b981; }
  .deposit-amount.negative { color: #ef4444; }
  .deposit-actions { display: flex; gap: 6px; }

  .approve-btn {
    background: #10b981;
    border: none;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .approve-btn:hover { background: #059669; }
  .reject-btn {
    background: #374151;
    border: none;
    color: #9ca3af;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .reject-btn:hover { background: #ef4444; color: #fff; }
  .deposit-badge-approve {
    background: rgba(16,185,129,0.15);
    color: #10b981;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
  }
  .deposit-badge-reject {
    background: rgba(239,68,68,0.12);
    color: #ef4444;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
  }

  /* Market trend */
  .arm-trend-section {
    padding: 14px 16px;
  }
  .arm-trend-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 12px;
  }
  .arm-trend-labels {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #475569;
    font-family: 'DM Mono', monospace;
    margin-top: 6px;
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function OddsManager() {
  const [horses,   setHorses]   = useState(initialHorses);
  const [deposits, setDeposits] = useState(initialDeposits);
  const [saved,    setSaved]    = useState({});

  const handleOddsChange = (id, value) => {
    setHorses((prev) =>
      prev.map((h) => (h.id === id ? { ...h, odds: value } : h))
    );
  };

  const handleUpdate = (id) => {
    setSaved((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setSaved((prev) => ({ ...prev, [id]: false })), 1500);
  };

  const handleDeposit = (userId, action) => {
    setDeposits((prev) =>
      prev.map((d) => (d.userId === userId ? { ...d, status: action } : d))
    );
  };

  return (
    <>
      <style>{styles}</style>
      <div className="arm-root">

        {/* Page title */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            
            <p style={{ color: "#475569", fontSize: 12, margin: "2px 0 0" }}>
              Live odds control &amp; deposit approvals
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="update-btn" style={{ padding: "7px 16px", fontSize: 12 }}>
              <i className="bi bi-plus me-1" />Add Race
            </button>
          </div>
        </div>

        {/* Live race banner */}
        <div className="arm-live-banner">
          <div className="d-flex align-items-center gap-3">
            <span className="arm-live-badge">LIVE</span>
            <span className="arm-race-title">
              Active Race: <strong>#104 Ascot 15:30</strong>
            </span>
            <span className="arm-race-live">(Live Update)</span>
          </div>
          <button className="arm-remove-btn">Remove Race</button>
        </div>

        {/* Two-column layout */}
        <div className="row g-3">

          {/* ── Left: Update Horse Odds ─────────────────── */}
          <div className="col-12 col-lg-7">
            <div className="arm-panel">
              <div className="arm-panel-header">Update Horse Odds</div>
              <div className="arm-panel-body">
                <table className="arm-table">
                  <thead>
                    <tr>
                      <th>Horse #</th>
                      <th>Name</th>
                      <th>Current Odds</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {horses.map((horse) => (
                      <tr key={horse.id}>
                        <td><span className="horse-id">{horse.id}</span></td>
                        <td>{horse.name}</td>
                        <td>
                          <input
                            type="number"
                            className="odds-input"
                            value={horse.odds}
                            step={0.5}
                            min={1}
                            onChange={(e) => handleOddsChange(horse.id, e.target.value)}
                          />
                        </td>
                        <td>
                          <button
                            className={`update-btn ${saved[horse.id] ? "saved" : ""}`}
                            onClick={() => handleUpdate(horse.id)}
                          >
                            {saved[horse.id] ? "✓ Saved" : "Update"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Right: Deposits + Market Trend ─────────── */}
          <div className="col-12 col-lg-5 d-flex flex-column gap-3">

            {/* Pending Deposits */}
            <div className="arm-panel">
              <div className="arm-panel-header">Pending Deposits</div>

              {/* Column labels */}
              <div style={{ display: "flex", padding: "6px 16px", borderBottom: "1px solid #1e2640" }}>
                <span style={{ fontSize: 10, color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", flex: 1 }}>User ID</span>
                <span style={{ fontSize: 10, color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", minWidth: 72, textAlign: "right" }}>Amount</span>
                <span style={{ fontSize: 10, color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", minWidth: 120, textAlign: "right" }}>Action</span>
              </div>

              {deposits.map((dep) => (
                <div className="deposit-row" key={dep.userId}>
                  <span className="deposit-user">{dep.userId}</span>
                  <span className={`deposit-amount ${dep.amount >= 0 ? "positive" : "negative"}`}>
                    {dep.amount >= 0 ? "+" : ""}${Math.abs(dep.amount).toFixed(2)}
                  </span>
                  <div className="deposit-actions">
                    {dep.status === "approve" ? (
                      <>
                        <button className="approve-btn" onClick={() => handleDeposit(dep.userId, "approved")}>
                          APPROVE
                        </button>
                        <button className="reject-btn" onClick={() => handleDeposit(dep.userId, "rejected")}>
                          REJECT
                        </button>
                      </>
                    ) : dep.status === "reject" ? (
                      <>
                        <button className="approve-btn" onClick={() => handleDeposit(dep.userId, "approved")}>
                          APPROVE
                        </button>
                        <button className="reject-btn" onClick={() => handleDeposit(dep.userId, "rejected")}>
                          REJECT
                        </button>
                      </>
                    ) : dep.status === "approved" ? (
                      <span className="deposit-badge-approve">✓ Approved</span>
                    ) : (
                      <span className="deposit-badge-reject">✕ Rejected</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            

          </div>
        </div>
      </div>
    </>
  );
}