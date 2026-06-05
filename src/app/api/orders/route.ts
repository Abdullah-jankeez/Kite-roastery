import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, ORDERS_TABLE } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingItem = { id: string; name: string; qty: number; price: number };

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
