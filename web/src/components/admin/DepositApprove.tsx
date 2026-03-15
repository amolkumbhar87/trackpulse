import { useState } from "react";

const initialDeposits = [
  { userId: "User 101", amount:  450.00, status: "approve" },
  { userId: "User 102", amount: -330.00, status: "reject"  },
  { userId: "User 103", amount: -356.00, status: "approve" },
];


export default function DepositApprove () {
    const [deposits, setDeposits] = useState(initialDeposits);

    const handleDeposit = (userId, action) => {
    setDeposits((prev) =>
      prev.map((d) => (d.userId === userId ? { ...d, status: action } : d))
    );
  };

    
  return (
    <div className="p-4">
     

      {/* Page title */}
               

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
    
  );
}