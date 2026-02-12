import React from "react";
import squaaaad from "../assets/squaaaad.png";

export default function ObolCaseStudy() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <a className="font-mono text-xs text-zinc-300/80 hover:text-zinc-100" href="/">
            ← back to kody.eth
          </a>
          <span className="font-mono text-xs text-zinc-500/80">case study / obol</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-10">
        <section className="rounded-3xl border border-zinc-800/70 bg-zinc-950/55 p-6 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300/80">
              <span className="rounded-full border border-zinc-800/70 px-3 py-1 font-mono">Obol</span>
              <span className="rounded-full border border-zinc-800/70 px-3 py-1 font-mono">Case study</span>
              <span className="rounded-full border border-zinc-800/70 px-3 py-1 font-mono">Jul 2024 → Current</span>
            </div>
            <h1 className="text-2xl font-semibold text-zinc-100">Obol: A Case Study</h1>
            <p className="text-sm leading-6 text-zinc-200/85">
              I joined Obol in July 2024 and helped expand our go-to-market from a crypto‑native, ethos‑led narrative (Squad Staking)
              into partner-led motions (Lido + EtherFi), while building the early
              institutional story. We grew from ~$100M in 2024 to ~$2B today in ETH staked on Obol DVs.
            </p>
            <p className="text-sm leading-6 text-zinc-200/85">
              <strong>North star:</strong> decentralization and security. The market values APY, but without decentralization and credible neutrality what we're building doesn't matter.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-4">
                <div className="font-mono text-xs text-zinc-400/80">role</div>
                <div className="mt-2 text-sm text-zinc-200/90">Head of Product Marketing</div>
              </div>
              <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-4">
                <div className="font-mono text-xs text-zinc-400/80">scope</div>
                <div className="mt-2 text-sm text-zinc-200/90">
                  GTM strategy, product launches, sales enablement, growth hacks
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-300/80">
              <a className="rounded-xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 hover:bg-zinc-900/55" href="https://obol.org/" target="_blank" rel="noreferrer">Website</a>
              <a className="rounded-xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 hover:bg-zinc-900/55" href="https://blog.obol.org/" target="_blank" rel="noreferrer">Blog</a>
              <a className="rounded-xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 hover:bg-zinc-900/55" href="https://github.com/ObolNetwork" target="_blank" rel="noreferrer">GitHub</a>
              <a className="rounded-xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 hover:bg-zinc-900/55" href="https://github.com/ObolNetwork/obol-stack" target="_blank" rel="noreferrer">Obol Stack</a>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">who it’s for</div>
            <div className="mt-2 text-sm text-zinc-200/90">
              TAM is all staked ETH. Institutions looking to commoditize node operators. Protocols decentralizing their operator sets. Frens looking to stake together.
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">outcome</div>
            <div className="mt-2 text-sm text-zinc-200/90">
              Expanded GTM from Squad Staking into protocols and institutions.
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">topline</div>
            <div className="mt-2 text-sm text-zinc-200/90">~$100M in 2024 → ~$2B ETH staked on Obol DVs today</div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">context</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p>
                Obol builds a middleware client (Charon) that enables Distributed Validator Technology (DVT).
              </p>
              <p><strong>Timeframe:</strong> July 2024 → Current</p>
              <p><strong>Role:</strong> Head of Product Marketing</p>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">Obol's story (from my perspective)</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <li>Epoch 1 — Squad Staking: grassroots movement targeting the home operators that helped launch the beacon chain!</li>
              <li>Epoch 2 — Onchain Protocols: real TVL unlock. </li>
              <li>Epoch 3 — Institutions: the DAT era and a new offering (Cluster as a Service)</li>
            </ul>
          </div>
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">Epoch 1 — squad staking</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p>
                When I joined, Obol had just shipped the <strong>Squad Staking</strong> narrative: friends (or strangers)
                team up to run a validator together and bring 32 ETH as a group. It landed with crypto‑native operators
                because it was ethos‑aligned, reduced the barrier to entry, and helped improve uptime and reliability.
              </p>
              <div>
                <div className="font-mono text-xs text-zinc-400/80">flagship campaign — squad staking in lido csm</div>
                <ul className="mt-2 space-y-2">
                  <li>Owned the CSM campaign motion and positioned it as the easiest path to mainnet.</li>
                  <li>Hosted a livestream walkthrough and joined Lido calls as a guest.</li>
                  <li>Managed onboarding, performance auditing, and distribution of the Silver Techne Credential onchain.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">Epoch 1 outcomes</div>
            <div className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <p><strong>700+ individuals</strong> deployed Obol DVs on mainnet via this motion.</p>
              <p>Techne became more than a badge — it was a <strong>gateway</strong> to future opportunities.</p>
              <div className="mt-3 space-y-2 text-xs text-zinc-300/80">
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  CSM landing page: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://squadstaking.com/en/csm" target="_blank" rel="noreferrer">squadstaking.com/en/csm</a>
                </div>
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  CSM campaign page: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/csm/" target="_blank" rel="noreferrer">blog.obol.org/csm</a>
                </div>
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  Silver Techne credential: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://etherscan.io/token/0xfdB3986F0C97C3c92aF3C318D7D2742d8f7ED8cC" target="_blank" rel="noreferrer">onchain credential</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">devcon moment</div>
            <div className="mt-3 space-y-3 text-sm text-zinc-200/85">
              <div>Vitalik mentioning Squad Staking on stage at Devcon.</div>
              <img
                className="w-full max-w-sm rounded-2xl border border-zinc-800/60 bg-zinc-950/60"
                src={squaaaad}
                alt="Squad Staking visual"
                loading="lazy"
              />
              <div className="text-sm text-zinc-300/80">
                <a
                  className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100"
                  href="https://www.youtube.com/live/Yj_4k1MsO-o?si=VTmqSQx44AYnH08E&t=4352"
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch the segment
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">Epoch 2 — lido simpledvt</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p><strong>My role:</strong> owned positioning and narrative; shipped co‑marketing and user‑facing collateral.</p>
              <p><strong>Strategy:</strong> a simple story — Obol helped decentralize Lido.</p>
              <div>
                <div className="font-mono text-xs text-zinc-400/80">objection handling</div>
                <ul className="mt-2 space-y-2">
                  <li><strong>Complexity:</strong> the added complexity is a feature, not a bug. The added security is worth the tradeoff.</li>
                  <li><strong>Fee:</strong> reframed the fee as downtime saved.</li>
                </ul>
              </div>
              <div className="mt-3 space-y-2 text-sm text-zinc-200/85">
                <p><strong>200k+ ETH</strong> staked on Obol DVs in the module.</p>
                <p><strong>200+ operators</strong> added to Lido’s operator set via this motion.</p>
              </div>
              <div className="mt-3 space-y-2 text-xs text-zinc-300/80">
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  Lido SimpleDVT case study: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://obol.org/Lido_SDVT_case_study.pdf" target="_blank" rel="noreferrer">pdf</a>
                </div>
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  Lido SimpleDVT retrospective: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.lido.fi/a-year-with-simple-dvt-strengthening-ethereum-staking-through-diversity-and-resilience/" target="_blank" rel="noreferrer">blog.lido.fi</a>
                </div>
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  Pier Two: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/pier-two-supporting-distributed-validators-in-lidos-curated-module/" target="_blank" rel="noreferrer">pier two</a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">Epoch 2 — etherfi operation solo staker</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p><strong>My role:</strong> program + GTM owner on the Obol side.</p>
              <p><strong>Strategy:</strong> turn Techne into a career ladder. Learn → earn → unlock delegated stake.</p>
              <p>
                <strong>Primary objection:</strong> coordination and performance concerns. We anchored clusters with professional
                operators so each cluster had PNOs while still bringing solo stakers into the operator set.
              </p>
              <div className="mt-3 space-y-2 text-sm text-zinc-200/85">
                <p><strong>100+ operators</strong> onboarded</p>
                <p><strong>40k+ ETH</strong> allocated to Operation Solo Staker</p>
                <p>Built confidence for the eventual <strong>$1B partnership</strong> to deploy stake on Obol DVs.</p>
              </div>
              <div className="mt-3 space-y-2 text-xs text-zinc-300/80">
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  EtherFi case study: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://obol.org/EtherFi_case_study.pdf" target="_blank" rel="noreferrer">pdf</a>
                </div>
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  EtherFi expansion: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/expanding-etherfis-operation-solo-staker/" target="_blank" rel="noreferrer">blog.obol.org</a>
                </div>
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  Rated dashboard: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://explorer.rated.network/o/Ether.Fi%20Obol%20DVT%20-%20Ether.Fi?network=mainnet&timeWindow=1d&idType=poolShare" target="_blank" rel="noreferrer">explorer.rated.network</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">Epoch 3 — institutions</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p>
                By 2025, decentralization was no longer sexy. Institutions were the biggest degens we’d seen yet. The
                protocol‑native pitch that worked for Lido/EtherFi/Swell/Stakewise didn’t land with DATs.
              </p>
              <div>
                <div className="font-mono text-xs text-zinc-400/80">pivot: cluster as a service (caas)</div>
                <ul className="mt-2 space-y-2">
                  <li><strong>ICP:</strong> DATs first, then the long tail of institutional allocators.</li>
                  <li><strong>Core hook:</strong> rotate compromised or underperforming operators without exiting stake.</li>
                  <li><strong>Urgency:</strong> Kiln API compromise rekt the validator queue, this could be you. </li>
                </ul>
              </div>
              <div>
                <div className="font-mono text-xs text-zinc-400/80">objections handled</div>
                <ul className="mt-2 space-y-2">
                  <li><strong>Complexity:</strong> justified by security guarantees.</li>
                  <li><strong>Cost:</strong> reframed the fee as time saved during downtime/ exits/ redeployments.</li>
                  <li><strong>Priority:</strong> tied to current incidents and validator queue.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">Epoch 3 signals</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-200/85">
              <p>
                We ran an <strong>Ethereum Institutional Staking Survey</strong> to signal that DVs are part of the institutional
                meta. Lead‑gen wasn’t the outcome, but the survey became a credible artifact and a strong partnership signal.
              </p>
              <div className="mt-3 space-y-2 text-xs text-zinc-300/80">
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  LTIN: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/liechtenstein-trust-integrity-network/" target="_blank" rel="noreferrer">liechtenstein‑trust‑integrity‑network</a>
                </div>
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  Blockdaemon: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/blockdaemon/" target="_blank" rel="noreferrer">blockdaemon</a>
                </div>
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  Liquid Collective: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/liquid-collective/" target="_blank" rel="noreferrer">liquid‑collective</a>
                </div>
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  CaaS deck: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://hubs.ly/Q042czLz0" target="_blank" rel="noreferrer">cluster as a service</a>
                </div>
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  Survey results: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://hubs.ly/Q042cBB60" target="_blank" rel="noreferrer">institutional staking survey</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">outcome 1</div>
            <div className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <p><strong>Techne</strong> became a snowball.</p>
              <p>North star: number of <strong>Silver Techne holders</strong>.</p>
              <p>Once Techne became the gateway to opportunity, operator supply became saturated.</p>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">outcome 2</div>
            <div className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <p><strong>Partner motions</strong> unlocked a step function in TVL.</p>
              <p>Positioning and narrative enabled broad protocol PMF.</p>
              <p>Lido SimpleDVT + EtherFi were the two biggest TVL jumps over the last two years.</p>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">outcome 3</div>
            <div className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <p><strong>Institutional motion</strong> (still WIP).</p>
              <p>Authored and shipped institutional collateral (CaaS) and enabled BD.</p>
              <p>Created <strong>&gt;1M ETH</strong> of pipeline opportunities.</p>
              <p><strong>Programmable staking (redacted):</strong> smart‑contract GTM that routes stake onto Obol DVs.</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">the good</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <li>Techne as a gateway: the opportunity carrot attracted many rabbits.</li>
              <li>Programmable staking GTM (redacted): favorite GTM to date.</li>
              <li>Institutional positioning and messaging on operator rotation/ key resharing/ end game staking configuration.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">the bad</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <li>Operator-first narrative built the pipeline but didn’t unlock TVL.</li>
              <li>Institutional urgency required incident‑anchored framing.</li>
              <li>Security framing never beat “APY first” demands from allocators.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">the ugly</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <li>Sybils: Techne incentives attracted farmers</li>
              <li>Token incentive meta: paying customers leads to unclear PMF</li>
              <li>Institutional: “not a priority” is a tough objection in a crowded market.</li>
            </ul>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">If I had a time machine, I'd...</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <li>Move B2B sooner, get in front of DATs and institutions earlier.</li>
              <li>Build a flagship account package around Lido DV performance.</li>
              <li>Design earlier for life after incentives</li>
            </ul>
          </div>
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-5 backdrop-blur">
            <div className="font-mono text-xs text-zinc-400/80">links to the good work</div>
            <div className="mt-3 space-y-2 text-sm text-zinc-200/85">
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                CSM campaign: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/csm/" target="_blank" rel="noreferrer">blog.obol.org/csm</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Silver Techne (onchain): <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://etherscan.io/token/0xfdB3986F0C97C3c92aF3C318D7D2742d8f7ED8cC" target="_blank" rel="noreferrer">etherscan token</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Stakewise adoption: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/stakewise/" target="_blank" rel="noreferrer">blog.obol.org/stakewise</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Swell adoption: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/swell/" target="_blank" rel="noreferrer">blog.obol.org/swell</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                LTIN: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/liechtenstein-trust-integrity-network/" target="_blank" rel="noreferrer">liechtenstein‑trust‑integrity‑network</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Quay Cove: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/quay-cove/" target="_blank" rel="noreferrer">quay cove</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Bitcoin Suisse: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/bitcoin-suisse/" target="_blank" rel="noreferrer">bitcoin suisse</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Blockdaemon: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/blockdaemon/" target="_blank" rel="noreferrer">blockdaemon</a>
              </div>
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                Liquid Collective: <a className="underline decoration-zinc-500/60 underline-offset-4 hover:text-zinc-100" href="https://blog.obol.org/liquid-collective/" target="_blank" rel="noreferrer">liquid collective</a>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
