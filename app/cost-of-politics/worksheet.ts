// โครงสร้าง "เวิร์กชีต Cost of Politics" (CMU POL — Chanintorn Pensute & Pailin Phujeenaphan)
// แปลงจากใบงานกระดาษ: Before / Between / After + ตารางวงเงิน กกต. (เวอร์ชันถูกกฎหมาย — ไม่มีรายการนอกระบบ)

export interface PositionCap {
  key: string;
  th: string;
  en: string;
  group: string;
  full: number;
  vacancy: number;
  localExample?: boolean;
}

export const POSITION_CAPS: PositionCap[] = [
  { key: "mp-district", th: "สส. แบ่งเขต", en: "MP (constituency)", group: "ระดับชาติ", full: 7_000_000, vacancy: 1_900_000 },
  { key: "mp-list", th: "สส. บัญชีรายชื่อ", en: "MP (party list)", group: "ระดับชาติ", full: 163_000_000, vacancy: 44_000_000 },
  { key: "pao-chief", th: "นายก อบจ.", en: "PAO chief executive", group: "อบจ.", full: 41_250_000, vacancy: 11_000_000, localExample: true },
  { key: "pao-member", th: "ส.อบจ.", en: "PAO council member", group: "อบจ.", full: 1_650_000, vacancy: 440_000, localExample: true },
  { key: "nakhon-mayor", th: "นายกเทศมนตรี (เทศบาลนคร)", en: "Mayor (city municipality)", group: "เทศบาลนคร", full: 4_125_000, vacancy: 1_100_000, localExample: true },
  { key: "nakhon-member", th: "ส.ท. (เทศบาลนคร)", en: "Council member (city)", group: "เทศบาลนคร", full: 1_275_000, vacancy: 340_000, localExample: true },
  { key: "mueang-mayor", th: "นายกเทศมนตรี (เทศบาลเมือง)", en: "Mayor (town municipality)", group: "เทศบาลเมือง", full: 2_812_500, vacancy: 750_000, localExample: true },
  { key: "mueang-member", th: "ส.ท. (เทศบาลเมือง)", en: "Council member (town)", group: "เทศบาลเมือง", full: 1_200_000, vacancy: 320_000, localExample: true },
  { key: "tambon-mayor", th: "นายกเทศมนตรี (เทศบาลตำบล)", en: "Mayor (subdistrict municipality)", group: "เทศบาลตำบล", full: 2_062_500, vacancy: 550_000, localExample: true },
  { key: "tambon-member", th: "ส.ท. (เทศบาลตำบล)", en: "Council member (subdistrict)", group: "เทศบาลตำบล", full: 1_087_500, vacancy: 290_000, localExample: true },
  { key: "sao-chief", th: "นายก อบต.", en: "SAO chief executive", group: "อบต.", full: 2_100_000, vacancy: 560_000, localExample: true },
  { key: "sao-member", th: "ส.อบต.", en: "SAO council member", group: "อบต.", full: 300_000, vacancy: 80_000, localExample: true },
];

export interface WsItem {
  key: string;
  th: string;
  en: string;
  hintTh?: string;
  hintEn?: string;
  calc?: "monthly" | "salary";
  subExTh?: string;
  subExEn?: string;
}
export interface WsGroup {
  key: string;
  th: string;
  en: string;
  items: WsItem[];
  noteTh?: string;
  noteEn?: string;
}
export interface WsSection {
  key: "before" | "between" | "afterWin" | "afterLose";
  th: string;
  en: string;
  descTh?: string;
  descEn?: string;
  groups: WsGroup[];
  emergencyKey?: string;
}

const FIXED_ITEMS = (p: string): WsItem[] => [
  { key: `${p}.rent`, th: "ค่าเช่าสำนักงาน", en: "Office rent", calc: "monthly" },
  { key: `${p}.salary`, th: "เงินเดือนทีมงาน", en: "Staff salaries", calc: "salary" },
  { key: `${p}.internet`, th: "ค่าอินเทอร์เน็ต", en: "Internet", calc: "monthly" },
  { key: `${p}.phone`, th: "ค่าโทรศัพท์", en: "Phone", calc: "monthly" },
];

