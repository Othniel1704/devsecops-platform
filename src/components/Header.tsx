"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/blog",        label: "Blog" },
  { href: "/tools",       label: "Outils" },
  { href: "/boilerplate", label: "Boilerplate" },
  { href: "/ressources",  label: "Ressources" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .header-nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.2s;
          font-family: 'Inter', sans-serif;
        }
        .header-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--cyan), var(--violet));
          border-radius: 1px;
          transition: width 0.25s ease;
        }
        .header-nav-link:hover { color: var(--text-primary); }
        .header-nav-link:hover::after { width: 100%; }

        .header-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, var(--cyan), var(--violet));
          color: #080c14;
          font-weight: 600;
          font-size: 0.8125rem;
          border-radius: 8px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.01em;
        }
        .header-cta:hover {
          opacity: 0.88;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(34,211,238,0.3);
        }

        .mobile-nav-link {
          display: block;
          padding: 0.625rem 0.75rem;
          border-radius: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          transition: background 0.15s, color 0.15s;
        }
        .mobile-nav-link:hover {
          background: rgba(34,211,238,0.08);
          color: var(--cyan);
        }
        .mobile-cta {
          display: block;
          margin-top: 0.75rem;
          padding: 0.75rem;
          background: linear-gradient(135deg, var(--cyan), var(--violet));
          color: #080c14;
          font-weight: 700;
          font-size: 0.9375rem;
          border-radius: 10px;
          text-decoration: none;
          text-align: center;
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>

      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(8, 12, 20, 0.85)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "0 1.25rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex" style={{ alignItems: "center", gap: "2rem" }}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="header-nav-link">
                {link.label}
              </Link>
            ))}
            <Link href="/tools" className="header-cta">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "0.25rem", flexShrink: 0 }}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              Essayer les outils
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            style={{
              background: "none",
              border: "1px solid var(--border-strong)",
              borderRadius: "8px",
              width: "38px",
              height: "38px",
              cursor: "pointer",
              color: "var(--text-secondary)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              position: "relative",
              padding: 0,
            }}
          >
            <span style={{
              display: "block",
              width: "18px",
              height: "2px",
              backgroundColor: "currentColor",
              borderRadius: "1px",
              transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), translate 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: open ? "rotate(45deg) translate(5px, 5px)" : "none"
            }} />
            <span style={{
              display: "block",
              width: "18px",
              height: "2px",
              backgroundColor: "currentColor",
              borderRadius: "1px",
              transition: "opacity 0.2s ease",
              opacity: open ? 0 : 1
            }} />
            <span style={{
              display: "block",
              width: "18px",
              height: "2px",
              backgroundColor: "currentColor",
              borderRadius: "1px",
              transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), translate 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none"
            }} />
          </button>
        </div>

        {/* Mobile drawer with slide-down CSS transition */}
        <div
          style={{
            background: "var(--bg-surface)",
            overflow: "hidden",
            transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, border-color 0.3s",
            maxHeight: open ? "300px" : "0px",
            opacity: open ? 1 : 0,
            borderTop: open ? "1px solid var(--border)" : "1px solid transparent",
          }}
        >
          <div style={{ padding: "1rem 1.25rem 1.5rem" }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/tools" className="mobile-cta" onClick={() => setOpen(false)}>
                Essayer les outils
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
