import type { Metadata } from "next";
import CopApp from "./CopApp";

export const metadata: Metadata = {
  title: "Cost of Politics — สมุดต้นทุนการเมือง | Chanintorn Pensute",
  description:
    "เวิร์กชีตประเมินต้นทุนการลงสมัครรับเลือกตั้ง ก่อน / ระหว่าง / หลัง — เทียบเพดานค่าใช้จ่ายของ กกต. แล้วส่งคำตอบเข้าเวิร์กช็อป",
  openGraph: {
    title: "Cost of Politics — สมุดต้นทุนการเมือง",
    description: "ประเมินต้นทุนการลงสมัครทั้ง 3 ช่วง แล้วส่งคำตอบเข้าเวิร์กช็อป",
    type: "website",
  },
};

export default function CostOfPoliticsPage() {
  return <CopApp />;
}
