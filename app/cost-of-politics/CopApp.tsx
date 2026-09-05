"use client";

// Cost of Politics — สมุดต้นทุนการเมือง (เวอร์ชันสำหรับผู้เข้าร่วมกรอกแล้วส่งคำตอบ)
// โครงรายการ: ./worksheet.ts · สโตร์ในเครื่อง: ./store.ts · ส่งคำตอบ: ./submit.ts
import { useMemo, useState, type ReactNode, type ChangeEvent } from "react";
import Link from "next/link";
import { useLang } from "../components/LangProvider";
import { useCopStore, uid, type CopData, type CopSub } from "./store";
import { computeTotals, submitToSheet } from "./submit";
import {
  POSITION_CAPS,
  WS_SECTIONS,
  PHASE_PERIOD_KEYS,
  itemTotal,
  itemMonths,
  subItemTotal,
  periodMonths,
  type WsGroup,
  type WsItem,
  type WsSection,
} from "./worksheet";

type Lang = "th" | "en";
type Tab = "overview" | "before" | "between" | "after";

const baht = (n: number) =>
  "฿" + (Math.round(n * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });

const MONTHS_TH = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const THIS_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 31 }, (_, i) => THIS_YEAR - 5 + i);

const INPUT =
  "rounded-lg border-2 border-ink/20 bg-white px-2.5 py-1.5 text-sm text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-yellow/60";
const NUM =
  INPUT +
  " text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
const SEL = INPUT + " py-1.5";

/* ───────────────────────── ชิ้นส่วน UI พื้นฐาน ───────────────────────── */
function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border-[3px] border-ink bg-white p-4 shadow-[5px_5px_0_0_#16130f] sm:p-5 ${className}`}>
      {children}
    </section>
  );
}
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-3">
      <h2 className="font-display text-base font-extrabold text-ink sm:text-lg">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-ink/60">{subtitle}</p>}
    </div>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-ink/60">{label}</span>
      {children}
    </label>
  );
}

/* ───────────────────────── ตัวช่วยคำนวณ/ฟอร์แมต ───────────────────────── */
function durationLabel(months: number, lang: Lang) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (lang === "en") return [y > 0 ? `${y} yr` : "", m > 0 ? `${m} mo` : ""].filter(Boolean).join(" ") || "0 mo";
  return [y > 0 ? `${y} ปี` : "", m > 0 ? `${m} เดือน` : ""].filter(Boolean).join(" ") || "0 เดือน";
}
function periodLabel(amounts: Record<string, number>, periodKey: string, lang: Lang): string | null {
  const sM = amounts[`${periodKey}.startM`];
  const sY = amounts[`${periodKey}.startY`];
  const eM = amounts[`${periodKey}.endM`];
  const eY = amounts[`${periodKey}.endY`];
  if (!(sM && sY && eM && eY)) return null;
  const names = lang === "en" ? MONTHS_EN : MONTHS_TH;
  const months = periodMonths(amounts, periodKey) ?? 0;
  return `${names[sM - 1]} ${sY} – ${names[eM - 1]} ${eY} · ${durationLabel(months, lang)}`;
}
function capTone(pct: number) {
  if (pct >= 1) return { bar: "bg-red", text: "text-red" };
  if (pct >= 0.9) return { bar: "bg-orange-500", text: "text-orange-600" };
  if (pct >= 0.7) return { bar: "bg-yellow", text: "text-amber-700" };
  return { bar: "bg-teal", text: "text-teal" };
}