const VARIABLE_ITEMS = (
  p: string,
  opts: { lodging?: boolean; campaign?: boolean } = {}
): WsItem[] => [
  ...(opts.lodging
    ? [{ key: `${p}.lodging`, th: "ค่าที่พัก", en: "Accommodation", subExTh: "เช่น ที่พักตอนลงพื้นที่ต่างอำเภอ", subExEn: "e.g. lodging on upcountry visits" }]
    : []),
  { key: `${p}.water`, th: "ค่าน้ำ", en: "Water", subExTh: "เช่น ค่าน้ำที่ทำการ", subExEn: "e.g. office water bill" },
  { key: `${p}.electricity`, th: "ค่าไฟฟ้า", en: "Electricity", subExTh: "เช่น ค่าไฟที่ทำการ", subExEn: "e.g. office electricity bill" },
  { key: `${p}.food`, th: "ค่าน้ำ/อาหาร", en: "Food & drinks", subExTh: "เช่น เลี้ยงข้าวทีมงาน", subExEn: "e.g. team meals" },
  { key: `${p}.travel`, th: "ค่าเดินทาง", en: "Travel", subExTh: "เช่น ค่าน้ำมันลงพื้นที่", subExEn: "e.g. fuel for field visits" },
  { key: `${p}.pr`, th: "ค่าประชาสัมพันธ์", en: "Publicity", subExTh: "เช่น ป้ายไวนิลแนะนำตัว", subExEn: "e.g. intro vinyl banner" },
  { key: `${p}.attire`, th: "ค่าเสื้อผ้า ค่าแต่งหน้า/เครื่องสำอาง ค่าทำผม", en: "Clothing, makeup & cosmetics, hair", subExTh: "เช่น ชุดออกงาน", subExEn: "e.g. event outfit" },
  { key: `${p}.cosmetics`, th: "ค่าทำเสื้อทีม/พรรค", en: "Team/party shirts", subExTh: "เช่น เสื้อทีมอาสา", subExEn: "e.g. volunteer team shirts" },
  { key: `${p}.socialTax`, th: "ค่าภาษีสังคม", en: "Social obligations (ภาษีสังคม)", hintTh: "ซองงานบวช งานแต่ง งานศพ ฯลฯ", hintEn: "ordinations, weddings, funerals, etc.", subExTh: "เช่น ซองงานศพ", subExEn: "e.g. funeral envelope" },
  opts.campaign
    ? { key: `${p}.assistant`, th: "ค่าสนับสนุนผู้ช่วยหาเสียง", en: "Campaign assistant support", hintTh: "เช่น ค่าที่พักหรือค่าเดินทางของผู้ช่วย", hintEn: "e.g. assistants' lodging or travel", subExTh: "เช่น ค่าเดินทางผู้ช่วย", subExEn: "e.g. assistants' travel" }
    : { key: `${p}.assistant`, th: "ค่าผู้ช่วย/ทีมงาน", en: "Assistants / team", hintTh: "เช่น ค่าที่พักหรือค่าเดินทางของผู้ช่วยและทีมงาน", hintEn: "e.g. assistants' and team's lodging or travel", subExTh: "เช่น ค่าเดินทางทีมงาน", subExEn: "e.g. team travel" },
];

