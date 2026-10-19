import { useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { WORKFLOWS, NODE_COLOR, NODE_ICON } from "../outreach-engine.data.js";

/**
 * /work/lead-gen-automation
 *
 * Case study for Lead Gen Automation, Ron's own n8n lead gen system.
 * The workflow canvases are drawn from src/outreach-engine.data.js, which is
 * generated from the real n8n export files (credentials and IDs stripped).
 */

const STAGES = [
  { n: "01", k: "Find", c: "#f5b84b", t: "Scrape + import", wf: [["Scrape Sources", "daily 5 AM"], ["Import Leads", "on CSV drop"]], li: ["Google Maps, Yelp, Indeed via Apify", "18 trades x 21 towns", "No site, 10+ reviews, 3.8+ stars"], out: "Verification queue" },
  { n: "02", k: "Verify", c: "#a78bfa", t: "Prove no website", wf: [["Verify Leads", "every 5 min"]], li: ["7 Google searches", "Up to 20 domain probes", "Claude scores confidence"], out: "Leads or Call List" },
  { n: "03", k: "Reach out", c: "#e8956b", t: "Personal emails", wf: [["Send Outreach", "weekdays 9 AM"]], li: ["Grades their current site", "Claude writes from real data", "3 touch sequence, same thread"], out: "sent_1, sent_2, done" },
  { n: "04", k: "Catch replies", c: "#5fd1e6", t: "Sort every reply", wf: [["Reply Catcher", "every 10 min"]], li: ["Reply, unsub, OOO or bounce", "Pings my phone on replies", "Auto pause on bounces"], out: "status replied" },
  { n: "05", k: "Close", c: "#34c38f", t: "Pipeline + digest", wf: [["CRM", "every 2 hrs + 8 AM"]], li: ["Replies and good calls become deals", "Next action + due date", "Morning follow up email"], out: "I call and close" },
];

const TABS = ["Verification", "Leads", "Call List", "Pipeline", "Settings"];
// r = reads, w = writes, rw = both. Pulled from the workflow files.
const ACCESS = [
  ["Scrape Sources", ["rw", "rw", "rw", "", ""]],
  ["Import Leads", ["", "rw", "rw", "", ""]],
  ["Verify Leads", ["rw", "rw", "rw", "", ""]],
  ["Send Outreach", ["", "rw", "", "", "rw"]],
  ["Reply Catcher", ["", "rw", "", "", "w"]],
  ["CRM", ["", "r", "r", "rw", ""]],
];

const GATES = [
  ["Scrape Maps, Yelp, Indeed", "18 x 21 matrix", "#f5b84b"],
  ["Is a real trade, not a salon", "regex filter", "#f5b84b"],
  ["10+ reviews, 3.8+ stars", "quality", "#f5b84b"],
  ["No real website listed", "directory check", "#f5b84b"],
  ["Not already in any tab", "dedupe", "#f5b84b"],
  ["Google Business Profile links", "layer 4", "#a78bfa"],
  ["7 Google searches", "Serper API", "#a78bfa"],
  ["Domain guesses probed", "up to 20", "#a78bfa"],
  ["Claude judge", "95+ only", "#a78bfa"],
];

const RAILS = [
  ["Kill switch", "One cell in the Settings tab pauses every send. Outreach checks it before doing anything."],
  ["Bounce auto pause", "Two bounces in one day flips the kill switch on its own and emails me to check the list."],
  ["Email validation", "Format check, blocks role and disposable addresses, then a live MX lookup before sending."],
  ["Human timing", "Random 0 to 45 min start each morning and a random 1 to 3 min gap between emails."],
  ["Copy quality gate", "No links, no dashes, no spam words, under 90 words. Fails get one rewrite, then skip."],
  ["Opt outs honored", "Every email has an opt out line and mailing address. Stop replies end the sequence for good."],
];

const LEGEND = [
  ["trigger", "Trigger"], ["sheets", "Google Sheets"], ["http", "API call"], ["ai", "Claude AI"],
  ["gmail", "Gmail"], ["code", "Code"], ["logic", "Logic / loop"], ["wait", "Wait"],
];

function Dot({ v }) {
  if (!v) return null;
  const base = "inline-block h-3 w-3 rounded-full align-middle";
  if (v === "r") return <i className={`${base} border-2 border-graphite/50`} />;
  if (v === "w") return <i className={`${base} bg-paper`} />;
  return <i className={`${base} bg-paper ring-[3px] ring-paper/20`} />;
}

function Canvas({ wf }) {
  const [fit, setFit] = useState(false);
  const box = useRef(null);
  const drag = useRef(null);
  const B = 58;
  const down = (e) => {
    const s = box.current;
    drag.current = { x: e.clientX, y: e.clientY, l: s.scrollLeft, t: s.scrollTop };
  };
  const move = (e) => {
    if (!drag.current) return;
    const s = box.current, d = drag.current;
    s.scrollLeft = d.l - (e.clientX - d.x);
    s.scrollTop = d.t - (e.clientY - d.y);
  };
  return (
    <div className="oe-grid border border-t-0 border-hairline">
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5 text-xs text-graphite">
        <span>Every node and connection from the real n8n file. Drag to explore.</span>
        <button
          type="button"
          onClick={() => setFit(!fit)}
          className="shrink-0 rounded-full border border-hairline px-3 py-1 text-paper transition-colors hover:border-paper/40"
        >
          {fit ? "Actual size" : "Fit to width"}
        </button>
      </div>
      <div
        ref={box}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => (drag.current = null)}
        className="max-h-[620px] cursor-grab overflow-auto active:cursor-grabbing"
      >
        <svg
          viewBox={`0 0 ${wf.w} ${wf.h}`}
          width={fit ? "100%" : wf.w}
          height={fit ? undefined : wf.h}
          className="oe-cv block"
          role="img"
          aria-label={`n8n canvas for ${wf.name}`}
        >
          {wf.edges.map((d, i) => (
            <g key={i}>
              <path className="e" d={d} />
              <path className="f" d={d} />
            </g>
          ))}
          {wf.nodes.map((n) => {
            const col = NODE_COLOR[n.c];
            return (
              <g key={n.n}>
                <title>{n.n}</title>
                <rect x={n.x} y={n.y} width={B} height={B} rx={n.c === "trigger" ? 22 : 12} fill="#111" stroke={col} strokeOpacity=".55" />
                <g
                  transform={`translate(${n.x + B / 2 - 11},${n.y + B / 2 - 11}) scale(.92)`}
                  fill="none"
                  stroke={col}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dangerouslySetInnerHTML={{ __html: NODE_ICON[n.c] }}
                />
                <text x={n.x + B / 2} y={n.y + B + 16} textAnchor="middle">
                  {n.l.map((l, i) => (
                    <tspan key={i} x={n.x + B / 2} dy={i === 0 ? 0 : 13}>
                      {l}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export function LeadGenAutomation() {
  const [tab, setTab] = useState(WORKFLOWS[0].key);
  const wf = WORKFLOWS.find((w) => w.key === tab);
  const total = WORKFLOWS.reduce((a, w) => a + w.count, 0);

  return (
    <article className="px-5 pt-32 pb-8 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <a href="/work" className="inline-flex items-center gap-2 text-sm text-graphite transition-colors hover:text-paper">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All work
        </a>

        {/* hero */}
        <p className="eyebrow mt-8">Work / Automation / n8n</p>
        <h1 className="display mt-5 max-w-5xl text-big">
          Lead Gen Automation. <span className="text-graphite">Finds, verifies and emails local businesses while I sleep.</span>
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-paper">
          Six n8n workflows and one Google Sheet. It scrapes contractors with no
          website, proves they really have none, writes each one a personal email
          with Claude, sorts the replies and hands me a call list every morning. I
          built it to run my own business. The same kind of system can run yours.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-px border border-hairline bg-hairline md:grid-cols-5">
          {[
            ["6", "connected workflows"],
            [String(total), "n8n nodes"],
            ["9", "gates before anyone gets emailed"],
            ["95%", "AI confidence bar to approve a lead"],
            ["24/7", "runs on its own"],
          ].map(([b, s], i) => (
            <div key={s} className={`bg-ink p-5 ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
              <div className="font-display text-3xl font-semibold tracking-tight">{b}</div>
              <div className="mt-1 text-sm text-graphite">{s}</div>
            </div>
          ))}
        </div>

        {/* film */}
        <section className="mt-16">
          <p className="eyebrow">The film / 57 seconds, no sound needed</p>
          <video
            controls
            playsInline
            preload="none"
            poster="/work/lead-gen-automation-film.jpg"
            className="mt-5 block aspect-video w-full rounded-xl border border-hairline bg-black"
          >
            <source src="/work/lead-gen-automation.mp4" type="video/mp4" />
          </video>
          <p className="mt-3 text-sm text-graphite">
            One fictional lead travels through all six workflows. Every node, rule and column shown comes from the real workflow files.
          </p>
        </section>

        {/* overview */}
        <section className="mt-24">
          <p className="eyebrow">How it works</p>
          <h2 className="display mt-4 text-mid">Five stages, one source of truth.</h2>
          <p className="mt-4 max-w-2xl text-graphite">
            Every workflow reads and writes the same Google Sheet, so each one picks
            up exactly where the last one left off.
          </p>
          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {STAGES.map((s, i) => (
              <div key={s.n} className="relative flex flex-col gap-3 border border-hairline bg-ink-soft p-5" style={{ boxShadow: `inset 0 3px 0 ${s.c}` }}>
                <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase" style={{ color: s.c }}>
                  {s.n} {s.k}
                </span>
                <h3 className="font-display text-lg text-paper">{s.t}</h3>
                <p className="text-xs leading-relaxed text-graphite">
                  {s.wf.map(([a, b]) => (
                    <span key={a} className="block">
                      <span className="text-paper">{a}</span> {b}
                    </span>
                  ))}
                </p>
                <ul className="space-y-1.5">
                  {s.li.map((l) => (
                    <li key={l} className="relative pl-3.5 text-[0.82rem] leading-snug text-graphite">
                      <span className="absolute top-[0.45rem] left-0 h-1.5 w-1.5 rounded-[2px]" style={{ background: s.c }} />
                      {l}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-dashed border-hairline pt-3 font-mono text-[0.7rem]" style={{ color: s.c }}>
                  &rarr; {s.out}
                </p>
                {i < STAGES.length - 1 && <span className="oe-conn" aria-hidden="true" />}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 border border-hairline bg-ink-soft p-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-hairline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34c38f" strokeWidth="2" aria-hidden="true">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M4 9h16M4 15h16M10 3v18" />
              </svg>
            </div>
            <div>
              <p className="font-display text-paper">RLD Leads sheet</p>
              <p className="text-sm text-graphite">The shared brain. Every workflow syncs through it.</p>
            </div>
            <div className="flex flex-wrap gap-1.5 md:ml-auto">
              {TABS.map((t) => (
                <span key={t} className="rounded-md border border-hairline px-2.5 py-1 font-mono text-[0.7rem] text-graphite">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* access + gates */}
        <section className="mt-24">
          <p className="eyebrow">Under the hood</p>
          <h2 className="display mt-4 text-mid">Who touches what.</h2>
          <div className="mt-10 grid gap-px border border-hairline bg-hairline lg:grid-cols-2">
            <div className="min-w-0 bg-ink p-6">
              <h3 className="font-display text-lg text-paper">Sheet access by workflow</h3>
              <p className="mt-1 text-sm text-graphite">Pulled straight from the workflow files.</p>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[460px] text-sm">
                  <thead>
                    <tr>
                      <th />
                      {TABS.map((t) => (
                        <th key={t} className="px-1 pb-2 text-center font-mono text-[0.65rem] font-normal text-graphite">
                          {t}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ACCESS.map(([n, row]) => (
                      <tr key={n} className="border-t border-hairline">
                        <td className="py-2.5 pr-2 text-paper">{n}</td>
                        {row.map((v, i) => (
                          <td key={i} className="text-center">
                            <Dot v={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-5 text-xs text-graphite">
                <span className="flex items-center gap-2"><Dot v="r" /> Reads</span>
                <span className="flex items-center gap-2"><Dot v="w" /> Writes</span>
                <span className="flex items-center gap-2"><Dot v="rw" /> Both</span>
              </div>
            </div>
            <div className="bg-ink p-6">
              <h3 className="font-display text-lg text-paper">Nine gates before an email goes out</h3>
              <p className="mt-1 text-sm text-graphite">Each gate removes leads. Only businesses that pass all nine get contacted.</p>
              <div className="mt-5 flex flex-col items-center gap-1.5">
                {GATES.map(([t, m, c], i) => (
                  <div
                    key={t}
                    className="flex h-8 items-center justify-between rounded-md border border-hairline px-3 text-[0.8rem]"
                    style={{ width: `${100 - i * 6}%`, background: `${c}1f` }}
                  >
                    <span>{t}</span>
                    <span className="font-mono text-[0.68rem]" style={{ color: c }}>{m}</span>
                  </div>
                ))}
                <div className="flex h-8 items-center justify-between rounded-md border border-paper/30 bg-paper/10 px-3 text-[0.8rem] font-medium" style={{ width: "46%" }}>
                  <span>Approved lead</span>
                  <span className="font-mono text-[0.68rem]">&rarr; outreach</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* outreach */}
        <section className="mt-24">
          <p className="eyebrow">Outreach</p>
          <h2 className="display mt-4 text-mid">AI copy that reads like a local guy typed it.</h2>
          <p className="mt-4 max-w-2xl text-graphite">
            Claude writes every email from the lead's real data. A code check then
            rejects anything with dashes, links, spam words or too many words, and
            gets one rewrite before the lead is skipped.
          </p>
          <div className="mt-10 grid gap-px border border-hairline bg-hairline lg:grid-cols-2">
            <div className="bg-ink p-6">
              <h3 className="font-display text-lg text-paper">Email 1, no website case</h3>
              <div className="mt-5 overflow-hidden rounded-lg bg-paper-deep text-[0.9rem] text-ink">
                <div className="space-y-0.5 bg-[#e8e8ea] px-4 py-2.5 text-xs text-neutral-600">
                  <p><b className="text-ink">To:</b> Example Roofing</p>
                  <p><b className="text-ink">Subject:</b> question about example roofing</p>
                </div>
                <div className="space-y-3 px-4 py-4 leading-relaxed">
                  <p>Hi Example Roofing team,</p>
                  <p>Saw you have a 4.8 rating from 63 reviews on Google but your listing only links to a Facebook page.</p>
                  <p>People searching for a roofer in Stafford tap the places with a real website first.</p>
                  <p>I can put together a free mockup of what a site for Example Roofing could look like, no cost and no strings.</p>
                  <p>Want me to send it over?</p>
                  <p className="pt-1 text-xs text-neutral-500">Ron<br />Ron Lenser Digital</p>
                </div>
              </div>
              <p className="mt-3 font-mono text-[0.68rem] text-graphite">Illustration with a made up business, written to the live prompt's rules</p>
            </div>
            <div className="bg-ink p-6">
              <h3 className="font-display text-lg text-paper">The sequence</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[["Day 0", "Specific observation + free mockup offer"], ["Day 3", "New angle, replies in the same thread"], ["Day 7", "Short last note, then it stops"]].map(([d, t]) => (
                  <div key={d} className="relative border-t-2 border-[#e8956b] pt-3">
                    <span className="absolute -top-[6px] left-0 h-2.5 w-2.5 rounded-full bg-[#e8956b]" />
                    <p className="font-display text-paper">{d}</p>
                    <p className="text-sm text-graphite">{t}</p>
                  </div>
                ))}
              </div>
              <h3 className="mt-10 font-display text-lg text-paper">Daily send ramp</h3>
              <p className="mt-1 text-sm text-graphite">Volume grows by week so the inbox builds trust. Hard ceiling of 25 a day.</p>
              <div className="mt-6 flex h-32 items-end gap-3">
                {[[5, "Week 1"], [10, "Week 2"], [15, "Week 3"], [20, "Week 4+"]].map(([v, l]) => (
                  <div key={l} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5 text-xs text-graphite">
                    <span className="text-sm text-paper">{v}</span>
                    <span className="block w-full rounded-t-md bg-gradient-to-b from-[#e8956b] to-[#7a4a34]" style={{ height: `${v * 4.4}%` }} />
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* guardrails */}
        <section className="mt-24">
          <p className="eyebrow">Guardrails</p>
          <h2 className="display mt-4 text-mid">Built to protect the inbox and the brand.</h2>
          <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {RAILS.map(([t, d]) => (
              <div key={t} className="bg-ink p-6">
                <h3 className="font-display text-paper">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* workflows */}
        <section className="mt-24">
          <p className="eyebrow">Node for node</p>
          <h2 className="display mt-4 text-mid">Every workflow, rebuilt from the source.</h2>
          <p className="mt-4 max-w-2xl text-graphite">
            Drawn from the actual n8n export files. Credentials, sheet IDs and email
            addresses are stripped.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-graphite">
            {LEGEND.map(([c, l]) => (
              <span key={c} className="flex items-center gap-1.5">
                <i className="inline-block h-3 w-3 rounded-[4px] border-2" style={{ borderColor: NODE_COLOR[c] }} />
                {l}
              </span>
            ))}
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist">
            {WORKFLOWS.map((w, i) => (
              <button
                key={w.key}
                type="button"
                role="tab"
                aria-selected={tab === w.key}
                onClick={() => setTab(w.key)}
                className={`shrink-0 rounded-full border px-4 py-2 text-left text-sm transition-colors ${
                  tab === w.key ? "border-paper bg-paper text-ink" : "border-hairline text-graphite hover:border-paper/40 hover:text-paper"
                }`}
              >
                <span className="mr-2 font-mono text-[0.65rem] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                {w.name}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-8 border border-hairline bg-ink-soft p-6 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h3 className="font-display text-2xl text-paper">{wf.name}</h3>
              <p className="mt-1 font-mono text-xs text-graphite">
                {wf.when} &middot; {wf.count} nodes
              </p>
              <p className="mt-4 text-graphite">{wf.summary}</p>
            </div>
            <ul className="space-y-2">
              {wf.bullets.map((b) => (
                <li key={b} className="relative pl-5 text-sm text-paper/85">
                  <span className="absolute top-[0.6rem] left-0 h-[2px] w-2.5 bg-paper/60" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <Canvas key={wf.key} wf={wf} />
        </section>

        {/* split */}
        <section className="mt-24">
          <p className="eyebrow">Division of labor</p>
          <h2 className="display mt-4 text-mid">It does the grind. I do the talking.</h2>
          <div className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
            {[
              ["The engine", ["Scans up to 1,500 Maps listings a day for prospects", "Checks each one has no website, nine ways", "Writes and sends personal emails and follow ups", "Reads replies, handles unsubscribes and bounces", "Builds the pipeline and my morning to do list"]],
              ["Me", ["Answer replies and send the free mockup", "Call the phone only leads on the Call List", "Run the meeting and close the deal", "Tune prompts, filters and targets as results come in"]],
            ].map(([h, items]) => (
              <div key={h} className="bg-ink p-6">
                <h3 className="font-display text-lg text-paper">{h}</h3>
                <ul className="mt-4 space-y-2.5">
                  {items.map((t) => (
                    <li key={t} className="relative pl-5 text-[0.95rem] text-paper/85">
                      <span className="absolute top-[0.55rem] left-0 h-1.5 w-1.5 rounded-[2px] bg-paper/70" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["n8n", "Claude Haiku 4.5", "Google Sheets", "Gmail API", "Google Drive", "Apify", "Serper search API", "PageSpeed Insights API", "Google DNS", "JavaScript"].map((s) => (
              <span key={s} className="rounded-full border border-hairline px-3.5 py-1.5 text-xs text-graphite">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* cta */}
        <section className="mt-24 flex flex-wrap items-center justify-between gap-6 border border-hairline bg-ink-soft p-8">
          <div>
            <h2 className="display text-mid">Want a system like this?</h2>
            <p className="mt-2 text-graphite">Lead gen, follow ups, scheduling, intake. If you do it by hand every day, it can run itself.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/#quote"
              className="inline-flex items-center gap-4 rounded-full bg-paper py-3 pr-3 pl-8 text-ink transition-colors hover:bg-paper-deep"
            >
              <span className="font-medium">Get a fixed quote</span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/15">&rarr;</span>
            </a>
            <a
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-7 py-3.5 text-sm transition-colors hover:border-paper/40"
            >
              More work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
