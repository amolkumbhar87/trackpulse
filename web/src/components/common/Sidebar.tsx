// src/components/layout/AppSidebar.jsx
import { useState } from "react";
import '../../styles/Sidebar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const menuItems = [
  {
    label: "Dashboard",
    icon: "bi-speedometer2",
    children: null,
    href:"/admin"
  },
  {
    label: "Odds Manager",
    icon: "bi-grid",
    children: null,
    href:"/oddsManager"
  },
  {
    label: "Race Update",
    icon: "bi-puzzle",
    children: null,
    href: "/fileUploader"
  },
  {
    label: "Reports",
    icon: "bi-bar-chart",
    children: null,
    href: "/reports"
  },
  {
    label: "Deposit Approvals",
    icon: "bi-bar-chart",
    children: null,
    href: "/depositApprove"
  }
];

/**
 * Props:
 *   collapsed   : boolean  — icon-only mode on desktop
 *   onCollapse  : fn       — toggle collapsed
 *   mobileOpen  : boolean  — drawer open on mobile
 *   onClose     : fn       — close mobile drawer
 */
export default function AppSidebar({ collapsed, onCollapse, mobileOpen, onClose }) {
  const [openMenus, setOpenMenus] = useState({ Dashboards: true });

  const toggle = (label) =>
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));

  const cls = ["sidebar", collapsed && "collapsed", mobileOpen && "mobile-open"]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      
      {/* Mobile backdrop */}
      {mobileOpen && <div className="sidebar-backdrop d-lg-none" onClick={onClose} />}

      <div className={cls}>

        {/* ── Logo row ───────────────────────────── */}
        <div className="sidebar-logo">
          {collapsed
            ? <span style={{ color: "#fff", fontWeight: 700, margin: "0 auto" }}>◈</span>
            : <a href="/">TrackPulse</a>
          }
          <button
            className="collapse-btn d-none d-lg-inline"
            onClick={onCollapse}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <i className={`bi bi-chevron-${collapsed ? "right" : "left"}`} />
          </button>
        </div>

        {/* ── Nav menu ───────────────────────────── */}
        <nav className="sidebar-menu">

          <div className="sidebar-section-label">Menu</div>

          {menuItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className={`menu-btn ${openMenus[item.label] ? "is-open is-active" : ""}`}
                  onClick={() => toggle(item.label)}
                >
                  <i className={`bi ${item.icon} menu-icon`} />
                  <span className="menu-label">{item.label}</span>
                  <i className="bi bi-chevron-down menu-arrow" />
                </button>

                <div className={`submenu ${openMenus[item.label] && !collapsed ? "is-open" : ""}`}>
                  {item.children.map((child) => (
                    <a key={child.label} href={child.href}>
                      <span className="submenu-dot" />
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href} className="menu-btn">
                <i className={`bi ${item.icon} menu-icon`} />
                <span className="menu-label">{item.label}</span>
              </a>
            )
          )}

          

        </nav>

        

      </div>
    </>
  );
}