/* ───────────────────────── แอปหลัก ───────────────────────── */
export default function CopApp() {
  const { lang: siteLang, setLang } = useLang();
  const lang: Lang = siteLang === "th" ? "th" : "en";
  const t = (th: string, en: string) => (lang === "en" ? en : th);
  const { data, update, reset, ready } = useCopStore();
  const [tab, setTab] = useState<Tab>("overview");

  const { totals, subTotals } = useMemo(() => computeTotals(data), [data]);

  const setAmount = (key: string, raw: string) =>
    update((d) => {
      const next = { ...d.amounts };
      if (raw === "") delete next[key];
      else next[key] = Number(raw);
      return { ...d, amounts: next };
    });

  const pos = POSITION_CAPS.find((p) => p.key === data.position);
  const term = data.term ?? "full";
  const tableCap = pos ? (term === "vacancy" ? pos.vacancy : pos.full) : 0;
  const cap = data.customCap ?? tableCap;
  const pctBetween = cap > 0 ? totals.between / cap : 0;

  const tabs: { key: Tab; th: string; en: string; emoji: string }[] = [
    { key: "overview", th: "สรุปรวม", en: "Overview", emoji: "🗂️" },
    { key: "before", th: "Before · ก่อนหาเสียง", en: "Before", emoji: "🌱" },
    { key: "between", th: "Between · ช่วงหาเสียง", en: "Between", emoji: "📣" },
    { key: "after", th: "After · หลังเลือกตั้ง", en: "After", emoji: "🏛️" },
  ];

  return (
    <main className="min-h-[100dvh] bg-paper grid-bg">
      {/* แถบหัว */}
      <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper/95 px-3 py-2 backdrop-blur sm:px-4">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <Link href="/#work" className="shrink-0 font-display text-sm font-bold text-ink hover:underline">
            ← Chanintorn Pensute
          </Link>
          <span className="truncate font-display text-sm font-bold text-ink/50">Cost of Politics</span>
          <div className="ml-auto flex overflow-hidden rounded-lg border-2 border-ink font-display text-xs font-bold">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1.5 transition-colors ${lang === "en" ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-yellow"}`}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              onClick={() => setLang("th")}
              className={`px-2.5 py-1.5 transition-colors ${lang === "th" ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-yellow"}`}
              aria-pressed={lang === "th"}
            >
              ไทย
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-5 px-3 pb-32 pt-5 sm:px-4 sm:pt-7">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-widest text-red">
            {t("สมุดต้นทุนการเมือง · เวิร์กชีต", "Political cost worksheet")}
          </p>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            <span className="marker">Cost of Politics</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-ink/70">
            {t(
              "ประเมินต้นทุนการลงสมัครทั้ง 3 ช่วง — ก่อน / ระหว่าง / หลังการเลือกตั้ง — แล้วกด “ส่งคำตอบ” เมื่อกรอกเสร็จ ข้อมูลจะบันทึกไว้ในเครื่องคุณระหว่างกรอก",
              "Estimate the cost of running for office across three phases — before, during and after the election — then tap “Submit” when you're done. Your answers stay on this device while you work."
            )}
          </p>
        </div>

        {!ready ? (
          <p className="text-ink/50">{t("กำลังโหลด…", "Loading…")}</p>
        ) : (
          <>
            {/* แท็บ */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => {
                    setTab(tb.key);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`flex items-center gap-1.5 rounded-xl border-[3px] border-ink px-3.5 py-2 font-display text-sm font-bold transition ${
                    tab === tb.key ? "bg-red text-white shadow-[3px_3px_0_0_#16130f]" : "bg-white text-ink hover:bg-yellow"
                  }`}
                >
                  <span>{tb.emoji}</span>
                  {lang === "en" ? tb.en : tb.th}
                </button>
              ))}
            </div>

            {tab === "overview" && (
              <>
                <Card>
                  <SectionTitle
                    title={t("เริ่มที่นี่ · ตำแหน่งและวงเงินตามกฎหมาย", "Start here · position & legal spending cap")}
                    subtitle={t(
                      "เลือกตำแหน่งและกรณีเลือกตั้ง วงเงินท้องถิ่นในตารางเป็นตัวอย่าง (นครราชสีมา) — แก้ตัวเลขให้ตรงจังหวัดของคุณได้",
                      "Pick position and election case. Local caps shown are examples (Nakhon Ratchasima) — edit to match your province"
                    )}
                  />
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field label={t("ตำแหน่งที่ลงสมัคร", "Position")}>
                      <select
                        className={SEL + " w-full"}
                        value={data.position ?? ""}
                        onChange={(e) => update((d) => ({ ...d, position: e.target.value || undefined, customCap: undefined }))}
                      >
                        <option value="">{t("— เลือกตำแหน่ง —", "— choose —")}</option>
                        {POSITION_CAPS.map((p) => (
                          <option key={p.key} value={p.key}>
                            {p.group} · {lang === "en" ? p.en : p.th}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label={t("กรณีเลือกตั้ง", "Election case")}>
                      <select
                        className={SEL + " w-full"}
                        value={term}
                        onChange={(e) => update((d) => ({ ...d, term: e.target.value as "full" | "vacancy", customCap: undefined }))}
                      >
                        <option value="full">{t("ครบวาระ", "Full term")}</option>
                        <option value="vacancy">{t("ยุบสภา / แทนตำแหน่งว่าง", "Dissolution / by-election")}</option>
                      </select>
                    </Field>
                    <Field label={t("วงเงิน (บาท) — แก้ได้", "Cap (THB) — editable")}>
                      <input
                        type="number"
                        inputMode="numeric"
                        className={NUM + " w-full"}
                        value={data.customCap ?? (tableCap || "")}
                        onChange={(e) => update((d) => ({ ...d, customCap: e.target.value ? Number(e.target.value) : undefined }))}
                      />
                    </Field>
                  </div>
                  {pos && (
                    <p className="mt-3 text-sm text-ink/60">
                      {t("วงเงินตามตาราง:", "Table cap:")} <b className="text-ink">{baht(tableCap)}</b>
                      {pos.localExample && (
                        <span className="ml-1 text-xs text-amber-700">
                          {t("(ตัวอย่างท้องถิ่น — ตรวจประกาศจังหวัดของคุณ)", "(local example — check your province's notice)")}
                        </span>
                      )}
                    </p>
                  )}
                </Card>

                {cap > 0 && (
                  <Card>
                    <SectionTitle
                      title={t("เทียบเพดาน กกต. (ช่วงหาเสียง)", "Against the EC cap (campaign period)")}
                      subtitle={t(`วงเงิน ${baht(cap)}`, `Cap ${baht(cap)}`)}
                    />
                    <CapBar label={t("ประมาณการช่วงหาเสียง", "Estimated campaign spending")} value={totals.between} cap={cap} pct={pctBetween} lang={lang} />
                  </Card>
                )}

                <div className="grid gap-3 md:grid-cols-3">
                  {(
                    [
                      { key: "before", emoji: "🌱", th: "Before · ก่อนหาเสียง", en: "Before", thDesc: "สร้างการเป็นที่รู้จักและความไว้วางใจ", enDesc: "Building recognition and trust", amount: totals.before, period: "before.period", color: "bg-lime" },
                      { key: "between", emoji: "📣", th: "Between · ช่วงหาเสียง", en: "Between", thDesc: "หาเสียงอย่างเป็นทางการ เทียบเพดาน กกต.", enDesc: "The official campaign, vs the EC cap", amount: totals.between, period: "between.period", color: "bg-yellow" },
                      { key: "after", emoji: "🏛️", th: "After · หลังเลือกตั้ง", en: "After", thDesc: "ชนะ · แพ้ (แต่ยังสู้ต่อ)", enDesc: "Won · lost (still in the fight)", amount: totals.afterWin + totals.afterLose, period: "after.period", color: "bg-pink" },
                    ] as { key: Tab; emoji: string; th: string; en: string; thDesc: string; enDesc: string; amount: number; period: string; color: string }[]
                  ).map((c) => {
                    const pl = periodLabel(data.amounts, c.period, lang);
                    return (
                      <button
                        key={c.key}
                        onClick={() => {
                          setTab(c.key);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="hard-hover rounded-2xl border-[3px] border-ink bg-white p-4 text-left shadow-[5px_5px_0_0_#16130f]"
                      >
                        <div className="flex items-start justify-between">
                          <span className={`grid h-10 w-10 place-items-center rounded-xl border-2 border-ink text-xl ${c.color}`}>{c.emoji}</span>
                          <span className="font-display text-lg font-bold text-ink/30">→</span>
                        </div>
                        <p className="mt-3 font-display font-extrabold text-ink">{lang === "en" ? c.en : c.th}</p>
                        <p className="text-xs text-ink/50">{lang === "en" ? c.enDesc : c.thDesc}</p>
                        <p className="mt-2 text-sm text-ink/70">
                          {t("ประมาณการ", "Estimate")} <b className="text-ink">{baht(c.amount)}</b>
                        </p>
                        {pl && <p className="mt-0.5 text-[11px] font-bold text-red">📅 {pl}</p>}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Stat label={t("รวมประมาณการทั้งหมด", "Grand total estimate")} value={baht(totals.grand)} color="bg-purple text-white" />
                  <Stat label={t("เงินฉุกเฉินสำรอง (ทุกช่วง)", "Emergency reserve (all phases)")} value={baht(totals.emergency)} color="bg-blue text-white" />
                </div>

                <FundingCard data={data} update={update} lang={lang} totalPlanned={totals.grand + totals.emergency} />

                <ParticipantCard data={data} update={update} lang={lang} />
              </>
            )}

            {tab === "before" && (
              <>
                <PhaseHeader emoji="🌱" title={t("Before · ก่อนการหาเสียง", "Before · Pre-campaign")} desc={t("ประมาณการต้นทุนช่วงสร้างการเป็นที่รู้จักและความไว้วางใจ", "Estimate the costs of building recognition and trust")} />
                <PhasePeriodCard periodKey="before.period" amounts={data.amounts} setAmount={setAmount} lang={lang} />
                <SectionCard sectionKey="before" data={data} update={update} setAmount={setAmount} subTotals={subTotals} total={totals.before} lang={lang} />
              </>
            )}
            {tab === "between" && (
              <>
                <PhaseHeader emoji="📣" title={t("Between · ช่วงหาเสียง", "Between · Campaign period")} desc={t("ช่วงหาเสียงอย่างเป็นทางการ — ยอดรวมส่วนนี้ใช้เทียบเพดาน กกต.", "The official campaign — this section's total is compared with the EC cap")} />
                {cap > 0 && (
                  <Card>
                    <CapBar label={t(`เทียบเพดาน กกต. ${baht(cap)}`, `Against the EC cap ${baht(cap)}`)} value={totals.between} cap={cap} pct={pctBetween} lang={lang} />
                  </Card>
                )}
                <PhasePeriodCard periodKey="between.period" amounts={data.amounts} setAmount={setAmount} lang={lang} />
                <SectionCard sectionKey="between" data={data} update={update} setAmount={setAmount} subTotals={subTotals} total={totals.between} lang={lang} />
              </>
            )}
            {tab === "after" && (
              <>
                <PhaseHeader emoji="🏛️" title={t("After · หลังการเลือกตั้ง", "After · Post-election")} desc={t("ชนะหรือแพ้ การเมืองก็ยังมีต้นทุนต่อเนื่อง — กรอกกรณีที่ตรงกับคุณ", "Win or lose, politics keeps costing — fill in the case that fits you")} />
                <PhasePeriodCard periodKey="after.period" amounts={data.amounts} setAmount={setAmount} lang={lang} />
                <SectionCard sectionKey="afterWin" data={data} update={update} setAmount={setAmount} subTotals={subTotals} total={totals.afterWin} lang={lang} />
                <SectionCard sectionKey="afterLose" data={data} update={update} setAmount={setAmount} subTotals={subTotals} total={totals.afterLose} lang={lang} />
              </>
            )}

            {tab !== "overview" && (
              <button
                onClick={() => {
                  setTab("overview");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-display text-sm font-bold text-ink/60 hover:text-ink hover:underline"
              >
                ← {t("กลับหน้าสรุปรวม", "Back to overview")}
              </button>
            )}
          </>
        )}
      </div>

      {ready && <SubmitBar data={data} update={update} reset={reset} lang={lang} grand={totals.grand} />}
    </main>
  );
}

/* ───────────────────────── ส่วนย่อย ───────────────────────── */
function PhaseHeader({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div>
      <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold text-ink">
        <span>{emoji}</span> {title}
      </h2>
      <p className="mt-1 text-sm text-ink/60">{desc}</p>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`rounded-2xl border-[3px] border-ink p-4 shadow-[5px_5px_0_0_#16130f] ${color}`}>
      <p className="text-xs font-bold opacity-80">{label}</p>
      <p className="mt-1 font-display text-xl font-extrabold sm:text-2xl">{value}</p>
    </div>
  );
}

function CapBar({ label, value, cap, pct, lang }: { label: string; value: number; cap: number; pct: number; lang: Lang }) {
  const tone = capTone(pct);
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-sm">
        <span className="font-bold text-ink/70">{label}</span>
        <span className={`font-bold ${tone.text}`}>
          {baht(value)} · {Math.round(pct * 100)}%
        </span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full border-2 border-ink bg-paper">
        <div className={`h-full ${tone.bar} transition-all`} style={{ width: `${Math.min(pct, 1) * 100}%` }} />
      </div>
      {pct > 1 && (
        <p className={`mt-1 text-xs font-bold ${tone.text}`}>
          {lang === "en" ? `Over the cap by ${baht(value - cap)}` : `เกินเพดาน ${baht(value - cap)}`}
        </p>
      )}
    </div>
  );
}

function MonthYearPicker({
  mVal,
  yVal,
  onM,
  onY,
  lang,
}: {
  mVal?: number;
  yVal?: number;
  onM: (raw: string) => void;
  onY: (raw: string) => void;
  lang: Lang;
}) {
  const names = lang === "en" ? MONTHS_EN : MONTHS_TH;
  return (
    <span className="flex items-center gap-1">
      <select value={mVal ?? ""} onChange={(e) => onM(e.target.value)} className={SEL}>
        <option value="">{lang === "en" ? "month" : "เดือน"}</option>
        {names.map((m, i) => (
          <option key={m} value={i + 1}>
            {m}
          </option>
        ))}
      </select>
      <select value={yVal ?? ""} onChange={(e) => onY(e.target.value)} className={SEL}>
        <option value="">{lang === "en" ? "year" : "ปี"}</option>
        {YEAR_OPTIONS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </span>
  );
}

function PhasePeriodCard({
  periodKey,
  amounts,
  setAmount,
  lang,
}: {
  periodKey: string;
  amounts: Record<string, number>;
  setAmount: (key: string, raw: string) => void;
  lang: Lang;
}) {
  const months = periodMonths(amounts, periodKey);
  const t = (th: string, en: string) => (lang === "en" ? en : th);
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div>
          <h3 className="font-display font-extrabold text-ink">{t("ช่วงเวลาของช่วงนี้", "Time period of this phase")}</h3>
          <p className="text-xs text-ink/50">
            {t(
              "รายการแบบรายเดือน/รายปีที่ไม่ได้เลือกช่วงเอง จะคูณตามช่วงเวลานี้ให้อัตโนมัติ",
              "Monthly/yearly items without their own range are multiplied by this period automatically"
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <MonthYearPicker mVal={amounts[`${periodKey}.startM`]} yVal={amounts[`${periodKey}.startY`]} onM={(v) => setAmount(`${periodKey}.startM`, v)} onY={(v) => setAmount(`${periodKey}.startY`, v)} lang={lang} />
          <span className="text-[11px] text-ink/50">{t("ถึง", "to")}</span>
          <MonthYearPicker mVal={amounts[`${periodKey}.endM`]} yVal={amounts[`${periodKey}.endY`]} onM={(v) => setAmount(`${periodKey}.endM`, v)} onY={(v) => setAmount(`${periodKey}.endY`, v)} lang={lang} />
          {months != null && (
            <span className="rounded-full border-2 border-ink bg-yellow px-3 py-1 text-sm font-bold text-ink">= {durationLabel(months, lang)}</span>
          )}
        </div>
      </div>
    </Card>
  );
}

type Updater = (fn: (d: CopData) => CopData) => void;

function SectionCard({
  sectionKey,
  data,
  update,
  setAmount,
  subTotals,
  total,
  lang,
}: {
  sectionKey: WsSection["key"];
  data: CopData;
  update: Updater;
  setAmount: (key: string, raw: string) => void;
  subTotals: Record<string, number>;
  total: number;
  lang: Lang;
}) {
  const section = WS_SECTIONS.find((s) => s.key === sectionKey)!;
  const [open, setOpen] = useState(true);
  const t = (th: string, en: string) => (lang === "en" ? en : th);
  const emoji: Record<WsSection["key"], string> = { before: "🌱", between: "📣", afterWin: "🏆", afterLose: "💪" };
  return (
    <Card>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-ink bg-paper text-xl shadow-[2px_2px_0_0_#16130f]">{emoji[section.key]}</span>
          <div>
            <h3 className="font-display text-base font-extrabold text-ink">{lang === "en" ? section.en : section.th}</h3>
            {section.descTh && <p className="text-sm text-ink/60">{lang === "en" ? section.descEn : section.descTh}</p>}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full border-2 border-ink bg-paper px-3 py-1 text-sm font-extrabold text-ink">{baht(total)}</span>
          <span className="text-ink/40">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="mt-4 space-y-5">
          {section.groups.map((g) => (
            <GroupBlock key={g.key} group={g} data={data} update={update} setAmount={setAmount} subTotals={subTotals} periodKey={PHASE_PERIOD_KEYS[section.key]} lang={lang} />
          ))}
          {section.emergencyKey && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-purple/60 bg-purple/5 px-3.5 py-2.5">
              <span className="flex items-center gap-2 text-sm font-bold text-purple">🐷 {t("เงินฉุกเฉิน (สำรองประจำช่วงนี้)", "Emergency fund (reserve for this phase)")}</span>
              <AmountInput value={data.amounts[section.emergencyKey]} onChange={(v) => setAmount(section.emergencyKey!, v)} />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function GroupBlock({
  group,
  data,
  update,
  setAmount,
  subTotals,
  periodKey,
  lang,
}: {
  group: WsGroup;
  data: CopData;
  update: Updater;
  setAmount: (key: string, raw: string) => void;
  subTotals: Record<string, number>;
  periodKey: string;
  lang: Lang;
}) {
  const t = (th: string, en: string) => (lang === "en" ? en : th);
  const myCustoms = data.customs.filter((c) => c.groupKey === group.key);
  const total =
    group.items.reduce((s, it) => s + itemTotal(data.amounts, it, periodKey) + (subTotals[it.key] || 0), 0) +
    myCustoms.reduce((s, c) => s + (data.amounts[`custom.${c.id}`] || 0) + (subTotals[`custom.${c.id}`] || 0), 0);

  const removeCustom = (id: string) =>
    update((d) => {
      const key = `custom.${id}`;
      const amounts = { ...d.amounts };
      delete amounts[key];
      const labels = { ...d.labels };
      delete labels[key];
      return { ...d, customs: d.customs.filter((c) => c.id !== id), subs: d.subs.filter((s) => s.parentKey !== key), amounts, labels };
    });

  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-paper p-3 sm:p-4">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h4 className="font-display text-sm font-extrabold text-ink">
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-red align-baseline" />
          {lang === "en" ? group.en : group.th}
        </h4>
        <span className="text-sm font-bold text-ink/70">{baht(total)}</span>
      </div>
      <div className="space-y-2">
        {group.items.map((it) => (
          <ItemRow key={it.key} item={it} data={data} update={update} setAmount={setAmount} periodKey={periodKey} lang={lang} />
        ))}
        {myCustoms.map((c) => (
          <ItemRow
            key={c.id}
            item={{ key: `custom.${c.id}`, th: "รายการของฉัน — กด ✎ ตั้งชื่อ", en: "My item — tap ✎ to name it", subExTh: "ระบุประเภทค่าใช้จ่าย", subExEn: "specify the expense type" }}
            data={data}
            update={update}
            setAmount={setAmount}
            onDelete={() => removeCustom(c.id)}
            lang={lang}
          />
        ))}
      </div>
      <button
        onClick={() => update((d) => ({ ...d, customs: [...d.customs, { id: uid(), groupKey: group.key }] }))}
        className="mt-2 rounded-lg px-2 py-1.5 text-xs font-bold text-ink/50 transition hover:bg-yellow hover:text-ink"
      >
        ＋ {t("เพิ่มรายการอื่น ๆ ในกลุ่มนี้", "Add another item to this group")}
      </button>
      {group.noteTh && <p className="mt-2 text-right text-[11px] text-ink/40">({lang === "en" ? group.noteEn : group.noteTh})</p>}
      {total === 0 && (
        <p className="mt-1 text-center text-[11px] text-ink/30">{t("ยังไม่ได้กรอก — ใส่เฉพาะรายการที่เกี่ยวกับคุณก็พอ", "Nothing yet — fill only what applies to you")}</p>
      )}
    </div>
  );
}

function ItemName({ item, data, update, lang }: { item: WsItem; data: CopData; update: Updater; lang: Lang }) {
  const fallback = lang === "en" ? item.en : item.th;
  const label = data.labels[item.key] ?? fallback;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const save = () => {
    const v = text.trim();
    update((d) => {
      const labels = { ...d.labels };
      if (!v || v === fallback) delete labels[item.key];
      else labels[item.key] = v;
      return { ...d, labels };
    });
    setEditing(false);
  };
  if (editing)
    return (
      <input
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") setEditing(false);
        }}
        className={INPUT + " w-full max-w-72"}
      />
    );
  return (
    <p className="flex items-center gap-1 text-sm text-ink">
      {label}
      <button
        onClick={() => {
          setText(label);
          setEditing(true);
        }}
        title={lang === "en" ? "Rename item" : "แก้ไขชื่อรายการ"}
        className="rounded px-1 text-xs text-ink/30 transition hover:bg-yellow hover:text-ink"
      >
        ✎
      </button>
    </p>
  );
}

function ItemRow({
  item,
  data,
  update,
  setAmount,
  onDelete,
  periodKey,
  lang,
}: {
  item: WsItem;
  data: CopData;
  update: Updater;
  setAmount: (key: string, raw: string) => void;
  onDelete?: () => void;
  periodKey?: string;
  lang: Lang;
}) {
  const t = (th: string, en: string) => (lang === "en" ? en : th);
  const amounts = data.amounts;
  const total = itemTotal(amounts, item, periodKey);
  const months = itemMonths(amounts, item.key, periodKey);
  const usesPhasePeriod =
    !!item.calc && periodMonths(amounts, item.key) == null && !amounts[`${item.key}.months`] && !!periodKey && periodMonths(amounts, periodKey) != null;
  const val = (suffix: string) => amounts[`${item.key}.${suffix}`];
  const set = (suffix: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setAmount(`${item.key}.${suffix}`, e.target.value);
  const hint = item.hintTh || item.hintEn ? (lang === "en" ? item.hintEn ?? item.hintTh : item.hintTh) : null;

  const mySubs = data.subs.filter((s) => s.parentKey === item.key);
  const addSub = () => update((d) => ({ ...d, subs: [...d.subs, { id: uid(), parentKey: item.key, name: "" }] }));
  const patchSub = (id: string, changes: Partial<CopSub>) => update((d) => ({ ...d, subs: d.subs.map((s) => (s.id === id ? { ...s, ...changes } : s)) }));
  const removeSub = (id: string) => update((d) => ({ ...d, subs: d.subs.filter((s) => s.id !== id) }));
  const subPlaceholder = (lang === "en" ? item.subExEn ?? item.subExTh : item.subExTh) ?? t("ระบุประเภทค่าใช้จ่าย", "specify the expense type");

  if (!item.calc) {
    const subsSum = mySubs.reduce((sum, s) => sum + subItemTotal(s), 0);
    const rowTotal = (amounts[item.key] || 0) + subsSum;
    return (
      <div className="rounded-xl border-2 border-ink/10 bg-white px-3 py-2.5 transition hover:border-ink/40">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <ItemName item={item} data={data} update={update} lang={lang} />
            {hint && <p className="text-[11px] text-ink/50">{hint}</p>}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {mySubs.length > 0 && <span className="text-sm font-bold text-ink">= {baht(rowTotal)}</span>}
            <AmountInput value={amounts[item.key]} onChange={(v) => setAmount(item.key, v)} />
            <button onClick={addSub} title={t("เพิ่มรายการย่อย (ไม่บังคับ)", "Add sub-item (optional)")} className="rounded-lg px-1.5 py-1 text-base text-ink/30 transition hover:bg-yellow hover:text-ink">
              ＋
            </button>
            {onDelete && (
              <button onClick={onDelete} title={t("ลบรายการนี้", "Delete this item")} className="rounded-lg px-1.5 py-1 text-sm text-ink/30 transition hover:bg-red hover:text-white">
                ✕
              </button>
            )}
          </div>
        </div>
        {mySubs.length > 0 && (
          <div className="mt-2 space-y-1.5 border-l-[3px] border-yellow pl-3">
            {mySubs.map((s) => (
              <SubRow key={s.id} sub={s} patch={patchSub} remove={removeSub} placeholder={subPlaceholder} lang={lang} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5 rounded-xl border-2 border-ink/10 bg-white px-3 py-2.5 transition hover:border-ink/40">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <ItemName item={item} data={data} update={update} lang={lang} />
        <span className={`text-sm font-bold ${total > 0 ? "text-ink" : "text-ink/30"}`}>
          = {baht(total)}
          {months > 0 && (
            <span className="ml-1 text-[11px] font-normal text-ink/50">
              ({months} {t("เดือน", "mo")}
              {usesPhasePeriod ? ` · ${t("ตามช่วงเวลาของช่วงนี้", "from this phase's period")}` : ""})
            </span>
          )}
        </span>
      </div>
      {hint && <p className="-mt-1 text-[11px] text-ink/50">{hint}</p>}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <input type="number" inputMode="decimal" min={0} value={val("rate") ?? ""} onChange={set("rate")} placeholder="0" aria-label={t("อัตรา", "rate")} className={NUM + " w-28"} />
        <select aria-label={t("ความถี่", "frequency")} value={val("freq") ?? 0} onChange={set("freq")} className={SEL}>
          <option value={0}>{t("รายเดือน", "per month")}</option>
          <option value={1}>{t("รายปี", "per year")}</option>
        </select>
        {item.calc === "salary" && (
          <>
            <span className="text-xs text-ink/30">×</span>
            <label className="flex items-center gap-1 text-[11px] text-ink/50">
              <input type="number" inputMode="numeric" min={0} value={val("people") ?? ""} onChange={set("people")} placeholder="0" className={NUM + " w-14"} />
              {t("คน", "people")}
            </label>
          </>
        )}
        <span className="text-[11px] text-ink/50">{t("ช่วง", "from")}</span>
        <MonthYearPicker mVal={val("startM")} yVal={val("startY")} onM={(v) => setAmount(`${item.key}.startM`, v)} onY={(v) => setAmount(`${item.key}.startY`, v)} lang={lang} />
        <span className="text-[11px] text-ink/50">{t("ถึง", "to")}</span>
        <MonthYearPicker mVal={val("endM")} yVal={val("endY")} onM={(v) => setAmount(`${item.key}.endM`, v)} onY={(v) => setAmount(`${item.key}.endY`, v)} lang={lang} />
      </div>
    </div>
  );
}

function SubRow({
  sub,
  patch,
  remove,
  placeholder,
  lang,
}: {
  sub: CopSub;
  patch: (id: string, changes: Partial<CopSub>) => void;
  remove: (id: string) => void;
  placeholder: string;
  lang: Lang;
}) {
  const t = (th: string, en: string) => (lang === "en" ? en : th);
  const total = subItemTotal(sub);
  const num = (field: "qty" | "rate" | "days", w: string, ph: string, label: string) => (
    <label className="flex items-center gap-1 text-[10px] text-ink/50">
      <input
        type="number"
        inputMode="decimal"
        min={0}
        value={sub[field] ?? ""}
        onChange={(e) => patch(sub.id, { [field]: e.target.value === "" ? undefined : Number(e.target.value) })}
        placeholder={ph}
        className={NUM + " " + w + " px-2 py-1 text-xs"}
      />
      {label}
    </label>
  );
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <input type="text" value={sub.name} onChange={(e) => patch(sub.id, { name: e.target.value })} placeholder={placeholder} className={INPUT + " w-40 px-2 py-1 text-xs"} />
      {num("qty", "w-14", "1", t("จำนวน", "qty"))}
      <span className="text-[10px] text-ink/30">×</span>
      {num("rate", "w-20", "0", t("บาท", "THB"))}
      <span className="text-[10px] text-ink/30">×</span>
      {num("days", "w-12", "1", t("วัน/ครั้ง", "days/times"))}
      <span className={`text-xs font-bold ${total > 0 ? "text-ink" : "text-ink/30"}`}>= {baht(total)}</span>
      <button onClick={() => remove(sub.id)} title={t("ลบรายการย่อย", "Delete sub-item")} className="rounded px-1 text-xs text-ink/30 transition hover:bg-red hover:text-white">
        ✕
      </button>
    </div>
  );
}

function AmountInput({ value, onChange }: { value: number | undefined; onChange: (raw: string) => void }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <input type="number" inputMode="decimal" min={0} value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="0" className={NUM + " w-28 sm:w-32"} />
      <span className="text-xs text-ink/50">฿</span>
    </div>
  );
}

function FundingCard({ data, update, lang, totalPlanned }: { data: CopData; update: Updater; lang: Lang; totalPlanned: number }) {
  const t = (th: string, en: string) => (lang === "en" ? en : th);
  const total = data.funding.reduce((s, f) => s + (f.amount || 0), 0);
  const patch = (id: string, changes: Partial<{ name: string; amount: number }>) =>
    update((d) => ({ ...d, funding: d.funding.map((f) => (f.id === id ? { ...f, ...changes } : f)) }));
  return (
    <Card>
      <SectionTitle
        title={t("แหล่งทรัพยากรและการสนับสนุนของฉัน", "My funding & support sources")}
        subtitle={t(
          "ใส่ยอดที่คาดว่าจะได้รับ/มีสะสมในแต่ละช่องได้เลย — การกระจายแหล่งทุนช่วยลดความเสี่ยงจากการพึ่งพาแหล่งเดียว",
          "Fill in the expected / saved amount for each source — diversified funding reduces single-source risk"
        )}
      />
      <div className="space-y-2">
        {data.funding.map((f) => {
          const pct = total > 0 ? Math.round(((f.amount || 0) / total) * 100) : 0;
          return (
            <div key={f.id} className="rounded-xl border-2 border-ink/10 bg-white px-3 py-2.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <input type="text" value={f.name} onChange={(e) => patch(f.id, { name: e.target.value })} placeholder={t("ชื่อแหล่งทุน", "Source name")} className={INPUT + " min-w-0 flex-1 border-transparent px-1 py-0.5 font-bold hover:border-ink/20"} />
                <span className="shrink-0 text-xs font-bold text-ink/50">{pct}%</span>
                <div className="flex shrink-0 items-center gap-1">
                  <input type="number" inputMode="decimal" min={0} value={f.amount || ""} onChange={(e) => patch(f.id, { amount: e.target.value === "" ? 0 : Number(e.target.value) })} placeholder="0" className={NUM + " w-28 sm:w-32"} />
                  <span className="text-xs text-ink/50">฿</span>
                </div>
                <button onClick={() => update((d) => ({ ...d, funding: d.funding.filter((x) => x.id !== f.id) }))} title={t("ลบ", "Delete")} className="rounded-lg px-1.5 py-1 text-sm text-ink/30 transition hover:bg-red hover:text-white">
                  ✕
                </button>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full bg-teal" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
        <button onClick={() => update((d) => ({ ...d, funding: [...d.funding, { id: uid(), name: "", amount: 0 }] }))} className="rounded-lg px-2 py-1.5 text-xs font-bold text-ink/50 transition hover:bg-yellow hover:text-ink">
          ＋ {t("เพิ่มแหล่งทุนอื่น", "Add another source")}
        </button>
        <div className="flex items-center justify-between px-1 pt-1 text-sm">
          <span className="text-ink/60">💼 {t("รวมแหล่งทุน", "Total funding")}</span>
          <b className="text-ink">{baht(total)}</b>
        </div>
        {totalPlanned > 0 && total > 0 && (
          <p className={`rounded-xl border-2 border-ink px-3 py-2 text-sm font-bold ${total >= totalPlanned ? "bg-lime text-ink" : "bg-yellow text-ink"}`}>
            {total >= totalPlanned
              ? t(`ทุนครอบคลุมประมาณการทั้งหมด (เหลือ ${baht(total - totalPlanned)})`, `Funding covers the full estimate (${baht(total - totalPlanned)} spare)`)
              : t(`ทุนยังขาดจากประมาณการ ${baht(totalPlanned - total)} — หาช่องทางเพิ่มหรือปรับแผน`, `Funding falls ${baht(totalPlanned - total)} short — find more sources or adjust the plan`)}
          </p>
        )}
      </div>
    </Card>
  );
}

function ParticipantCard({ data, update, lang }: { data: CopData; update: Updater; lang: Lang }) {
  const t = (th: string, en: string) => (lang === "en" ? en : th);
  const setMeta = (patch: Partial<CopData["meta"]>) => update((d) => ({ ...d, meta: { ...d.meta, ...patch } }));
  return (
    <Card className="bg-yellow/20">
      <SectionTitle
        title={t("ข้อมูลผู้กรอก (ไม่บังคับ)", "About you (optional)")}
        subtitle={t("ใช้เพื่อจัดกลุ่มคำตอบในเวิร์กช็อปเท่านั้น — ไม่ต้องใส่ชื่อจริงก็ได้", "Used only to group answers in the workshop — a nickname or code is fine")}
      />
      <div className="grid gap-3 md:grid-cols-3">
        <Field label={t("ชื่อเล่น / รหัสผู้เข้าร่วม", "Nickname / participant code")}>
          <input type="text" className={INPUT + " w-full"} value={data.meta.nickname ?? ""} onChange={(e) => setMeta({ nickname: e.target.value })} />
        </Field>
        <Field label={t("จังหวัด / พื้นที่", "Province / area")}>
          <input type="text" className={INPUT + " w-full"} value={data.meta.province ?? ""} onChange={(e) => setMeta({ province: e.target.value })} />
        </Field>
        <Field label={t("หมายเหตุ", "Note")}>
          <input type="text" className={INPUT + " w-full"} value={data.meta.note ?? ""} onChange={(e) => setMeta({ note: e.target.value })} />
        </Field>
      </div>
    </Card>
  );
}

function SubmitBar({ data, update, reset, lang, grand }: { data: CopData; update: Updater; reset: () => void; lang: Lang; grand: number }) {
  const t = (th: string, en: string) => (lang === "en" ? en : th);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  const send = async () => {
    setState("sending");
    const r = await submitToSheet(data, lang);
    if (r.ok) {
      update((d) => ({ ...d, submittedAt: new Date().toISOString() }));
      setState("done");
    } else {
      setErr(r.error);
      setState("error");
    }
  };

  const confirmReset = () => {
    if (window.confirm(t("ล้างข้อมูลทั้งหมดในเครื่องนี้ใช่ไหม? (คำตอบที่ส่งไปแล้วไม่หาย)", "Clear everything on this device? (Answers already submitted are kept)"))) {
      reset();
      setState("idle");
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 rounded-2xl border-[3px] border-ink bg-paper px-4 py-3 shadow-[5px_5px_0_0_#16130f]">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50">{t("รวมประมาณการ", "Total estimate")}</p>
          <p className="truncate font-display text-lg font-extrabold text-ink">{baht(grand)}</p>
          {data.submittedAt && state !== "error" && (
            <p className="text-[11px] text-teal">
              ✓ {t("ส่งแล้ว", "Submitted")} {new Date(data.submittedAt).toLocaleString(lang === "en" ? "en-GB" : "th-TH")}
            </p>
          )}
          {state === "error" && (
            <p className="text-[11px] font-bold text-red">
              {err === "no-endpoint" ? t("ยังไม่ได้ตั้งค่าปลายทางรับคำตอบ", "Submission endpoint not configured") : t(`ส่งไม่สำเร็จ (${err}) — ลองใหม่อีกครั้ง`, `Failed (${err}) — please try again`)}
            </p>
          )}
        </div>
        <button onClick={confirmReset} className="rounded-lg px-3 py-2 text-xs font-bold text-ink/50 hover:bg-yellow hover:text-ink">
          {t("ล้างข้อมูล", "Clear")}
        </button>
        <button
          onClick={send}
          disabled={state === "sending"}
          className={`rounded-xl border-[3px] border-ink px-5 py-2.5 font-display text-sm font-extrabold shadow-[3px_3px_0_0_#16130f] transition hover:-translate-y-0.5 disabled:opacity-60 ${
            state === "done" ? "bg-teal text-white" : "bg-red text-white"
          }`}
        >
          {state === "sending" ? t("กำลังส่ง…", "Sending…") : state === "done" ? t("ส่งแล้ว ✓ · ส่งอีกครั้ง", "Sent ✓ · Send again") : t("ส่งคำตอบ", "Submit")}
        </button>
      </div>
    </div>
  );
}
