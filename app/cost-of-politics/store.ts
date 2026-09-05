"use client";

// สโตร์ของหน้า Cost of Politics — เก็บในเครื่องผู้ใช้ (localStorage) จนกว่าจะกด "ส่งคำตอบ"
import { useCallback, useEffect, useState } from "react";

export interface CopSub {
  id: string;
  parentKey: string; // key ของรายการแม่ เช่น "before.variable.pr" หรือ "custom.<id>"
  name: string;
  qty?: number;
  rate?: number;
  days?: number;
}
export interface CopCustom {
  id: string;
  groupKey: string; // key ของกลุ่ม เช่น "before.fixed"
}
export interface CopFunding {
  id: string;
  name: string;
  amount: number;
}
export interface CopMeta {
  nickname?: string; // ชื่อเล่น/รหัสผู้เข้าร่วม (ไม่บังคับ)
  province?: string;
  note?: string;
}
export interface CopData {
  position?: string;
  term?: "full" | "vacancy";
  customCap?: number;
  amounts: Record<string, number>;
  labels: Record<string, string>;
  subs: CopSub[];
  customs: CopCustom[];
  funding: CopFunding[];
  fundingSeeded?: boolean;
  meta: CopMeta;
  submittedAt?: string; // ISO — ส่งคำตอบล่าสุดเมื่อไร
}

export const FUNDING_SUGGESTED: { th: string; en: string }[] = [
  { th: "เงินออมหรือรายได้ส่วนตัว", en: "Personal savings / income" },
  { th: "การสนับสนุนจากพรรคหรือองค์กร", en: "Party / organisation support" },
  { th: "การสนับสนุนจากผู้สนับสนุนหรือเครือข่าย", en: "Supporters / network" },
  { th: "การระดมทุนสาธารณะ", en: "Public fundraising" },
];

const KEY = "cost-of-politics-v1";

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export const emptyData = (): CopData => ({
  amounts: {},
  labels: {},
  subs: [],
  customs: [],
  funding: FUNDING_SUGGESTED.map((s) => ({ id: uid(), name: s.th, amount: 0 })),
  fundingSeeded: true,
  meta: {},
});

export function useCopStore() {
  const [data, setData] = useState<CopData>(emptyData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CopData>;
        setData({ ...emptyData(), ...parsed, amounts: parsed.amounts ?? {}, labels: parsed.labels ?? {} });
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const update = useCallback((fn: (d: CopData) => CopData) => {
    setData((prev) => {
      const next = fn(prev);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    setData(emptyData());
  }, []);

  return { data, update, reset, ready };
}
