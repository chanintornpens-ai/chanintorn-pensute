"use client";

import Image from "next/image";
import { type Project } from "./site-config";
import { useLang } from "./components/LangProvider";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import { iconMap, ArrowIcon, Star, Squiggle, ScribbleArrow, MailIcon, PhoneIcon, LineIcon } from "./components/icons";

/* สีประจำการ์ดผลงาน (เขียนคลาสเต็มเพื่อไม่ให้ Tailwind ตัดทิ้ง) */
const tileBg: Record<string, string> = {
  violet: "bg-purple",
  amber: "bg-yellow",
  cyan: "bg-teal",
  lime: "bg-lime",
  red: "bg-red",
  pink: "bg-pink",
  blue: "bg-blue",
};

function highlight(text: string, mark = "var(--color-yellow)") {
  // [...] = เน้นมาร์กเกอร์ · {...} = ไม่ตัดบรรทัดกลางคำ · | = ขึ้นบรรทัดใหม่
  const parts = text.split(/(\[[^\]]+\]|\{[^}]+\}|\|)/g);
  return parts.map((part, i) => {
    if (part === "|") return <br key={i} />;
    if (part.startsWith("[") && part.endsWith("]")) {
      return (
        <span key={i} className="marker" style={{ "--mark": mark } as React.CSSProperties}>
          {part.slice(1, -1)}
        </span>
      );
    }
    if (part.startsWith("{") && part.endsWith("}")) {
      return (
        <span key={i} className="whitespace-nowrap">
          {part.slice(1, -1)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function SectionLabel({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      {n && (
        <span className="grid h-9 w-9 place-items-center rounded-lg border-[3px] border-ink bg-ink font-display text-sm font-bold text-paper">
          {n}
        </span>
      )}
      <span className="font-display text-sm font-bold tracking-[0.15em] text-ink/70">
        {children}
      </span>
    </div>
  );
}

export default function Home() {
  const { site } = useLang();
  const ui = site.ui;

  return (
    <>
      <Nav />
      <main id="top" className="flex-1">
        {/* ───────────── HERO ───────────── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
          {/* สติกเกอร์ลอย */}
          <Star className="absolute left-[6%] top-32 hidden h-10 w-10 animate-spin-slow text-purple sm:block" />
          <span
            className="absolute right-[8%] top-36 hidden animate-float rounded-xl border-[3px] border-ink bg-pink px-3 py-1.5 font-display text-sm font-bold text-ink shadow-[3px_3px_0_0_#16130f] sm:block"
            style={{ "--r": "8deg" } as React.CSSProperties}
          >
            ✨ Maker
          </span>
          <Star className="absolute bottom-16 right-[14%] hidden h-7 w-7 text-teal sm:block" />

          <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-32 text-center sm:pt-40">
            {site.available && (
              <Reveal>
                <span
                  className="mb-7 inline-flex -rotate-2 items-center gap-2 rounded-full border-[3px] border-ink bg-yellow px-4 py-1.5 text-sm font-bold text-ink shadow-[3px_3px_0_0_#16130f]"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-red ring-2 ring-ink" />
                  {site.availableText}
                </span>
              </Reveal>
            )}

            <Reveal delay={70}>
              <h1 className="mx-auto max-w-4xl text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
                {highlight(site.headline)}
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="mx-auto mt-7 max-w-4xl text-balance text-lg font-medium leading-relaxed text-ink/75">
                {site.subheadline}
              </p>
              <div className="mx-auto mt-3 flex flex-col items-center gap-y-1 font-display text-base font-bold text-ink/70">
                {site.subheadlineTools.map((line, i) => (
                  <div key={i} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                    {line.map((w) => (
                      <span key={w} className="whitespace-nowrap">
                        {w}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-red px-7 py-3.5 font-display font-bold text-white shadow-[5px_5px_0_0_#16130f] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  {ui.heroWork}
                  <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-paper px-7 py-3.5 font-display font-bold text-ink shadow-[5px_5px_0_0_#16130f] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  {ui.heroContact}
                </a>
                <ScribbleArrow className="absolute -right-12 -top-10 hidden h-16 w-16 rotate-12 text-blue lg:block" />
              </div>
            </Reveal>

            {/* สถิติ */}
            <Reveal delay={300}>
              <dl className="mx-auto mt-16 grid max-w-md grid-cols-2 gap-3 sm:gap-4">
                {site.stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`rounded-2xl border-[3px] border-ink px-2 py-5 shadow-[4px_4px_0_0_#16130f] ${
                      ["bg-yellow", "bg-teal"][i % 2]
                    }`}
                  >
                    <dt className="font-display text-3xl font-bold text-ink sm:text-4xl">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-xs font-bold text-ink/70">{s.label}</dd>
                  </div>
                ))}
              </dl>
              <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2">
                {site.certs.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border-[3px] border-ink bg-paper px-4 py-1.5 text-sm font-bold text-ink shadow-[3px_3px_0_0_#16130f]"
                  >
                    🎓 {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────────── MARQUEE BAND ───────────── */}
        <div className="overflow-hidden border-y-[3px] border-ink bg-ink py-3 select-none">
          <div className="flex w-max animate-marquee items-center gap-6 pr-6">
            {Array.from({ length: 4 }).flatMap((_, rep) =>
              site.marquee.map((item, j) => (
                <span
                  key={`${rep}-${j}`}
                  className="flex items-center gap-6 font-display text-lg font-bold tracking-wide text-paper"
                >
                  {item}
                  <Star className={`h-4 w-4 ${["text-yellow", "text-red", "text-teal", "text-pink"][j % 4]}`} />
                </span>
              ))
            )}
          </div>
        </div>

        {/* ───────────── ABOUT ───────────── */}
        <section id="about" className="px-4 py-20 sm:py-28">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-5 md:gap-12">
            <Reveal className="md:col-span-2">
              <div className="relative mx-auto w-full max-w-xs">
                <div className="aspect-[4/5] rotate-2 overflow-hidden rounded-3xl border-[3px] border-ink bg-teal shadow-[10px_10px_0_0_#16130f]">
                  <Image
                    src="/profile.jpg"
                    alt={site.name}
                    width={640}
                    height={800}
                    priority
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <span
                  className="absolute -right-3 top-5 rotate-6 rounded-xl border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-sm font-bold shadow-[3px_3px_0_0_#16130f]"
                >
                  {ui.hello}
                </span>
                <span
                  className="absolute -left-4 bottom-6 -rotate-6 rounded-xl border-[3px] border-ink bg-pink px-3 py-1.5 font-display text-sm font-bold shadow-[3px_3px_0_0_#16130f]"
                >
                  ✨ Maker
                </span>
              </div>
            </Reveal>

            <div className="md:col-span-3">
              <Reveal>
                <SectionLabel>{ui.aboutEyebrow}</SectionLabel>
                <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  {site.name}
                </h2>
                <p className="mt-3 inline-block -rotate-1">
                  <span className="marker font-display text-lg font-bold" style={{ "--mark": "var(--color-teal)" } as React.CSSProperties}>
                    {site.role}
                  </span>
                  <span className="ml-2 font-display text-lg font-bold text-ink/60">
                    · {site.location}
                  </span>
                </p>
                <p className="mt-2 font-display text-sm font-bold text-ink/55">
                  🎓 {site.almaMater}
                </p>
              </Reveal>
              <div className="mt-6 space-y-4">
                {site.about.map((p, i) => (
                  <Reveal key={i} delay={i * 90}>
                    <p className="text-lg font-medium leading-relaxed text-ink/80">
                      {p.split("|").map((seg, j) => (
                        <span key={j}>
                          {j > 0 && <br />}
                          {seg}
                        </span>
                      ))}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* ดาวน์โหลด CV */}
              <Reveal delay={200}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="font-display text-sm font-bold tracking-wide text-ink/60">
                    {ui.cvLabel}
                  </span>
                  <a
                    href={site.cv.th}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-yellow px-5 py-2.5 font-display text-sm font-bold text-ink shadow-[4px_4px_0_0_#16130f] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                  >
                    {ui.cvTh}
                  </a>
                  <a
                    href={site.cv.en}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-teal px-5 py-2.5 font-display text-sm font-bold text-ink shadow-[4px_4px_0_0_#16130f] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                  >
                    {ui.cvEn}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────────── เวิร์กช็อป / อบรม ───────────── */}
        <section id="workshops" className="px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {highlight(ui.workshopsHeading, "var(--color-blue)")}
              </h2>
              <p className="mt-3 max-w-xl font-medium leading-relaxed text-ink/70">
                {ui.workshopsSub}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {site.workshops.map((p, i) => (
                <Reveal key={p.title} delay={i * 110}>
                  <ProjectCard project={p} coverAlt={ui.coverAlt} />
                </Reveal>
              ))}
            </div>

            {/* โพลารอยด์เวิร์กช็อปที่ผ่านมา (โชว์เมื่อมีรูปเท่านั้น) */}
            {site.workshopsGallery.length > 0 && (
            <div className="mt-12 flex flex-wrap items-start justify-center gap-6">
              {site.workshopsGallery.map((g, i) => (
                <Reveal key={g.src} delay={i * 120}>
                  <figure
                    className={`w-64 rounded-2xl border-[3px] border-ink bg-paper p-3 pb-4 shadow-[6px_6px_0_0_#16130f] transition-transform hover:z-10 hover:scale-105 hover:rotate-0 ${
                      ["-rotate-2", "rotate-2"][i % 2]
                    }`}
                  >
                    <Image
                      src={g.src}
                      alt={g.caption}
                      width={500}
                      height={500}
                      className="aspect-square w-full rounded-lg border-2 border-ink object-cover"
                    />
                    <figcaption className="mt-3 text-center font-display text-sm font-bold text-ink/70">
                      {g.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            )}
          </div>
        </section>

        {/* ───────────── WORK ───────────── */}
        <section id="work" className="px-4 pb-20 sm:pb-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {highlight(ui.workHeading, "var(--color-red)")}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {site.projects.map((p, i) => (
                <Reveal key={p.title} delay={i * 110}>
                  <ProjectCard project={p} coverAlt={ui.coverAlt} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── ผลงานเด่น / รางวัล ───────────── */}
        <section id="awards" className="px-4 pb-20 sm:pb-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {highlight(ui.awardsHeading, "var(--color-yellow)")}
              </h2>
              <p className="mt-3 max-w-xl font-medium leading-relaxed text-ink/70">
                {ui.awardsSub}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {site.highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 110}>
                  <article className="flex h-full flex-col rounded-3xl border-[3px] border-ink bg-paper p-6 hard">
                    <div
                      className={`grid h-16 w-16 place-items-center rounded-2xl border-[3px] border-ink text-3xl shadow-[3px_3px_0_0_#16130f] ${
                        tileBg[h.color] ?? tileBg.violet
                      }`}
                    >
                      {h.emoji}
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                      {h.title}
                    </h3>
                    <p className="mt-2 flex-1 font-medium leading-relaxed text-ink/75">
                      {h.detail}
                    </p>
                    <p className="mt-3 font-display text-sm font-bold text-ink/50">{h.meta}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* แกลเลอรีเวทีนานาชาติ */}
            <div className="mt-12 flex flex-wrap items-start justify-center gap-6">
              {site.awardsGallery.map((g, i) => (
                <Reveal key={g.src} delay={i * 120}>
                  <figure
                    className={`w-64 rounded-2xl border-[3px] border-ink bg-paper p-3 pb-4 shadow-[6px_6px_0_0_#16130f] transition-transform hover:z-10 hover:scale-105 hover:rotate-0 ${
                      ["-rotate-2", "rotate-1", "rotate-3"][i % 3]
                    }`}
                  >
                    <Image
                      src={g.src}
                      alt={g.caption}
                      width={500}
                      height={500}
                      className="aspect-square w-full rounded-lg border-2 border-ink object-cover"
                    />
                    <figcaption className="mt-3 text-center font-display text-sm font-bold text-ink/70">
                      {g.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            {/* ทุน & การได้รับเลือก */}
            <Reveal delay={150}>
              <div className="mt-12 rounded-3xl border-[3px] border-ink bg-paper p-6 hard sm:p-8">
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {ui.grantsHeading}
                </h3>
                <ul className="mt-5 divide-y-2 divide-dashed divide-ink/15">
                  {site.grants.map((g, i) => (
                    <li key={i} className="flex items-start gap-4 py-3">
                      <span className="mt-0.5 shrink-0 rounded-lg border-2 border-ink bg-yellow px-2.5 py-0.5 font-display text-sm font-bold">
                        {g.year}
                      </span>
                      <span className="font-medium leading-relaxed text-ink/80">{g.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* ประกาศนียบัตร */}
            <Reveal delay={200}>
              <div className="mt-8 rounded-3xl border-[3px] border-ink bg-paper p-6 hard sm:p-8">
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {ui.certsHeading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {[...site.certs, ...site.certsExtra].map((c) => (
                    <li key={c} className="flex items-start gap-3 font-medium leading-relaxed text-ink/80">
                      <span className="mt-0.5 shrink-0">🎓</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────────── ความร่วมมือ (บล็อกเหลือง) ───────────── */}
        <section id="collab" className="overflow-hidden border-y-[3px] border-ink bg-yellow py-20 sm:py-24">
          <div className="mx-auto mb-10 max-w-5xl px-4">
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {ui.collabHeading}
              </h2>
            </Reveal>
          </div>

          <div className="relative flex select-none overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-4 pr-4">
              {[...site.orgs, ...site.orgs].map((org, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap rounded-xl border-[3px] border-ink bg-paper px-6 py-3 font-display text-lg font-bold text-ink shadow-[4px_4px_0_0_#16130f]"
                >
                  {org}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── CONTACT (บล็อกน้ำเงิน) ───────────── */}
        <section id="contact" className="bg-blue px-4 py-20 text-paper sm:py-28">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block animate-wiggle text-6xl">📬</span>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                {ui.contactHa}{" "}
                <span className="marker text-ink" style={{ "--mark": "var(--color-yellow)" } as React.CSSProperties}>
                  {ui.contactMarker}
                </span>
                <br />
                {ui.contactHb}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-paper/90">
                {ui.contactSub}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex max-w-full items-center gap-2 rounded-xl border-[3px] border-ink bg-paper px-5 py-3.5 font-display text-sm font-bold text-ink shadow-[5px_5px_0_0_#16130f] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:px-6 sm:text-base"
                >
                  <MailIcon className="h-5 w-5 shrink-0" />
                  <span className="break-all">{site.email}</span>
                </a>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-yellow px-6 py-3.5 font-display font-bold text-ink shadow-[5px_5px_0_0_#16130f] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  <PhoneIcon className="h-5 w-5" />
                  {site.phone}
                </a>
                <a
                  href={site.lineHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-lime px-6 py-3.5 font-display font-bold text-ink shadow-[5px_5px_0_0_#16130f] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  <LineIcon className="h-5 w-5" />
                  LINE
                </a>
              </div>

              <div className="mt-7 flex items-center justify-center gap-3">
                {site.socials.map((s) => {
                  const Icon = iconMap[s.icon as keyof typeof iconMap];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid h-12 w-12 place-items-center rounded-xl border-[3px] border-ink bg-paper text-ink shadow-[3px_3px_0_0_#16130f] transition-transform hover:-translate-y-1"
                    >
                      {Icon ? <Icon className="h-5 w-5" /> : s.label.charAt(0)}
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ───────────── FOOTER ───────────── */}
      <footer className="border-t-[3px] border-ink bg-ink px-4 py-8 text-paper">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm font-medium text-paper/70 sm:flex-row">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} {site.name}
            <Squiggle className="h-3 w-12 text-yellow" />
            {ui.footerMade}
          </p>
          <a href="#top" className="font-bold text-paper hover:text-yellow">
            {ui.backToTop}
          </a>
        </div>
      </footer>
    </>
  );
}

function ProjectCard({ project, coverAlt }: { project: Project; coverAlt: string }) {
  const tile = tileBg[project.color] ?? tileBg.violet;
  const isExternal = /^https?:\/\//.test(project.link);
  const Tag: React.ElementType = project.link ? "a" : "article";
  const linkProps = project.link
    ? { href: project.link, ...(isExternal ? { target: "_blank", rel: "noreferrer" } : {}) }
    : {};
  return (
    <Tag
      {...linkProps}
      className="group hard-hover flex h-full flex-col overflow-hidden rounded-3xl border-[3px] border-ink bg-paper p-6 hard"
    >
      {project.cover ? (
        <div className="-mx-6 -mt-6 mb-4 border-b-[3px] border-ink">
          <Image
            src={project.cover}
            alt={`${coverAlt} ${project.title}`}
            width={640}
            height={360}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div
            className={`grid h-16 w-16 place-items-center rounded-2xl border-[3px] border-ink text-3xl shadow-[3px_3px_0_0_#16130f] transition-transform duration-200 group-hover:-rotate-6 ${tile}`}
          >
            {project.emoji}
          </div>
          <Star className="h-5 w-5 text-ink/15 transition-colors group-hover:text-ink/40" />
        </div>
      )}
      <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">
        {project.cover ? `${project.emoji} ${project.title}` : project.title}
      </h3>
      <p className="font-display text-sm font-bold tracking-wide text-ink/50">
        {project.tagline}
      </p>
      <p className="mt-3 flex-1 font-medium leading-relaxed text-ink/75">
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-bold text-ink"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {project.link && (
        <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-ink underline decoration-2 underline-offset-4">
          {project.cta}
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
      {project.downloads && (
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={project.downloads.thHref}
            download
            className="inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-yellow px-4 py-2 font-display text-sm font-bold text-ink shadow-[4px_4px_0_0_#16130f] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            ⬇ {project.downloads.thLabel}
          </a>
          <a
            href={project.downloads.enHref}
            download
            className="inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-teal px-4 py-2 font-display text-sm font-bold text-ink shadow-[4px_4px_0_0_#16130f] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            ⬇ {project.downloads.enLabel}
          </a>
          {project.downloads.keyHref && (
            <a
              href={project.downloads.keyHref}
              download
              className="inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-lime px-4 py-2 font-display text-sm font-bold text-ink shadow-[4px_4px_0_0_#16130f] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              🔑 {project.downloads.keyLabel}
            </a>
          )}
        </div>
      )}
    </Tag>
  );
}
