/**
 * ────────────────────────────────────────────────────────────
 *  ⭐ แก้ข้อมูลเว็บของคุณที่ไฟล์นี้ที่เดียวจบ ⭐
 *  มี 2 ภาษา: siteEn (ค่าเริ่มต้นเมื่อเปิดเว็บ) และ siteTh
 *  แก้ข้อมูลให้ตรงกันทั้งสองก้อน หน้าเว็บจะอัปเดตตามอัตโนมัติ
 * ────────────────────────────────────────────────────────────
 */

export type Lang = "en" | "th";

export type Project = {
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  color: string;
  link: string;
  cta: string;
  cover?: string; // path รูปปกใน public/ เช่น "/covers/fire.jpg" (ไม่ใส่ = โชว์แค่ไอคอน)
  // การ์ดที่มีไฟล์ให้ดาวน์โหลด 2 ภาษา — ตั้ง link:"" ให้การ์ดไม่เป็นลิงก์ครอบ แล้วปุ่มโหลดจะขึ้นในตัวการ์ด
  // keyLabel/keyHref = ปุ่มที่ 3 (ไม่บังคับ) เช่น เฉลย/Answer Key
  downloads?: { thLabel: string; thHref: string; enLabel: string; enHref: string; keyLabel?: string; keyHref?: string };
};

type Highlight = { emoji: string; title: string; detail: string; meta: string; color: string };
type Grant = { year: string; text: string };
type GalleryItem = { src: string; caption: string };
type Social = { label: string; href: string; icon: string };
type Stat = { value: string; label: string };

type Ui = {
  navAbout: string;
  navWork: string;
  navWorkshops: string;
  navAwards: string;
  navCollab: string;
  navContact: string;
  sayHi: string;
  heroWork: string;
  heroContact: string;
  aboutEyebrow: string;
  hello: string;
  cvLabel: string;
  cvTh: string;
  cvEn: string;
  workHeading: string;
  workshopsHeading: string;
  workshopsSub: string;
  awardsHeading: string;
  awardsSub: string;
  grantsHeading: string;
  certsHeading: string;
  collabHeading: string;
  contactHa: string;
  contactMarker: string;
  contactHb: string;
  contactSub: string;
  footerMade: string;
  backToTop: string;
  coverAlt: string;
};

export type SiteConfig = {
  name: string;
  nickname: string;
  role: string;
  headline: string;
  subheadline: string;
  subheadlineTools: string[][];
  location: string;
  almaMater: string; // รายชื่อมหาวิทยาลัยที่จบ (โชว์ใต้บรรทัด role ใน About)
  available: boolean;
  availableText: string;
  email: string;
  phone: string;
  phoneHref: string;
  line: string;
  lineHref: string;
  socials: Social[];
  stats: Stat[];
  certs: string[]; // โชว์ทั้งป้ายใต้ hero และกล่อง Certificates
  certsExtra: string[]; // โชว์เฉพาะกล่อง Certificates (ไม่ขึ้น hero)
  cv: { en: string; th: string };
  marquee: string[];
  about: string[];
  projects: Project[];
  highlights: Highlight[];
  grants: Grant[];
  awardsGallery: GalleryItem[];
  workshops: Project[];
  workshopsGallery: GalleryItem[];
  orgs: string[];
  ui: Ui;
};

/* ═══════════════════════════════════════════════════════════
   ภาษาอังกฤษ (ค่าเริ่มต้น)
   ═══════════════════════════════════════════════════════════ */
