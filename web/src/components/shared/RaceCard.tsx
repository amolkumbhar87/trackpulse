import { useState } from "react";

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

function RaceCard ()
{

const [horses,   setHorses]   = useState(initialHorses);
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

    return (
        <>
        
        {/* Live race banner */}
        <div className="arm-live-banner">
          <div className="d-flex align-items-center gap-3">
            <span className="arm-live-badge">LIVE</span>
            <span className="arm-race-title">
              Active Race: <strong>#104 Ascot 15:30</strong>
            </span>
            <span className="arm-race-live">(Live Update)</span>
          </div>
          
        </div>

        {/* Two-column layout */}
        <div className="flex-column flex-lg-row">

          {/* ── Left: Update Horse Odds ─────────────────── */}
          <div className="row">
            <div className="arm-panel">
              
              <div className="arm-panel-body">
                <table className="arm-table">
                  <thead>
                    <tr>
                      <th>Horse #</th>
                      <th>Current Win Odds</th>
                      <th>Name</th>
                       <th>Current Place Odds</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {horses.map((horse) => (
                      <tr key={horse.id}>
                        <td><span className="horse-id">{horse.id}</span></td>
                        
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
          </div>
        </>
    );
}

export default RaceCard;