export const WS_SECTIONS: WsSection[] = [
  {
    key: "before",
    th: "Before · ก่อนการหาเสียง",
    en: "Before · Pre-campaign",
    descTh: "ต้นทุนช่วงสร้างการเป็นที่รู้จัก ก่อนเข้าสู่ช่วงหาเสียงอย่างเป็นทางการ",
    descEn: "Costs while building recognition, before the official campaign",
    emergencyKey: "before.emergency",
    groups: [
      { key: "before.fixed", th: "ต้นทุนคงที่", en: "Fixed costs", items: FIXED_ITEMS("before.fixed") },
      { key: "before.variable", th: "ต้นทุนไม่คงที่", en: "Variable costs", items: VARIABLE_ITEMS("before.variable", { lodging: true }) },
    ],
  },
  {
    key: "between",
    th: "Between · ช่วงหาเสียง",
    en: "Between · Campaign period",
    descTh: "ช่วงหาเสียงอย่างเป็นทางการ — ยอดรวมส่วนนี้ใช้เทียบเพดาน กกต.",
    descEn: "The official campaign — this section's total is compared with the EC cap",
    emergencyKey: "between.emergency",
    groups: [
      { key: "between.fixed", th: "ต้นทุนคงที่ช่วงหาเสียง", en: "Fixed campaign costs", items: FIXED_ITEMS("between.fixed") },
      {
        key: "between.variable",
        th: "ต้นทุนไม่คงที่",
        en: "Variable costs",
        noteTh: "อ้างอิงข้อมูลบางส่วนจาก กกต.",
        noteEn: "Partly based on EC (กกต.) guidance",
        items: [
          { key: "between.other.applicationFee", th: "ค่าสมัครรับเลือกตั้ง", en: "Candidacy application fee", subExTh: "เช่น ค่าธรรมเนียมสมัคร", subExEn: "e.g. application fee" },
          { key: "between.other.labour", th: "ค่าจ้างแรงงาน", en: "Hired labour", hintTh: "คนขับรถ ช่างภาพ เลขาส่วนตัว แอดมินเพจ ติดตั้งป้าย แจกใบปลิว", hintEn: "driver, photographer, secretary, page admin, sign installation, leafleting", subExTh: "เช่น ค่ารถแห่", subExEn: "e.g. parade truck" },
          { key: "between.variable.pr", th: "ค่าประชาสัมพันธ์", en: "Publicity (all channels)", hintTh: "รวมออนไลน์ (เฟสบุ๊ค) · ออฟไลน์ (วิทยุ/ทีวี) · ผลิตสื่อ · สิ่งพิมพ์ — กด + เพื่อแยกย่อย", hintEn: "online (Facebook) · offline (radio/TV) · media production · print — tap + to break down", subExTh: "เช่น โฆษณาเฟสบุ๊ค, สปอตวิทยุ, โปสเตอร์", subExEn: "e.g. Facebook ads, radio spot, posters" },
          { key: "between.variable.cosmetics", th: "ค่าทำเสื้อทีม/พรรค หมวก ของทีม", en: "Team shirts, caps & gear", subExTh: "เช่น เสื้อทีม หมวก", subExEn: "e.g. team shirts, caps" },
          { key: "between.other.equipment", th: "ค่าจัดซื้อหรือเช่าวัสดุในการหาเสียง", en: "Campaign equipment (buy/rent)", hintTh: "เช่น ค่าเช่าเครื่องเสียง เวที", hintEn: "e.g. sound system, stage rental", subExTh: "เช่น เช่าเครื่องเสียง", subExEn: "e.g. sound system rental" },
          { key: "between.other.venue", th: "ค่าเช่าและค่าตกแต่งสถานที่", en: "Venue rental & decoration", hintTh: "เช่น สถานที่หาเสียง ปราศรัย", hintEn: "e.g. campaign / rally venues", subExTh: "เช่น เวทีปราศรัย", subExEn: "e.g. rally stage" },
          { key: "between.variable.travel", th: "ค่าเดินทาง/น้ำมันเชื้อเพลิง", en: "Travel / fuel", subExTh: "เช่น น้ำมันรถหาเสียง", subExEn: "e.g. campaign vehicle fuel" },
          { key: "between.other.lodging", th: "ค่าเช่าที่พักในการหาเสียง", en: "Campaign lodging", calc: "monthly" },
          { key: "between.variable.food", th: "ค่าน้ำ/อาหาร", en: "Food & drinks", subExTh: "เช่น เลี้ยงข้าวทีมงาน", subExEn: "e.g. team meals" },
          { key: "between.variable.water", th: "ค่าน้ำ", en: "Water", subExTh: "เช่น ค่าน้ำที่ทำการ", subExEn: "e.g. office water bill" },
          { key: "between.variable.electricity", th: "ค่าไฟฟ้า", en: "Electricity", subExTh: "เช่น ค่าไฟที่ทำการ", subExEn: "e.g. office electricity bill" },
          { key: "between.variable.attire", th: "ค่าเสื้อผ้า ค่าแต่งหน้า/เครื่องสำอาง ค่าทำผม", en: "Clothing, makeup & cosmetics, hair", subExTh: "เช่น ชุดออกงาน", subExEn: "e.g. event outfit" },
          { key: "between.variable.socialTax", th: "ค่าภาษีสังคม", en: "Social obligations (ภาษีสังคม)", hintTh: "ซองงานบวช งานแต่ง งานศพ ฯลฯ", hintEn: "ordinations, weddings, funerals, etc.", subExTh: "เช่น ซองงานศพ", subExEn: "e.g. funeral envelope" },
          { key: "between.variable.assistant", th: "ค่าสนับสนุนผู้ช่วยหาเสียง", en: "Campaign assistant support", hintTh: "ที่พัก อาหาร เดินทาง ค่าข้าวค่าเบรกของผู้ช่วย", hintEn: "assistants' lodging, meals, travel, refreshments", subExTh: "เช่น ค่าข้าวกล่อง", subExEn: "e.g. boxed meals" },
          { key: "between.other.training", th: "ค่าใช้จ่ายในการอบรมผู้ช่วยหาเสียง", en: "Canvasser training", hintTh: "เฉพาะค่าใช้จ่ายอบรม", hintEn: "training costs only", subExTh: "เช่น ค่าวิทยากร", subExEn: "e.g. trainer fee" },
          { key: "between.other.postal", th: "ค่าบริการทางไปรษณีย์", en: "Postal services", subExTh: "เช่น ส่งจดหมายแนะนำตัว", subExEn: "e.g. mailing intro letters" },
          { key: "between.other.misc", th: "ค่าใช้จ่ายอื่น ๆ", en: "Other expenses", subExTh: "ระบุประเภทค่าใช้จ่าย", subExEn: "specify the expense type" },
        ],
      },
    ],
  },
  {
    key: "afterWin",
    th: "After · ชนะการเลือกตั้ง",
    en: "After · Won the election",
    descTh: "ภาระต่อเนื่องเมื่อได้ดำรงตำแหน่ง — การเมืองไม่จบที่วันนับคะแนน",
    descEn: "Ongoing costs of holding office — politics doesn't end on count day",
    emergencyKey: "after.emergency",
    groups: [
      { key: "afterWin.fixed", th: "ต้นทุนคงที่", en: "Fixed costs", items: FIXED_ITEMS("afterWin.fixed") },
      { key: "afterWin.variable", th: "ต้นทุนไม่คงที่", en: "Variable costs", items: VARIABLE_ITEMS("afterWin.variable") },
    ],
  },
  {
    key: "afterLose",
    th: "After · แพ้การเลือกตั้ง (แต่ยังสู้ต่อ)",
    en: "After · Lost — but still in the fight",
    descTh: "แพ้ครั้งนี้ไม่ใช่จุดจบ — การรักษาพื้นที่และดูแลทีมวันนี้ คือทุนของสนามหน้า",
    descEn: "Losing this round isn't the end — keeping your base and team today is capital for the next race",
    groups: [
      { key: "afterLose.fixed", th: "ต้นทุนคงที่", en: "Fixed costs", items: FIXED_ITEMS("afterLose.fixed") },
      { key: "afterLose.variable", th: "ต้นทุนไม่คงที่", en: "Variable costs", items: VARIABLE_ITEMS("afterLose.variable") },
      {
        key: "afterLose.main",
        th: "การรักษาพื้นที่",
        en: "Keeping your base",
        items: [
          { key: "afterLose.maintainArea", th: "ค่าใช้จ่ายในการรักษาพื้นที่ / เตรียมตัวเลือกตั้งครั้งต่อไป", en: "Maintaining the area / preparing for the next election", subExTh: "เช่น ร่วมกิจกรรมชุมชน", subExEn: "e.g. community activities" },
        ],
      },
    ],
  },
];