export const siteEn: SiteConfig = {
  name: "Chanintorn Pensute",
  nickname: "Chanintorn",
  role: "An Educator",
  // [...] = marker highlight · {...} = no line break inside · | = new line
  headline: "Designing [learning] to be fun|{and hands-on}",
  subheadline:
    "A lecturer and facilitator who designs learning experiences through storytelling, play, and hands-on practice",
  subheadlineTools: [
    ["LEGO® SERIOUS PLAY® Method", "Design Thinking"],
    ["Board Games", "Podcasts", "Documentary Films"],
  ],
  location: "Chiang Mai – Bangkok",
  almaMater: "Chulalongkorn University · University College London · University of Leeds",
  available: false,
  availableText: "",

  email: "chanintorn.p@cmu.ac.th",
  phone: "098-656-5342",
  phoneHref: "tel:+66986565342",
  line: "chaninttt",
  lineHref: "https://line.me/ti/p/~chaninttt",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/chanintorn-pensute/", icon: "linkedin" },
    { label: "Facebook", href: "https://www.facebook.com/TheInfinityTH/", icon: "facebook" },
    { label: "YouTube", href: "https://www.youtube.com/@TheInfinityTH", icon: "youtube" },
  ],

  stats: [
    { value: "1,000+", label: "Workshop Participants" },
    { value: "4", label: "Organizational Training Programs" },
  ],
  certs: [
    "AI × Design Thinking Certificate — IDEO U",
    "LEGO® SERIOUS PLAY® Facilitator Certification Training — Trivium International",
  ],
  certsExtra: [
    "Comprehensive Regional Development Planning — Japan International Cooperation Agency (JICA)",
    "Seminar on University Governance Capacity Enhancement for Developing Countries — Zhejiang Normal University",
    "American Politics and Political Thought — University of Massachusetts Amherst",
    "Serious Gaming — Erasmus University Rotterdam",
  ],

  cv: { en: "/cv-en.pdf", th: "/cv-th.pdf" },

  marquee: [
    "Design Thinking",
    "LEGO® SERIOUS PLAY® Method",
    "Board Game Design",
    "Storytelling Workshops",
  ],

  about: [
    "A lecturer, process designer, and founder of Infinity Podcast, I am passionate about storytelling and designing learning experiences in many forms —|from podcasts and documentary films to the LEGO® SERIOUS PLAY® Method and Design Thinking.",
    "Another joy of mine is designing board games. I believe the best learning happens when we get to play, experiment, and have fun together.",
  ],

  projects: [
    {
      emoji: "🎲",
      title: "CEO 2050",
      tagline: "Sustainable Business Strategy Board Game · 2026",
      description:
        "A board game where every player is a CEO balancing profit against ESG sustainability. Download the ESG Materiality reference — the 22 material topics and industry matrix behind the game's cards — in Thai or English.",
      tags: ["ESG", "Board Game", "Materiality"],
      color: "lime",
      link: "",
      cta: "",
      downloads: {
        thLabel: "ดาวน์โหลด ภาษาไทย",
        thHref: "/ceo2050-materiality-th.pdf",
        enLabel: "Download English",
        enHref: "/ceo2050-materiality-en.pdf",
        keyLabel: "Answer Key",
        keyHref: "/games/ceo2050",
      },
    },
    {
      emoji: "📒",
      title: "Life & Finance Journal",
      tagline: "Life Tracker · 2026",
      description:
        "A personal web app for tracking life and finances — goals, income and expenses, assets, debts, and net worth, all in one place and as easy to use as a paper journal.",
      tags: [],
      color: "violet",
      link: "https://lifenote.space/",
      cta: "Visit Website",
    },
    {
      emoji: "🍒",
      title: "The Wild Berry Season",
      tagline: "Berry Picking Simulation · 2026",
      description:
        "A browser simulation based on the true story of Thai migrant workers picking wild berries in Sweden and Finland. Play your own 10-week season and see if you come home in profit or in debt.",
      tags: [],
      color: "pink",
      link: "/games/berry",
      cta: "Play the Game",
    },
    {
      emoji: "🌍",
      title: "Mission 2015 — Nation Builder",
      tagline: "MDGs Game · 2026",
      description:
        "A browser game where you allocate a national budget across the 8 Millennium Development Goals and race to meet them all before 2015.",
      tags: [],
      color: "blue",
      link: "/games/mdgs",
      cta: "Play the Game",
    },
    {
      emoji: "🌐",
      title: "Agenda 2030 — Steward of the Goals",
      tagline: "SDGs Game · 2026",
      description:
        "A browser game where you allocate a global budget across all 17 Sustainable Development Goals and meet them by 2030.",
      tags: [],
      color: "cyan",
      link: "/games/sdgs",
      cta: "Play the Game",
    },
    {
      emoji: "🎙️",
      title: "Infinity Podcast",
      tagline: "Podcast · 2017 – Present",
      description: "Edutainment at Your Station",
      tags: [],
      color: "red",
      link: "https://open.spotify.com/show/6YU6ysVUYHkV33lUswa1Kv",
      cta: "Listen Now",
      cover: "/covers/infinity.jpg",
    },
    {
      emoji: "🔥",
      title: "Fire",
      tagline: "Documentary Film · 2021",
      description:
        "A documentary funded by CCCL Film Grants, officially selected for the 2nd CCCL Short Film Festival and the Council on Thai Studies Annual Meeting 2023 (USA).",
      tags: [],
      color: "amber",
      link: "https://www.ccclfilmfestival.com/films/fire",
      cta: "Learn More",
      cover: "/covers/fire.jpg",
    },
    {
      emoji: "🎥",
      title: "About Us",
      tagline: "Documentary Film · 2020",
      description:
        "Winner of the Best Non-fiction Film Award at the 4th Southeast Asia Video Festival for Children, with screenings at international festivals from Kyoto and Seattle to Jakarta.",
      tags: [],
      color: "lime",
      link: "https://www.youtube.com/watch?v=Ichs2WD04js",
      cta: "Watch the Film",
      cover: "/covers/aboutus.jpg",
    },
    {
      emoji: "🛶",
      title: "Mae Kha in Reality",
      tagline: "Documentary Film · 2020",
      description:
        "A documentary on the Mae Kha Canal issue in Chiang Mai, produced with the Ocean Leadership Microgrant from the Sustainable Ocean Alliance (USA).",
      tags: [],
      color: "blue",
      link: "https://www.youtube.com/watch?v=wa2zDBFArCU",
      cta: "Watch the Film",
      cover: "/covers/maekha.jpg",
    },
    {
      emoji: "🎬",
      title: "A Day in Chiang Mai",
      tagline: "Documentary Film · 2018",
      description:
        "A documentary capturing one day in Chiang Mai, supported by the Child and Youth Media Institute (CYMI) and ThaiHealth, and officially selected for the Chiang Mai Film Festival 2021.",
      tags: [],
      color: "cyan",
      link: "https://www.youtube.com/watch?v=UNLz8OXYAwI",
      cta: "Watch the Film",
      cover: "/covers/adicm.jpg",
    },
  ],

  highlights: [
    {
      emoji: "🏆",
      title: "Our Ocean Champion Award",
      detail:
        "Awarded at the Our Ocean Youth Leadership Summit, presented by Crown Prince Haakon of Norway",
      meta: "Oslo, Norway · 2019",
      color: "cyan",
    },
    {
      emoji: "🎬",
      title: "Best Non-fiction Film Award",
      detail:
        "The documentary “About Us” won Best Non-fiction Film (ages 13–17) at the 4th Southeast Asia Video Festival for Children",
      meta: "Kuala Lumpur, Malaysia · 2020",
      color: "lime",
    },
    {
      emoji: "🤖",
      title: "Google Higher Education Faculty AI Fellow",
      detail: "Selected by Google as a Faculty AI Fellow in higher education",
      meta: "Google · 2026",
      color: "blue",
    },
  ],

  grants: [
    {
      year: "2026",
      text: "Selected by Google as a Higher Education Faculty AI Fellow",
    },
    {
      year: "2025",
      text: "Selected by the Asia-Europe Foundation (ASEF) to participate in the ASEF Higher Education Innovation Laboratory (ASEFInnoLab) in Shanghai, China",
    },
    {
      year: "2025",
      text: "Selected by the Digital Communication Network as a panel speaker for the session “Implementing Digital Innovation in Southeast Asian Classrooms” under the theme “Digital Education for Digital Transformation: Shaping the Future of Learning and Innovation” in Seoul, South Korea",
    },
    {
      year: "2020",
      text: "Awarded the Ocean Leadership Microgrant by the Sustainable Ocean Alliance (USA) to produce media on the Mae Kha Canal issue",
    },
    {
      year: "2019",
      text: "Selected by the Asia-Europe Foundation (ASEF) for the 12th ASEF Journalists’ Seminar (ASEF12) in Madrid, Spain",
    },
    {
      year: "2019",
      text: "Selected by the Sustainable Ocean Alliance for the Our Ocean Youth Leadership Summit in Oslo, Norway",
    },
    {
      year: "2019",
      text: "Winner of the Our Ocean Champion Award at the Our Ocean Youth Leadership Summit in Oslo, Norway, receiving the award from Crown Prince Haakon",
    },
    {
      year: "2019",
      text: "Selected by the Japan International Cooperation Agency (JICA) for the Knowledge Co-Creation Program (KCCP): Comprehensive Regional Development Planning Course in Hokkaido, Japan",
    },
    {
      year: "2019",
      text: "Selected by the U.S. Department of State for the Young Southeast Asian Leaders Initiative (YSEALI) Impact eXL in Bali, Indonesia",
    },
    {
      year: "2018",
      text: "Selected by the U.S. Department of State for the 5th Annual YSEALI Summit in Singapore",
    },
    {
      year: "2018",
      text: "Supported by the Volkswagen Foundation to attend and present at the Transparency and Society: Between Promise and Peril Conference in Berlin, Germany",
    },
    {
      year: "2017",
      text: "Awarded the Study of the U.S. Institutes (SUSI) Scholarship on American Politics and Political Thought by the Bureau of Educational and Cultural Affairs, U.S. Department of State, and the University of Massachusetts Donahue Institute (UMDI), USA",
    },
    {
      year: "2017",
      text: "Supported by the University of Munich and the Volkswagen Foundation to attend and present at the Society through the Lens of the Digital Conference in Hanover, Germany",
    },
  ],

  awardsGallery: [
    { src: "/norway/norway-1.jpg", caption: "On stage at the Our Ocean Youth Leadership Summit" },
    { src: "/norway/norway-2.jpg", caption: "Receiving the award from Crown Prince Haakon of Norway" },
    { src: "/norway/norway-3.jpg", caption: "Oslo, Norway · 2019" },
    { src: "/asef/asef-1.jpg", caption: "Presenting at ASEF InnoLab" },
    { src: "/asef/asef-2.jpg", caption: "ASEF InnoLab · Shanghai 2025" },
    { src: "/jica.jpg", caption: "JICA Program · Japan 2019" },
    { src: "/podcast.jpg", caption: "Presenting academic work on podcasting" },
    { src: "/indonesia.jpg", caption: "YSEALI Impact eXL · Bali 2019" },
    { src: "/spain.jpg", caption: "12th ASEF Journalists' Seminar · Madrid 2019" },
  ],

  workshops: [
    {
      emoji: "🧱",
      title: "LEGO® SERIOUS PLAY® Method",
      tagline: "Workshop / Training",
      description:
        "A thinking and communication process built around LEGO® bricks — unlocking ideas and collaboration for organizations and teams that want to think deeply while having fun.",
      tags: [],
      color: "amber",
      link: "",
      cta: "",
    },
    {
      emoji: "💡",
      title: "Design Thinking",
      tagline: "Workshop / Training",
      description:
        "Hands-on design thinking training — from understanding users and framing problems to ideating, prototyping, and testing — learned step by step through real practice.",
      tags: [],
      color: "blue",
      link: "",
      cta: "",
    },
    {
      emoji: "📖",
      title: "Storytelling Workshops",
      tagline: "Workshop / Training",
      description:
        "A workshop on the art of storytelling — crafting powerful messages that connect with audiences, from story structure and delivery to creating memorable experiences.",
      tags: [],
      color: "pink",
      link: "",
      cta: "",
    },
    {
      emoji: "🎲",
      title: "Board Game Design",
      tagline: "Workshop / Training",
      description:
        "A workshop on designing board games for learning — from game mechanics and prototyping to playtesting, turning ideas into games that make learning fun.",
      tags: [],
      color: "lime",
      link: "",
      cta: "",
    },
  ],

  workshopsGallery: [
    { src: "/lego/lego-1.jpg", caption: "Build Your Future · with FNF Thailand" },
    { src: "/lego/lego-2.jpg", caption: "LSP Workshop · Learning Fest 2026 at TK Park" },
  ],

  orgs: [
    "Asia-Europe Foundation",
    "FNF Thailand",
    "We Watch",
    "U.S. Embassy Bangkok",
    "Peaceful Death",
    "TK Park",
    "RTUS",
    "Dyson",
    "True",
    "Khon Thai 4.0",
    "CMU Lifelong Education",
    "Namphu Publishing House",
    "LUMI",
  ],

  ui: {
    navAbout: "About",
    navWork: "Work",
    navWorkshops: "Workshops",
    navAwards: "Awards",
    navCollab: "Collaborations",
    navContact: "Contact",
    sayHi: "Say hi 👋",
    heroWork: "See My Work",
    heroContact: "Contact Me",
    aboutEyebrow: "About Me",
    hello: "Hello!",
    cvLabel: "📄 CV:",
    cvTh: "Thai",
    cvEn: "English",
    workHeading: "What I [Create] 🚀",
    workshopsHeading: "Workshops & [Training] 🧑‍🏫",
    workshopsSub: "Training programs designed and facilitated for organizations and teams",
    awardsHeading: "Career [Highlights] 🏆",
    awardsSub: "Awards and recognition on the international stage",
    grantsHeading: "International Grants & Selections 🌏",
    certsHeading: "Certificates 🎓",
    collabHeading: "Past Collaborations 🤝",
    contactHa: "Let's design",
    contactMarker: "learning",
    contactHb: "that creates change — together",
    contactSub: "You can reach me at",
    footerMade: "Made with ❤️ and Next.js",
    backToTop: "Back to top ↑",
    coverAlt: "Cover of",
  },
};

