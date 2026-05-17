"use client";

import { useState, useTransition } from "react";
import { adminLogin } from "../actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    startTransition(async () => {
      const result = await adminLogin(password);
      if (result.success) {
        router.refresh();
      } else {
        setError(result.error || "Erro ao iniciar sessão.");
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "var(--black)", color: "var(--white)" }}>
      <div style={{ border: "1px solid var(--gold)", padding: "4rem", textAlign: "center", maxWidth: "400px", width: "100%" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--gold-light)", marginBottom: "1rem", fontWeight: "normal" }}>
          Acesso Restrito
        </h1>
        <p style={{ fontFamily: "var(--font-title)", fontSize: "12px", letterSpacing: "0.2em", color: "var(--gold-dim)", textTransform: "uppercase", marginBottom: "3rem" }}>
          Painel de Administração
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <input
            type="password"
            placeholder="Palavra-passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: "1px solid var(--gold-dim)",
              color: "var(--white)",
              padding: "10px",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              textAlign: "center",
              outline: "none"
            }}
          />
          
          {error && <p style={{ color: "#f44336", fontSize: "0.9rem", fontFamily: "var(--font-body)", margin: 0 }}>{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            style={{
              marginTop: "1rem",
              background: "var(--gold)",
              color: "var(--black)",
              border: "none",
              padding: "15px",
              fontFamily: "var(--font-title)",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              opacity: isPending ? 0.7 : 1
            }}
          >
            {isPending ? "A verificar..." : "Entrar"}
          </button>
        </form>
        <div style={{ marginTop: "2rem" }}>
          <Link href="/" style={{ color: "var(--gold-dim)", fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase" }}>
            ← Voltar ao Convite
          </Link>
        </div>
      </div>
    </div>
  );
}