export const PHASE_PERIOD_KEYS: Record<WsSection["key"], string> = {
  before: "before.period",
  between: "between.period",
  afterWin: "after.period",
  afterLose: "after.period",
};

export const periodMonths = (amounts: Record<string, number>, key: string): number | null => {
  const sY = amounts[`${key}.startY`];
  const sM = amounts[`${key}.startM`];
  const eY = amounts[`${key}.endY`];
  const eM = amounts[`${key}.endM`];
  if (sY && sM && eY && eM) return Math.max(0, (eY - sY) * 12 + (eM - sM) + 1);
  return null;
};

export const itemMonths = (
  amounts: Record<string, number>,
  key: string,
  phasePeriodKey?: string
): number => {
  const own = periodMonths(amounts, key);
  if (own != null) return own;
  if (amounts[`${key}.months`]) return amounts[`${key}.months`];
  if (phasePeriodKey) return periodMonths(amounts, phasePeriodKey) ?? 0;
  return 0;
};

export const itemTotal = (
  amounts: Record<string, number>,
  it: WsItem,
  phasePeriodKey?: string
): number => {
  if (!it.calc) return amounts[it.key] || 0;
  const rate = amounts[`${it.key}.rate`] || 0;
  const perMonth = amounts[`${it.key}.freq`] === 1 ? rate / 12 : rate;
  const months = itemMonths(amounts, it.key, phasePeriodKey);
  const people = it.calc === "salary" ? amounts[`${it.key}.people`] || 0 : 1;
  return perMonth * months * people;
};

export const subItemTotal = (s: { qty?: number; rate?: number; days?: number }) =>
  (s.qty || 1) * (s.rate || 0) * (s.days || 1);

export const groupTotal = (
  amounts: Record<string, number>,
  group: WsGroup,
  subTotals?: Record<string, number>,
  phasePeriodKey?: string
) =>
  group.items.reduce(
    (s, it) => s + itemTotal(amounts, it, phasePeriodKey) + (subTotals?.[it.key] || 0),
    0
  );

export const sectionTotal = (
  amounts: Record<string, number>,
  section: WsSection,
  subTotals?: Record<string, number>
) =>
  section.groups.reduce(
    (s, g) => s + groupTotal(amounts, g, subTotals, PHASE_PERIOD_KEYS[section.key]),
    0
  );
