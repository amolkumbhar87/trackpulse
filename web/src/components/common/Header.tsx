// components/layout/AppHeader.jsx
import { useState } from "react";
import { Container, Nav, Dropdown, Form, InputGroup, Button } from "react-bootstrap";
import '../../styles/Header.css';
import "bootstrap/dist/css/bootstrap.min.css";

const notifications = [
  { title: "New user registered", desc: "2 min ago", icon: "bi-person-plus-fill", bg: "#e9f3ff", color: "#1b84ff" },
  { title: "Server load at 80%", desc: "1 hour ago", icon: "bi-exclamation-triangle-fill", bg: "#fff8ea", color: "#f6b100" },
  { title: "Campaign approved", desc: "3 hours ago", icon: "bi-check-circle-fill", bg: "#e9fff3", color: "#17c653" },
  { title: "New order received", desc: "Yesterday", icon: "bi-bag-fill", bg: "#ffe9ef", color: "#f8285a" },
];

// const navItems = ["Pages", "Apps", "Help"];

export default function Header({ onSidebarToggle }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      
      <div className="app-header">
        <Container fluid className="h-100 d-flex align-items-center justify-content-between px-4">

          {/* Left: Mobile toggle + Logo */}
          <div className="d-flex align-items-center gap-3">
            <button className="header-icon-btn d-lg-none" onClick={onSidebarToggle}>
              <i className="bi bi-list fs-5" />
            </button>
            <a href="/" className="text-decoration-none d-lg-none">
              <span style={{ fontWeight: 800, fontSize: 16, color: "#1b84ff", letterSpacing: "-0.5px" }}> App</span>
            </a>
          </div>

          {/* Center: Nav links (desktop) */}
          {
            <div className="d-none d-lg-flex align-items-center gap-1">
 Track Pulse Admin
            </div>
          }
          {/* <Nav className="d-none d-lg-flex align-items-center gap-1">
            {navItems.map((item) => (
              <Nav.Link key={item} href={`/${item.toLowerCase()}`}>{item}</Nav.Link>
            ))}
          </Nav> */}

          {/* Right: search + icons */}
          <div className="d-flex align-items-center gap-2">

            {/* Search */}
            {searchOpen ? (
              <InputGroup size="sm" style={{ width: 220 }}>
                <Form.Control
                  placeholder="Search..."
                  autoFocus
                  style={{ borderRadius: "8px 0 0 8px", fontSize: 13, border: "1px solid #f1f1f4" }}
                />
                <Button
                  variant="light"
                  onClick={() => setSearchOpen(false)}
                  style={{ borderRadius: "0 8px 8px 0", border: "1px solid #f1f1f4", borderLeft: "none" }}
                >
                  <i className="bi bi-x" />
                </Button>
              </InputGroup>
            ) : (
              <button className="header-icon-btn" onClick={() => setSearchOpen(true)}>
                <i className="bi bi-search" style={{ fontSize: 14 }} />
              </button>
            )}

            {/* Notifications dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle as="button" className="header-icon-btn" style={{ border: "none" }}>
                <i className="bi bi-bell" style={{ fontSize: 15 }} />
                <span className="notif-badge">4</span>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: 360, padding: "12px" }}>
                <div className="d-flex justify-content-between align-items-center mb-3 px-1">
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#071437" }}>Notifications</span>
                  <span className="badge rounded-pill" style={{ background: "#ffe9ef", color: "#f8285a", fontWeight: 600, fontSize: 11 }}>
                    4 New
                  </span>
                </div>
                {notifications.map((n, i) => (
                  <div key={i} className="notif-item">
                    <div className="notif-icon" style={{ background: n.bg }}>
                      <i className={`bi ${n.icon}`} style={{ color: n.color }} />
                    </div>
                    <div className="flex-grow-1">
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#071437" }}>{n.title}</div>
                      <div style={{ fontSize: 12, color: "#99a1b7" }}>{n.desc}</div>
                    </div>
                  </div>
                ))}
                <div className="text-center mt-3 pt-2" style={{ borderTop: "1px solid #f1f1f4" }}>
                  <a href="/notifications" style={{ fontSize: 13, color: "#1b84ff", textDecoration: "none", fontWeight: 600 }}>
                    View all notifications
                  </a>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            {/* User dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle as="button" className="user-avatar" style={{ border: "none" }}>
                JD
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: 260 }}>
                {/* User info */}
                <div className="px-3 py-2 mb-1" style={{ borderBottom: "1px solid #f1f1f4" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#071437" }}>John Doe</div>
                  <div style={{ fontSize: 12, color: "#99a1b7" }}>john@example.com</div>
                  <span className="badge mt-1" style={{ background: "#e9fff3", color: "#17c653", fontWeight: 600, fontSize: 11 }}>
                    ● Admin
                  </span>
                </div>
                <Dropdown.Item href="/profile">
                  <i className="bi bi-person me-2 text-primary" />My Profile
                </Dropdown.Item>
                <Dropdown.Item href="/settings">
                  <i className="bi bi-gear me-2 text-primary" />Account Settings
                </Dropdown.Item>
                <Dropdown.Item href="/billing">
                  <i className="bi bi-credit-card me-2 text-primary" />Billing
                </Dropdown.Item>
                <div style={{ borderTop: "1px solid #f1f1f4", margin: "6px 0" }} />
                <Dropdown.Item href="/logout" style={{ color: "#f8285a" }}>
                  <i className="bi bi-box-arrow-right me-2" />Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>
        </Container>
      </div>
    </>
  );
}