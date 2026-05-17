import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { cookies } from "next/headers";
import LoginForm from "./LoginForm";
import { adminLogout } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_token")?.value === "authenticated";

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const guests = await prisma.guest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const confirmedGuests = guests.filter((g) => g.attendance === "confirmed");
  const declinedGuests = guests.filter((g) => g.attendance === "declined");
  const pendingGuests = guests.filter((g) => g.attendance === "pending");

  const totalConfirmedPeople = confirmedGuests.reduce((acc, g) => acc + g.numberOfPeople, 0);

  return (
    <div style={{ padding: "4rem 6vw", minHeight: "100vh", background: "var(--black)", color: "var(--text-on-dark)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem", marginBottom: "3rem" }}>
          <div>
            <span style={{ fontFamily: "var(--font-title)", fontSize: "12px", letterSpacing: "0.4em", color: "var(--gold-dim)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
              Painel de Controlo
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--gold-light)", margin: 0 }}>
              Gestão de Convidados
            </h1>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--gold)", fontFamily: "var(--font-title)", textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid var(--gold)", padding: "10px 20px" }}>
              Voltar ao Convite
            </Link>
            <form action={adminLogout}>
              <button type="submit" style={{ background: "transparent", color: "#f44336", fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid #f44336", padding: "10px 20px", cursor: "pointer" }}>
                Terminar Sessão
              </button>
            </form>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
          <div style={{ border: "1px solid rgba(201,168,76,0.2)", padding: "2rem", textAlign: "center", background: "rgba(10,10,10,0.6)" }}>
            <span style={{ display: "block", fontFamily: "var(--font-title)", fontSize: "10px", letterSpacing: "0.2em", color: "var(--gold-dim)", textTransform: "uppercase", marginBottom: "1rem" }}>Total Respostas</span>
            <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--white)" }}>{guests.length}</span>
          </div>
          <div style={{ border: "1px solid rgba(201,168,76,0.2)", padding: "2rem", textAlign: "center", background: "rgba(10,10,10,0.6)" }}>
            <span style={{ display: "block", fontFamily: "var(--font-title)", fontSize: "10px", letterSpacing: "0.2em", color: "var(--gold-dim)", textTransform: "uppercase", marginBottom: "1rem" }}>Presenças Confirmadas</span>
            <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--gold-light)" }}>{confirmedGuests.length}</span>
          </div>
          <div style={{ border: "1px solid rgba(201,168,76,0.2)", padding: "2rem", textAlign: "center", background: "rgba(10,10,10,0.6)" }}>
            <span style={{ display: "block", fontFamily: "var(--font-title)", fontSize: "10px", letterSpacing: "0.2em", color: "var(--gold-dim)", textTransform: "uppercase", marginBottom: "1rem" }}>Total de Pessoas</span>
            <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--gold-light)" }}>{totalConfirmedPeople}</span>
          </div>
          <div style={{ border: "1px solid rgba(201,168,76,0.2)", padding: "2rem", textAlign: "center", background: "rgba(10,10,10,0.6)" }}>
            <span style={{ display: "block", fontFamily: "var(--font-title)", fontSize: "10px", letterSpacing: "0.2em", color: "var(--gold-dim)", textTransform: "uppercase", marginBottom: "1rem" }}>Não Comparecem</span>
            <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "rgba(255,255,255,0.4)" }}>{declinedGuests.length}</span>
          </div>
        </div>

        {/* Guests Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--gold)", textAlign: "left" }}>
                <th style={{ padding: "1rem", fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", fontWeight: "normal" }}>Nome</th>
                <th style={{ padding: "1rem", fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", fontWeight: "normal" }}>Telefone</th>
                <th style={{ padding: "1rem", fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", fontWeight: "normal" }}>Pessoas</th>
                <th style={{ padding: "1rem", fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", fontWeight: "normal" }}>Estado</th>
                <th style={{ padding: "1rem", fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", fontWeight: "normal" }}>Presente</th>
                <th style={{ padding: "1rem", fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", fontWeight: "normal" }}>Mensagem</th>
                <th style={{ padding: "1rem", fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", fontWeight: "normal" }}>Acções</th>
              </tr>
            </thead>
            <tbody>
              {guests.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "3rem", textAlign: "center", fontFamily: "var(--font-body)", fontStyle: "italic", opacity: 0.6 }}>Nenhuma resposta registada ainda.</td>
                </tr>
              ) : (
                guests.map((g) => (
                  <tr key={g.id} style={{ borderBottom: "1px solid rgba(201,168,76,0.15)", fontFamily: "var(--font-body)", fontSize: "1.05rem" }}>
                    <td style={{ padding: "1rem" }}>{g.name}</td>
                    <td style={{ padding: "1rem" }}>{g.phone || "-"}</td>
                    <td style={{ padding: "1rem", textAlign: "center" }}>{g.numberOfPeople}</td>
                    <td style={{ padding: "1rem" }}>
                      {g.attendance === "confirmed" && <span style={{ color: "#4caf50" }}>Confirmado</span>}
                      {g.attendance === "declined" && <span style={{ color: "#f44336" }}>Não vai</span>}
                      {g.attendance === "pending" && <span style={{ color: "#ff9800" }}>Pendente</span>}
                    </td>
                    <td style={{ padding: "1rem", color: "var(--gold-light)" }}>{g.chosenGift || "-"}</td>
                    <td style={{ padding: "1rem", maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={g.message || ""}>
                      {g.message || "-"}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <DeleteButton id={g.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
