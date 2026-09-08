import { PhoneCall } from "lucide-react";
import { ANSWERS } from "../answers.js";

/**
 * Question page template. Copy lives in src/answers.js; this is layout only.
 *
 * Structure follows the answer-first rule from the fan-out research: the
 * short answer sits directly under the h1 in a callout, self-contained
 * enough that an AI assistant can lift it without editing, before any
 * elaboration. The elaboration is what a human reads if the short answer
 * did not settle it.
 */
export function Answer({ answer }) {
  const related = ANSWERS.filter((a) => answer.related?.includes(a.slug));

  return (
    <article className="px-5 pt-32 pb-8 md:px-8 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <nav className="eyebrow" aria-label="Breadcrumb">
          <a href="/" className="transition-colors hover:text-paper">
            Home
          </a>
          <span className="mx-2 text-hairline">/</span>
          <a href="/answers" className="transition-colors hover:text-paper">
            Answers
          </a>
        </nav>

        <h1 className="display mt-5 text-big">{answer.question}</h1>

        {/* answer-first: the quotable block */}
        <div className="mt-8 border-l-2 border-paper/60 pl-6">
          <p className="text-lg leading-relaxed text-paper">{answer.short}</p>
        </div>

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
            href="tel:+15403956493"
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-7 py-3.5 text-sm transition-colors hover:border-paper/40"
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            (540) 395-6493
          </a>
        </div>

        {answer.body.map((section) => (
          <section key={section.h} className="mt-12">
            <h2 className="display text-mid">{section.h}</h2>
            <div className="mt-4 space-y-4 text-[1.02rem] leading-relaxed text-graphite">
              {section.p.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {related.length > 0 && (
          <div className="mt-14 border-t border-hairline pt-8">
            <p className="eyebrow">Related questions</p>
            <div className="mt-4 grid gap-px bg-hairline sm:grid-cols-2">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/answers/${r.slug}`}
                  className="bg-ink p-5 transition-colors hover:bg-ink-soft"
                >
                  <h3 className="font-display text-base">{r.question}</h3>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 border-t border-hairline pt-10 pb-8">
          <p className="text-lg leading-relaxed text-graphite">
            Still have a question? Call{" "}
            <a
              href="tel:+15403956493"
              className="text-paper underline underline-offset-4"
            >
              (540) 395-6493
            </a>{" "}
            and ask. If software is not the fix for what is slowing your
            business down, I will tell you that on the call and it costs you
            nothing. More on{" "}
            <a
              href="/services"
              className="text-paper underline underline-offset-4"
            >
              what I build
            </a>{" "}
            and{" "}
            <a href="/#process" className="text-paper underline underline-offset-4">
              how a build runs
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  );
}

/** Index page listing every question. */
export function AnswersIndex() {
  return (
    <article className="px-5 pt-32 pb-8 md:px-8 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Answers</p>
        <h1 className="display mt-5 text-big">
          The questions people ask before they hire me.
        </h1>
        <p className="mt-7 text-lg leading-relaxed text-paper">
          Straight answers, the same ones I give on the phone. If yours is not
          here, call and ask.
        </p>

        <div className="mt-12 grid gap-px bg-hairline">
          {ANSWERS.map((a) => (
            <a
              key={a.slug}
              href={`/answers/${a.slug}`}
              className="bg-ink p-6 transition-colors hover:bg-ink-soft"
            >
              <h2 className="font-display text-lg">{a.question}</h2>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                {a.short.length > 150 ? a.short.slice(0, 150) + "..." : a.short}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-12 border-t border-hairline pt-10 pb-8">
          <p className="text-lg leading-relaxed text-graphite">
            See{" "}
            <a href="/services" className="text-paper underline underline-offset-4">
              everything I build
            </a>
            , or{" "}
            <a href="/#quote" className="text-paper underline underline-offset-4">
              get a fixed quote
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
