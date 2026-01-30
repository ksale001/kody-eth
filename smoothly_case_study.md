# Smoothly: A Case Study (Draft)

## TL;DR

&#x20;Smoothly is a solo‑stakers smoothing pool:  point your validators fee\_recipient to the pool contract, register, and claim a share of pooled tips and MEV every 21 days.

**Who it’s for:** Home stakers and independent operators who want more consistent execution‑layer rewards without giving up custody or joining a centralized provider.

**Outcome:** Increased and “smoothed” execution‑layer rewards for participants, using a trust‑minimized oracle network, a bond/penalty system, and a not‑for‑profit fee model.

---

## Context

**Timeframe:** Started in 2022 (pre-Merge). Mainnet launch and rebrand in January 2024.

**My role:** Founder. I owned product/protocol design, positioning and GTM. Team consisted of one full stack engineer and one graphic designer.

Origin story: In 2021 - 2022, MEV and tips were extremely high, and the Merge was on the horizon (for real this time). Post merge, stakers, not miners, would receive those execution-layer rewards. The catch was that solo stakers only expected a handful of block proposals per year (take me back plz), and the odds of any one proposal being a “lottery block” with massive MEV were even lower.

I’m not a gambler. I wanted a way to ensure I had access to the "average" block reward. I also had a gut feeling that, over a short horizon, pooling execution-layer rewards would be more profitable than going solo. That thesis was later validated by Ken Smith’s Rocket Pool research.

At the same time, it was obvious solo staking was going to come under pressure from large providers who could smooth rewards by default. In addition to reward smoothing, t was also about keeping solo staking competitive, and incentivizing solo stakers using the  public-goods ecosystem within Ethereum to reinforce decentralization.

**Early timeline:**

- Aug 25, 2022 — first public mention in EthStaker Discord (insert screenshot)
- Sep 2022 — The Merge (insert paint party)
- Nov 2022 — Devconnect: Ken Smith shares smoothing analysis (link to his research)
- Feb 2023 — working PoC on Goerli; early testing with a handful of users (include screenshots)
- March 2023 — Dappnode building a competitor; duopoly emerges; we both build in public (include a photo of us being cool together)
- May 2023 - Onboard rockstar oracle operators (link to bios/ websites)
- Sept 2023 - EF grant won for research into MEV Smoothing Pools (link to post)
- Jan 2024 — mainnet launch&#x20;
- March 2024 - Dencun Poap dontations Juice the pool
- March 2024 - Smoothly passes 100 subscribers
- July 2024 -  Smoothly peaks at \~20M in total stake subscribed



---

## The problem

\*\*What was broken \*\*

- Execution-layer rewards (MEV + tips) are spiky and unpredictable. For solo stakers, that variance is extreme because proposals are infrequent.
- Large staking providers can smooth rewards across big validator sets. Solo stakers  can’t.
- That creates a structural disadvantage: solo stakers accepted more volatility and  end up with lower APY even if they’re excellent operators.

**Why it mattered:**

- Solo staking is the long tail that keeps Ethereum decentralized.
- If solo stakers become uncompetitive, staking centralizes.
- Incentivizing solo staking helps keep independent operators in the game.

---

## Audience + positioning

**Primary ICP (v1):** Solo / home stakers running their own validators.

**Secondary audiences:**

- Small staking entities / independent operators running hundreds of keys.

**Tagline:** Solo stakers smoothing pool. Maximize rewrads, incentivize home staking.

**Key differentiators:**

1. Trust‑minimized: 6 oracle operators reach consensus on the registrants state; contract updates require ≥66% consensus.
2. Not‑for‑profit public good: 1.5% fee split across oracle operators to cover gas costs; Smoothly team takes no additional fee.
3. Simple: no extra monitoring software on the staking machine; change fee recipient, register, and claim every 21 days (or let it accrue).
4. Security‑minded: 0.5 ETH bond per validator and penalties to deter MEV theft.
5. Open source but realistic: built as a bridge until MEV smoothing/burn is enshrined at the protocol level.



---

## Strategy

**The wedge:** Treat MEV as the lottery.  We're all forced players, and we have a better chance of winning it we band together. 

**GTM approach:**

- Lead with the simplest mental model: \*Claim rewards even when you don't propose blocks. \*
- Keep the setup actionable: change fee recipient,  register, claim rewards
- Make it feel aligned with Ethereum values: solo stakers, public-good, open source.

**Narrative pillars:**

- Solo stakers shouldn’t be forced gamblers.
- Reward smoothing is a primitive large operators already use; solo stakers deserve it too.
- Decentralization needs to be economically competitive.
- Built as an open source public good.

**The first major pivot (competition forced clarity):**

- In early 2023, I found out that Dappnode was building a competing smoothing pool. They had more firepower and stronger brand awareness.
- Up to that point, I planned to monetize with a modest fee (\~5%) to fund development.
- Once it became a duopoly, I reduced the fee to **1.5%** (cost coverage only) and repositioned Smoothly as an **open-source public good** for solo stakers.
- That repositioning became real, it directly led to **SLIDE** (public-goods funding routed back into the pool, with **no personal fee** taken by me).

**Trust / security strategy (how we earned credibility):**\*\*

