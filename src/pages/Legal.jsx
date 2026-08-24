/* Shared shell for the privacy and terms pages. */
export function Legal({ title, updated, children }) {
  return (
    <article className="px-5 pt-32 pb-24 md:px-8 md:pt-40">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Ron Lenser Digital</p>
        <h1 className="display mt-4 text-mid">{title}</h1>
        <p className="mt-3 text-sm text-graphite">Last updated {updated}</p>
        <div className="legal mt-10 space-y-8 text-[0.95rem] leading-relaxed text-graphite">
          {children}
        </div>
        <p className="mt-14 text-sm text-graphite">
          Questions:{" "}
          <a href="mailto:ron@ronlenserdigital.com" className="text-paper underline underline-offset-4">
            ron@ronlenserdigital.com
          </a>{" "}
          or{" "}
          <a href="tel:+15403956493" className="text-paper underline underline-offset-4">
            (540) 395-6493
          </a>
          .
        </p>
      </div>
    </article>
  );
}

export function H({ children }) {
  return <h2 className="font-display text-xl text-paper">{children}</h2>;
}
