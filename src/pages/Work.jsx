import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { WORK } from "../work.js";

/**
 * /work
 *
 * Portfolio. Every card links to the live site and its public source.
 * Data lives in src/work.js, thumbs in public/work. Card and ProjectGrid are
 * shared with /resume.
 */

const CATS = ["All", ...new Set(WORK.map((w) => w.cat))];

export function Card({ w }) {
  return (
    <article className="group flex flex-col bg-ink transition-colors hover:bg-ink-soft">
      <a
        href={w.url || w.code}
        {...(w.case ? {} : { target: "_blank", rel: "noopener" })}
        className="block aspect-[16/10] overflow-hidden border-b border-hairline"
      >
        <img
          src={`/work/${w.repo}.webp`}
          alt={`${w.name} homepage`}
          width="800"
          height="500"
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </a>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg text-paper">{w.name}</h3>
          <span className="shrink-0 font-mono text-[0.625rem] tracking-[0.12em] text-graphite uppercase">
            {w.loc}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-graphite">{w.desc}</p>
        <div className="mt-4 flex items-center gap-5 text-sm">
          {w.url && (
            <a
              href={w.url}
              {...(w.case ? {} : { target: "_blank", rel: "noopener" })}
              className="inline-flex items-center gap-1 text-paper underline-offset-4 hover:underline"
            >
              {w.case ? "See how it works" : "Live site"}{" "}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {w.code && (
            <a
              href={w.code}
              target="_blank"
              rel="noopener"
              className="text-graphite underline-offset-4 hover:text-paper hover:underline"
            >
              {w.codeLabel || "Code"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectGrid() {
  const [cat, setCat] = useState("All");
  const list = WORK.filter((w) => cat === "All" || w.cat === cat);
  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-4 py-2 text-xs transition-colors ${
              cat === c
                ? "border-paper bg-paper text-ink"
                : "border-hairline text-graphite hover:border-paper/40 hover:text-paper"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((w) => (
          <Card key={w.repo} w={w} />
        ))}
      </div>
    </>
  );
}

export function Work() {
  const featured = WORK.filter((w) => w.featured);

  return (
    <article className="px-5 pt-32 pb-8 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Work / {WORK.length} projects shipped</p>
        <h1 className="display mt-5 text-big">Things I have built.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-paper">
          Websites, web apps and automations for contractors, insurance agents, restaurants,
          brands and coaches, from Fredericksburg to Salt Lake City. All built
          with AI, and the code for nearly every one is public on GitHub.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="/#quote"
            className="inline-flex items-center gap-4 rounded-full bg-paper py-3 pr-3 pl-8 text-ink transition-colors hover:bg-paper-deep"
          >
            <span className="font-medium">Get a fixed quote</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/15">
              &rarr;
            </span>
          </a>
          <a
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-7 py-3.5 text-sm transition-colors hover:border-paper/40"
          >
            My resume
          </a>
        </div>

        <h2 className="display text-mid mt-20 text-paper">Featured</h2>
        <div className="mt-6 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((w) => (
            <Card key={w.repo} w={w} />
          ))}
        </div>

        <h2 className="display text-mid mt-20 text-paper">Everything</h2>
        <ProjectGrid />
      </div>
    </article>
  );
}
