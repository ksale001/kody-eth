import React, { useEffect, useMemo, useRef, useState } from "react";
import onstagePhoto from "../assets/onstage_gathering_01.jpeg";
import { Overlay, SectionBlock, ImpactCard, BulletCard, ListPanel, MiniCard } from "../components/UiBlocks";

/**
 * kody.eth — UI/UX preview
 * - Tailwind classes (no imports needed)
 * - ASCII background layers sourced from merge.txt (embedded as base64)
 * - Sticky header + scroll-spy
 * - Keyboard shortcuts: A/H/W/R/T/P/C, ?, /, Esc, Enter
 * - Command palette + help overlay + copy-to-clipboard toast
 *
 * Why base64?
 * Your merge.txt includes lots of backslashes and other characters that are painful
 * to embed safely in JS string literals. Base64 keeps the source parseable.
 */

const SECTIONS = [
  { key: "a", id: "about", label: "About" },
  { key: "h", id: "journey", label: "How I Got Here" },
  { key: "w", id: "work", label: "Work" },
  { key: "r", id: "writing", label: "Writing" },
  { key: "t", id: "talks", label: "Talks" },
  { key: "p", id: "projects", label: "Projects" },
  { key: "c", id: "contact", label: "Contact" },
];

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function Home() {
  const reducedMotion = usePrefersReducedMotion();

  // Run self-tests once (best-effort)
  useEffect(() => {
    runSelfTestsOnce();
  }, []);

  const refs = useRef({
    about: null,
    journey: null,
    work: null,
    writing: null,
    talks: null,
    projects: null,
    contact: null,
  });

  const toastTimerRef = useRef(null);

  const [sticky, setSticky] = useState(false);
  const [active, setActive] = useState("about");
  const [helpOpen, setHelpOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [workExpandFirst, setWorkExpandFirst] = useState(false);

  // placeholders; update later
  const email = "kody.eth@proton.me";
  const ens = "kody.eth";

  function showToast(msg) {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 1400);
  }

  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`copied ${label}`);
    } catch {
      showToast("copy failed");
    }
  }

  function scrollTo(id) {
    const el = refs.current?.[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const commands = useMemo(() => {
    const go = SECTIONS.map((s) => ({
      group: "Go to",
      label: s.label,
      hint: s.key.toUpperCase(),
      action: () => {
        setPaletteOpen(false);
        setHelpOpen(false);
        scrollTo(s.id);
      },
      keywords: ["go", "goto", s.label.toLowerCase(), s.id, s.key],
    }));

    const open = [
      {
        group: "Open",
        label: "GitHub",
        hint: "g",
        action: () => window.open("https://github.com/", "_blank"),
        keywords: ["open", "github", "gh", "g"],
      },
      {
        group: "Open",
        label: "X",
        hint: "x",
        action: () => window.open("https://x.com/", "_blank"),
        keywords: ["open", "x", "twitter"],
      },
      {
        group: "Open",
        label: "Farcaster",
        hint: "f",
        action: () => window.open("https://warpcast.com/", "_blank"),
        keywords: ["open", "farcaster", "warpcast", "f"],
      },
      {
        group: "Open",
        label: "LinkedIn",
        hint: "l",
        action: () => window.open("https://linkedin.com/", "_blank"),
        keywords: ["open", "linkedin", "li", "l"],
      },
    ];

    const cp = [
      {
        group: "Copy",
        label: "Email",
        hint: "e",
        action: () => copy(email, "email"),
        keywords: ["copy", "email", "mail", "e"],
      },
      {
        group: "Copy",
        label: "ENS",
        hint: "ens",
        action: () => copy(ens, "ens"),
        keywords: ["copy", "ens", "name"],
      },
    ];

    return [...go, ...open, ...cp];
  }, [email, ens]);

  const filteredCommands = useMemo(() => {
    const q = paletteQuery.trim().toLowerCase();
    if (!q) return commands;

    return commands
      .map((c) => ({
        c,
        score: c.keywords.some((k) => k.includes(q)) ? 2 : c.label.toLowerCase().includes(q) ? 1 : 0,
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.c);
  }, [commands, paletteQuery]);

  // Sticky header toggle
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const els = SECTIONS.map((s) => refs.current?.[s.id]).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0]?.target;
        if (!top) return;

        const id = top.getAttribute?.("id");
        if (id) setActive(id);
      },
      {
        root: null,
        rootMargin: "-18% 0px -70% 0px",
        threshold: [0.05, 0.1, 0.2, 0.35],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e) => {
      // avoid hijacking when typing
      const t = e.target;
      const tag = t?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable;

      if (e.key === "Escape") {
        if (helpOpen) setHelpOpen(false);
        if (paletteOpen) setPaletteOpen(false);
        return;
      }

      if (typing) return;

      if (e.key === "?") {
        e.preventDefault();
        setHelpOpen((v) => !v);
        setPaletteOpen(false);
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        setPaletteOpen(true);
        setHelpOpen(false);
        setPaletteQuery("");
        return;
      }

      const k = e.key.toLowerCase();
      const sec = SECTIONS.find((s) => s.key === k);
      if (sec) {
        e.preventDefault();
        setHelpOpen(false);
        setPaletteOpen(false);
        scrollTo(sec.id);
        return;
      }

      if (e.key === "Enter") {
        // Enter as "Explore" only if no overlays are open
        if (!helpOpen && !paletteOpen) {
          e.preventDefault();
          scrollTo("about");
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [helpOpen, paletteOpen]);

  // Palette: enter to run top command
  useEffect(() => {
    if (!paletteOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        filteredCommands[0]?.action?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [paletteOpen, filteredCommands]);

  // When Proof-of-work CTA is used
  useEffect(() => {
    if (!workExpandFirst) return;
    const t = window.setTimeout(() => setWorkExpandFirst(false), 3000);
    return () => window.clearTimeout(t);
  }, [workExpandFirst]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-200/20">
      <style>{`
        @keyframes driftX { 0% { transform: translateX(0px);} 50% { transform: translateX(-18px);} 100% { transform: translateX(0px);} }
        @keyframes sway { 0% { transform: rotate(-0.25deg) translateY(0px);} 50% { transform: rotate(0.25deg) translateY(6px);} 100% { transform: rotate(-0.25deg) translateY(0px);} }
      `}</style>

      {/* ASCII background layers */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Waves */}
        <pre
          className={classNames(
            "absolute -left-28 top-6 whitespace-pre select-none font-mono text-[10px] leading-4",
            "text-zinc-200/10",
            reducedMotion ? "" : "animate-[driftX_26s_ease-in-out_infinite]"
          )}
        >
          {BG_WAVES}
        </pre>

        {/* Main art */}
        <pre
          className={classNames(
            "absolute left-1/2 top-24 -translate-x-1/2 whitespace-pre select-none font-mono text-[9px] leading-4",
            "text-zinc-200/10",
            reducedMotion ? "" : "animate-[driftX_26s_ease-in-out_infinite]"
          )}
        >
          {BG_MAIN}
        </pre>

        {/* Zebra art */}
        {BG_ZEBRA ? (
          <pre
            className={classNames(
              "absolute left-[26%] top-[26vh] -translate-x-1/2 whitespace-pre select-none font-mono text-[8px] leading-4",
              "text-zinc-200/10",
              reducedMotion ? "" : "animate-[driftX_26s_ease-in-out_infinite]"
            )}
          >
            {BG_ZEBRA}
          </pre>
        ) : null}

        {/* Soft vignette to protect readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/35 via-zinc-950/35 to-zinc-950/65" />
      </div>

      {/* Toast */}
      <div className="pointer-events-none fixed left-1/2 top-6 z-50 -translate-x-1/2">
        {toast ? (
          <div className="rounded-2xl border border-zinc-700/60 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-100 shadow-lg backdrop-blur">
            {toast}
          </div>
        ) : null}
      </div>

      {/* Header */}
      <header
        className={classNames(
          "sticky top-0 z-40",
          sticky ? "backdrop-blur-md" : "",
          sticky ? "bg-zinc-950/55 border-b border-zinc-800/60" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-5xl px-5 py-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-baseline gap-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-mono text-sm tracking-wide text-zinc-100 hover:underline"
              >
                kody.eth
              </a>
            </div>

            <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-200/90">
              {SECTIONS.map((s) => {
                const isActive = active === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(s.id);
                    }}
                    className={classNames(
                      "rounded-xl px-2 py-1 transition",
                      "hover:bg-zinc-900/40 hover:underline",
                      "focus:outline-none focus:ring-2 focus:ring-zinc-200/30",
                      isActive ? "bg-zinc-900/55 border border-zinc-800/60" : "border border-transparent"
                    )}
                    title={`Press ${s.key.toUpperCase()}`}
                  >
                    <span className="font-mono">[{s.key.toUpperCase()}]</span>{" "}
                    <span className={classNames(isActive ? "tracking-wide" : "")}>{s.label}</span>
                  </a>
                );
              })}

              <button
                onClick={() => {
                  setHelpOpen(true);
                  setPaletteOpen(false);
                }}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-2 py-1 font-mono text-xs text-zinc-100 hover:bg-zinc-900/65 focus:outline-none focus:ring-2 focus:ring-zinc-200/30"
                title="Help (?)"
              >
                [?] help
              </button>

              <button
                onClick={() => {
                  setPaletteOpen(true);
                  setHelpOpen(false);
                  setPaletteQuery("");
                }}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-2 py-1 font-mono text-xs text-zinc-100 hover:bg-zinc-900/65 focus:outline-none focus:ring-2 focus:ring-zinc-200/30"
                title="Command palette (/)"
              >
                / command
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-5 pb-24 pt-10">
        <div id="pong-hero" className="pong-hero-slot" />
        {/* Hero */}
        <section className="pt-8">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/55 p-5 shadow-xl backdrop-blur">
            <div className="flex flex-col gap-4">
              <pre className="whitespace-pre-wrap font-mono text-[13px] leading-5 text-zinc-100">
{`┌────────────────────────────────────────────────────────────────────────────┐
│ $ What_is_this                                                             │
│ > Welcome to kody.eth.limo (-) here you'll find a little bit about my     │
│ > life, my work, my hobbies, and anything else i feel like sharing.        │
└────────────────────────────────────────────────────────────────────────────┘`}
              </pre>

            </div>
          </div>

        </section>

        {/* Sections */}
        <SectionBlock id="about" title="About" kicker="mission" setRef={(el) => (refs.current.about = el)}>
          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-200/80">
{`/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\
I’m a dad of two, coffee lover, car guy, and ETH maxi. I’m here to see
Ethereum win without sacrificing its values. Constantly learning,
teaching, or building; raising kids who’ll figure out why the answer is 42.
\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/`}
              </pre>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="journey" title="How I Got Here" kicker="origin" setRef={(el) => (refs.current.journey = el)}>
          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
              <div className="space-y-3 text-sm leading-6 text-zinc-200/85">
                <p>{HOW_I_GOT_HERE_PARAS[0]}</p>
                <details className="group rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-3">
                  <summary className="cursor-pointer list-none select-none">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-mono text-xs text-zinc-400/80">context</div>
                      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-2 py-1 font-mono text-xs text-zinc-200/80">
                        <span className="group-open:hidden">read more</span>
                        <span className="hidden group-open:inline">collapse</span>
                      </div>
                    </div>
                  </summary>
                  <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
                    {HOW_I_GOT_HERE_PARAS.slice(1).map((para, index) => (
                      <p key={`journey-${index}`}>{para}</p>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="work" title="Work" kicker="proof" setRef={(el) => (refs.current.work = el)}>
          <div className="space-y-3">
            <ImpactCard
              open={workExpandFirst}
              title={
                <img
                  src="/obol/screenshots/obol-horizontal-primary.png"
                  alt="Obol Network"
                  className="h-10 w-48 rounded-full border border-zinc-800/60 bg-zinc-900/40 object-contain px-2"
                />
              }
              subtitle="Scaling and Decentralizing Ethereum"
              impact={[
                "$2B TVL",
                "keeping protocols decentralized",
                "scaling Ethereum DA",
                "nerdsniping institutions since 2025",
              ]}
              proofs={[
                "Website: https://obol.org",
                "Blog: https://blog.obol.org",
                "Obol Stack: https://github.com/ObolNetwork/obol-stack",
              ]}
              cta={{ label: "Read case study", href: "/obol" }}
              ctaInline
            />

            <ImpactCard
              title={
                <img
                  src="/smoothly/screenshots/pink.png"
                  alt="Smoothly"
                  className="h-10 w-48 rounded-full border border-zinc-800/60 bg-zinc-900/40 object-cover"
                />
              }
              subtitle="MEV smoothing pool"
              impact={[
                "$20M TVL",
                "open-source public good",
                "rockstar oracle operators",
                "routed $150k of public-goods donations into the pool",
              ]}
              proofs={[
                "Site: https://smoothly.money",
                "Docs: https://docs.smoothly.money/",
                "GitHub org: https://github.com/Smoothly-Protocol",
                "Coverage: https://www.poap.news/mar-19-2024/",
              ]}
              cta={{ label: "Read case study", href: "/smoothly" }}
              ctaInline
            />
          </div>
        </SectionBlock>

        <SectionBlock id="writing" title="Writing" kicker="ideas" setRef={(el) => (refs.current.writing = el)}>
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-200/80">
{`┌───────────────────────────────────────────────────────────────┐
│ x402: writing pool empty                                      │
│ deposit ideas to initialize                                   │
│                                                               │
│ status: empty block                                           │
└───────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
        </SectionBlock>

        <SectionBlock id="talks" title="Talks" kicker="signal" setRef={(el) => (refs.current.talks = el)}>
          <div className="grid items-stretch gap-3 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              <p className="text-sm leading-6 text-zinc-200/85">A few places I’ve had the chance to share what I’m learning.</p>
              <ListPanel
                items={[
                  {
                    title: "Correlated Failures and Network Impact",
                    meta: "EthStaker / Staking Gathering",
                    href: "https://www.youtube.com/watch?v=rE0w_Ta_5U8&t=4s",
                  },
                  {
                    title: "Smoothing Pools Comparison",
                    meta: "Smoothly v. Smooth",
                    href: "https://www.youtube.com/watch?v=dB5csfO8I0E&t=68s",
                  },
                  {
                    title: "Anthony and Kody — Obol",
                    meta: "The Weekly Doots",
                    href: "https://www.youtube.com/watch?v=e4PpACNWj34&list=PLXv3rooahaDSo-zK7so_hz9cG4pmCZVEe&index=7",
                  },
                  {
                    title: "Obol — The Staking Endgame",
                    meta: "Conference talk",
                    href: "https://www.youtube.com/watch?v=C58S5H3-7U4",
                  },
                  {
                    title: "Aztec x Obol — The Future of Node Operators",
                    meta: "Panel",
                    href: "https://www.youtube.com/watch?v=zJAoR9CKLVg",
                  },
                ]}
              />
            </div>
            <figure className="flex h-full flex-col rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
              <div className="font-mono text-xs text-zinc-400/80">on stage</div>
              <img
                className="mt-3 w-full rounded-2xl border border-zinc-800/60 bg-zinc-950/60"
                src={onstagePhoto}
                alt="Kody speaking on stage"
                loading="lazy"
              />
              <figcaption className="mt-3 text-sm text-zinc-300/80">
                Devconnect 2025.
              </figcaption>
            </figure>
          </div>
        </SectionBlock>

        <SectionBlock id="projects" title="Projects" kicker="threads" setRef={(el) => (refs.current.projects = el)}>
          <div className="space-y-3">
            <p className="text-sm leading-6 text-zinc-200/85">
              A small selection — the stuff I’m most proud of, or currently obsessed with.
            </p>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-200/80">
{`┌─ Shipping ────────────────────────────────────────────────────┐
│ Obol TVL Growth  →  https://defillama.com/protocol/obol         │
│ Smoothly Growth  →  https://dune.com/0xRob/smoothly             │
│ GTM: Obol Stack  →  https://github.com/ObolNetwork/obol-stack   │
└───────────────────────────────────────────────────────────────┘`}
              </pre>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-300/80">
                <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://defillama.com/protocol/obol" target="_blank" rel="noreferrer">Obol TVL</a>
                <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://dune.com/0xRob/smoothly" target="_blank" rel="noreferrer">Smoothly Growth</a>
                <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://github.com/ObolNetwork/obol-stack" target="_blank" rel="noreferrer">Obol Stack</a>
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-200/80">
{`┌─ Public Goods ────────────────────────────────────────────────┐
│ ENS + IPFS personal site (this one)                            │
│ Solo staking incentives → https://docs.smoothly.money/         │
│ POAP recap             → https://www.poap.news/mar-19-2024/     │
└───────────────────────────────────────────────────────────────┘`}
              </pre>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-300/80">
                <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://docs.smoothly.money/" target="_blank" rel="noreferrer">Solo staking incentives</a>
                <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://www.poap.news/mar-19-2024/" target="_blank" rel="noreferrer">POAP recap</a>
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-200/80">
{`┌─ Experiments ─────────────────────────────────────────────────┐
│ ASCII UI + keyboard-first interactions                          │
│ https://github.com/ksale001/braille-buddy                        │
└───────────────────────────────────────────────────────────────┘`}
              </pre>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-300/80">
                <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://github.com/ksale001/braille-buddy" target="_blank" rel="noreferrer">braille-buddy</a>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="ecosystem" title="Ecosystem" kicker="signals" setRef={(el) => (refs.current.ecosystem = el)}>
          <div className="space-y-3">
            <p className="text-sm leading-6 text-zinc-200/85">
              Favorite places to track what is happening across the Ethereum ecosystem.
            </p>
            <ListPanel
              columns={3}
              items={[
                { title: "Payload data", meta: "payload.de", href: "https://payload.de/data/" },
                { title: "KiwiStand news", meta: "news.kiwistand.com", href: "https://news.kiwistand.com/" },
                { title: "EthPandaOps live", meta: "lab.ethpandaops.io", href: "https://lab.ethpandaops.io/ethereum/live" },
                { title: "8004scan", meta: "8004scan.io", href: "https://www.8004scan.io/" },
                { title: "Lean roadmap", meta: "leanroadmap.org", href: "https://leanroadmap.org/" },
                { title: "ETH proofs", meta: "ethproofs.org", href: "https://ethproofs.org/" },
                { title: "Rollup.wtf", meta: "rollup.wtf", href: "https://rollup.wtf/" },
                { title: "x402scan", meta: "x402scan.com", href: "https://www.x402scan.com/" },
                { title: "Raises (DeFiLlama)", meta: "defillama.com", href: "https://defillama.com/raises" },
                { title: "Pectrified mainnet", meta: "pectrified.com", href: "https://pectrified.com/mainnet" },
                { title: "EthVal", meta: "ethval.com", href: "https://ethval.com/" },
                { title: "Bids.pics", meta: "bids.pics", href: "https://bids.pics/" },
                { title: "Forkcast", meta: "forkcast.org", href: "https://forkcast.org/" },
                { title: "RWA.xyz", meta: "app.rwa.xyz", href: "https://app.rwa.xyz/" },
              ]}
            />
          </div>
        </SectionBlock>

        <SectionBlock id="contact" title="Contact" kicker="reach" setRef={(el) => (refs.current.contact = el)}>
          <div className="space-y-3">
            <p className="text-sm leading-6 text-zinc-200/85">
              Always happy to chat with like minded people. HMU if you want to talk Ethereum validator infra.
            </p>
            <div className="grid gap-3">
              <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
                <div className="text-sm text-zinc-200/85">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-300/80">email</span>
                    <button
                      onClick={() => copy(email, "email")}
                      className="rounded-xl border border-zinc-800/60 bg-zinc-900/35 px-2 py-1 font-mono text-xs hover:bg-zinc-900/55 focus:outline-none focus:ring-2 focus:ring-zinc-200/30"
                    >
                      copy
                    </button>
                  </div>

                  <div className="mt-2 font-mono text-sm">{email}</div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a className="rounded-2xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 text-sm hover:bg-zinc-900/55" href="https://farcaster.xyz/kody.eth" target="_blank" rel="noreferrer">Farcaster</a>
                    <a className="rounded-2xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 text-sm hover:bg-zinc-900/55" href="https://www.linkedin.com/in/kody-sale-6191b621/" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a className="rounded-2xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 text-sm hover:bg-zinc-900/55" href="https://github.com/ksale001" target="_blank" rel="noreferrer">GitHub</a>
                  </div>

                  <div className="mt-4 text-xs text-zinc-300/70">
                    Telegram: <span className="font-mono">@kodysale</span>
                  </div>

                  <div className="mt-3 text-xs text-zinc-300/70">
                    Dev links:{" "}
                    <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://github.com/Smoothly-Protocol" target="_blank" rel="noreferrer">
                      Smoothly org
                    </a>
                    {" • "}
                    <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://github.com/ObolNetwork" target="_blank" rel="noreferrer">
                      Obol org
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </SectionBlock>

        <footer className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-zinc-800/60 pt-6 text-xs text-zinc-300/70 sm:flex-row">
          <div className="font-mono">{ens} • hosted on IPFS</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setPaletteOpen(true)} className="rounded-xl border border-zinc-800/60 bg-zinc-900/35 px-2 py-1 font-mono hover:bg-zinc-900/55">/ command</button>
            <button onClick={() => setHelpOpen(true)} className="rounded-xl border border-zinc-800/60 bg-zinc-900/35 px-2 py-1 font-mono hover:bg-zinc-900/55">? help</button>
          </div>
        </footer>
      </main>

      {/* Help overlay */}
      {helpOpen ? (
        <Overlay onClose={() => setHelpOpen(false)}>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/80 p-5 shadow-2xl backdrop-blur">
            <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-100">
{`┌─ help ───────────────────────────────┐
│ Keyboard-first site. No tracking.     │
│                                      │
│ navigate:  A H W R T P C              │
│ command:   /                          │
│ close:     esc                        │
└───────────────────────────────────────┘`}
            </pre>
            <div className="mt-3 text-xs text-zinc-300/80">
              Tip: press <span className="font-mono">/</span> to jump around or copy contact info.
            </div>
          </div>
        </Overlay>
      ) : null}

      {/* Command palette */}
      {paletteOpen ? (
        <Overlay
          onClose={() => setPaletteOpen(false)}
          onClickInside={(e) => {
            // prevent closing when interacting inside
            e.stopPropagation();
          }}
        >
          <div className="w-[min(680px,92vw)] rounded-3xl border border-zinc-800/70 bg-zinc-950/85 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="font-mono text-xs text-zinc-300/80">command</div>
              <button onClick={() => setPaletteOpen(false)} className="rounded-xl border border-zinc-800/60 bg-zinc-900/35 px-2 py-1 font-mono text-xs hover:bg-zinc-900/55">esc</button>
            </div>

            <input
              autoFocus
              value={paletteQuery}
              onChange={(e) => setPaletteQuery(e.target.value)}
              placeholder="type to filter… (enter runs top result)"
              className="mt-3 w-full rounded-2xl border border-zinc-800/70 bg-zinc-900/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400/60 outline-none focus:ring-2 focus:ring-zinc-200/20"
            />

            <div className="mt-3 max-h-[48vh] overflow-auto rounded-2xl border border-zinc-800/60">
              {filteredCommands.length ? (
                <div className="divide-y divide-zinc-800/60">
                  {filteredCommands.map((cmd, i) => (
                    <button
                      key={`${cmd.group}-${cmd.label}-${i}`}
                      onClick={() => cmd.action()}
                      className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-zinc-200/20"
                    >
                      <div>
                        <div className="text-xs text-zinc-400/80">{cmd.group}</div>
                        <div className="text-sm text-zinc-100">{cmd.label}</div>
                      </div>
                      {cmd.hint ? (
                        <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/30 px-2 py-1 font-mono text-xs text-zinc-200/90">{cmd.hint}</div>
                      ) : null}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-6 text-sm text-zinc-300/80">No matches.</div>
              )}
            </div>

            <div className="mt-3">
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-200/70">
{`┌─ tips ─────────────────────────────────────────┐
│ try:  journey • work • writing • copy ens       │
└─────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </div>
        </Overlay>
      ) : null}
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const onChange = () => setReduced(!!mq.matches);
    onChange();

    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

// ---------------------------
// ASCII background (merge.txt)
// ---------------------------

// merge.txt embedded as base64 (UTF-8)
const MERGE_TXT_B64 =
  "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArPyQkJCQkJD8qOyAgICAgICAgICAgICAgICAgICAgICAgICA7Kj8kJCQkPyo7ICAgICAgICAgICAgICAgICAgICAgICAgICshJCQkJCQkPyE7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyMkPz8/JEAjIyQrICAgICAgICAgICAgICAgICAgICAgICEmI0AkPz8kJiNAKiAgICAgICAgICAgICAgICAgICAgICArQCMmJD8/Pz8kIyMrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICArQCMmOyAgICAgICAgICAgICAgICAgICAgISMjKiAgICAgOyQjIyogICAgICAgICAgICAgICAgICAgICBAIyQgICAgICA7JiMrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICAgISMjKyAgICAgICAgICAgICAgICAgICA7IyMkICAgICAgICBAI0AgICAgICAgICAgICAgICAgICAgICAkIyYqICAgICAgKys7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICA7QCMmOyAgICAgICAgICAgICAgICAgICAqIyMqICAgICAgICA/IyM7ICAgICAgICAgICAgICAgICAgICA7JCMjJiQhKzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM/ISEhPyQjIyQrICAgICAgICAgICAgICAgICAgICAhIyMrICAgICAgICAhIyMrICAgICAgICAgICAgICAgICAgICAgIDshJEAjIyYkITsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyNAQEBAJCQhKyAgICAgICAgICAgICAgICAgICAgICAqIyMqICAgICAgICA/IyM7ICAgICAgICAgICAgICAgICAgICAgICAgICA7Kj9AIyYhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7IyMkICAgICAgICBAI0AgICAgICAgICAgICAgICAgICAgIDs/JDsgICAgICAgPyMjKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyMjISAgICAgOz8jIysgICAgICAgICAgICAgICAgICAgIDsjIysgICAgICA7JCMmOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICEmIyYkPz8kJiNAKiAgICAgICAgICAgICAgICAgICAgIDsmIyYkJD8/JCQmI0ArICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArPz87ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7Kj8kJCQkPysgICAgICAgICAgICAgICAgICAgICAgICA7KyE/JCQkJCQhKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7Ozs7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsrIT8/JCQkPyEqKzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7Kj8kQCYmJiYmQEAkISo7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICo/QCMjIyMjIyMjIyMjIyYkPysgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7IUAjIyMjIyMjIyMjIyMjIyMmJCE7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDshQCMjIyMmQCQ/Pz8/JCRAIyMjIyNAISAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOz8mIyMjIyQ/KisrOysrKiE/QCMjIyMmPzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKkAjIyMmJCo7ICAgICAgICAgOyokJiMjI0AqICAgICAgICAgICAgICAgICAgICAgICAgICAqJiMjI0AhOyAgICAgICAgICAgIDshQCMjIyYhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyMjJiE7ICAgICAgICAgICAgICAgOz8mIyMjPyAgICAgICAgICAgICAgICAgICAgICAgICojIyMjISAgICAgICAgICAgICAgICAgIComIyMjPyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICEjIyNAKyAgICAgICAgICAgICAgICAgICA7JCMjIyQgICAgICAgICAgICAgICAgICAgICAgKyMjIyYrICAgICAgICAgICAgICAgICAgICA7JCMjIz8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyMjIyY7ICAgICAgICAgICAgICAgICAgICAgICQjIyM/ICAgOzsrKiE/PyQkJCQkJCQkPz8hJCMjIyogICAgICAgICAgICAgICAgICAgICAgO0AjIyMqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgISMjIyEgICAgICAgICAgICAgICAgICAgICAgICAmIyMjPyRAJiMjIyMjIyMjIyMjIyMjIyMjIyMjI0AkPyErOyAgICAgICAgICAgICAgICAgICsjIyMkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCMjIysgICAgICAgICAgICAgICAgICAgICA7Kj8mIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyYkITsgICAgICAgICAgICAgICAmIyMmOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCMjIysgICAgICAgICAgICAgICAgICA7ISQmIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyYkITsgICAgICAgICAgICAmIyMjOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiMjIz8gICAgICAgICAgICAgICA7ISQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMkKjsgICAgICAgICsjIyNAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgO0AjIyMrICAgICAgICAgICAgKyQmIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyY/OyAgICAgICQjIyMhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsjIyMmKyAgICAgICAgICokIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyQrICA7JCMjIyQ7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqJiMjIz87ICAgICArJCMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjPypAIyMjJDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyQjIyMmPysgOyQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyM/OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqQCMjIyNAJiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICskJiMjIyMjIyMjIyMjIyMjIyMjI0A/ISorKyohJCYjIyMjIyMjIyMjIyMjIyMjIyMjJiQ/KisrKiE/JCMjIyMjIyMjIyMjIyMjIyYqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCMjIyMjIyMjIyMjIyMjIyY/KyAgICAgICAgIDshQCMjIyMjIyMjIyMjIyMjI0AhOyAgICAgICAgIDshQCMjIyMjIyMjIyMjIyMjISAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDskIyMjIyMjIyMjIyMjIyMmITsgICAgICAgICAgICAgIComIyMjIyMjIyMjIyMmITsgICAgICAgICAgICAgICEmIyMjIyMjIyMjIyMjIyEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQjIyMjIyMjIyMjIyMjI0ArICAgICtAKiAgICAgICAgICA7JCMjIyMjIyMjIyQ7ICAgICAgICAgICtAKiAgICA7JCMjIyMjIyMjIyMjIyMhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyMjIyMjIyMjIyMjIyMjJDsgICAgKiMjIyogICAgICAgICAgICQjIyMjIyMjJDsgICAgICAgICAgKyYjIyEgICAgID8jIyMjIyMjIyMjIyMjKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIyMjIyMjIyMjIyMjIyMkICAgICAhIyMjIyMhICAgICAgICAgICAkIyMjIyNAOyAgICAgICAgICAqIyMjIyM/ICAgICA/IyMjIyMjIyMjIyMjQDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAIyMjIyMjIyMjIyMjI0A7ICAgICEjIyMjIyMjISAgICAgICAgICA7JiMjIyMrICAgICAgICAgICojIyMjIyMjPyAgICAgJCMjIyMjIyMjIyMjIz8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsjIyMjIyMjIyMjIyMjIysgICAgPyMjIyMjIyMjIz8gICAgICAgICAgJCMjIyQgICAgICAgICAgISMjIyMjIyMjIyQgICAgKyMjIyMjIyMjIyMjIyY7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQjIyMjIyMjIyMjIyMjJCAgIDskIyMjIyMjIyMjIyM/ICAgICAgICAgISMjIz8gICAgICAgICAhIyMjIyMjIyMjIyMkOyAgICQjIyMjIyMjIyMjIyMhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEAjIyMjIyMjIyMjIyMjKiAgICEjIyMjIyMjIyMjIyMjISAgICAgICAgPyMjIyQgICAgICAgICojIyMjIyMjIyMjIyMjPyAgICsjIyMjIyMjIyMjIyNAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyYjIyMjIyMjIyMjIyMmOyAgICArP0AjIyMjIyMjJiQrOyAgICAgICA7JiMjIyM7ICAgICAgIDsrP0AjIyMjIyMjJj8rOyAgICBAIyMjIyMjIyMjIyMjOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyMjIyMjIyMjIyMjIyNAICAgICAgICArJCYjJiQqOyAgICAgICAgIDskIyMjIyNAOyAgICAgICAgICArJCYjJiQqOyAgICAgICAkIyMjIyMjIyMjIyMjKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyMjIyMjIyMjIyMjIyMkICAgICorICAgIDsrOyAgIDsqOyAgICAgKiYjIyMjIyMjJiEgICAgIDsqOyAgIDsrOyAgICArKjsgICAkIyMjIyMjIyMjIyMjKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYjIyMjIyMjIyMjIyNAICAgIDskQCE7ICAgICArJEAhICAgIDs/IyMjIyMjIyMjIyMkOyAgICAqQCQqICAgICA7KiRAKyAgICAkIyMjIyMjIyMjIyMjKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQjIyMjIyMjIyMjIyMmOyAgICA7JCMmJCorIUAjIyogICAgK0AjIyMjIyMjIyMjIyMjQCsgICAgKyYjQD8rKyQmI0A7ICAgICBAIyMjIyMjIyMjIyMjKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICojIyMjIyMjIyMjIyMjKiAgICAgICQjIyMjIyMmKyAgICAhIyMjIyMjIyMjIyMjIyMjIyM/ICAgICtAIyMjIyMjJDsgICAgICsjIyMjIyMjIyMjIyMjOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAIyMjIyMjIyMjIyMjJCAgICAgICA/IyMjI0ArICAgOyQjIyMjIyMjIyMjIyMjIyMjIyMjJDsgICA7QCMjIyMkICAgICAgICQjIyMjIyMjIyMjIyNAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIyMjIyMjIyMjIyMjIyogICAgICAgISMjQDsgICArQCMjIyMjIyMjIyMjIyMjIyMjIyMjIyYqICAgOyQjIz8gICAgICAgKyMjIyMjIyMjIyMjIyMhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7JiMjIyMjIyMjIyMjIyM/ICAgICAgICojIyMjIyMjIyMjIyNAOyAgICAgIC8jIyMjIyMjIyMjIyNBIQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICA7OzsgICAgICAgICAgIDs7KyorKzsgICA7OzsrKzs7OysrOzs7ICA7KysrOzs7KysrKzsgOzs7ICAgICAgICAgOzsgICAgICA7OzsgICAgICA7OzsrKzs7OysrKzs7ICAgOzs7KysrKysrKzsgICA7KysrKys7ICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgIDtAIyYrICAgICAgICArJCYmQCRAJiM/ICBAI0BAQCYjJkBAQCMkIDskQEBAQCMmQEBAQCEgISNAICAgICAgICAhIyQgICAgICsmIyY7ICAgICAhIyZAQEAjJkBAQCYmOyAgISMmQEBAQEBAQCogICAkIyZAQEAmJiQrICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICQjPyNAOyAgICAgID8jJiE7ICAgKiMkICAmJjs7OyQjITs7KiMkICAgOzs7KiNAOzs7OyAgICQjPyAgICAgICsjJjsgICAgO0AjPyMkICAgICAhIyE7OyojQDs7O0AjOyAgPyMkOzs7Ozs7OyAgICBAIyogICA7ISYjPyAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgKiMkID8jJCAgICAgKiMmOyAgICAgOys7ICArKyAgICQjISAgOys7ICAgICAgKiMkICAgICAgIDsmIysgICAgICQjKiAgICAgPyM/ICQjISAgICA7KzsgICsjQCAgICsrICAgPyMkICAgICAgICAgICAkIyogICAgIDsmIyogICAgICAgICAKCQkgICAgICAgICAgICAgICA7JiY7ICBAIyogICAgJCMkICAgICAgICAgICAgICAgICQjISAgICAgICAgICAgKiMkICAgICAgICAhI0A7ICAgISMkICAgICArI0AgIDsmIzsgICAgICAgICsjQCAgICAgICAgPyNAPz8/Pz8/ISAgICAkIyogICAgICAkIyQgICAgICAgICAKCQkgICAgICAgICAgICAgICAkIyE7OzsqIyY7ICAgJCM/ICAgICAgICAgICAgICAgICQjISAgICAgICAgICAgKiMkICAgICAgICAgJCM/ICA7JiY7ICAgIDtAIyo7OzshIyQgICAgICAgICsjQCAgICAgICAgPyNAPz8/Pz8/ISAgICAkIyogICAgICAkIyQgICAgICAgICAKCQkgICAgICAgICAgICAgICEjI0BAQEBAJiMkICAgISNAOyAgICAgICAgICAgICAgICQjISAgICAgICAgICAgKiMkICAgICAgICAgOyYjKyAkIyogICAgID8jJkBAQEBAIyMhICAgICAgICsjQCAgICAgICAgPyMkICAgICAgICAgICAkIyogICAgICBAIyogICAgICAgICAKCQkgICAgICAgICAgICAgOyYmKzs7Ozs7O0AjKiAgOyQjJCsgICAgIEAkICAgICAgICQjISAgICAgICAgICAgKiMkICAgICAgICAgICojQCEjPyAgICAgKiNAOzs7Ozs7KyMjKyAgICAgICsjQCAgICAgICAgPyMkICAgICAgICAgICAkIyogICAgKyQjJCAgICAgICAgICAKCQkgICAgICAgICAgICAgJCMqICAgICAgICsjJjsgIDs/JiNAJCQkJCMkICAgICskJCYjQCQkOyAgIDskJCQkQCMjJCQkJCogICAgICAkIyNAOyAgICA7JiMrICAgICAgICEjQDsgICAkJEAjIyQkKiAgICAgPyMmJCQkJCQkJCEgICBAI0AkJCRAJkAhICAgICAgICAgICAKCQkgICAgICAgICAgICA7KiogICAgICAgICArKjsgICAgICsqIT8hKis7ICAgIDsqKioqKioqICAgIDsqKioqKioqKioqKisgICAgICA7Kio7ICAgICA7KisgICAgICAgICAqKjsgICAqKioqKioqKyAgICAgOyoqKioqKioqKisgICArKiEhISEqOyAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAJICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCmAKCgoKCgoKCgoKCgogICAgICAgICAgICAgICAgICAgICAuLi4uOjoiIiIiIiIiIiIiIiIiIiIiIiIiIiIuICAgICAgICAgIC4KICAgICAuICAuICAgICAgICAgIC4qICMjIyMgOyIuICAgIH5+LiAgOjo6OjogICAgIDoKICAgICAgICAgICAgICAgICAuNCMjIyMjOl4uJyAgYC4uIDo6Ojo6OiAgICBgLiAuICAgYCAgICAgICAgICAgbwogICAgICAgICAgICAgICAuNCMjIyMjOjonIDogICAgICAgICA6Ojo6Li4nICAuLiAgLiAgIC4KICAgICAgICAgICAgICAuZCMjIyM6OiAgLiAgYC4gLiAgICA6ICAgICAgIDo6IC4KICAuICAgIG8gICAgIC4jIyMjOjouLi46ICAgICAgICAuICBgLiAgICAuICAuICAuLi4uCiAgICAgICAgICAgIC5kIyM6Oi5kJCQgIGAuICAgICAgICAgICAuICAgICAgIDo6JCRiLiAuICAuICAgICAgOiAuCiAgICAgICAgICAuZCMjIzo6ZCQkJCc6Oi4gYCAuICAgICAuICAgIC4gICAgICA6JCQkJAogICAgICAgIC5kIyMjIzo6OiQkJCQjOjogLi4uLi4uLiAgICAgICAgICAgICAgIC5gJCRiICA6ICAuCiAgICAgICAgZCMjIyM6Oi4uIGBkIyM6LicgICAgICAgICAgICAgICAgICAgICAgOiAnJCc6OiAuCiAgbyAgICBkIyMjIzo6JyAuIGQkIzo6ICAgICAgLiwgIC4gICAgICAgICAgICAgIC4gIDouICAgICAuICAgICBvCiAgICAgLmQjIyM6Oi4gOyAgJCQjIzo6IC4uLi4nICAgICAgICAgICAgIC4gICAgICA7IC4gLgogLiAuZCMjIyM6OicgOi4gLnEkJCMjIzo6ICAgICAgICAgICAgICAgICAgICAgICAgOiAgICAgICAgIC4gICAgIDoKICAgJCMjIzo6LiBfLl4uICBgcSQkJCQjIzo6ICAgIC4uPiAgLiAgIC4uICAuICAgOicgIC4KICAkIyMjOjouICwtLSAgLi46LmAuLi4uOjo6Oi4uJyAuICAgICAuICAgIC4uIC4nICAgICAgOjo6IC4nIDoKICAkIyM6OiA6YC4gLi4uLi4nJycnJyAgYGBgLi4uLi4gIC4gIC4uLi4uLicnJ2BgYGAuLi4uLi4gOi4KICAkIyM6ICAuLi4nIC4uLi4uLi4nJycnJycnJyAgICAiIiIiIiAgIGBgYGBgYGBgYC4uLi4uICBgLiAuICAuCiBkIyM6IC4nIC4uLicgLi4uLi4uLiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi4uLi4gIGAuICA7ICAgLgogJCM6Oi5gLiAgICAuJyAgICAuXi4gICAgICAgIDogICAgIC4gJyAgICAgICAuLi4gICAgYC4uICAgOiAgIC4KKCMjIyAgYC4iIiIiICAuLiAuICA6Oi4uLiAgIC4gICA6LiAgICAgICAgICAgICAgICAgLiAgICIiJycgICA6CiBgQCMkJCQkJCQkJCQkJCQkJCQkJCQkJCQkIyMjIyM6Ojo6OjokJCAgOiAgOiAuIC4gICAgIC4KICAgICAiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIicnICcgICcKICBvICAuICAgbyAgICAgIC4gICAgIG8gICAgLiAgbyAgICAgIC4gICBvICAgICAgICAgbyAgICAgICAuIDogIC4KIC4gOiAgIG8gIC4gIG8gICA6IG8gIC4gICBvICAgLiAgIG8gICAgICAuICAgbyAuICA6IC4gbyAuICAgbyAuIC4KICAgIG8gICAgICAgIC4gICAgICAgbyAgICAgICBvICAgICAgICBvICAgICAgOiAgICAuICAgICAgIDogICAgbwogJCQkYiAgJCQgLmQkYi4gJCQkYiAgICQkJGIgICQkIC5kJGIuICQkJGIgICAkJCRiICAkJCAuZCRiLiAkJCRiCiAkIGAkYiAkJCAkJCAkJCAkIGAkYiAgJCBgJGIgJCQgJCQgJCQgJCBgJGIgICQgYCRiICQkICQkICQkICQgYCRiCiAkJCQkJyAkJCAkJCAkJCAkJCQkJyAgJCQkJCcgJCQgJCQgJCQgJCQkJCcgICQkJCQnICQkICQkICQkICQkJCQnCiAkICckYiAkJCAkJCAkJCAkICckYiAgJCAnJGIgJCQgJCQgJCQgJCAnJGIgICQgJyRiICQkICQkICQkICQgJyRiCiAkJCQkJyAkJCRgJCQkJyAkJCQkJyAgJCQkJCcgJCQkYCQkJCcgJCQkJCcgICQkJCQnICQkJGAkJCQnICQkJCQnCgoKCgoKCgoKCgoKCgoKCgoKCgoKCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZTilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZcKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRICAgIFRPIEZVTFUsIE1PQVIgQkxPQlMgVE8gRVRIRVJFVU0gICAg4pWRCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZEKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkSAgICAgICAgICBJSUkgREVDRU1CRVIgTU1YWFYgICAgICAgICAgIOKVkQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZrilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZ0KICAgICAgICAgICAgCiAgICAgICAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICAgICAgICAgICAgICAgfHx8fCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8fHwKICAgICAgICAgICAgICAgIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18CiAgICAgICAgICAgICAgICB8X19fLS0tLS1fX18tLS0tLV9fXy0tLS0tX19fLS0tLS1fX18tLS0tLV9fXy0tLS0tX19fLS0tLS1fX18tLS0tLV9fXy0tLS0tX19ffAogICAgICAgICAgICAgICAgLyBfIFw9PT0vIF8gXCAgIC8gXyBcPT09LyBfIFwgICAgICAgICAgICAgICAgICAgLyBfIFw9PT0vIF8gXCAgIC8gXyBcPT09LyBfIFwKICAgICAgICAgICAgICAgKCAoLlwgb09vIC8uKSApICggKC5cIG9PbyAvLikgKSAgICAgICAgICAgICAgICAgKCAoLlwgb09vIC8uKSApICggKC5cIG9PbyAvLikgKQogICAgICAgICAgICAgICAgXF9fLz09PT09XF9fLyAgIFxfXy89PT09PVxfXy8gICAgICAgICAgICAgICAgICAgXF9fLz09PT09XF9fLyAgIFxfXy89PT09PVxfXy8KICAgICAgICAgICAgICAgICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8ICAgICAgICAgICAgICAgICAgICAgICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8CiAgICAgICAgICAgICAgICAgICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fCAgICAgXFwvKSwgICAgICAgICAgICAgICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fAogICAgICAgICAgICAgICAgICAgfHx8fHx8fCAgICAgICAgIHx8fHx8fHwgICAgLCcuJyAvLCAgICAgICAgICAgICAgfHx8fHx8fCAgICAgICAgIHx8fHx8fHwKICAgICAgICAgICAgICAgICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8ICAgKF8pLSAvIC8sICAgICAgICAgICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8CiAgICAgICAgICAgICAgICAgICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fCAgICAgIC9cXy8gfF9fLi4tLSwgICogICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fAogICAgICAgICAgICAgICAgICAgfHx8fHx8fCAgICAgICAgIHx8fHx8fHwgICAgIChcX19fL1wgXCBcIC8gKS4nICAgfHx8fHx8fCAgICAgICAgIHx8fHx8fHwKICAgICAgICAgICAgICAgICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8ICAgICAgXF9fX18vIC8gKF8gLy8gICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8CiAgICAgICAgICAgICAgICAgICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fCAgICAgICBcXF8gLCctLSdcXyggICAgICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fAogICAgICAgICAgICAgICAgICAgKG9Pb09vKSAgICAgICAgIChvT29PbykgICAgICAgKV8pXy8gKV8vIClfKSAgICAgKG9Pb09vKSAgICAgICAgIChvT29PbykKICAgICAgICAgICAgICAgICAgIEolJSUlJUwgICAgICAgICBKJSUlJSVMICAgICAgKF8oXy4nKF8uJyhfLicgICAgIEolJSUlJUwgICAgICAgICBKJSUlJSVMCiAgICAgICAgICAgICAgICAgIFpaWlpaWlpaWiAgICAgICBaWlpaWlpaWlogICAgICAgICAgICAgICAgICAgICAgIFpaWlpaWlpaWiAgICAgICBaWlpaWlpaWloKICAgICAgICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICAgICAgICAgICAgICAgfF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX198CiAgICAgICAgICAgICAgIHxfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX198CiAgICAgICAgICAgICAgfF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19ffAogICAgICAgICAgICAgfF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX198CiAgICAgICAgICAgICIjCgoKCgoKCgoKCg==";

function decodeBase64Utf8(b64) {
  // Browser
  if (typeof atob === "function") {
    const bin = atob(b64);
    // Convert binary string -> Uint8Array -> UTF-8
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    try {
      return new TextDecoder("utf-8").decode(bytes);
    } catch {
      // Fallback (best-effort): may fail on some unicode, but avoids hard crash
      return bin;
    }
  }

  // Node-ish fallback
  // eslint-disable-next-line no-undef
  if (typeof Buffer !== "undefined") {
    // eslint-disable-next-line no-undef
    return Buffer.from(b64, "base64").toString("utf-8");
  }

  return "";
}

const MERGE_TXT = decodeBase64Utf8(MERGE_TXT_B64);

function splitMergeTxt(txt) {
  const i2 = txt.indexOf("....::");
  const i3 = txt.indexOf("╔════════");

  if (i2 === -1 || i3 === -1 || i3 <= i2) {
    // Could not find markers; return as single block
    return [txt.trimEnd()];
  }

  const b1 = txt.slice(0, i2).trimEnd();
  const b2 = txt.slice(i2, i3).trimEnd();
  const b3 = txt.slice(i3).trimEnd();
  return [b1, b2, b3];
}

const ASCII_BLOCKS = splitMergeTxt(MERGE_TXT);

// Choose which blocks to show as layers.
// merge.txt appears to contain 3 blocks. Default:
// - Waves texture: block 2 (index 1)
// - Main art: block 1 (index 0)
// - Zebra art: block 3 (index 2)
const BG_CONFIG = { wavesIndex: 1, mainIndex: 0, zebraIndex: 2 };
const BG_WAVES = ((ASCII_BLOCKS[BG_CONFIG.wavesIndex] || ASCII_BLOCKS[0] || "") + "\n\n" + (ASCII_BLOCKS[BG_CONFIG.wavesIndex] || ASCII_BLOCKS[0] || "")).trimEnd();
const BG_MAIN = (ASCII_BLOCKS[BG_CONFIG.mainIndex] || ASCII_BLOCKS[0] || "").trimEnd();
const BG_ZEBRA = (ASCII_BLOCKS[BG_CONFIG.zebraIndex] || "").trimEnd();

const HOW_I_GOT_HERE_PARAS = [
  "Since this is a decentralized site, I feel the need to share how I ended up here. Long before Ethereum, I was interested in using things that felt different from the normal internet. Usenet was definitely the foundation, then came the MP3-sharing era: Napster, BearShare, and every other app that popped up trying to fill the gap. It was a little sketchy, but honestly kind of magical. Looking back, it laid the groundwork for the decentralization principles I feel attached to within crypto.",
  "The moment that pulled me down the rabbit hole a little further, though, wasn’t file sharing. It was an application I downloaded on PS3 called Folding@home. Folding@home is a distributed computing application where you donate spare compute power to run protein-folding simulations that help researchers study diseases that would otherwise be too expensive or too slow to model. Back then, the idea that a bunch of regular people, kids, really, could contribute to something powerful enough to push science forward felt very profound.",
  <>
    Digging into decentralized compute led me to Bitcoin, which happened to be during the Silk Road era. Seeing people transact in something other than dollars gave me the same feeling I had with Folding@home, it felt new, it felt weird, it felt like{" "}
    <a
      href="https://youtu.be/sZHCVyllnck?si=e_uyDzLGnYIw1x_0"
      target="_blank"
      rel="noreferrer"
      className="underline decoration-zinc-500/70 underline-offset-2 hover:text-zinc-100"
    >
      i like money
    </a>
    . Bitcoin was (and is) an incredible invention, and I’ll always have a special place in my heart for it. But today, it’s largely a store of value, plain and simple.
  </>,
  "I found Ethereum in 2017 during the ICO boom, and that was my latest *aha* moment. Ethereum was more than just money, it was home to a programming language, smart contracts, art, ICOs and tokens. It was a net new ecosystem, one that anyone could connect to from their computer. I’m convinced we’ll look back on this era and realize how much the world changed because of it.",
  "On the builder front, I stayed mostly sidelined until the beacon chain launch. Proof of Stake was a paradigm shift. The design space was suddenly wide open. LSDs (which eventually became “LSTs” for whatever reason 😉) started to take off. Decentralized staking pools like Rocket Pool gained traction. Staking just grabbed my mindshare. That obsession led me to a simple question: how can solo stakers remain competitive when staking matures? My answer at the time (although slightly naive) was to pool together MEV rewards and create new incentives through public goods funding.",
  "The EF was supportive of this effort and helped fund R&D. Decentralization was sexy back then and the solo staking community was strong (likely because we accounted for a large share of the actual independent node operators). I put the product on paper, found a rockstar full stack developer, and partnered with Anthony Sassano, EthStaker, Aestus Relay, and Yorrick (king of eth-docker) to help run the decentralized infrastructure. We launched smoothly.money as an open-source public good which grew to ~$20M in TVL and outperformed on APY thanks to the donations that poured in from the ecosystem!",
  "Somewhere along the way, “incentivize solo staking” became a meme.",
  "Around that time, I saw Obol publish an initiative called “1% for decentralization,” where a portion of rewards from stake run on Obol Distributed Validators gets redistributed back to the community to fund projects that strengthen Ethereum’s decentralization. That hit me hard. While building Smoothly, that kind of funding would have been massively valuable. I joined Obol shortly after.",
  "Now, almost two years later, I lead product marketing at Obol, and I’m more excited than ever to be working in the Ethereum ecosystem. Today, it feels like we’re standing at another inflection point. Just like the shift from Proof of Work to Proof of Stake opened a new frontier, the move toward ZK feels like another era where the design space is wide open again.",
  "And that’s the thing I love most about Ethereum: we never stop pushing forward. The ecosystem rewards curiosity. Anyone can show up with a real idea, post it on ethresearch or ethmagicians, and get thoughtful feedback. Ethereum is open to anyone who wants to contribute and that gives me a sense of purpose I never felt in my tradjob days.",
];

// ---------------------------
// Minimal self-tests (dev)
// ---------------------------
let __SELF_TEST_RAN__ = false;
function runSelfTestsOnce() {
  if (__SELF_TEST_RAN__) return;
  __SELF_TEST_RAN__ = true;

  try {
    // Test 1: section ids unique
    const ids = SECTIONS.map((s) => s.id);
    const uniqueIds = new Set(ids);
    if (uniqueIds.size !== ids.length) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Duplicate section ids detected", ids);
    }

    // Test 2: section keys unique
    const keys = SECTIONS.map((s) => s.key);
    const uniqueKeys = new Set(keys);
    if (uniqueKeys.size !== keys.length) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Duplicate shortcut keys detected", keys);
    }

    // Test 3: section keys are single characters
    const bad = SECTIONS.filter((s) => typeof s.key !== "string" || s.key.length !== 1);
    if (bad.length) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Non-1char shortcut keys", bad);
    }

    // Test 4: merge decoding produced content
    if (typeof MERGE_TXT !== "string" || MERGE_TXT.replace(/\s/g, "").length < 50) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] merge.txt decode looks empty");
    }

    // Test 5: split produced at least 1 block; prefer 3
    if (!Array.isArray(ASCII_BLOCKS) || ASCII_BLOCKS.length < 1) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] ASCII_BLOCKS missing");
    }
    if (ASCII_BLOCKS.length < 3) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Expected ~3 blocks; got", ASCII_BLOCKS.length);
    }

    // Test 6: background strings are non-empty
    if (typeof BG_MAIN !== "string" || BG_MAIN.replace(/\s/g, "").length < 50) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] BG_MAIN looks empty");
    }
    if (typeof BG_WAVES !== "string" || BG_WAVES.replace(/\s/g, "").length < 50) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] BG_WAVES looks empty");
    }

    // Test 7: sanity for command filtering behavior
    const sampleCommands = [
      { label: "Work", keywords: ["work", "w"] },
      { label: "GitHub", keywords: ["open", "github", "g"] },
      { label: "Copy ENS", keywords: ["copy", "ens"] },
    ];
    const filter = (q) => {
      const qq = (q || "").trim().toLowerCase();
      if (!qq) return sampleCommands;
      return sampleCommands
        .map((c) => ({
          c,
          score: c.keywords.some((k) => k.includes(qq)) ? 2 : c.label.toLowerCase().includes(qq) ? 1 : 0,
        }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.c);
    };

    if (filter("").length !== sampleCommands.length) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Empty query should return all commands");
    }
    if (filter("github").length !== 1 || filter("github")[0].label !== "GitHub") {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Filtering for github failed");
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("[kody.eth self-test] threw", e);
  }
}
