// src/components/layout/AppSidebar.jsx
import { useState } from "react";
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
  // {
  //   label: "Pages",
  //   icon: "bi-file-earmark",
  //   children: [
  //     { label: "User Profile",     href: "/profile" },
  //     { label: "Account Settings", href: "/settings" },
  //   ],
  // },
  // {
  //   label: "Authentication",
  //   icon: "bi-shield-lock",
  //   children: [
  //     { label: "Login",           href: "/login" },
  //     { label: "Sign Up",         href: "/signup" },
  //     { label: "Forgot Password", href: "/forgot-password" },
  //   ],
  // },
  { label: "Race Update", icon: "bi-puzzle",    href: "/fileUploader" },
  { label: "Reports",    icon: "bi-bar-chart", href: "/reports" },
];

const styles = `
  .sidebar {
    width: 265px;
    min-height: 100vh;
    background-color: #1e2139;
    display: flex;
    flex-direction: column;
    transition: width 0.25s ease;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1045;
    overflow: hidden;
  }
  .sidebar.collapsed {
    width: 70px;
  }

  /* Mobile: hidden by default */
  @media (max-width: 991px) {
    .sidebar {
      transform: translateX(-100%);
      transition: transform 0.25s ease, width 0.25s ease;
    }
    .sidebar.mobile-open {
      transform: translateX(0);
    }
  }

  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1040;
  }

  /* Logo row */
  .sidebar-logo {
    height: 65px;
    min-height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    position: relative;
  }
  .sidebar-logo a {
    color: #fff;
    font-weight: 700;
    font-size: 1.05rem;
    text-decoration: none;
    white-space: nowrap;
  }
  .collapse-btn {
    background: none;
    border: 1px solid rgba(255,255,255,0.15);
    color: #9fa6b8;
    cursor: pointer;
    padding: 3px 7px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 1.5;
    transition: color 0.2s, border-color 0.2s;
  }
  .collapse-btn:hover { color: #fff; border-color: rgba(255,255,255,0.4); }

  /* Scrollable menu */
  .sidebar-menu {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0.5rem 0;
    scrollbar-width: thin;
    scrollbar-color: #2e3354 transparent;
  }
  .sidebar-menu::-webkit-scrollbar { width: 4px; }
  .sidebar-menu::-webkit-scrollbar-thumb { background: #2e3354; border-radius: 4px; }

  /* Section label */
  .sidebar-section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #4a5070;
    padding: 1rem 1.2rem 0.3rem;
    white-space: nowrap;
    overflow: hidden;
  }

  /* Every menu row */
  .menu-btn {
    display: flex;
    align-items: center;
    width: 100%;
    background: none;
    border: none;
    padding: 0.55rem 1.2rem;
    color: #9fa6b8;
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
    text-decoration: none;
  }
  .menu-btn:hover        { background: rgba(255,255,255,0.05); color: #fff; }
  .menu-btn.is-active    { background: rgba(255,255,255,0.08); color: #fff; }

  .menu-icon  { font-size: 1.05rem; min-width: 22px; margin-right: 12px; }
  .menu-label { flex: 1; }
  .menu-arrow { font-size: 11px; transition: transform 0.2s; }
  .menu-btn.is-open .menu-arrow { transform: rotate(180deg); }

  /* Collapsed: hide text */
  .sidebar.collapsed .menu-label,
  .sidebar.collapsed .menu-arrow,
  .sidebar.collapsed .sidebar-section-label {
    opacity: 0;
    width: 0;
    overflow: hidden;
  }
  .sidebar.collapsed .menu-icon { margin-right: 0; }

  /* Sub menu */
  .submenu {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.25s ease;
    padding-left: 2.6rem;
  }
  .submenu.is-open  { max-height: 300px; }

  .submenu a {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.38rem 1rem;
    color: #6c7593;
    font-size: 13px;
    text-decoration: none;
    transition: color 0.15s;
  }
  .submenu a:hover { color: #fff; }
  .submenu-dot {
    width: 5px; height: 5px; min-width: 5px;
    border-radius: 50%;
    background: #4a5070;
    transition: background 0.15s;
  }
  .submenu a:hover .submenu-dot { background: #fff; }

  /* Footer */
  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
`;

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
      <style>{styles}</style>

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