- 0.5 ETH bond per validator to deter MEV theft.
- Penalties for misconfiguration or missed proposals; relay monitoring to detect fee recipient changes.
- Oracle operator consensus before state updates.

---

### Trust as a Strategy

If this was going to attract solo stakers, it had to be \*trusted and secure \*. Oracle operator selection was an opportunity to standout: recruit high-signal, Ethereum-aligned operators who solo stakers already trust, and align incentives so the system is sustainable without becoming extractive.

**Execution:**

- Built a clear onboarding narrative and deck that explained the thesis, the incentive misalignment, the user flow, and the risks.
- Recruited a rockstar set of ETH aligned oracle operators. **The Daily Gwei (Anthony Sassano)**, Sam from **EthStaker**, **Aestus Relay**, **Yorrick (king of Eth-Docker)**. 
- Matched economics to positioning: reduced fees to **1.5%**, split across oracle operators to cover onchain costs.



**Why it worked:**

- Instantly created trust: solo stakers didn’t have to “trust Kody,” they could trust the people they already knew.
- Made the “open-source public good” positioning real, which became a  differentiator vs better-funded competitors.
- Oracle operators created distribution: these teams already had the audience; their participation created social proof and boosted our reach. 

###

---

## Results

**Topline:**

- **Peak TVL:** \~**\$20M** (dune dashboard)
- **Public goods donations:** \~**\$150k** routed directly into the smoothing pool

**What that enabled:**

- Donations created the meme “incentivize solo staking” 
- In 2024, smoothly subscribers received  more than 3x their expected MEV rewards. 

**What moved the needle most:**

- The pivot to  “open-source public good” positioning.
- Oracle operator selection and onboarding. 
- Dencun POAP donations resulted in subscriber count 2x'n in the span of 2 weeks.&#x20;

---

## Tradeoffs

- **Competing on brand vs values:** Dappnode had more resources and awareness, so I needed to compete on a stronger narrative and a better incentive model.
- **Monetization vs trust:** I intentionally removed a \~5% dev fee and moved to a "not for profit" 1.5% fee. That made the product easier to trust, but it also meant protocol funding was in question.
- **Public-goods commitment:** SLIDE turned the “public good” framing into an actual mechanism: public-goods funding was routed into the pool, and I took no personal fee.
- **Shipping trust-minimized systems:** The design needed to make MEV theft  unprofitable while still being simple enough for solo stakers.

---

## What I’d do again / do differently

**Do again:**

- **Open-source public good narrative**&#x20;
- \*\*Oracle operator selection \*\*as the core trust/GTM lever.
- **Claim interval** was simple
- **SLIDE** as the mechanism that turned “incentivize solo staking” into a reality

  **Change:**

* **Lower  the 0.5 ETH bond.** In practice, this became the biggest barrier to entry for large registrants (e.g., 50 key = 25 ETH bond). During research, users cared most about MEV theft, so I prioritized safety. It worked for trust, but it limited growth: no single address in the pool ever exceeded \~12 validators.
* **Remove the fee entirely.** At 1.5%, it didn’t meaningfully change outcomes and was mostly a “nice to have.” A true 0% fee would’ve been stronger marketing and cleaner alignment.



---

## Proof (links)

### Early signal

- Aug 25, 2022 — EthStaker Discord thread: first public post&#x20;

### Launch assets

- Smoothly landing page: [https://smoothly.money/](https://smoothly.money/)
- App / dashboard (deprecated): [https://app.smoothly.money/](https://app.smoothly.money/)



### Docs

- Docs home: [https://docs.smoothly.money/](https://docs.smoothly.money/)
- Overview: [https://docs.smoothly.money/overview](https://docs.smoothly.money/overview)
- How to guide: [https://docs.smoothly.money/how-to-guide](https://docs.smoothly.money/how-to-guide)
- Oracle operators: [https://docs.smoothly.money/oracle-operators](https://docs.smoothly.money/oracle-operators)
- Bond + MEV theft: [https://docs.smoothly.money/bond-and-mev-theft](https://docs.smoothly.money/bond-and-mev-theft)
- Penalties: [https://docs.smoothly.money/penalties](https://docs.smoothly.money/penalties)

### Oracle operator onboarding

- Oracle operator onboarding deck (PDF): (uploaded)
- Oracle operator set: The Daily Gwei (Anthony Sassano), EthStaker, Aestus Relay, Yorick (Eth-Docker)

### Public goods / fundraising

- SLIDE initiative: [https://docs.smoothly.money/social-layer-incentives-for-decentralization-slide](https://docs.smoothly.money/social-layer-incentives-for-decentralization-slide)
- Dencun POAP donations: >\$100k raised and routed to Smoothly (POAP News write-up) (link)
- Donation address: 0xsmoothly.eth / 0x2151…3dae (Etherscan) (link)

### Extras

- Research from Ken Smith's analysis around the smoothing thesis (link)
- Competitor friendliness: open design conversations with Dappnode (Lanski)
- A **V2 design** is ready, including updated contract architecture for anyone looking to pick up a project! [https://github.com/noahfigueras/contractsV2](https://github.com/noahfigueras/contractsV2)

##
