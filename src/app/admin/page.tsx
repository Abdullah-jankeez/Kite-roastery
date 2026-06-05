"use client";

import { useEffect, useState, useCallback } from "react";

type Order = {
  id: string;
  created_at: string;
  customer: string;
  phone: string;
  address: string;
  notes: string | null;
  items: { id: string; name: string; qty: number; price: number }[];
  total: number;
  locale: string;
  status: string;
};

const CHARCOAL = "#383836";
const TEAL = "#5BA499";

function formatIQD(n: number) {
  return n.toLocaleString("en-IQ") + " IQD";
}

export default function AdminOrdersPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", { headers: { "x-admin-password": pwd } });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(res.status === 401 ? "Wrong password." : data.error || "Failed to load.");
      }
      setOrders(data.orders || []);
      setAuthed(true);
      sessionStorage.setItem("kite_admin_pw", pwd);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load.");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Try a saved password on first load
  useEffect(() => {
    const saved = sessionStorage.getItem("kite_admin_pw");
    if (saved) {
      setPassword(saved);
      load(saved);
    }
  }, [load]);

  async function setStatus(id: string, status: string) {
    // optimistic update
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id, status }),
    });
  }

  async function remove(id: string) {
    if (!confirm("Delete this order permanently?")) return;
    setOrders((prev) => prev.filter((o) => o.id !== id));
    await fetch("/api/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id }),
    });
  }

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f4f3", padding: 24 }}>
        <form
          onSubmit={(e) => { e.preventDefault(); load(password); }}
          style={{ background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 8px 30px rgba(0,0,0,0.08)", width: "100%", maxWidth: 360 }}
        >
          <h1 style={{ fontSize: 22, fontWeight: 800, color: CHARCOAL, margin: 0 }}>Kite Orders</h1>
          <p style={{ color: "#777", fontSize: 14, marginTop: 6, marginBottom: 20 }}>Enter the admin password to view orders.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #ddd", fontSize: 15, outline: "none", boxSizing: "border-box" }}
          />
          {error && <p style={{ color: "#c0392b", fontSize: 13, marginTop: 10 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: 16, width: "100%", padding: "12px", borderRadius: 999, border: "none", background: CHARCOAL, color: "#fdd451", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            {loading ? "Checking…" : "View Orders"}
          </button>
        </form>
      </div>
    );
  }

  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f3", padding: "24px 16px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: CHARCOAL, margin: 0 }}>Kite Orders</h1>
            <p style={{ color: "#777", fontSize: 14, margin: "4px 0 0" }}>
              {orders.length} total · {newCount} new
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => load(password)}
              style={{ padding: "10px 18px", borderRadius: 999, border: "none", background: TEAL, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
            >
              {loading ? "Refreshing…" : "↻ Refresh"}
            </button>
            <button
              onClick={() => { sessionStorage.removeItem("kite_admin_pw"); setAuthed(false); setPassword(""); }}
              style={{ padding: "10px 18px", borderRadius: 999, border: "1.5px solid #ddd", background: "#fff", color: CHARCOAL, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
            >
              Log out
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 16, padding: 48, textAlign: "center", color: "#999" }}>
            No orders yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {orders.map((o) => (
              <div key={o.id} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", borderLeft: `5px solid ${o.status === "new" ? TEAL : "#ddd"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                  <div>
                    <span style={{ fontWeight: 800, color: CHARCOAL, fontSize: 17 }}>{o.customer}</span>
                    {o.status === "new" && (
                      <span style={{ marginInlineStart: 8, fontSize: 11, fontWeight: 700, color: CHARCOAL, background: "#fdd451", padding: "2px 8px", borderRadius: 999 }}>NEW</span>
                    )}
                  </div>
                  <span style={{ color: "#999", fontSize: 13 }}>
                    {new Date(o.created_at).toLocaleString()}
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", fontSize: 14, color: "#444", marginBottom: 14 }}>
                  <a href={`tel:${o.phone}`} style={{ color: TEAL, fontWeight: 600, textDecoration: "none" }}>📞 {o.phone}</a>
                  <span>📍 {o.address}</span>
                </div>

                <div style={{ background: "#faf9f7", borderRadius: 10, padding: 12 }}>
                  {o.items.map((it, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#333", padding: "3px 0" }}>
                      <span>{it.name} × {it.qty}</span>
                      <span style={{ color: "#777" }}>{formatIQD(it.price * it.qty)}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #eee", marginTop: 8, paddingTop: 8, fontWeight: 800, color: CHARCOAL }}>
                    <span>Total (Cash on Delivery)</span>
                    <span>{formatIQD(o.total)}</span>
                  </div>
                </div>

                {o.notes && (
                  <p style={{ fontSize: 13, color: "#666", marginTop: 10, marginBottom: 0 }}>
                    📝 {o.notes}
                  </p>
                )}

                {/* Actions */}
                <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                  {o.status === "new" ? (
                    <button
                      onClick={() => setStatus(o.id, "done")}
                      style={{ padding: "8px 16px", borderRadius: 999, border: "none", background: TEAL, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                    >
                      ✓ Mark as done
                    </button>
                  ) : (
                    <button
                      onClick={() => setStatus(o.id, "new")}
                      style={{ padding: "8px 16px", borderRadius: 999, border: "1.5px solid #ddd", background: "#fff", color: CHARCOAL, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
                    >
                      ↩ Mark as new
                    </button>
                  )}
                  <button
                    onClick={() => remove(o.id)}
                    style={{ padding: "8px 16px", borderRadius: 999, border: "1.5px solid #f0c4c4", background: "#fff", color: "#c0392b", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
