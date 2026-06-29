"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { PostMeta } from "@/lib/posts";

/* ─── SVG Icons ──────────────────────────────────────────────────────────────── */
function IconShield({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2L4 6v6c0 5 3.6 8.8 8 10 4.4-1.2 8-5 8-10V6L12 2z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IconSearch({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6M8 11h6" strokeWidth="1.5" />
    </svg>
  );
}
function IconBrain({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 3.5A2.5 2.5 0 0 0 6.5 6c0 .73.3 1.39.78 1.86A2.5 2.5 0 0 0 4.5 10a2.5 2.5 0 0 0 2.5 2.5v1A2.5 2.5 0 0 0 9.5 16H10" />
      <path d="M15 3.5A2.5 2.5 0 0 1 17.5 6c0 .73-.3 1.39-.78 1.86A2.5 2.5 0 0 1 19.5 10a2.5 2.5 0 0 1-2.5 2.5v1A2.5 2.5 0 0 1 14.5 16H14" />
      <path d="M12 3v13M9 16a3 3 0 0 0 6 0" />
    </svg>
  );
}
function IconLock({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1" fill={color} stroke="none" />
    </svg>
  );
}
function IconBalance({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v18M3 9l4 8-4 2M21 9l-4 8 4 2M3 9h18" />
    </svg>
  );
}
function IconCode({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function IconArrow({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

/* ─── Animated Terminal ──────────────────────────────────────────────────────── */
const LINES = [
  { text: "$ npm run security-scan --url https://monsite.fr", color: "var(--cyan)" },
  { text: "  ✓ Content-Security-Policy    [+20pts]",           color: "var(--emerald)" },
  { text: "  ✓ Strict-Transport-Security  [+20pts]",           color: "var(--emerald)" },
  { text: "  ✓ X-Frame-Options            [+15pts]",           color: "var(--emerald)" },
  { text: "  ✗ Permissions-Policy         [+0pts]",            color: "#f87171" },
  { text: "  Score: 82/100  ← Presque parfait !",              color: "var(--violet)" },
];

function Terminal() {
  const [shown, setShown] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    if (shown >= LINES.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 600 : 700);
    return () => clearTimeout(t);
  }, [shown]);

  useEffect(() => {
    const t = setInterval(() => setCursor((c) => !c), 520);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#0a0f1a", border: "1px solid rgba(34,211,238,0.18)", borderRadius: "14px", overflow: "hidden", boxShadow: "0 0 0 1px rgba(34,211,238,0.06), 0 20px 60px rgba(0,0,0,0.5)", maxWidth: 540, margin: "0 auto", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8125rem", lineHeight: 1.65 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28ca41" }} />
        <span style={{ marginLeft: "auto", fontSize: "0.6875rem", color: "rgba(255,255,255,0.25)", fontFamily: "'Inter', sans-serif" }}>devSecAI ~ terminal</span>
      </div>
      <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
        {LINES.slice(0, shown).map((line, i) => (
          <div key={i} style={{ color: line.color, animation: "fade-in-line 0.3s ease forwards" }}>{line.text}</div>
        ))}
        {shown < LINES.length && <span style={{ color: "var(--cyan)" }}>{cursor ? "▊" : " "}</span>}
      </div>
    </div>
  );
}

/* ─── Particle dot ───────────────────────────────────────────────────────────── */
const PARTICLES = [
  { left: "15%", top: "20%", delay: "0s",    dur: "7s"  },
  { left: "30%", top: "60%", delay: "1.2s",  dur: "9s"  },
  { left: "55%", top: "30%", delay: "0.6s",  dur: "6s"  },
  { left: "70%", top: "70%", delay: "2s",    dur: "8s"  },
  { left: "82%", top: "15%", delay: "0.3s",  dur: "10s" },
  { left: "10%", top: "80%", delay: "1.8s",  dur: "7s"  },
  { left: "90%", top: "50%", delay: "0.9s",  dur: "9s"  },
  { left: "45%", top: "85%", delay: "2.5s",  dur: "6s"  },
];

/* ─── Scroll reveal ──────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.65s ${delay}s cubic-bezier(.22,1,.36,1), transform 0.65s ${delay}s cubic-bezier(.22,1,.36,1)` }}>
      {children}
    </div>
  );
}

/* ─── Animated counter ───────────────────────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 50;
    const tick = () => {
      frame++;
      setVal(Math.round((frame / total) * target));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const TOOLS = [
  { href: "/tools/rgpd-generator",  Icon: IconShield, title: "Générateur RGPD",      description: "Génère une politique de confidentialité conforme pour ton MVP en 2 minutes.", tag: "Gratuit", color: "var(--emerald)" },
  { href: "/tools/security-scanner",Icon: IconSearch,  title: "Scanner de headers",   description: "Analyse passive des headers de sécurité HTTP d'une URL publique. Score sur 100.", tag: "Gratuit", color: "var(--cyan)"    },
  { href: "/tools/prompt-assistant", Icon: IconBrain,  title: "Assistant IA sécurisé",description: "Génère du code TypeScript sécurisé via Claude, avec des templates OWASP intégrés.", tag: "Gratuit", color: "var(--violet)"  },
];

const FEATURES = [
  { Icon: IconLock,    title: "Sécurité intégrée",        desc: "Headers HTTP, SSRF protection, rate limiting, validation — chaque outil est construit avec les mêmes exigences de sécurité que le code que tu livres.", color: "var(--cyan)"    },
  { Icon: IconBalance, title: "Conformité RGPD",           desc: "Génère ta politique de confidentialité, comprends tes obligations légales, et aborde la conformité sans te noyer dans le jargon juridique.",            color: "var(--emerald)" },
  { Icon: IconCode,    title: "IA au service de la qualité",desc: "L'assistant de prompt génère du code TypeScript sécurisé avec des templates OWASP — l'IA qui t'aide à bien faire les choses.",                        color: "var(--violet)"  },
];

const STATS = [
  { target: 3,   suffix: "",    label: "Micro-outils gratuits"   },
  { target: 100, suffix: "%",   label: "Gratuit, sans inscription" },
  { target: 7,   suffix: "",    label: "Headers OWASP vérifiés"  },
  { target: 4,   suffix: "",    label: "Templates sécurisés IA"  },
];

/* ─── Main component ─────────────────────────────────────────────────────────── */
export default function HomeClient({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <style>{`
        @keyframes fade-in-line   { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }
        @keyframes particle-float { 0%{opacity:0;transform:translateY(0) scale(1)} 20%{opacity:.6} 80%{opacity:.6} 100%{opacity:0;transform:translateY(-80px) scale(.5)} }
        @keyframes grid-pulse     { 0%,100%{opacity:.025} 50%{opacity:.05} }
        @keyframes text-shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes hero-in        { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hero-terminal  { from{opacity:0;transform:translateY(32px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }

        .hb-badge    { animation: hero-in 0.6s 0.1s cubic-bezier(.22,1,.36,1) both; }
        .hb-h1       { animation: hero-in 0.7s 0.25s cubic-bezier(.22,1,.36,1) both; }
        .hb-sub      { animation: hero-in 0.7s 0.4s cubic-bezier(.22,1,.36,1) both; }
        .hb-cta      { animation: hero-in 0.7s 0.52s cubic-bezier(.22,1,.36,1) both; }
        .hb-trust    { animation: hero-in 0.7s 0.65s cubic-bezier(.22,1,.36,1) both; }
        .hb-terminal { animation: hero-terminal 0.9s 0.8s cubic-bezier(.22,1,.36,1) both; }

        .shimmer-text {
          background: linear-gradient(90deg, var(--cyan) 0%, var(--violet) 40%, var(--cyan) 80%, var(--violet) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: text-shimmer 4s linear infinite;
        }
        .dot-grid {
          position:absolute; inset:0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 32px 32px;
          animation: grid-pulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        .particle {
          position:absolute; width:3px; height:3px; border-radius:50%;
          background:var(--cyan); opacity:0;
          animation: particle-float 6s ease-in-out infinite;
        }
        .tc-wrap { text-decoration:none; display:block; }
        .tc-inner {
          height:100%; border-radius:16px; border:1px solid var(--border);
          background:rgba(13,18,32,.7); backdrop-filter:blur(8px);
          padding:1.5rem; position:relative; overflow:hidden;
          transition: transform .25s cubic-bezier(.22,1,.36,1), border-color .25s, box-shadow .25s;
        }
        .tc-inner::before { content:''; position:absolute; inset:0; border-radius:inherit; background:linear-gradient(135deg,rgba(34,211,238,.05),rgba(167,139,250,.05)); opacity:0; transition:opacity .3s; }
        .tc-wrap:hover .tc-inner { transform:translateY(-4px); border-color:rgba(34,211,238,.35); box-shadow:0 0 0 1px rgba(34,211,238,.1),0 12px 40px rgba(0,0,0,.4),0 0 40px rgba(34,211,238,.08); }
        .tc-wrap:hover .tc-inner::before { opacity:1; }
        .icon-box { width:48px;height:48px;border-radius:13px;display:flex;align-items:center;justify-content:center;margin-bottom:1.125rem;transition:transform .3s cubic-bezier(.22,1,.36,1); }
        .tc-wrap:hover .icon-box { transform:scale(1.1) rotate(-4deg); }
        .cta-arrow { display:inline-flex;align-items:center;gap:.375rem;font-size:.8125rem;font-weight:700;font-family:'Space Grotesk',sans-serif;margin-top:1.25rem;transition:gap .2s; }
        .tc-wrap:hover .cta-arrow { gap:.625rem; }
        .feat-card { border-radius:16px;padding:2rem;background:var(--bg-surface);border:1px solid var(--border);transition:border-color .25s,transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s; }
        .feat-card:hover { border-color:rgba(255,255,255,.12);transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.35); }
        .stat-box { background:var(--bg-surface);padding:1.75rem 1rem;text-align:center;transition:background .2s; }
        .stat-box:hover { background:rgba(13,18,40,1); }
        .trust-item { display:flex;align-items:center;gap:.5rem;font-size:.8125rem;color:var(--text-muted);font-weight:500; }
        .trust-check { width:16px;height:16px;border-radius:50%;background:rgba(52,211,153,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0; }
      `}</style>

      <div style={{ position: "relative", overflow: "hidden" }}>

        {/* HERO */}
        <section style={{ position: "relative", paddingTop: "5rem", paddingBottom: "4rem", textAlign: "center", overflow: "hidden" }}>
          <div className="dot-grid" />
          <div aria-hidden className="orb orb-cyan"   style={{ width: 600, height: 600, top: -220, left: "50%", transform: "translateX(-65%)", opacity: 0.14 }} />
          <div aria-hidden className="orb orb-violet" style={{ width: 480, height: 480, top: -100, right: "-8%",  opacity: 0.12 }} />
          {PARTICLES.map((p, i) => (
            <div key={i} aria-hidden className="particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.dur }} />
          ))}

          <Container style={{ position: "relative", zIndex: 1 }}>
            <div className="hb-badge" style={{ marginBottom: "1.75rem" }}>
              <Badge tone="cyan">Sécurité · IA · Conformité RGPD/OWASP</Badge>
            </div>

            <h1 className="hb-h1" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.035em", margin: "0 auto 1.5rem", maxWidth: "860px" }}>
              Coder vite avec l&apos;IA,{" "}
              <span className="shimmer-text">en restant sécurisé et conforme</span>
            </h1>

            <p className="hb-sub" style={{ fontSize: "1.125rem", color: "var(--text-secondary)", maxWidth: "540px", margin: "0 auto 2.5rem", lineHeight: 1.75 }}>
              Guides pratiques, micro-outils gratuits et templates pour les développeurs
              qui veulent livrer vite sans sacrifier la sécurité.
            </p>

            <div className="hb-cta" style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center" }}>
              <Button href="/tools">Essayer les outils</Button>
              <Button href="/blog" variant="secondary">Lire le blog</Button>
            </div>

            <div className="hb-trust" style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center", marginTop: "3rem" }}>
              {["100% gratuit", "Sans compte requis", "Résultats dans ton navigateur"].map((item) => (
                <span key={item} className="trust-item">
                  <span className="trust-check">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                      <path d="M1.5 4L3 5.5L6.5 2.5" stroke="var(--emerald)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </span>
              ))}
            </div>

            <div className="hb-terminal" style={{ marginTop: "4rem" }}>
              <Terminal />
            </div>
          </Container>
        </section>

        {/* STATS */}
        <Container style={{ marginBottom: "5rem" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1px", background: "var(--border)", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)" }}>
              {STATS.map((s) => (
                <div className="stat-box" key={s.label}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.625rem", fontWeight: 700, color: "var(--cyan)", margin: 0, letterSpacing: "-0.02em" }}>
                    <Counter target={s.target} suffix={s.suffix} />
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.375rem", lineHeight: 1.4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>

        {/* TOOLS */}
        <Container style={{ marginBottom: "5rem" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "2rem" }}>
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Micro-outils gratuits</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.375rem" }}>Utilisables sans compte — résultats instantanés.</p>
              </div>
              <Link href="/tools" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--cyan)", textDecoration: "none", whiteSpace: "nowrap" }}>Tout voir →</Link>
            </div>
          </Reveal>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {TOOLS.map((tool, i) => (
              <Reveal key={tool.href} delay={i * 0.1}>
                <Link href={tool.href} className="tc-wrap">
                  <div className="tc-inner">
                    <div className="icon-box" style={{ background: `${tool.color}14`, border: `1px solid ${tool.color}28` }}>
                      <tool.Icon color={tool.color} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{tool.title}</h3>
                      <Badge tone="emerald">{tool.tag}</Badge>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>{tool.description}</p>
                    <div className="cta-arrow" style={{ color: tool.color }}>Essayer <IconArrow color={tool.color} /></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>

        {/* BLOG */}
        {posts.length > 0 && (
          <Container style={{ marginBottom: "5rem" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "2rem" }}>
                <div>
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Derniers articles</h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.375rem" }}>Sécurité web, IA et conformité — cas pratiques.</p>
                </div>
                <Link href="/blog" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--cyan)", textDecoration: "none", whiteSpace: "nowrap" }}>Tout voir →</Link>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.1}>
                  <Link href={`/blog/${post.slug}`} className="tc-wrap">
                    <div className="tc-inner">
                      <p style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--cyan)", letterSpacing: "0.07em", textTransform: "uppercase", margin: "0 0 0.75rem", fontFamily: "'Space Grotesk', sans-serif" }}>{post.date}</p>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.0625rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.625rem", lineHeight: 1.3 }}>{post.title}</h3>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>{post.description}</p>
                      <div className="cta-arrow" style={{ color: "var(--violet)" }}>Lire l&apos;article <IconArrow color="var(--violet)" /></div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        )}

        {/* FEATURES */}
        <Container style={{ marginBottom: "5rem" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "0.75rem", fontFamily: "'Space Grotesk', sans-serif" }}>Pourquoi ce site</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.02em" }}>Conçu pour les développeurs qui livrent</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.12}>
                <div className="feat-card">
                  <div style={{ width: 52, height: 52, borderRadius: "14px", background: `${f.color}14`, border: `1px solid ${f.color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                    <f.Icon color={f.color} />
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.0625rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.5rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>

        {/* NEWSLETTER */}
        <Container style={{ marginBottom: "5rem" }}>
          <Reveal><Newsletter /></Reveal>
        </Container>
      </div>
    </>
  );
}
