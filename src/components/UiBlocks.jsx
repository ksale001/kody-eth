import React from "react";

export function Overlay({ children, onClose, onClickInside }) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-black/55 px-4 py-10">
      <div onClick={onClickInside} className="w-full grid place-items-center">
        {children}
      </div>
    </div>
  );
}

export function SectionBlock({ id, title, kicker, children, setRef }) {
  return (
    <section id={id} ref={(el) => setRef(el)} className="scroll-mt-24 pt-14">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <div className="font-mono text-xs text-zinc-400/80">{kicker}</div>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-100">{title}</h2>
        </div>
        <div className="hidden sm:block font-mono text-xs text-zinc-400/70">#{id}</div>
      </div>
      {children}
    </section>
  );
}

export function ImpactCard({ title, subtitle, impact, proofs, open, cta, ctaInline = false }) {
  return (
    <details open={open} className="group rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
      <summary className="cursor-pointer list-none select-none">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="text-base font-semibold text-zinc-100">{title}</div>
              {cta && ctaInline ? (
                <a
                  className="rounded-2xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-1 text-xs text-zinc-100 hover:bg-zinc-900/55"
                  href={cta.href}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  {cta.label}
                </a>
              ) : null}
            </div>
            <div className="mt-1 text-sm text-zinc-300/80">{subtitle}</div>
          </div>
          {cta && !ctaInline ? (
            <a
              className="w-fit rounded-2xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 text-xs text-zinc-100 hover:bg-zinc-900/55"
              href={cta.href}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {cta.label}
            </a>
          ) : null}
        </div>
      </summary>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-3">
          <div className="font-mono text-xs text-zinc-400/80">impact</div>
          <ul className="mt-2 space-y-1 text-sm text-zinc-200/85">{impact.map((x) => (<li key={x}>• {x}</li>))}</ul>
        </div>
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-3">
          <div className="font-mono text-xs text-zinc-400/80">proof</div>
          <ul className="mt-2 space-y-1 text-sm text-zinc-200/85">
            {proofs.map((x, index) => {
              const match = typeof x === "string" ? x.match(/^(.*?):\s*(\/\S+|https?:\/\/\S+)/) : null;
              const label = match?.[1]?.trim();
              const href = match?.[2];
              return (
                <li key={`${x}-${index}`}>
                  {href ? (
                    <a
                      className="underline decoration-zinc-500/50 underline-offset-4 hover:text-zinc-100"
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {label || href}
                    </a>
                  ) : (
                    <span className="text-zinc-200/85">{x}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </details>
  );
}

export function BulletCard({ title, items }) {
  return (
    <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
      <div className="font-mono text-xs text-zinc-400/80">{title}</div>
      <ul className="mt-2 space-y-1 text-sm text-zinc-200/85">{items.map((x) => (<li key={x}>• {x}</li>))}</ul>
    </div>
  );
}

export function ListPanel({ items, columns = 1 }) {
  const layoutClassName =
    columns === 3
      ? "grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
      : columns === 2
        ? "grid gap-2 sm:grid-cols-2"
        : "space-y-2";
  return (
    <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
      <div className={layoutClassName}>
        {items.map((item, index) => {
          if (typeof item === "string") {
            return (
              <div
                key={`${item}-${index}`}
                className="rounded-2xl border border-zinc-800/60 bg-zinc-950/35 px-3 py-2 text-sm text-zinc-200/85"
              >
                {item}
              </div>
            );
          }

          return (
            <a
              key={`${item.title}-${index}`}
              className="group rounded-2xl border border-zinc-800/60 bg-zinc-950/35 px-3 py-2 text-sm text-zinc-200/85 transition hover:border-zinc-700/80 hover:bg-zinc-900/40"
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-zinc-100">{item.title}</div>
                  {item.meta ? <div className="mt-1 text-xs text-zinc-400/80">{item.meta}</div> : null}
                </div>
                <span className="font-mono text-[11px] text-zinc-500/80 group-hover:text-zinc-300/80">open</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function MiniCard({ title, desc }) {
  return (
    <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
      <div className="text-sm font-semibold text-zinc-100">{title}</div>
      <div className="mt-1 text-sm text-zinc-300/80">{desc}</div>
    </div>
  );
}
