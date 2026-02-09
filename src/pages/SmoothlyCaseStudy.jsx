import React from "react";
import firstPost from "../assets/first_post.png";
import poolGif from "../assets/pool.gif";

export default function SmoothlyCaseStudy() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <a className="font-mono text-xs text-zinc-300/80 hover:text-zinc-100" href="/">
            ← back to kody.eth
          </a>
          <span className="font-mono text-xs text-zinc-500/80">case study / smoothly</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-10">
        <section className="rounded-3xl border border-zinc-800/70 bg-zinc-950/55 p-6 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300/80">
              <span className="rounded-full border border-zinc-800/70 px-3 py-1 font-mono">Smoothly</span>
              <span className="rounded-full border border-zinc-800/70 px-3 py-1 font-mono">Case study</span>
              <span className="rounded-full border border-zinc-800/70 px-3 py-1 font-mono">2022 → 2024</span>
            </div>
            <h1 className="text-2xl font-semibold text-zinc-100">Smoothly: A Case Study</h1>
            <p className="text-sm leading-6 text-zinc-200/85">
              Smoothly is a solo‑stakers smoothing pool: point your validators fee recipient to the pool contract,
              register, and claim a share of pooled tips and MEV every 21 days.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-4">
                <div className="font-mono text-xs text-zinc-400/80">role</div>
                <div className="mt-2 text-sm text-zinc-200/90">Founder — product, protocol design, positioning, GTM</div>
              </div>
              <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-4">
                <div className="font-mono text-xs text-zinc-400/80">team</div>
                <div className="mt-2 text-sm text-zinc-200/90">1 full‑stack engineer, 1 graphic designer</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-300/80">
              <a className="rounded-xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 hover:bg-zinc-900/55" href="https://smoothly.money/" target="_blank" rel="noreferrer">Website</a>
              <a className="rounded-xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 hover:bg-zinc-900/55" href="https://docs.smoothly.money/" target="_blank" rel="noreferrer">Docs</a>
              <a className="rounded-xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 hover:bg-zinc-900/55" href="https://github.com/Smoothly-Protocol" target="_blank" rel="noreferrer">GitHub</a>
              <a className="rounded-xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 hover:bg-zinc-900/55" href="https://github.com/noahfigueras/contractsV2" target="_blank" rel="noreferrer">V2 design</a>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">who it’s for</div>
            <div className="mt-2 text-sm text-zinc-200/90">
              Home stakers and independent operators who want more consistent execution‑layer rewards without giving up custody.
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">outcome</div>
            <div className="mt-2 text-sm text-zinc-200/90">
              Smoothed execution‑layer rewards using a trust‑minimized oracle network, a bond/penalty system, and a not‑for‑profit fee model.
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">topline</div>
            <div className="mt-2 text-sm text-zinc-200/90">Peak TVL ~ $20M · Public‑goods donations ~ $150k</div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">context</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p>
                In 2021–2022, MEV and tips were extremely high, and the Merge was on the horizon. Post‑merge, stakers
                would receive execution‑layer rewards. Solo stakers only expected a handful of block proposals per year,
                and the odds of any one being a “lottery block” with massive MEV were even lower.
              </p>
              <p>
                I wanted a way to access the “average” block reward and believed pooling execution‑layer rewards would
                be more profitable than going solo. That thesis was later validated by Ken Smith’s Rocket Pool research.
              </p>
              <p>
                It was also obvious solo staking would come under pressure from large providers who could smooth rewards
                by default. Beyond smoothing, this was about keeping solo staking competitive and incentivizing solo stakers
                using Ethereum’s public‑goods ecosystem to reinforce decentralization.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">early timeline</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <li>Aug 25, 2022 — first public mention in EthStaker Discord</li>
              <li>Sep 2022 — The Merge</li>
              <li>Nov 2022 — Devconnect: Ken Smith shares smoothing analysis</li>
              <li>Feb 2023 — PoC on Goerli; early testing with a handful of users</li>
              <li>Mar 2023 — Dappnode competitor; duopoly emerges</li>
              <li>May 2023 — onboard rockstar oracle operators</li>
              <li>Sep 2023 — EF grant won for MEV smoothing research</li>
              <li>Jan 2024 — mainnet launch</li>
              <li>Mar 2024 — Dencun POAP donations juice the pool</li>
              <li>Mar 2024 — Smoothly passes 100 subscribers</li>
              <li>Jul 2024 — peaks at ~20M total stake subscribed</li>
            </ul>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-2">
          <figure className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">origin story</div>
            <img
              className="mt-3 w-full rounded-2xl border border-zinc-800/60 bg-zinc-950/60"
              src={firstPost}
              alt="First Smoothly mention in EthStaker Discord (Aug 25, 2022)"
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm text-zinc-300/80">
              First public mention in EthStaker Discord — August 25, 2022.
            </figcaption>
          </figure>
          <div className="space-y-3">
            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
              <div className="font-mono text-xs text-zinc-400/80">the problem</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
                <li>Execution‑layer rewards (MEV + tips) are spiky and unpredictable for solo stakers.</li>
                <li>Large staking providers can smooth rewards across big validator sets. Solo stakers can’t.</li>
                <li>That creates a structural disadvantage and lower APY even for excellent operators.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
              <div className="font-mono text-xs text-zinc-400/80">why it mattered</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
                <li>Solo staking is the long tail that keeps Ethereum decentralized.</li>
                <li>If solo stakers become uncompetitive, staking centralizes.</li>
                <li>Incentivizing solo staking keeps independent operators in the game.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">audience + positioning</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p><strong>Primary ICP (v1):</strong> solo / home stakers running their own validators.</p>
              <p><strong>Secondary audiences:</strong> small staking entities running hundreds of keys.</p>
              <p><strong>Tagline:</strong> Solo stakers smoothing pool. Maximize rewards, incentivize home staking.</p>
              <div>
                <div className="font-mono text-xs text-zinc-400/80">key differentiators</div>
                <ul className="mt-2 space-y-2">
                  <li>Trust‑minimized: 6 oracle operators; contract updates require ≥66% consensus.</li>
                  <li>Not‑for‑profit public good: 1.5% fee split to cover gas; no team fee.</li>
                  <li>Simple: change fee recipient, register, claim every 21 days (or let it accrue).</li>
                  <li>Security‑minded: 0.5 ETH bond per validator and penalties to deter MEV theft.</li>
                  <li>Open source but realistic: bridge until MEV smoothing/burn is enshrined.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">strategy</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p><strong>The wedge:</strong> Treat MEV as the lottery. We all have to play, better odds together.</p>
              <p><strong>GTM approach:</strong> claim rewards even when you don’t propose blocks; keep setup actionable.</p>
              <p><strong>Narrative pillars:</strong> solo stakers shouldn’t be forced gamblers; reward smoothing is a primitive;
                decentralization must be economically competitive; open‑source public good.</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">pivot + positioning</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p>
                In early 2023, I learned Dappnode was building a competing smoothing pool. They had stronger brand
                awareness. I planned a modest ~5% fee to fund development.
              </p>
              <p>
                Once it became a duopoly, I reduced the fee to <strong>1.5%</strong> (cost coverage) and repositioned
                Smoothly as an <strong>open‑source public good</strong> for solo stakers.
              </p>
              <p>
                That repositioning became real and directly led to <strong>SLIDE</strong> (public‑goods funding routed back into
                the pool, with no personal fee taken).
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">trust as a strategy</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p>
                Oracle operator selection was a deliberate trust lever: recruit high‑signal, Ethereum‑aligned operators who
                solo stakers already trust, and align incentives so the system is sustainable without becoming extractive.
              </p>
              <ul className="space-y-2">
                <li>Bond + penalties to deter MEV theft and misconfiguration.</li>
                <li>Oracle consensus before state updates.</li>
                <li>Operators: The Daily Gwei, EthStaker, Aestus Relay, Yorrick (Eth‑Docker).</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
              <div className="font-mono text-xs text-zinc-400/80">results</div>
              <div className="mt-3 space-y-2 text-sm text-zinc-200/85">
                <p><strong>Peak TVL:</strong> ~ $20M</p>
                <p><strong>Public goods donations:</strong> ~ $150k routed directly into the smoothing pool</p>
                <p>In 2024, subscribers received more than 3x expected MEV rewards.</p>
                <p>Dencun POAP donations doubled subscriber count in ~2 weeks.</p>
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
              <div className="font-mono text-xs text-zinc-400/80">tradeoffs</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
                <li>Competed on narrative and incentives vs brand awareness.</li>
                <li>Removed ~5% dev fee to build trust; funding became a question.</li>
                <li>Public‑goods commitment made “open‑source public good” real.</li>
                <li>Trust‑minimized design had to stay simple for solo stakers.</li>
              </ul>
            </div>
          </div>
          <figure className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">100 subscribers</div>
            <img
              className="mt-3 w-full max-w-xs rounded-2xl border border-zinc-800/60 bg-zinc-950/60"
              src={poolGif}
              alt="Smoothly 100 subscribers POAP (March 2024)"
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm text-zinc-300/80">March 2024 — 100 subscribers POAP.</figcaption>
            <div className="mt-2 text-sm text-zinc-300/80">
              <a
                className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100"
                href="https://poap.gallery/drops/171467"
                target="_blank"
                rel="noreferrer"
              >
                View the POAP drop
              </a>
            </div>
          </figure>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">do again</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <li>Open‑source public good narrative.</li>
              <li>Oracle operator selection as the core trust/GTM lever.</li>
              <li>Simple claim interval.</li>
              <li>SLIDE as the mechanism that turned incentivize‑solo‑staking into reality.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">change</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <li>Lower the 0.5 ETH bond (barrier at scale).</li>
              <li>Remove the fee entirely for cleaner alignment.</li>
            </ul>
          </div>
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">proof + links</div>
            <div className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Smoothly landing page: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://smoothly.money/" target="_blank" rel="noreferrer">smoothly.money</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                App / dashboard (deprecated): <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://app.smoothly.money/" target="_blank" rel="noreferrer">app.smoothly.money</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Docs home: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://docs.smoothly.money/" target="_blank" rel="noreferrer">docs.smoothly.money</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Oracle operators: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://docs.smoothly.money/oracle-operators" target="_blank" rel="noreferrer">oracle operators</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Bond + MEV theft: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://docs.smoothly.money/bond-and-mev-theft" target="_blank" rel="noreferrer">bond + MEV theft</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Penalties: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://docs.smoothly.money/penalties" target="_blank" rel="noreferrer">penalties</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                SLIDE initiative: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://docs.smoothly.money/social-layer-incentives-for-decentralization-slide" target="_blank" rel="noreferrer">SLIDE</a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">media placeholders</div>
            <div className="mt-3 space-y-2 text-xs text-zinc-300/80">
              <div className="rounded-2xl border border-dashed border-zinc-800/60 bg-zinc-950/40 p-3">
                <div className="font-mono">[screenshot]</div>
                <div>EthStaker Discord first post</div>
              </div>
              <div className="rounded-2xl border border-dashed border-zinc-800/60 bg-zinc-950/40 p-3">
                <div className="font-mono">[screenshot]</div>
                <div>Devconnect / Ken Smith analysis slide</div>
              </div>
              <div className="rounded-2xl border border-dashed border-zinc-800/60 bg-zinc-950/40 p-3">
                <div className="font-mono">[photo]</div>
                <div>Goerli PoC dashboard + team shots</div>
              </div>
              <div className="rounded-2xl border border-dashed border-zinc-800/60 bg-zinc-950/40 p-3">
                <div className="font-mono">[photo]</div>
                <div>Dappnode collab / “duopoly era”</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
