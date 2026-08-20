"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * ห่ออะไรก็ได้ด้วย <Reveal> เพื่อให้มันค่อย ๆ เผยตัวตอนเลื่อนถึง
 * delay = หน่วงเป็นมิลลิวินาที (ใช้ทำเอฟเฟกต์ทยอยขึ้นทีละชิ้น)
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
