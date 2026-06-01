import React from "react";
import commandCenter from "../assets/command_center.png";
import signalFeed from "../assets/signal_feed.png";
import launches from "../assets/launches.png";
import agentManager from "../assets/agent_manager.png";
import launchDetail from "../assets/launch_detail.png";

function Shot({ src, alt, caption }) {
  return (
    <figure className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
      <img
        className="w-full rounded-2xl border border-zinc-800/60 bg-zinc-950/60"
        src={src}
        alt={alt}
        loading="lazy"
      />
      <figcaption className="mt-3 text-sm text-zinc-300/80">{caption}</figcaption>
    </figure>
  );
}

export default function LaunchOSCaseStudy() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <a className="font-mono text-xs text-zinc-300/80 hover:text-zinc-100" href="/">
            ← back to kody.eth
          </a>
          <span className="font-mono text-xs text-zinc-500/80">case study / launch os</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-10">
        <section className="rounded-3xl border border-zinc-800/70 bg-zinc-950/55 p-6 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300/80">
              <span className="rounded-full border border-zinc-800/70 px-3 py-1 font-mono">Launch OS</span>
              <span className="rounded-full border border-zinc-800/70 px-3 py-1 font-mono">Case study</span>
              <span className="rounded-full border border-zinc-800/70 px-3 py-1 font-mono">Mar 2026 → Current</span>
            </div>
            <h1 className="text-2xl font-semibold text-zinc-100">Launch OS — An AI System That Runs Go-to-Market</h1>
            <p className="text-sm leading-6 text-zinc-200/85">
              I built an AI system that watches every launch and deal we have going, makes sense of it, and posts a daily
              brief to the team. The system runs twice a day to stay current, and it drafts with me, in my voice, not
              generic AI copy. I built it myself and it runs on my own machine.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-4">
                <div className="font-mono text-xs text-zinc-400/80">role</div>
                <div className="mt-2 text-sm text-zinc-200/90">Builder / user</div>
              </div>
              <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-4">
                <div className="font-mono text-xs text-zinc-400/80">stack</div>
                <div className="mt-2 text-sm text-zinc-200/90">
                  TypeScript/Node · SQLite · Express · Claude Code CLI orchestration · runs locally on a Claude
                  subscription, no API tokens
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">who it’s for</div>
            <div className="mt-2 text-sm text-zinc-200/90">
              A small team that needs to run launches like a full GTM org.
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">outcome</div>
            <div className="mt-2 text-sm text-zinc-200/90">
              The whole team gets a brief on every workstream once a day, and for me it’s one place to look. Then it helps
              me draft the actual work in my voice.
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">topline</div>
            <div className="mt-2 text-sm text-zinc-200/90">10+ launches · $1B+ deal pipeline · 800+ tests · local-only</div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">the problem</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p>
                GTM work generates more context than any one person can keep up with. Every launch and every deal
                produces signal all day across Slack, Notion, Google Drive, GitHub, and Telegram. Decisions, blockers,
                partner replies, slipped timelines.
              </p>
              <p>
                Most of it lives in someone’s head or in posts within channels that get missed. Projects stall out quietly
                because no one noticed they stopped moving, and there’s never one place that answers the only question that
                matters: where does everything actually stand?
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">why I built it</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p>
                It comes from the same instinct that pulled me into Folding@home and solo staking. The goal is to let a
                small marketing team focus on the important work instead of constantly trying to stay up to date on every
                launch and deal.
              </p>
              <p>
                And it sits right on the agentic-economy frontier I already follow (ERC-8004 agent registries, x402
                payments), which is exactly where the Obol Stack is headed.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <Shot
            src={commandCenter}
            alt="Launch OS Command Center showing the twice-daily run stats and a per-source pulse"
            caption="Command Center. The twice-daily run, plus a per-source pulse of what each channel actually surfaced."
          />
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">how it works — 1. the context engine</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p>
                Runs itself, twice a day at 8am and 8pm. Six agents in a row, each one reading from and writing to a
                shared database. No human in the loop:
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>Collector</strong> pulls raw signal from five places (Slack, GitHub, Notion, Google Drive
                  including meeting transcripts, and Telegram).
                </li>
                <li>
                  <strong>Relevance Filter</strong> keeps the launch and deal stuff, throws out the noise, and gets
                  sharper every time I correct it.
                </li>
                <li>
                  <strong>Pulse</strong> writes up what each channel surfaced this cycle, source by source.
                </li>
                <li>
                  <strong>Analyst</strong> ties each signal to the right workstream and calls where it stands, leading
                  with what moved.
                </li>
                <li>
                  <strong>Briefer</strong> posts the daily brief to our Slack, split into what’s Moving and what’s Stale.
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">how it works — 2. the launch producer</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p>
                This part keeps me in the loop. When I need to brainstorm narrative, positioning, and key messages, or
                draft user-facing content, I open a session that’s already loaded with everything on one workstream: every
                signal, the brand voice, past drafts, and where it stands today.
              </p>
              <p>
                Then we work the real artifacts together. Scope briefs, positioning, partner messaging. A voice layer
                trained on stuff I’ve already published keeps the drafts sounding like me instead of generic AI.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-2">
          <Shot
            src={signalFeed}
            alt="Launch OS Signal Feed with relevant, filtered, and dismissed signals"
            caption="Signal Feed. The filter’s calls on what’s relevant, with one-click corrections that teach it."
          />
          <Shot
            src={agentManager}
            alt="Launch OS Agent Manager showing run health and signal-quality metrics"
            caption="Agent Manager. Run health and signal-quality numbers for the whole pipeline."
          />
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">why it works</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <li>
                <strong>One place to look.</strong> For me it’s a single place to check, and the whole team gets a brief
                on every workstream once a day instead of digging through five tools.
              </li>
              <li>
                <strong>It catches what’s going stale.</strong> When a workstream stops moving, the system says so, and
                projects that would’ve quietly died get a nudge.
              </li>
              <li>
                <strong>It gets better the more I use it.</strong> Every correction trains the filter and the
                attribution.
              </li>
              <li>
                <strong>It writes, it doesn’t just track.</strong> The Producer turns all that context into positioning
                that sounds like me, which is where the real work happens.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">by the numbers (since Mar 2026)</div>
            <div className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <p>
                <strong>10+ active launches</strong> tracked (~10 more queued), plus a <strong>$1B+ deal pipeline</strong>{" "}
                across a multi-stage funnel (discovery → commercial terms → verbal close → integrating → live)
              </p>
              <p><strong>5 signal sources</strong>, unified · runs <strong>twice a day</strong> · <strong>daily</strong> team brief</p>
              <p><strong>800+</strong> automated tests · <strong>solo</strong> build · <strong>local-only</strong>, no cloud, no API tokens</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-2">
          <Shot
            src={launches}
            alt="Launch OS Launches view listing every active workstream by signal volume"
            caption="Launches. Every active workstream, ranked by how much signal it’s throwing off."
          />
          <Shot
            src={launchDetail}
            alt="Launch OS launch detail page with the latest assessment and what changed this week"
            caption="Launch detail. The latest assessment, plus what changed this week."
          />
        </section>

        <section className="mt-6">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">hard parts</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <li>Telling real signal apart from channel noise.</li>
              <li>Keeping the drafts sounding like me and not like AI.</li>
              <li>Knowing when to leave a judgment call alone instead of automating it.</li>
              <li>Building something that lasts as a team of one.</li>
            </ul>
            <p className="mt-4 text-sm leading-6 text-zinc-300/80">
              I built it to run launch and BD ops at Obol. It’s the same surface a product marketing org runs, positioning,
              launch ops, deal pipeline, competitive signal, except it’s software.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
