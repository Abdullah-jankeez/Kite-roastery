import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, ORDERS_TABLE } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingItem = { id: string; name: string; qty: number; price: number };

function iqd(n: number) {
  return n.toLocaleString("en-IQ") + " IQD";
}

/** Send a Telegram message when a new order arrives. Silently skips if not configured. */
async function notifyTelegram(order: {
  customer: string;
  phone: string;
  address: string;
  notes?: string | null;
  items: IncomingItem[];
  total: number;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const lines = order.items
    .map((it) => `• ${it.name} × ${it.qty} — ${iqd(it.price * it.qty)}`)
    .join("\n");
  const text =
    `🛒 New Kite order!\n\n` +
    `👤 ${order.customer}\n` +
    `📞 ${order.phone}\n` +
    `📍 ${order.address}\n\n` +
    `${lines}\n` +
    `💰 Total: ${iqd(order.total)} (Cash on Delivery)` +
    (order.notes ? `\n\n📝 ${order.notes}` : "");

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
  } catch {
    // Notification failure must never block the order.
  }
}

/** Customer places an order → insert into the database. */
export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Orders database is not configured yet." },
      { status: 503 }
    );
  }

  let body: {
    customer?: string;
    phone?: string;
    address?: string;
    notes?: string;
    items?: IncomingItem[];
    total?: number;
    locale?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { customer, phone, address, notes, items, total, locale } = body;

  // Basic validation
  if (!customer || !phone || !address || !items || items.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Missing required order fields." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from(ORDERS_TABLE).insert({
    customer: String(customer).slice(0, 200),
    phone: String(phone).slice(0, 60),
    address: String(address).slice(0, 600),
    notes: notes ? String(notes).slice(0, 1000) : null,
    items,
    total: Number(total) || 0,
    locale: locale || "en",
    status: "new",
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  // Fire off the Telegram alert (won't block or fail the order).
  await notifyTelegram({ customer, phone, address, notes, items, total: Number(total) || 0 });

  return NextResponse.json({ ok: true });
}

/** Admin updates an order's status — requires the admin password. */
export async function PATCH(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Not configured." }, { status: 503 });
  }
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || req.headers.get("x-admin-password") !== adminPassword) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  let body: { id?: string; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (!body.id || !body.status) {
    return NextResponse.json({ ok: false, error: "Missing id or status." }, { status: 400 });
  }
  const { error } = await supabase
    .from(ORDERS_TABLE)
    .update({ status: body.status })
    .eq("id", body.id);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

/** Admin deletes an order — requires the admin password. */
export async function DELETE(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Not configured." }, { status: 503 });
  }
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || req.headers.get("x-admin-password") !== adminPassword) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (!body.id) {
    return NextResponse.json({ ok: false, error: "Missing id." }, { status: 400 });
  }
  const { error } = await supabase.from(ORDERS_TABLE).delete().eq("id", body.id);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

/** Admin fetches all orders — requires the admin password. */
export async function GET(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Orders database is not configured yet." },
      { status: 503 }
    );
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const provided = req.headers.get("x-admin-password");
  if (!adminPassword || provided !== adminPassword) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from(ORDERS_TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, orders: data });
}
