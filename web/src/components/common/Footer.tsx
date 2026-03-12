// components/layout/AppFooter.jsx
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const footerStyles = `
  .app-footer {
    background: #fff;
    border-top: 1px solid #f1f1f4;
    padding: 14px 0;
  }
  .app-footer a {
    color: #4b5675;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    transition: color 0.15s;
  }
  .app-footer a:hover {
    color: #1b84ff;
  }
  .footer-copyright {
    font-size: 13px;
    color: #99a1b7;
    font-weight: 500;
  }
  .footer-copyright a {
    color: #4b5675;
    font-weight: 700;
  }
`;

const footerLinks = [
  { label: "About", href: "https://trackpulse.com" },
  { label: "Support", href: "https://trackpulse.com" },
];

export default function AppFooter() {
  return (
    <>
      <style>{footerStyles}</style>
      <div className="app-footer">
        <Container fluid className="px-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">

          {/* Copyright */}
          <div className="footer-copyright order-2 order-md-1">
            <span>2026 &copy; </span>
            <a href="" target="_blank" rel="noreferrer">
              TrackPulse
            </a>
          </div>

          {/* Links */}
          <ul className="list-unstyled d-flex gap-4 mb-0 order-1 order-md-2">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

        </Container>
      </div>
    </>
  );
}