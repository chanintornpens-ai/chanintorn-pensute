import Link from "next/link";

/**
 * หน้าเล่นเกมแบบฝังในเว็บพอร์ต (iframe เต็มจอ + แถบกลับหน้าหลัก)
 * เพิ่มเกมใหม่ = สร้าง route ใหม่ใน app/games/<slug>/page.tsx แล้วเรียก component นี้
 */
export default function GameEmbed({ src, title }: { src: string; title: string }) {
  return (
    <main className="flex h-[100dvh] flex-col bg-paper">
      <header className="flex items-center gap-3 border-b-[3px] border-ink bg-paper px-4 py-2">
        <Link
          href="/#work"
          className="shrink-0 font-display text-sm font-bold text-ink hover:underline"
        >
          ← Chanintorn Pensute
        </Link>
        <span className="truncate font-display text-sm font-bold text-ink/50">
          {title}
        </span>
      </header>
      <iframe
        src={src}
        title={title}
        className="w-full flex-1 border-0"
        allow="fullscreen"
      />
    </main>
  );
}