/* ═══════════════════════════════════════════════════════════
   ภาษาไทย
   ═══════════════════════════════════════════════════════════ */
export const siteTh: SiteConfig = {
  name: "ชนินทร เพ็ญสูตร",
  nickname: "ชนินทร",
  role: "An Educator",
  headline: "ออกแบบ [การเรียนรู้] ให้สนุก|{และลงมือทำจริง}",
  subheadline:
    "อาจารย์และกระบวนกรที่ออกแบบประสบการณ์การเรียนรู้ผ่านการเล่า การเล่น และการลงมือทำจริง",
  subheadlineTools: [
    ["LEGO® SERIOUS PLAY® Method", "Design Thinking"],
    ["บอร์ดเกม", "พอดแคสต์", "ภาพยนตร์สารคดี"],
  ],
  location: "เชียงใหม่ – กรุงเทพฯ",
  almaMater: "Chulalongkorn University · University College London · University of Leeds",
  available: false,
  availableText: "",

  email: "chanintorn.p@cmu.ac.th",
  phone: "098-656-5342",
  phoneHref: "tel:+66986565342",
  line: "chaninttt",
  lineHref: "https://line.me/ti/p/~chaninttt",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/chanintorn-pensute/", icon: "linkedin" },
    { label: "Facebook", href: "https://www.facebook.com/TheInfinityTH/", icon: "facebook" },
    { label: "YouTube", href: "https://www.youtube.com/@TheInfinityTH", icon: "youtube" },
  ],

  stats: [
    { value: "1,000+", label: "ผู้ผ่านการอบรม" },
    { value: "4", label: "หลักสูตรพัฒนาองค์กร" },
  ],
  certs: [
    "AI × Design Thinking Certificate — IDEO U",
    "LEGO® SERIOUS PLAY® Facilitator Certification Training — Trivium International",
  ],
  certsExtra: [
    "Comprehensive Regional Development Planning — Japan International Cooperation Agency (JICA)",
    "Seminar on University Governance Capacity Enhancement for Developing Countries — Zhejiang Normal University",
    "American Politics and Political Thought — University of Massachusetts Amherst",
    "Serious Gaming — Erasmus University Rotterdam",
  ],

  cv: { en: "/cv-en.pdf", th: "/cv-th.pdf" },

  marquee: [
    "Design Thinking",
    "LEGO® SERIOUS PLAY® Method",
    "Board Game Design",
    "Storytelling Workshops",
  ],

  about: [
    "อาจารย์และนักออกแบบกระบวนการ ผู้ก่อตั้ง Infinity Podcast หลงใหลการเล่าเรื่องและการออกแบบการเรียนรู้ในหลายรูปแบบ|ทั้งการทำพอดแคสต์ ภาพยนตร์สารคดี LEGO® SERIOUS PLAY® Method และ Design Thinking",
    "อีกความสนุกคือการออกแบบบอร์ดเกม เพราะเชื่อว่าการเรียนรู้ที่ดีที่สุดมักเกิดขึ้นตอนที่ได้ลงมือเล่น ทดลอง และสนุกไปด้วยกัน",
  ],

  projects: [
    {
      emoji: "🎲",
      title: "CEO 2050",
      tagline: "บอร์ดเกมกลยุทธ์ธุรกิจยั่งยืน · 2026",
      description:
        "บอร์ดเกมที่ผู้เล่นทุกคนเป็น CEO ผู้ต้องหาสมดุลระหว่างกำไรกับความยั่งยืน ESG ดาวน์โหลดเอกสารอ้างอิง ESG Materiality — ประเด็นสาระสำคัญ 22 ประเด็นและเมทริกซ์รายอุตสาหกรรมที่อยู่เบื้องหลังการ์ดในเกม — เลือกภาษาไทยหรืออังกฤษ",
      tags: ["ESG", "บอร์ดเกม", "Materiality"],
      color: "lime",
      link: "",
      cta: "",
      downloads: {
        thLabel: "ดาวน์โหลด ภาษาไทย",
        thHref: "/ceo2050-materiality-th.pdf",
        enLabel: "Download English",
        enHref: "/ceo2050-materiality-en.pdf",
        keyLabel: "เฉลย / Answer Key",
        keyHref: "/games/ceo2050",
      },
    },
    {
      emoji: "📒",
      title: "สมุดจดชีวิต + การเงิน",
      tagline: "Life Tracker · 2026",
      description:
        "เว็บแอปบันทึกชีวิตและการเงินส่วนตัว รวมเป้าหมาย รายรับรายจ่าย สินทรัพย์ หนี้สิน และความมั่งคั่งสุทธิ ไว้ในที่เดียว ใช้ง่ายแบบสมุดจด",
      tags: [],
      color: "violet",
      link: "https://lifenote.space/",
      cta: "เข้าชมเว็บไซต์",
    },
    {
      emoji: "🍒",
      title: "ฤดูเก็บเบอร์รี่",
      tagline: "เกมจำลอง Berry Picking · 2026",
      description:
        "เกมจำลองบนเว็บจากเรื่องจริงของแรงงานไทยที่ไปเก็บเบอร์รี่ป่าในสวีเดนและฟินแลนด์ ลองเล่นฤดูกาลของคุณเอง 10 สัปดาห์ แล้วดูว่าจะกลับบ้านพร้อมกำไรหรือเป็นหนี้",
      tags: [],
      color: "pink",
      link: "/games/berry",
      cta: "เล่นเกม",
    },
    {
      emoji: "🌍",
      title: "ภารกิจ 2015 — ผู้สร้างชาติ",
      tagline: "เกม MDGs · 2026",
      description:
        "เกมบนเว็บ จัดสรรงบประมาณของประเทศให้ครบทั้ง 8 เป้าหมายการพัฒนาแห่งสหัสวรรษ (MDGs) ให้สำเร็จก่อนปี 2015",
      tags: [],
      color: "blue",
      link: "/games/mdgs",
      cta: "เล่นเกม",
    },
    {
      emoji: "🌐",
      title: "วาระ 2030 — ผู้พิทักษ์เป้าหมาย",
      tagline: "เกม SDGs · 2026",
      description:
        "เกมบนเว็บ จัดสรรงบประมาณโลกให้ครบทั้ง 17 เป้าหมายการพัฒนาที่ยั่งยืน (SDGs) ให้สำเร็จภายในปี 2030",
      tags: [],
      color: "cyan",
      link: "/games/sdgs",
      cta: "เล่นเกม",
    },
    {
      emoji: "🎙️",
      title: "Infinity Podcast",
      tagline: "พอดแคสต์ · 2017 – ปัจจุบัน",
      description: "Edutainment at Your Station",
      tags: [],
      color: "red",
      link: "https://open.spotify.com/show/6YU6ysVUYHkV33lUswa1Kv",
      cta: "กดฟัง",
      cover: "/covers/infinity.jpg",
    },
    {
      emoji: "🔥",
      title: "Fire",
      tagline: "ภาพยนตร์สารคดี · 2021",
      description:
        "สารคดีที่ได้รับทุน CCCL Film Grants ได้รับคัดเลือกฉายใน CCCL Short Film Festival ครั้งที่ 2 และ Council on Thai Studies Annual Meeting 2023 (สหรัฐอเมริกา)",
      tags: [],
      color: "amber",
      link: "https://www.ccclfilmfestival.com/films/fire",
      cta: "ดูรายละเอียด",
      cover: "/covers/fire.jpg",
    },
    {
      emoji: "🎥",
      title: "About Us",
      tagline: "ภาพยนตร์สารคดี · 2020",
      description:
        "สารคดีรางวัล Best Non-fiction Film จาก Southeast Asia Video Festival for Children ครั้งที่ 4 และได้ฉายในเทศกาลนานาชาติหลายแห่ง ตั้งแต่เกียวโต ซีแอตเทิล ไปจนถึงจาการ์ตา",
      tags: [],
      color: "lime",
      link: "https://www.youtube.com/watch?v=Ichs2WD04js",
      cta: "ดูสารคดี",
      cover: "/covers/aboutus.jpg",
    },
    {
      emoji: "🛶",
      title: "Mae Kha in Reality",
      tagline: "ภาพยนตร์สารคดี · 2020",
      description:
        "สารคดีว่าด้วยประเด็นคลองแม่ข่า จังหวัดเชียงใหม่ ผลิตด้วยทุน Ocean Leadership Microgrant จาก Sustainable Ocean Alliance (สหรัฐอเมริกา)",
      tags: [],
      color: "blue",
      link: "https://www.youtube.com/watch?v=wa2zDBFArCU",
      cta: "ดูสารคดี",
      cover: "/covers/maekha.jpg",
    },
    {
      emoji: "🎬",
      title: "A Day in Chiang Mai",
      tagline: "ภาพยนตร์สารคดี · 2018",
      description:
        "สารคดีบันทึกหนึ่งวันในเชียงใหม่ สนับสนุนโดยสถาบันสื่อเด็กและเยาวชน (CYMI) และ สสส. ได้รับคัดเลือกฉายใน Chiang Mai Film Festival 2021",
      tags: [],
      color: "cyan",
      link: "https://www.youtube.com/watch?v=UNLz8OXYAwI",
      cta: "ดูสารคดี",
      cover: "/covers/adicm.jpg",
    },
  ],

  highlights: [
    {
      emoji: "🏆",
      title: "Our Ocean Champion Award",
      detail:
        "รางวัลชนะเลิศจากเวที Our Ocean Youth Leadership Summit โดยรับรางวัลจากมกุฎราชกุมารโฮกุนแห่งนอร์เวย์",
      meta: "ออสโล นอร์เวย์ · 2019",
      color: "cyan",
    },
    {
      emoji: "🎬",
      title: "Best Non-fiction Film Award",
      detail:
        "สารคดี “About Us” คว้ารางวัลภาพยนตร์สารคดียอดเยี่ยม (เยาวชนอายุ 13–17) จาก Southeast Asia Video Festival for Children ครั้งที่ 4",
      meta: "กัวลาลัมเปอร์ มาเลเซีย · 2020",
      color: "lime",
    },
    {
      emoji: "🤖",
      title: "Google Higher Education Faculty AI Fellow",
      detail: "ได้รับคัดเลือกจาก Google ให้เป็น Faculty AI Fellow ระดับอุดมศึกษา",
      meta: "Google · 2026",
      color: "blue",
    },
  ],

  grants: [
    {
      year: "2026",
      text: "ได้รับคัดเลือกจาก Google ให้เป็น Higher Education Faculty AI Fellow",
    },
    {
      year: "2025",
      text: "ได้รับคัดเลือกจาก Asia-Europe Foundation (ASEF) ให้เข้าร่วมโครงการ ASEF Higher Education Innovation Laboratory (ASEFInnoLab) ณ นครเซี่ยงไฮ้ สาธารณรัฐประชาชนจีน",
    },
    {
      year: "2025",
      text: "ได้รับคัดเลือกจาก Digital Communication Network ให้เป็นวิทยากรในหัวข้อ “Implementing Digital Innovation in Southeast Asian Classrooms” ภายใต้หัวข้อหลัก “Digital Education for Digital Transformation: Shaping the Future of Learning and Innovation” ในการประชุม ณ กรุงโซล สาธารณรัฐเกาหลี",
    },
    {
      year: "2020",
      text: "ได้รับทุน Ocean Leadership Microgrant จาก Sustainable Ocean Alliance ประเทศสหรัฐอเมริกา เพื่อผลิตสื่อเกี่ยวกับประเด็นคลองแม่ข่า",
    },
    {
      year: "2019",
      text: "ได้รับคัดเลือกจาก Asia-Europe Foundation (ASEF) ให้เข้าร่วม 12th ASEF Journalists’ Seminar (ASEF12) ณ กรุงมาดริด ประเทศสเปน",
    },
    {
      year: "2019",
      text: "ได้รับคัดเลือกจาก Sustainable Ocean Alliance ให้เข้าร่วม Our Ocean Youth Leadership Summit ณ กรุงออสโล ประเทศนอร์เวย์",
    },
    {
      year: "2019",
      text: "ได้รับรางวัล Our Ocean Champion Award ในงาน Our Ocean Youth Leadership Summit ณ กรุงออสโล ประเทศนอร์เวย์ โดยได้รับรางวัลจากมกุฎราชกุมารโฮกุนแห่งนอร์เวย์",
    },
    {
      year: "2019",
      text: "ได้รับคัดเลือกจาก Japan International Cooperation Agency (JICA) ให้เข้าร่วมโครงการ Knowledge Co-Creation Program (KCCP): Comprehensive Regional Development Planning Course ณ ฮอกไกโด ประเทศญี่ปุ่น",
    },
    {
      year: "2019",
      text: "ได้รับคัดเลือกจาก U.S. Department of State ให้เข้าร่วมโครงการ Young Southeast Asian Leadership Initiative (YSEALI) Impact eXL ณ เมืองบาหลี ประเทศอินโดนีเซีย",
    },
    {
      year: "2018",
      text: "ได้รับคัดเลือกจาก U.S. Department of State ให้เข้าร่วม 5th Annual YSEALI Summit ณ ประเทศสิงคโปร์",
    },
    {
      year: "2018",
      text: "ได้รับการสนับสนุนจาก Volkswagen Foundation ให้เข้าร่วมและนำเสนอผลงานในการประชุม Transparency and Society: Between Promise and Peril ณ กรุงเบอร์ลิน ประเทศเยอรมนี",
    },
    {
      year: "2017",
      text: "ได้รับทุน Study of the U.S. Institute (SUSI) ด้าน American Politics and Political Thought จาก Bureau of Educational and Cultural Affairs, U.S. Department of State และ University of Massachusetts Donahue Institute (UMDI) ประเทศสหรัฐอเมริกา",
    },
    {
      year: "2017",
      text: "ได้รับการสนับสนุนจาก University of Munich และ Volkswagen Foundation ให้เข้าร่วมและนำเสนอผลงานในการประชุม Society through the Lens of the Digital ณ เมืองฮันโนเวอร์ ประเทศเยอรมนี",
    },
  ],

  awardsGallery: [
    { src: "/norway/norway-1.jpg", caption: "บนเวที Our Ocean Youth Leadership Summit" },
    { src: "/norway/norway-2.jpg", caption: "รับรางวัลจากมกุฎราชกุมารโฮกุนแห่งนอร์เวย์" },
    { src: "/norway/norway-3.jpg", caption: "ออสโล นอร์เวย์ · 2019" },
    { src: "/asef/asef-1.jpg", caption: "นำเสนอบนเวที ASEF InnoLab" },
    { src: "/asef/asef-2.jpg", caption: "ASEF InnoLab · เซี่ยงไฮ้ 2025" },
    { src: "/jica.jpg", caption: "โครงการ JICA · ญี่ปุ่น 2019" },
    { src: "/podcast.jpg", caption: "นำเสนอผลงานวิชาการด้านพอดแคสต์" },
    { src: "/indonesia.jpg", caption: "YSEALI Impact eXL · บาหลี 2019" },
    { src: "/spain.jpg", caption: "12th ASEF Journalists' Seminar · มาดริด 2019" },
  ],

  workshops: [
    {
      emoji: "🧱",
      title: "LEGO® SERIOUS PLAY® Method",
      tagline: "เวิร์กช็อป / อบรม",
      description:
        "กระบวนการคิดและสื่อสารผ่านการต่อเลโก้ ปลดล็อกไอเดียและความร่วมมือในทีม เหมาะกับองค์กรและทีมที่อยากคิดให้ลึกและสนุกไปพร้อมกัน",
      tags: [],
      color: "amber",
      link: "",
      cta: "",
    },
    {
      emoji: "💡",
      title: "Design Thinking",
      tagline: "เวิร์กช็อป / อบรม",
      description:
        "อบรมกระบวนการคิดเชิงออกแบบ ตั้งแต่เข้าใจผู้ใช้ ตั้งโจทย์ ระดมไอเดีย ไปจนถึงสร้างต้นแบบและทดสอบ เรียนรู้ผ่านการลงมือทำจริงเป็นขั้นตอน",
      tags: [],
      color: "blue",
      link: "",
      cta: "",
    },
    {
      emoji: "📖",
      title: "Storytelling Workshops",
      tagline: "เวิร์กช็อป / อบรม",
      description:
        "อบรมศิลปะการเล่าเรื่อง ออกแบบสารให้ทรงพลังและเชื่อมโยงผู้ฟัง ตั้งแต่โครงเรื่อง วิธีการเล่า ไปจนถึงการสร้างประสบการณ์ที่น่าจดจำ",
      tags: [],
      color: "pink",
      link: "",
      cta: "",
    },
    {
      emoji: "🎲",
      title: "Board Game Design",
      tagline: "เวิร์กช็อป / อบรม",
      description:
        "อบรมการออกแบบบอร์ดเกมเพื่อการเรียนรู้ ตั้งแต่กลไกเกม การสร้างต้นแบบ ไปจนถึงการทดสอบเล่นจริง เปลี่ยนไอเดียให้กลายเป็นเกมที่ทำให้การเรียนรู้สนุก",
      tags: [],
      color: "lime",
      link: "",
      cta: "",
    },
  ],

  workshopsGallery: [
    { src: "/lego/lego-1.jpg", caption: "Build Your Future · ร่วมกับ FNF Thailand" },
    { src: "/lego/lego-2.jpg", caption: "LSP Workshop · Learning Fest 2026 ณ TK Park" },
  ],

  orgs: [
    "Asia-Europe Foundation",
    "FNF Thailand",
    "We Watch",
    "U.S. Embassy Bangkok",
    "Peaceful Death",
    "TK Park",
    "RTUS",
    "Dyson",
    "True",
    "Khon Thai 4.0",
    "CMU Lifelong Education",
    "Namphu Publishing House",
    "LUMI",
  ],

  ui: {
    navAbout: "เกี่ยวกับ",
    navWork: "ผลงาน",
    navWorkshops: "อบรม",
    navAwards: "รางวัล",
    navCollab: "ความร่วมมือ",
    navContact: "ติดต่อ",
    sayHi: "คุยกัน 👋",
    heroWork: "ดูผลงาน",
    heroContact: "ติดต่อฉัน",
    aboutEyebrow: "About Me",
    hello: "สวัสดี!",
    cvLabel: "📄 CV:",
    cvTh: "ภาษาไทย",
    cvEn: "English",
    workHeading: "สิ่งที่ฉัน[สร้าง] 🚀",
    workshopsHeading: "เวิร์กช็อป / [อบรม] 🧑‍🏫",
    workshopsSub: "หลักสูตรที่เราออกแบบและนำกระบวนการเรียนรู้ให้องค์กรและทีม",
    awardsHeading: "ผลงาน[เด่น] 🏆",
    awardsSub: "รางวัลและการยอมรับจากเวทีระดับนานาชาติ",
    grantsHeading: "การได้รับทุนและการคัดเลือกในระดับนานาชาติ 🌏",
    certsHeading: "ประกาศนียบัตร 🎓",
    collabHeading: "ความร่วมมือที่ผ่านมา 🤝",
    contactHa: "มาออกแบบ",
    contactMarker: "การเรียนรู้",
    contactHb: "ที่สร้างการเปลี่ยนแปลง ด้วยกัน",
    contactSub: "สามารถติดต่อพูดคุยกับเราได้ที่",
    footerMade: "ทำด้วย ❤️ และ Next.js",
    backToTop: "กลับขึ้นบน ↑",
    coverAlt: "ปก",
  },
};

export const sites: Record<Lang, SiteConfig> = { en: siteEn, th: siteTh };
