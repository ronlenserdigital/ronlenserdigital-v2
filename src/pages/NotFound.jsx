/* Custom 404. Served by Vercel as dist/404.html for any unknown path. */
const LINKS = [
  ["What I do", "/#capabilities"],
  ["Process", "/#process"],
  ["Pricing", "/#pricing"],
  ["FAQ", "/#faq"],
  ["Get a quote", "/#quote"],
];

export function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center px-5 pt-24 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="display mt-6 text-mega">Nope.</h1>
        <p className="mx-auto mt-6 max-w-[40ch] text-lg text-graphite">
          That page does not exist. The whole site is one page, so what you
          want is probably one of these.
        </p>

        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="block rounded-full border border-hairline px-5 py-2.5 text-sm transition-colors hover:border-paper/40"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a
            href="/"
            className="inline-flex items-center gap-4 rounded-full bg-paper py-3 pr-3 pl-8 text-ink transition-colors hover:bg-paper-deep"
          >
            <span className="font-medium">Back to the start</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/15">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
