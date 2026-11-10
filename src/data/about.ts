// Content for /about. Logos live in public/img/companies.
export const stats = [
  { value: "9+", label: "Years in software" },
  { value: "4+", label: "Years leading tech teams" },
  { value: "50+", label: "AI workflows deployed" },
  { value: "80%", label: "Manual work reduced" },
];

export interface Role { logo: string; role: string; org: string; dates: string; current?: boolean; points: string[] }

export const experience: Role[] = [
  { logo: "maxima", role: "Associate Director of Automation", org: "Maxima Apparel", dates: "Jan 2026 — Now", current: true, points: [
    "Define and execute the company-wide AI automation strategy, identifying high-impact opportunities and translating them into scalable technical solutions.",
    "Collaborate with cross-functional teams across product, operations, and engineering to standardize intelligent automation practices and workflows across global teams in multiple countries.",
    "Work directly with executive stakeholders to align scalable automation solutions with organizational objectives.",
    "Oversee adoption of AI tools, LLM integrations, and agent-based workflow orchestration platforms.",
    "Drive a culture of continuous improvement, mentoring engineers on AI-driven development.",
  ] },
  { logo: "critical-manufacturing", role: "Technical Lead", org: "Critical Manufacturing", dates: "Jan 2023 — Feb 2026", points: [
    "Led a cross-functional team of engineers, delivering MES software across automotive, electronics, and semiconductor industries.",
    "Reduced deployment cycle time by implementing and designing good CI/CD practices and automated testing frameworks.",
    "Define technical architecture for several customers, translating business requirements into scalable, multi-tenant system designs.",
    "Mentored mid-level engineers to senior roles through structured 1:1s, code reviews, and architecture workshops.",
  ] },
  { logo: "critical-manufacturing", role: "Software Engineer", org: "Critical Manufacturing", dates: "Aug 2021 — Jan 2023", points: [
    "Built backend microservices in C#/.NET that processed 500K+ manufacturing events per day, enabling real-time production tracking for well-recognized clients.",
    "Integrated MES platform with 100+ industrial IoT devices and external ERP systems (SAP, Oracle), reducing manual data entry by 80% for operations teams.",
    "Optimized database queries and API performance, cutting average response time and improving end-user satisfaction.",
  ] },
  { logo: "bosch", role: "Graduate Student Researcher", org: "BOSCH", dates: "Dec 2020 — Aug 2021", points: [
    "Designed real-time building evacuation system using IoT sensors and predictive modeling - achieved route optimization accuracy in simulated emergency scenarios.",
    "Published research-backed proof-of-concept that reduced estimated evacuation time by 30% compared to traditional static routes.",
  ] },
  { logo: "ano-software", role: "Full Stack Engineer", org: "ANO Software", dates: "Mar 2018 — Dec 2020", points: [
    "Delivered backend services and ERP modules for Portuguese government agencies, supporting 50K+ users processing 2M+ documents annually.",
    "Rebuilt legacy document management workflows, reducing average processing time and cutting paper usage.",
    "Mentored junior developers from onboarding to production ownership.",
  ] },
  { logo: "critical-software", role: "Junior Software Engineer (Internship)", org: "Critical Software", dates: "Jul 2017 — Sep 2017", points: [
    "Contributed to high-reliability backend systems for critical systems.",
    "Participated in code reviews and quality assurance processes, improving system stability ahead of production release.",
  ] },
  { logo: "scientia", role: "Chief Financial Officer (CFO)", org: "Scientia FCUP Junior Enterprise", dates: "Apr 2017 — Apr 2018", points: [
    "Led financial planning for a student consultancy company, managing the annual budget and delivering client projects.",
    "Managed a multidisciplinary team developing web and mobile applications for real clients.",
    "Supported strategic decision-making and helped scale the enterprise’s impact within the academic and local community.",
  ] },
  { logo: "scientia", role: "Junior Consultant", org: "Scientia FCUP Junior Enterprise", dates: "Nov 2016 — Apr 2017", points: [
    "Collaborated with Agile teams to deliver end-to-end digital solutions, from requirements gathering to deployment.",
    "Delivered web and mobile applications for clients across education, retail, and nonprofit sectors.",
  ] },
  { logo: "goritex", role: "Production Assistant", org: "Uniformes Goritex", dates: "Jun 2014 — Sep 2015", points: [
    "Supported daily operations on production line, contributing to on-time delivery.",
  ] },
];

export const education = [
  { logo: "uporto", role: "Master’s Degree in Network and Information Systems Engineering", org: "University of Porto", dates: "2018 — 2020" },
  { logo: "uporto", role: "Bachelor’s Degree in Computer Science", org: "University of Porto", dates: "2015 — 2018" },
];

export const skills = [
  { title: "Team & delivery", items: ["Agile / Scrum", "Executive Stakeholder Alignment", "Cross-functional Collaboration", "Global & Remote-first Teams", "Team Coaching & Career Development", "Hiring & Onboarding"] },
  { title: "AI & automation", items: ["AI Agents & LLM Integration", "Agent-based Workflow Orchestration", "Prompt Engineering", "AI-driven Development"] },
  { title: "Observability & DevOps", items: ["Monitoring & Alerting", "Logging & Tracing", "CI/CD Pipelines", "Infrastructure as Code", "System Architecture", "Performance Optimization"] },
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "Native" },
  { name: "Portuguese", level: "Native" },
];

// The three areas shown on /focus.
export const focus = [
  { icon: "activity", title: "AI that survives production", text: "Most AI pilots work in the demo. The hard part is the day after: what happens when the model is slow, wrong or down, and who finds out first. Those are the questions worth answering before your customers do." },
  { icon: "target", title: "Automation with a business case", text: "Start from the process that hurts, not from the model. Find the few workflows where automation pays back, get the data under them right, and build those well." },
  { icon: "users", title: "Engineering teams in the agent era", text: "How roles, reviews and delivery change when agents write part of the code, and how to lead a team through it without losing quality or people." },
];
