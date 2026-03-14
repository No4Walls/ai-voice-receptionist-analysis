/**
 * AI Voice Receptionist Market Analysis - Home Page
 * Design: Futurist SaaS Dashboard
 * Colors: Deep blue (#1E3A8A) to indigo (#6366F1) gradient accents on white base
 * Typography: Space Grotesk (headings) + Plus Jakarta Sans (body)
 * Charts: Recharts with animated entrances
 */

import { useState, useEffect, useRef } from "react";
import { usePdfDownload } from "@/hooks/usePdfDownload";
import RoiCalculator from "@/components/RoiCalculator";
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  Globe, TrendingUp, Cpu, Leaf, Scale,
  CheckCircle2, AlertTriangle, Target, Zap,
  Building2, Stethoscope, Gavel, House, Scissors, DollarSign,
  Phone, Users, BarChart3, ArrowUpRight, ChevronDown,
  Star, Award, Layers, Download, Loader2
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const marketGrowthData = [
  { year: "2022", market: 2.1, agents: 1.8 },
  { year: "2023", market: 2.8, agents: 3.2 },
  { year: "2024", market: 3.85, agents: 5.4 },
  { year: "2025", market: 5.2, agents: 9.8 },
  { year: "2026", market: 6.8, agents: 16.2 },
  { year: "2027", market: 8.9, agents: 24.5 },
  { year: "2028", market: 11.2, agents: 34.8 },
  { year: "2030", market: 17.5, agents: 50.3 },
  { year: "2034", market: 47.5, agents: 154.8 },
];

const industryAdoptionData = [
  { industry: "Legal", adoption: 79, color: "#6366F1" },
  { industry: "Financial", adoption: 75, color: "#3B82F6" },
  { industry: "Healthcare", adoption: 68, color: "#10B981" },
  { industry: "Real Estate", adoption: 55, color: "#F59E0B" },
  { industry: "Retail", adoption: 52, color: "#EC4899" },
  { industry: "Hospitality", adoption: 48, color: "#8B5CF6" },
  { industry: "Education", adoption: 35, color: "#14B8A6" },
];

const roiData = [
  { metric: "Cost Reduction", value: 85, benchmark: 40 },
  { metric: "Lead Capture", value: 70, benchmark: 49 },
  { metric: "Resolution Speed", value: 82, benchmark: 60 },
  { metric: "Customer Satisfaction", value: 80, benchmark: 65 },
  { metric: "First Call Resolution", value: 69, benchmark: 55 },
];

const regionalData = [
  { region: "North America", share: 40.1, color: "#6366F1" },
  { region: "Europe", share: 30.0, color: "#3B82F6" },
  { region: "Asia-Pacific", share: 21.7, color: "#10B981" },
  { region: "Latin America", share: 5.0, color: "#F59E0B" },
  { region: "MEA", share: 3.2, color: "#EC4899" },
];

const swotRadarData = [
  { subject: "Cost Efficiency", S: 95, W: 30, O: 85, T: 40 },
  { subject: "Scalability", S: 90, W: 25, O: 90, T: 35 },
  { subject: "Availability", S: 100, W: 20, O: 80, T: 30 },
  { subject: "Accuracy", S: 72, W: 45, O: 75, T: 55 },
  { subject: "Integration", S: 70, W: 50, O: 85, T: 45 },
  { subject: "Compliance", S: 65, W: 55, O: 70, T: 65 },
];

const pricingData = [
  { tier: "Entry", min: 25, max: 99, label: "$25–$99/mo" },
  { tier: "SMB", min: 99, max: 299, label: "$99–$299/mo" },
  { tier: "Professional", min: 299, max: 569, label: "$299–$569/mo" },
  { tier: "Enterprise", min: 569, max: 3000, label: "$569–$3,000+/mo" },
];

