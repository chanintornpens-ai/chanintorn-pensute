"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";
import type { Lang } from "../site-config";

export default function Nav() {
  const { lang, setLang, site } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: site.ui.navAbout },
    { href: "#workshops", label: site.ui.navWorkshops },
    { href: "#work", label: site.ui.navWork },
    { href: "#awards", label: site.ui.navAwards },
    { href: "#collab", label: site.ui.navCollab },
    { href: "#contact", label: site.ui.navContact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-2xl border-[3px] border-ink bg-paper px-3 py-2.5 transition-all duration-200 ${
          scrolled ? "shadow-[5px_5px_0_0_#16130f]" : "shadow-[3px_3px_0_0_#16130f]"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg border-2 border-ink bg-red text-white shadow-[2px_2px_0_0_#16130f] transition-transform group-hover:-rotate-6">
            {site.nickname.charAt(0) || site.name.charAt(0)}
          </span>
          <span className="hidden sm:block">{site.nickname || site.name}</span>
        </a>

        {/* เมนูจอใหญ่ */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-bold text-ink/80 transition-colors hover:bg-yellow hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <LangToggle lang={lang} setLang={setLang} />
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="ml-1.5 rounded-lg border-2 border-ink bg-ink px-4 py-2 text-sm font-bold text-paper shadow-[2px_2px_0_0_#16130f] transition-transform hover:-translate-y-0.5"
            >
              {site.ui.sayHi}
            </a>
          </li>
        </ul>

        {/* จอเล็ก: ปุ่มภาษา + แฮมเบอร์เกอร์ */}
        <div className="flex items-center gap-2 md:hidden">
          <LangToggle lang={lang} setLang={setLang} />
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border-2 border-ink bg-yellow"
            aria-label="Menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* เมนูมือถือ */}
      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl border-[3px] border-ink bg-paper p-2 shadow-[5px_5px_0_0_#16130f] md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 font-bold text-ink/80 hover:bg-yellow hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-lg bg-ink px-4 py-3 text-center font-bold text-paper"
          >
            {site.ui.sayHi}
          </a>
        </div>
      )}
    </header>
  );
}

/* ปุ่มสลับภาษา EN | ไทย */
function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex overflow-hidden rounded-lg border-2 border-ink font-display text-xs font-bold">
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === "en" ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-yellow"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("th")}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === "th" ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-yellow"
        }`}
        aria-pressed={lang === "th"}
      >
        ไทย
      </button>
    </div>
  );
}
