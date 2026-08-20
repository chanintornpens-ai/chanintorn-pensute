"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { sites, type Lang, type SiteConfig } from "../site-config";

/**
 * ตัวจัดการภาษา — ค่าเริ่มต้นคือภาษาอังกฤษ (en)
 * ผู้ใช้กดสลับได้จากปุ่มบนเมนู และระบบจะจำภาษาที่เลือกไว้ (localStorage)
 */
const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  site: SiteConfig;
}>({ lang: "en", setLang: () => {}, site: sites.en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // กู้ภาษาที่เคยเลือกไว้ (ถ้ามี)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("lang");
      if (saved === "th" || saved === "en") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* localStorage ใช้ไม่ได้ก็ไม่เป็นไร */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("lang", l);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, site: sites[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
