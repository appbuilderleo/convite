"use client";

import { useState } from "react";
import Link from "next/link";
import { adminLogout } from "../actions";

export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ position: "relative", marginBottom: "3rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontFamily: "var(--font-title)", fontSize: "12px", letterSpacing: "0.4em", color: "var(--gold-dim)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
            Painel de Controlo
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--gold-light)", margin: 0 }}>
            Gestão de Convidados
          </h1>
        </div>

        {/* Desktop Buttons */}
        <div className="admin-nav-desktop" style={{ display: "none", gap: "1rem" }}>
          <Link href="/" style={{ color: "var(--gold)", fontFamily: "var(--font-title)", textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid var(--gold)", padding: "10px 20px" }}>
            Voltar ao Convite
          </Link>
          <form action={adminLogout}>
            <button type="submit" style={{ background: "transparent", color: "#f44336", fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid #f44336", padding: "10px 20px", cursor: "pointer" }}>
              Terminar Sessão
            </button>
          </form>
        </div>

        {/* Mobile Hamburger */}
        <div className="admin-nav-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer", display: "none", flexDirection: "column", gap: "5px", padding: "10px" }}>
          <span style={{ display: "block", width: "25px", height: "2px", background: "var(--gold)", transition: "all 0.3s ease" }}></span>
          <span style={{ display: "block", width: "25px", height: "2px", background: "var(--gold)", transition: "all 0.3s ease" }}></span>
          <span style={{ display: "block", width: "25px", height: "2px", background: "var(--gold)", transition: "all 0.3s ease" }}></span>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", background: "rgba(10,10,10,0.95)", border: "1px solid var(--gold)", padding: "1.5rem" }} className="admin-nav-mobile-menu">
          <Link href="/" style={{ textAlign: "center", color: "var(--gold)", fontFamily: "var(--font-title)", textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid var(--gold)", padding: "12px 20px" }}>
            Voltar ao Convite
          </Link>
          <form action={adminLogout} style={{ display: "flex", flexDirection: "column" }}>
            <button type="submit" style={{ width: "100%", background: "transparent", color: "#f44336", fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid #f44336", padding: "12px 20px", cursor: "pointer" }}>
              Terminar Sessão
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
