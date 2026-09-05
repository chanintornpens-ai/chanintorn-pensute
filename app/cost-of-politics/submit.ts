"use client";

// ส่งคำตอบไปเก็บใน Google Sheets ผ่าน Apps Script Web App
import { COP_ENDPOINT } from "./config";
import type { CopData } from "./store";
import {
  POSITION_CAPS,
  WS_SECTIONS,
  PHASE_PERIOD_KEYS,
  itemTotal,
  subItemTotal,
  type WsSection,
} from "./worksheet";

export interface CopTotals {
  before: number;
  between: number;
  afterWin: number;
  afterLose: number;
  grand: number;
  emergency: number;
}

export interface CopItemRow {
  phase: WsSection["key"];
  group: string;
  key: string;
  label: string;
  amount: number;
  detail?: string; // รายการย่อย (ชื่อ×จำนวน×บาท×วัน) ถ้ามี
}

export function computeTotals(data: CopData): { totals: CopTotals; subTotals: Record<string, number> } {
  const subTotals: Record<string, number> = {};
  for (const s of data.subs) subTotals[s.parentKey] = (subTotals[s.parentKey] || 0) + subItemTotal(s);
  const customOf = (sec: WsSection) =>
    data.customs
      .filter((c) => sec.groups.some((g) => g.key === c.groupKey))
      .reduce((s, c) => s + (data.amounts[`custom.${c.id}`] || 0) + (subTotals[`custom.${c.id}`] || 0), 0);
  const secTotal = (sec: WsSection) =>
    sec.groups.reduce(
      (s, g) =>
        s +
        g.items.reduce(
          (x, it) => x + itemTotal(data.amounts, it, PHASE_PERIOD_KEYS[sec.key]) + (subTotals[it.key] || 0),
          0
        ),
      0
    ) + customOf(sec);
  const t: Record<string, number> = {};
  for (const sec of WS_SECTIONS) t[sec.key] = secTotal(sec);
  const totals: CopTotals = {
    before: t.before || 0,
    between: t.between || 0,
    afterWin: t.afterWin || 0,
    afterLose: t.afterLose || 0,
    grand: (t.before || 0) + (t.between || 0) + (t.afterWin || 0) + (t.afterLose || 0),
    emergency:
      (data.amounts["before.emergency"] || 0) +
      (data.amounts["between.emergency"] || 0) +
      (data.amounts["after.emergency"] || 0),
  };
  return { totals, subTotals };
}

export function itemRows(data: CopData, lang: "th" | "en"): CopItemRow[] {
  const { subTotals } = computeTotals(data);
  const rows: CopItemRow[] = [];
  const subDetail = (parentKey: string) =>
    data.subs
      .filter((s) => s.parentKey === parentKey)
      .map((s) => `${s.name || "-"} ×${s.qty || 1} ×${s.rate || 0} ×${s.days || 1} = ${subItemTotal(s)}`)
      .join(" | ");
  for (const sec of WS_SECTIONS) {
    for (const g of sec.groups) {
      for (const it of g.items) {
        const amount = itemTotal(data.amounts, it, PHASE_PERIOD_KEYS[sec.key]) + (subTotals[it.key] || 0);
        if (amount > 0)
          rows.push({
            phase: sec.key,
            group: lang === "en" ? g.en : g.th,
            key: it.key,
            label: data.labels[it.key] ?? (lang === "en" ? it.en : it.th),
            amount,
            detail: subDetail(it.key) || undefined,
          });
      }
      for (const c of data.customs.filter((c) => c.groupKey === g.key)) {
        const key = `custom.${c.id}`;
        const amount = (data.amounts[key] || 0) + (subTotals[key] || 0);
        if (amount > 0)
          rows.push({
            phase: sec.key,
            group: lang === "en" ? g.en : g.th,
            key,
            label: data.labels[key] ?? (lang === "en" ? "Custom item" : "รายการที่เพิ่มเอง"),
            amount,
            detail: subDetail(key) || undefined,
          });
      }
    }
  }
  return rows;
}

export function buildPayload(data: CopData, lang: "th" | "en") {
  const pos = POSITION_CAPS.find((p) => p.key === data.position);
  const term = data.term ?? "full";
  const tableCap = pos ? (term === "vacancy" ? pos.vacancy : pos.full) : 0;
  const cap = data.customCap ?? tableCap;
  const { totals } = computeTotals(data);
  return {
    id: uidLike(),
    submittedAt: new Date().toISOString(),
    lang,
    meta: data.meta,
    position: data.position ?? "",
    positionLabel: pos ? `${pos.group} · ${pos.th}` : "",
    term,
    tableCap,
    cap,
    totals,
    capPct: cap > 0 ? Math.round((totals.between / cap) * 1000) / 10 : null,
    funding: data.funding.filter((f) => f.name || f.amount).map((f) => ({ name: f.name, amount: f.amount })),
    fundingTotal: data.funding.reduce((s, f) => s + (f.amount || 0), 0),
    items: itemRows(data, lang),
    raw: {
      amounts: data.amounts,
      labels: data.labels,
      subs: data.subs,
      customs: data.customs,
    },
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  };
}

const uidLike = () => Math.random().toString(36).slice(2, 8) + "-" + Date.now().toString(36);

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitToSheet(data: CopData, lang: "th" | "en"): Promise<SubmitResult> {
  if (!COP_ENDPOINT) return { ok: false, error: "no-endpoint" };
  const payload = buildPayload(data, lang);
  try {
    // ส่งเป็น text/plain เพื่อเลี่ยง CORS preflight (Apps Script ไม่รองรับ OPTIONS)
    const res = await fetch(COP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    if (!res.ok) return { ok: false, error: `http-${res.status}` };
    const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (json && json.ok === false) return { ok: false, error: json.error || "server" };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "network" };
  }
}
