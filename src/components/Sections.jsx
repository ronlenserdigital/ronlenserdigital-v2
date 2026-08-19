/* Shared shell. The old version reserved a narrow left column for a numbered
   label; with the numbers gone that column was dead space, so sections are
   now a centred header over full width content. */
export function Section({ id, eyebrow, title, intro, children, className = "" }) {
  return (
    <section
      id={id}
      className={`border-t border-hairline px-5 py-20 md:px-8 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || intro) && (
          <div className="mx-auto mb-14 max-w-3xl text-center">
            {eyebrow && <p className="eyebrow reveal">{eyebrow}</p>}
            {title && (
              <h2 className="display reveal mt-4 text-big">{title}</h2>
            )}
            {intro && (
              <p className="reveal mx-auto mt-5 max-w-[54ch] text-lg text-graphite">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