// ─── Utility ─────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ value, suffix, label, icon: Icon, color, delay = 0 }: {
  value: number; suffix: string; label: string;
  icon: React.ElementType; color: string; delay?: number;
}) {
  const { ref, inView } = useInView();
  const count = useCountUp(value, 2000, inView);
  return (
    <div
      ref={ref}
      className="stat-card card-hover"
      style={{ animationDelay: `${delay}ms`, opacity: inView ? 1 : 0,
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        transform: inView ? "translateY(0)" : "translateY(20px)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded-xl" style={{ background: `${color}18` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <ArrowUpRight size={16} className="text-emerald-500 mt-1" />
      </div>
      <div className="mt-2">
        <span className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color }}>
          {count}{suffix}
        </span>
        <p className="text-sm text-gray-500 mt-1 leading-snug">{label}</p>
      </div>
    </div>
  );
}

function PestelCard({ letter, title, color, icon: Icon, items }: {
  letter: string; title: string; color: string;
  icon: React.ElementType; items: { point: string; detail: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="pestel-card" style={{ borderLeftColor: color }}>
      <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
          style={{ background: color, fontFamily: "'Space Grotesk', sans-serif" }}>
          {letter}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
          <p className="text-xs text-gray-400">{items.length} key factors</p>
        </div>
        <Icon size={18} style={{ color }} />
        <ChevronDown size={16} className="text-gray-400 transition-transform"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }} />
      </div>
      <div className={`space-y-3 overflow-hidden transition-all duration-300 ${expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        {items.map((item, i) => (
          <div key={i} className="pl-3 border-l-2 border-gray-100">
            <p className="text-sm font-semibold text-gray-700">{item.point}</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
      {!expanded && (
        <div className="space-y-2">
          {items.slice(0, 2).map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
              <p className="text-sm text-gray-600">{item.point}</p>
            </div>
          ))}
          {items.length > 2 && (
            <button onClick={() => setExpanded(true)}
              className="text-xs font-medium mt-1" style={{ color }}>
              +{items.length - 2} more factors →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function SwotQuadrant({ title, color, bg, icon: Icon, items }: {
  title: string; color: string; bg: string;
  icon: React.ElementType; items: string[];
}) {
  return (
    <div className="swot-quadrant" style={{ background: bg }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg" style={{ background: color + "20" }}>
          <Icon size={18} style={{ color }} />
        </div>
        <h3 className="font-bold text-lg" style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: color + "20" }}>
              <span className="text-xs font-bold" style={{ color }}>{i + 1}</span>
            </div>
            <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlayerCard({ name, type, focus, funding, color }: {
  name: string; type: string; focus: string; funding: string; color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm card-hover">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{name}</h4>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: color + "15", color }}>
            {type}
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Funding</p>
          <p className="text-sm font-semibold text-gray-700">{funding}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{focus}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [navScrolled, setNavScrolled] = useState(false);
  const { downloadPdf, isGenerating, progress } = usePdfDownload();

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 80);
      const sections = ["overview", "market", "pestel", "swot", "players", "calculator", "conclusion"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "market", label: "Market Data" },
    { id: "pestel", label: "PESTEL" },
    { id: "swot", label: "SWOT" },
    { id: "players", label: "Key Players" },
    { id: "calculator", label: "ROI Calculator" },
    { id: "conclusion", label: "Insights" },
  ];

  const pestelData = [
    {
      letter: "P", title: "Political", color: "#6366F1", icon: Globe,
      items: [
        { point: "Government Digital Transformation Initiatives", detail: "Governments across the US, EU, and APAC are actively funding SMB digitization programs, creating favorable conditions for AI adoption in service businesses." },
        { point: "EU AI Act (Effective Aug 2024)", detail: "The EU AI Act establishes compliance frameworks that, while adding regulatory overhead, also create standardized trust signals that accelerate enterprise adoption." },
        { point: "Geopolitical Data Sovereignty", detail: "Increasing requirements for data localization in regions like China and India are shaping how global AI receptionist vendors architect their infrastructure." },
        { point: "Public Sector AI Adoption", detail: "Government agencies are piloting AI voice agents for citizen services, legitimizing the technology and expanding the addressable market beyond private sector." },
      ]
    },
    {
      letter: "E", title: "Economic", color: "#3B82F6", icon: TrendingUp,
      items: [
        { point: "Dramatic Cost Differential", detail: "AI interactions cost $0.25–$0.50 versus $3.00–$6.00 for human agents — an 85–90% per-interaction cost reduction that fundamentally transforms service economics." },
        { point: "Labor Market Pressures", detail: "Post-pandemic staffing shortages in healthcare, hospitality, and legal sectors have made AI automation an economic necessity, not just an efficiency play." },
        { point: "VC Investment Surge", detail: "Voice AI startups attracted record funding in 2024–2025, with companies like Beside ($32M), Simple AI ($14M), and others signaling strong investor confidence." },
        { point: "SMB ROI Accessibility", detail: "Entry-level pricing starting at $25/month makes AI receptionists accessible to micro-businesses, dramatically expanding the total addressable market." },
        { point: "Recession-Resilient Demand", detail: "Economic downturns accelerate AI adoption as businesses seek to reduce fixed labor costs while maintaining service quality — making this a counter-cyclical growth driver." },
      ]
    },
    {
      letter: "S", title: "Social", color: "#10B981", icon: Users,
      items: [
        { point: "Shifting Consumer Expectations", detail: "51% of consumers prefer AI bots for immediate service needs, and 80% report positive experiences — signaling broad social acceptance of AI-mediated interactions." },
        { point: "24/7 Availability as Standard", detail: "The 'always-on' economy means businesses missing after-hours calls lose 35–45% of potential leads. AI receptionists are becoming a social contract, not a differentiator." },
        { point: "Workforce Transition Concerns", detail: "While AI displaces receptionist roles, it creates demand for AI trainers, integration specialists, and customer experience designers — requiring proactive workforce reskilling." },
        { point: "Multilingual & Inclusive Access", detail: "Support for 100+ languages democratizes professional business communications for non-English-speaking entrepreneurs and underserved communities globally." },
        { point: "Generational Adoption Divide", detail: "Younger demographics (18–44) show strong preference for AI interactions; older demographics require hybrid human-AI models to maintain satisfaction." },
      ]
    },
    {
      letter: "T", title: "Technological", color: "#8B5CF6", icon: Cpu,
      items: [
        { point: "LLM Capability Leap", detail: "GPT-4o and Claude 3.5 enable real-time, emotionally intelligent conversations. 72% of callers in blind tests cannot distinguish AI from human — a critical trust threshold." },
        { point: "Sub-500ms Latency Achievement", detail: "Modern voice stacks achieve 510ms end-to-end response (100ms ASR + 320ms LLM + 90ms TTS), approaching the 230ms average of human conversation." },
        { point: "Integration Ecosystem Maturity", detail: "5,000+ native integrations with CRMs, EHRs, scheduling tools, and payment processors enable AI agents to complete end-to-end workflows autonomously." },
        { point: "Edge Computing Deployment", detail: "Edge inference reduces latency and enables offline operation, critical for healthcare and legal contexts where connectivity reliability is paramount." },
        { point: "Multimodal Convergence", detail: "GPT-4o's audio-vision-text capabilities are enabling AI receptionists to handle video calls, process documents, and provide visual information — expanding use cases significantly." },
      ]
    },
    {
      letter: "E", title: "Environmental", color: "#F59E0B", icon: Leaf,
      items: [
        { point: "Carbon Footprint of LLM Inference", detail: "Running large language models at scale has a measurable environmental cost, pushing vendors toward more efficient small language models (SLMs) for specific tasks." },
        { point: "Remote Work Infrastructure Support", detail: "AI receptionists enable fully distributed business operations, reducing commercial real estate needs and commuting — contributing to lower organizational carbon footprints." },
        { point: "Green Cloud Commitments", detail: "Major cloud providers (AWS, Azure, GCP) are committing to 100% renewable energy by 2030, aligning AI infrastructure with ESG mandates for enterprise buyers." },
        { point: "Paperless Operations Enablement", detail: "AI-driven appointment scheduling, intake forms, and follow-ups reduce paper-based administrative processes in healthcare and legal sectors." },
      ]
    },
    {
      letter: "L", title: "Legal", color: "#EF4444", icon: Scale,
      items: [
        { point: "HIPAA Compliance in Healthcare", detail: "Healthcare AI receptionists must maintain HIPAA-compliant data handling, requiring end-to-end encryption, audit logs, and Business Associate Agreements with vendors." },
        { point: "GDPR Data Protection", detail: "European deployments require explicit consent for call recording, data minimization practices, and the right to erasure — adding compliance overhead but building consumer trust." },
        { point: "TCPA Automated Calling Rules", detail: "The Telephone Consumer Protection Act restricts automated outbound calls, requiring AI receptionist vendors to build consent management and opt-out mechanisms." },
        { point: "Liability & Accountability Gaps", detail: "When AI receptionists provide incorrect medical or legal information, liability attribution between the AI vendor, the business, and the AI system itself remains legally ambiguous." },
        { point: "Recording Consent Laws", detail: "Two-party consent states (e.g., California) require explicit disclosure that calls are AI-handled and recorded, shaping how AI receptionists introduce themselves." },
      ]
    },
  ];

  const swotData = {
    strengths: [
      "24/7 availability eliminates missed calls — businesses lose an average $450 per missed call ($42K/year)",
      "85–90% cost reduction per interaction vs. human agents ($0.25–$0.50 vs. $3.00–$6.00)",
      "Infinite concurrent call handling with zero hold times or busy signals",
      "Consistent, accurate responses without fatigue, emotional variance, or turnover",
      "5-minute setup time democratizes AI for micro-businesses with no IT resources",
      "Real-time analytics and sentiment analysis provide actionable business intelligence",
    ],
    weaknesses: [
      "Struggles with highly complex, emotionally charged interactions requiring deep human empathy",
      "Integration friction with legacy proprietary systems (EHRs, custom CRMs) in regulated industries",
      "Customer perception bias — some demographics immediately disengage upon detecting AI",
      "Only 26% of companies successfully scale AI beyond proof-of-concept deployments",
      "Hallucination risks in domain-specific contexts (medical advice, legal guidance) create liability exposure",
      "Dependency on internet connectivity and third-party LLM APIs creates single points of failure",
    ],
    opportunities: [
      "Vertical specialization in high-value niches (dental, legal, home services) with domain-specific workflows",
      "Multimodal expansion to video calls, SMS follow-ups, and visual document processing",
      "Global market expansion leveraging 100+ language support for international SMB growth",
      "AI-to-AI orchestration enabling complex multi-step business processes beyond call handling",
      "Embedded finance integration — AI receptionists collecting payments and processing transactions",
      "White-label platforms enabling telecom and CRM companies to offer AI receptionist as a bundled service",
    ],
    threats: [
      "Market saturation accelerating — 90+ YC companies in voice AI since 2020, driving price compression",
      "Big Tech encroachment — Google, Microsoft, and Amazon integrating voice AI into existing business suites",
      "Regulatory tightening — EU AI Act and potential US federal AI legislation could restrict capabilities",
      "Data breach risk — a major security incident involving sensitive customer data could trigger industry-wide trust collapse",
      "LLM commoditization eroding moats for horizontal platforms without vertical differentiation",
      "Economic downturns reducing SMB tech budgets, increasing churn for subscription-based models",
    ],
  };

  const players = [
    { name: "Smith.ai", type: "Hybrid AI+Human", focus: "Best-in-class hybrid solution combining AI efficiency with human oversight for complex calls. Targets professional services.", funding: "$12M+", color: "#6366F1" },
    { name: "My AI Front Desk", type: "SMB Vertical", focus: "Appointment-heavy businesses (salons, clinics, consultancies). Budget-friendly with strong CRM integrations.", funding: "Bootstrapped", color: "#3B82F6" },
    { name: "Beside", type: "Agentic AI", focus: "Full agentic AI receptionist for small businesses. Raised $32M to build autonomous, self-improving voice agents.", funding: "$32M", color: "#10B981" },
    { name: "Vapi", type: "Infrastructure", focus: "Horizontal developer platform for building custom voice agents. Powers hundreds of vertical applications.", funding: "$20M+", color: "#8B5CF6" },
    { name: "Bland AI", type: "Infrastructure", focus: "Enterprise-grade voice AI infrastructure with focus on low latency and high concurrency for large deployments.", funding: "$22M", color: "#F59E0B" },
    { name: "ElevenLabs", type: "Voice Foundation", focus: "Industry-leading voice synthesis and cloning technology. Powers the TTS layer for many AI receptionist platforms.", funding: "$180M", color: "#EF4444" },
    { name: "AgentZap", type: "Service Business", focus: "Specialized for home service businesses (plumbers, HVAC, contractors). Deep workflow automation.", funding: "Early Stage", color: "#14B8A6" },
    { name: "Synthflow", type: "Enterprise", focus: "Enterprise contact center AI with advanced analytics, compliance features, and multi-channel orchestration.", funding: "$7.4M", color: "#EC4899" },
  ];

  const COLORS = ["#6366F1", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"];

  return (
    <div id="pdf-content" className="min-h-screen bg-gray-50">
      {/* ── Navigation ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        navScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}>
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Phone size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-800 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              AI Voice Receptionist
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={downloadPdf}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed print:hidden"
              style={{
                background: isGenerating ? "#E0E7FF" : "linear-gradient(135deg, #1E3A8A, #6366F1)",
                color: isGenerating ? "#4338CA" : "white",
                boxShadow: isGenerating ? "none" : "0 2px 8px rgba(99,102,241,0.35)",
              }}
              title="Download full report as PDF"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  <span className="hidden sm:inline">{progress > 0 ? `${progress}%` : "Preparing…"}</span>
                </>
              ) : (
                <>
                  <Download size={12} />
                  <span className="hidden sm:inline">Download PDF</span>
                </>
              )}
            </button>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="overview" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663437381852/iZr2CP4Tq6wagXKd2gMbFj/hero-bg-STCb9gYgmy3K9jYEPKNMqi.webp"
            alt="AI Voice Technology Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F2E]/90 via-[#1E3A8A]/80 to-[#6366F1]/60" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 text-xs font-medium">Strategic Market Intelligence Report · 2025</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              AI Voice Receptionist
              <br />
              <span className="text-transparent bg-clip-text" style={{
                backgroundImage: "linear-gradient(135deg, #93C5FD, #C4B5FD, #FCA5A5)"
              }}>
                Market Analysis
              </span>
            </h1>

            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
              A comprehensive PESTEL & SWOT analysis of the AI Voice Receptionist market for
              <strong className="text-white"> Startups and Service Companies</strong>. From a $3.85B market
              in 2024 to a projected $47.5B by 2034 — understanding the forces shaping this transformation.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              {["PESTEL Framework", "SWOT Analysis", "Market Data", "Competitive Landscape"].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/15 text-white border border-white/20">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Market Size 2024", value: "$3.85B" },
                { label: "Projected 2034", value: "$47.5B" },
                { label: "CAGR", value: "34.8%" },
                { label: "AI Org Adoption", value: "78%" },
              ].map(stat => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15">
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-white/60 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-white/50" />
        </div>
      </section>

      {/* ── Key Stats ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-2">By the Numbers</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              The Scale of the Opportunity
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
              Key metrics defining the AI Voice Receptionist market's explosive growth trajectory
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard value={85} suffix="%" label="Customer interactions managed by AI by 2025" icon={Cpu} color="#6366F1" delay={0} />
            <StatCard value={78} suffix="%" label="Organizations using AI in at least one function" icon={Building2} color="#3B82F6" delay={100} />
            <StatCard value={72} suffix="%" label="Callers who can't distinguish AI from human" icon={Phone} color="#10B981" delay={200} />
            <StatCard value={27} suffix="%" label="Average cost reduction in customer service ops" icon={DollarSign} color="#F59E0B" delay={300} />
            <StatCard value={80} suffix="%" label="Customers reporting positive AI receptionist experiences" icon={Star} color="#8B5CF6" delay={400} />
            <StatCard value={300} suffix="%" label="First-year ROI reported by early adopters" icon={TrendingUp} color="#EF4444" delay={500} />
          </div>
        </div>
      </section>

      {/* ── Market Data ── */}
      <section id="market" className="py-20 bg-gray-50">
        <div className="container">
          <div className="flex items-start gap-4 mb-12">
            <div className="relative">
              <span className="section-number">01</span>
              <div className="relative z-10 pt-8">
                <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">Market Intelligence</p>
                <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Market Growth & Industry Adoption
                </h2>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Growth Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Market Size Projection ($B)
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Virtual Receptionist vs. AI Agents Market</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-indigo-500 inline-block rounded" /> Receptionist</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-400 inline-block rounded" /> AI Agents</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={marketGrowthData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="gradMarket" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradAgents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "12px" }}
                    formatter={(v: number) => [`$${v}B`, ""]}
                  />
                  <Area type="monotone" dataKey="market" stroke="#6366F1" strokeWidth={2.5}
                    fill="url(#gradMarket)" dot={{ fill: "#6366F1", r: 3 }} name="Virtual Receptionist" />
                  <Area type="monotone" dataKey="agents" stroke="#3B82F6" strokeWidth={2.5}
                    fill="url(#gradAgents)" dot={{ fill: "#3B82F6", r: 3 }} name="AI Agents" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Industry Adoption */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Industry Adoption Rates (2024)
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">% of organizations actively using AI in operations</p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={industryAdoptionData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    tickFormatter={v => `${v}%`} />
                  <YAxis dataKey="industry" type="category" tick={{ fontSize: 12, fill: "#374151" }} width={75} />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "12px" }}
                    formatter={(v: number) => [`${v}%`, "Adoption Rate"]}
                  />
                  <Bar dataKey="adoption" radius={[0, 6, 6, 0]}>
                    {industryAdoptionData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Regional Distribution */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Regional Market Share
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">Global AI Agents revenue distribution</p>
              </div>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="55%" height={220}>
                  <PieChart>
                    <Pie data={regionalData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                      paddingAngle={3} dataKey="share">
                      {regionalData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`${v}%`, "Market Share"]}
                      contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2.5">
                  {regionalData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                        <span className="text-xs text-gray-600">{item.region}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-800">{item.share}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Pricing Landscape
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">Monthly subscription tiers by business segment</p>
              </div>
              <div className="space-y-4">
                {[
                  { tier: "Entry / Micro-Business", range: "$25 – $99/mo", features: "Basic call answering, FAQ responses, appointment booking", color: "#10B981", width: "25%" },
                  { tier: "SMB Professional", range: "$99 – $299/mo", features: "CRM integration, multi-location, custom scripts, analytics", color: "#3B82F6", width: "50%" },
                  { tier: "Professional Plus", range: "$299 – $569/mo", features: "Advanced workflows, API access, priority support, white-label", color: "#6366F1", width: "75%" },
                  { tier: "Enterprise", range: "$569 – $3,000+/mo", features: "Custom LLM fine-tuning, dedicated infrastructure, SLA guarantees", color: "#8B5CF6", width: "100%" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-gray-700">{item.tier}</span>
                      <span className="text-xs font-bold" style={{ color: item.color }}>{item.range}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: item.width, background: item.color }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{item.features}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-indigo-50 rounded-xl">
                <p className="text-xs text-indigo-700 font-medium">
                  💡 Cost comparison: AI receptionist at $299/mo saves ~$22,000+ annually vs. in-house staff at $50,000+/year
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PESTEL ── */}
      <section id="pestel" className="py-20 bg-white">
        <div className="container">
          <div className="relative mb-12">
            <span className="section-number">02</span>
            <div className="relative z-10 pt-8">
              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">Framework Analysis</p>
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                PESTEL Analysis
              </h2>
              <p className="text-gray-500 mt-2 max-w-2xl text-sm leading-relaxed">
                The PESTEL framework examines the six macro-environmental forces shaping the AI Voice Receptionist
                market. Click each factor to expand detailed insights relevant to startups and service companies.
              </p>
            </div>
          </div>

          {/* PESTEL Visual Summary */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
            {pestelData.map(item => (
              <div key={item.letter} className="text-center p-4 rounded-xl border-2 transition-all duration-200 cursor-default"
                style={{ borderColor: item.color + "40", background: item.color + "08" }}>
                <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl"
                  style={{ background: item.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.letter}
                </div>
                <p className="text-xs font-semibold text-gray-700">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pestelData.map(item => (
              <PestelCard key={item.letter} {...item} />
            ))}
          </div>

          {/* PESTEL Impact Matrix */}
          <div className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PESTEL Impact Assessment Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-gray-500 font-medium text-xs">Factor</th>
                    <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs">Impact Level</th>
                    <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs">Direction</th>
                    <th className="text-left py-2 pl-3 text-gray-500 font-medium text-xs">Primary Driver</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { factor: "Political", impact: "Medium", direction: "Positive", driver: "Government digitization programs & EU AI Act standardization", color: "#6366F1" },
                    { factor: "Economic", impact: "Very High", direction: "Positive", driver: "85–90% cost reduction per interaction vs. human agents", color: "#3B82F6" },
                    { factor: "Social", impact: "High", direction: "Positive", driver: "Consumer acceptance of AI interactions (80% positive experience)", color: "#10B981" },
                    { factor: "Technological", impact: "Very High", direction: "Positive", driver: "LLM capability leap enabling human-indistinguishable conversations", color: "#8B5CF6" },
                    { factor: "Environmental", impact: "Low", direction: "Mixed", driver: "LLM energy costs offset by remote work enablement", color: "#F59E0B" },
                    { factor: "Legal", impact: "High", direction: "Mixed", driver: "HIPAA/GDPR compliance requirements add cost but build trust", color: "#EF4444" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-white transition-colors">
                      <td className="py-3 pr-4">
                        <span className="font-semibold text-gray-700" style={{ color: row.color }}>{row.factor}</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          row.impact === "Very High" ? "bg-red-50 text-red-600" :
                          row.impact === "High" ? "bg-orange-50 text-orange-600" :
                          row.impact === "Medium" ? "bg-yellow-50 text-yellow-600" :
                          "bg-green-50 text-green-600"
                        }`}>
                          {row.impact}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          row.direction === "Positive" ? "bg-emerald-50 text-emerald-600" :
                          row.direction === "Mixed" ? "bg-blue-50 text-blue-600" :
                          "bg-red-50 text-red-600"
                        }`}>
                          {row.direction}
                        </span>
                      </td>
                      <td className="py-3 pl-3 text-xs text-gray-500">{row.driver}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── SWOT ── */}
      <section id="swot" className="py-20" style={{ background: "linear-gradient(135deg, #F8FAFF 0%, #EEF2FF 100%)" }}>
        <div className="container">
          <div className="relative mb-12">
            <span className="section-number">03</span>
            <div className="relative z-10 pt-8">
              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">Strategic Assessment</p>
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                SWOT Analysis
              </h2>
              <p className="text-gray-500 mt-2 max-w-2xl text-sm leading-relaxed">
                Internal capabilities and external market forces assessed for startups and service companies
                evaluating AI Voice Receptionist adoption or building in this space.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <SwotQuadrant
              title="Strengths"
              color="#10B981"
              bg="#F0FDF4"
              icon={CheckCircle2}
              items={swotData.strengths}
            />
            <SwotQuadrant
              title="Weaknesses"
              color="#F59E0B"
              bg="#FFFBEB"
              icon={AlertTriangle}
              items={swotData.weaknesses}
            />
            <SwotQuadrant
              title="Opportunities"
              color="#6366F1"
              bg="#EEF2FF"
              icon={Target}
              items={swotData.opportunities}
            />
            <SwotQuadrant
              title="Threats"
              color="#EF4444"
              bg="#FFF1F2"
              icon={Zap}
              items={swotData.threats}
            />
          </div>

          {/* SWOT Radar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  SWOT Capability Radar
                </h3>
                <p className="text-xs text-gray-400 mb-4">Relative strength of each SWOT dimension across key capability areas (0–100 scale)</p>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={swotRadarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#6B7280" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: "#9CA3AF" }} />
                    <Radar name="Strengths" dataKey="S" stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Weaknesses" dataKey="W" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Opportunities" dataKey="O" stroke="#6366F1" fill="#6366F1" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Threats" dataKey="T" stroke="#EF4444" fill="#EF4444" fillOpacity={0.15} strokeWidth={2} />
                    <Legend iconSize={10} wrapperStyle={{ fontSize: "12px" }} />
                    <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="md:w-64 space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Strategic Takeaways
                </h4>
                {[
                  { icon: "🟢", text: "Strengths dominate in availability and scalability — core value propositions are robust" },
                  { icon: "🟡", text: "Weaknesses cluster around accuracy and compliance — addressable with vertical specialization" },
                  { icon: "🔵", text: "Opportunities are strongest in integration and scalability — platform plays are compelling" },
                  { icon: "🔴", text: "Threats are most acute in compliance and accuracy — regulatory risk requires proactive management" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
                    <span className="text-lg leading-none">{item.icon}</span>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Players ── */}
      <section id="players" className="py-20 bg-white">
        <div className="container">
          <div className="relative mb-12">
            <span className="section-number">04</span>
            <div className="relative z-10 pt-8">
              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">Competitive Landscape</p>
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Key Market Players
              </h2>
              <p className="text-gray-500 mt-2 max-w-2xl text-sm leading-relaxed">
                The AI Voice Receptionist ecosystem spans infrastructure providers, horizontal platforms, and
                vertical specialists. Understanding the stack layers is critical for strategic positioning.
              </p>
            </div>
          </div>

          {/* Stack Layers */}
          <div className="mb-10 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Voice AI Technology Stack
            </h3>
            <div className="space-y-3">
              {[
                { layer: "Application Layer", desc: "Vertical AI receptionists (dental, legal, home services)", examples: "AgentZap, My AI Front Desk, Beside, Smith.ai", color: "#6366F1" },
                { layer: "Platform Layer", desc: "Horizontal voice agent builders and APIs", examples: "Vapi, Bland AI, Synthflow, Retell AI", color: "#3B82F6" },
                { layer: "Voice Foundation", desc: "Speech-to-text, text-to-speech, voice cloning", examples: "ElevenLabs, Cartesia, Deepgram, AssemblyAI", color: "#10B981" },
                { layer: "LLM Layer", desc: "Language understanding and response generation", examples: "OpenAI GPT-4o, Anthropic Claude, Google Gemini", color: "#8B5CF6" },
                { layer: "Infrastructure", desc: "Cloud compute, telephony, and real-time communication", examples: "Twilio, AWS, Azure, Cloudflare", color: "#F59E0B" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-3 h-12 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.layer}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                  <div className="hidden md:block text-right flex-shrink-0">
                    <p className="text-xs text-gray-400 mb-0.5">Examples</p>
                    <p className="text-xs font-medium text-gray-600">{item.examples}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {players.map((player, i) => (
              <PlayerCard key={i} {...player} />
            ))}
          </div>

          {/* Market Positioning Chart */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Competitive Positioning: Generalist vs. Specialist
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-3">Horizontal Platforms</h4>
                <div className="space-y-2">
                  {[
                    { name: "Vapi", score: 88, desc: "Developer-first, maximum flexibility" },
                    { name: "Bland AI", score: 82, desc: "Enterprise scale, high concurrency" },
                    { name: "Synthflow", score: 75, desc: "Contact center focus, analytics" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">{item.name}</span>
                        <span className="text-gray-400">{item.desc}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-3">Vertical Specialists</h4>
                <div className="space-y-2">
                  {[
                    { name: "Smith.ai", score: 90, desc: "Hybrid AI+human, professional services" },
                    { name: "Beside", score: 85, desc: "Agentic, SMB-focused, $32M raised" },
                    { name: "My AI Front Desk", score: 78, desc: "Appointment-heavy businesses" },
                    { name: "AgentZap", score: 72, desc: "Home services specialization" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">{item.name}</span>
                        <span className="text-gray-400">{item.desc}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industry Use Cases ── */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-2">Real-World Applications</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Industry Use Cases & ROI
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Stethoscope, title: "Healthcare & Dental", color: "#10B981",
                stats: ["30% improvement in admin efficiency", "70% of routine calls handled autonomously", "HIPAA-compliant scheduling & intake"],
                roi: "~$18K/year saved per practice"
              },
              {
                icon: Gavel, title: "Legal Services", color: "#6366F1",
                stats: ["79% AI adoption rate in 2024 (up from 19%)", "1,775% ROI for 5-person firms", "$45K annual labor savings"],
                roi: "~$42K/year net savings"
              },
              {
                icon: House, title: "Real Estate", color: "#3B82F6",
                stats: ["37% of tasks automatable", "30% reduction in on-property labor", "$34B in efficiency gains possible"],
                roi: "34% operating cash flow improvement"
              },
              {
                icon: Scissors, title: "Salons & Personal Care", color: "#EC4899",
                stats: ["300% first-year ROI reported", "25% increase in bookings captured", "After-hours calls converted to revenue"],
                roi: "Pays back in first month"
              },
              {
                icon: Building2, title: "Financial Services", color: "#F59E0B",
                stats: ["75% AI adoption across operations", "$97B projected AI investment by 2027", "Consistent regulatory documentation"],
                roi: "1.5x higher revenue growth"
              },
              {
                icon: BarChart3, title: "Home Services", color: "#8B5CF6",
                stats: ["37% of calls missed without AI", "24/7 lead capture for plumbers, HVAC", "Automated dispatch and scheduling"],
                roi: "$450 saved per captured missed call"
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl" style={{ background: item.color + "15" }}>
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.title}
                  </h3>
                </div>
                <ul className="space-y-2 mb-4">
                  {item.stats.map((stat, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
                      <span className="text-xs text-gray-600">{stat}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Typical ROI</p>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: item.color }}>{item.roi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI Calculator ── */}
      <section id="calculator" className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="container">
          <div className="relative mb-12">
            <span className="section-number">06</span>
            <div className="relative z-10 pt-8">
              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">Personalized Analysis</p>
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ROI Calculator
              </h2>
              <p className="text-gray-500 mt-2 max-w-2xl text-sm leading-relaxed">
                Estimate your personalized savings by entering your monthly call volume and current receptionist cost.
                See your potential ROI, payback period, and 3-year financial projection instantly.
              </p>
            </div>
          </div>
          <RoiCalculator />
        </div>
      </section>

      {/* ── Strategic Conclusions ── */}
      <section id="conclusion" className="py-20 bg-white">
        <div className="container">
          <div className="relative mb-12">
            <span className="section-number">07</span>
            <div className="relative z-10 pt-8">
              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">Strategic Insights</p>
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Conclusions & Recommendations
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: Award, title: "For Service Companies Adopting AI", color: "#10B981",
                recs: [
                  "Start with a vertical-specific solution that understands your industry's terminology and workflows (e.g., dental scheduling, legal intake)",
                  "Prioritize HIPAA/GDPR compliance from day one — retrofitting compliance is 3–5x more expensive than building it in",
                  "Implement a hybrid model initially: AI handles routine calls, human agents handle complex/emotional situations",
                  "Measure ROI on missed call recovery first — this is the fastest path to demonstrating value to stakeholders",
                ]
              },
              {
                icon: Layers, title: "For Startups Building in This Space", color: "#6366F1",
                recs: [
                  "Avoid competing horizontally with Vapi/Bland — instead, build deep vertical expertise with domain-specific training data",
                  "The 'data flywheel' is your moat: more calls → better training data → higher accuracy → more customers → more calls",
                  "Focus on end-to-end workflow ownership, not just call answering — the value is in completing transactions autonomously",
                  "Target industries with high call volume, chronic staffing shortages, and clear ROI metrics (healthcare, legal, home services)",
                ]
              },
              {
                icon: TrendingUp, title: "Market Outlook 2025–2030", color: "#3B82F6",
                recs: [
                  "Expect consolidation: 2–3 dominant horizontal platforms and 5–10 category-defining vertical specialists will emerge",
                  "Multimodal expansion (voice + video + SMS) will become table stakes by 2026 — plan for omnichannel from the start",
                  "Regulatory clarity from the EU AI Act will paradoxically accelerate adoption by reducing enterprise uncertainty",
                  "The $154.8B market projection by 2034 is achievable — but only for players who solve compliance and trust, not just technology",
                ]
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-6 border-2 transition-all duration-200"
                style={{ borderColor: item.color + "30", background: item.color + "05" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl" style={{ background: item.color + "15" }}>
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.title}
                  </h3>
                </div>
                <ol className="space-y-3">
                  {item.recs.map((rec, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                        style={{ background: item.color }}>
                        {j + 1}
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">{rec}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          {/* Final Summary */}
          <div className="gradient-bg rounded-2xl p-8 text-white">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The Bottom Line
              </h3>
              <p className="text-white/85 leading-relaxed mb-6 text-sm">
                The AI Voice Receptionist market is not a niche technology play — it is a fundamental restructuring
                of how businesses communicate with customers. The economic case is overwhelming: an 85–90% cost
                reduction per interaction, 24/7 availability, and measurable ROI within the first quarter of
                deployment. The PESTEL analysis confirms that macro forces — economic pressure, technological
                readiness, and social acceptance — are all aligned in favor of accelerated adoption.
              </p>
              <p className="text-white/85 leading-relaxed mb-6 text-sm">
                The SWOT analysis reveals that the greatest risks are not technological but organizational: the
                26% successful scaling rate highlights that implementation strategy, compliance, and change
                management matter as much as the AI itself. For startups, the opportunity lies in vertical
                depth and workflow ownership. For service companies, the opportunity lies in early adoption
                before competitors create an insurmountable service quality gap.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Market by 2034", value: "$47.5B" },
                  { label: "Cost Savings", value: "85–90%" },
                  { label: "Avg First-Year ROI", value: "300%" },
                  { label: "YC Companies in Space", value: "90+" },
                ].map(stat => (
                  <div key={stat.label} className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
                    <p className="text-white/60 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Phone size={14} className="text-white" />
                </div>
                <span className="font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  AI Voice Receptionist Analysis
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                A comprehensive market intelligence report applying PESTEL and SWOT frameworks to the
                AI Voice Receptionist market. Designed for strategic planning, investor pitching, and
                educational use.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="font-semibold text-gray-300 mb-3 text-xs uppercase tracking-wider">Frameworks Used</p>
                <ul className="space-y-1.5 text-gray-400 text-xs">
                  <li>PESTEL Analysis</li>
                  <li>SWOT Analysis</li>
                  <li>Competitive Landscape</li>
                  <li>Market Sizing</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-300 mb-3 text-xs uppercase tracking-wider">Data Sources</p>
                <ul className="space-y-1.5 text-gray-400 text-xs">
                  <li>Andreessen Horowitz (a16z)</li>
                  <li>Grand View Research</li>
                  <li>McKinsey Global Survey</li>
                  <li>Gartner, Deloitte, BCG</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs">
              © 2025 AI Voice Receptionist Market Analysis. Research compiled March 2025.
            </p>
            <p className="text-gray-500 text-xs">
              Data sourced from publicly available market research. For strategic reference only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
