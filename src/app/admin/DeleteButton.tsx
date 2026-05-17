"use client";

import { useTransition } from "react";
import { deleteGuest } from "../actions";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Tem a certeza que deseja remover este convidado?")) {
          startTransition(() => {
            deleteGuest(id);
          });
        }
      }}
      disabled={isPending}
      style={{
        background: "transparent",
        color: "var(--gold-dim)",
        border: "1px solid var(--gold-dim)",
        padding: "4px 8px",
        cursor: "pointer",
        fontFamily: "var(--font-title)",
        fontSize: "10px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        opacity: isPending ? 0.5 : 1,
      }}
    >
      {isPending ? "A remover..." : "Remover"}
    </button>
  );
}
