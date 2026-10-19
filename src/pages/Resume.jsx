import { ArrowUpRight, Download, Mail } from "lucide-react";
import { WORK } from "../work.js";
import { ProjectGrid } from "./Work.jsx";

/**
 * /resume
 *
 * Ron's resume as a page, plus every project he has shipped. The PDF in
 * public/Ron_Lenser_Resume.pdf is the same content. Update both together.
 */

const CONTACT = [
  ["Fredericksburg, VA", null],
  ["(540) 395-6493", "tel:+15403956493"],
  ["ron@ronlenserdigital.com", "mailto:ron@ronlenserdigital.com"],
  ["linkedin.com/in/ronlenser", "https://linkedin.com/in/ronlenser"],
  ["github.com/RonaldLenser", "https://github.com/RonaldLenser"],
];

const SKILLS = [
  ["AI and automation", "RAG, prompt engineering, MCP, Claude and OpenAI APIs, GoHighLevel, CRM workflows"],
  ["Development", "Python, TypeScript/JavaScript, PHP, HTML/CSS, FastAPI, REST APIs, SQL, PostgreSQL/pgvector"],
  ["Controls and testing", "Access controls, citation verification, rate limits, LLM budget controls, pytest, GitHub Actions"],
  ["Tools and deployment", "Claude Code, Cursor, ChatGPT, Git/GitHub, Docker, Google Cloud Run, Vercel, Supabase"],
];

const EXPERIENCE = [
  {
    org: "Helix Research Technologies",
    role: "Cofounder",
    when: "Sep 2026 to Present",
    points: [
      "Lead technical development for an AI automation agency with three founders, building an operations bot, lead research pipeline and CRM workflows.",
      "Designed an operations bot connecting Discord, GoHighLevel and GitHub through a serverless backend. Routed code changes through branches and pull requests and automated deployment.",
      "Built a lead research workflow covering four stages, including contact verification, scoring and CRM import. Its first run delivered 45 leads with verified phone numbers.",
    ],
  },
  {
    org: "Ron Lenser Digital",
    role: "Founder and Developer",
    when: "Jun 2025 to Present",
    points: [
      "Delivered websites, online stores, web applications and a WordPress learning platform for 15+ clients. Own requirements, proposals, development, deployment and client handoff.",
      "Built a custom PHP certificate engine and course progression controls for Templar College, including access exceptions based on user roles.",
      "Restored access to a course by identifying a conflict between duplicate functions and validating the fix as the affected user. Manage client deployments, DNS and SSL configuration.",
    ],
  },
];

const CERTS = [
  ["Google Cloud Certified: Generative AI Leader", "Google Cloud", "Oct 2026"],
  ["Google AI Professional Certificate", "Google", "Oct 2026"],
  ["Generative AI Automation Specialization", "Vanderbilt University", "Oct 2026"],
  ["Microsoft 365 with Generative AI", "Microsoft", null],
];

function Section({ label, title, children }) {
  return (
    <section className="mt-20 border-t border-hairline pt-10">
      <p className="eyebrow">{label}</p>
      {title && <h2 className="display mt-4 text-mid">{title}</h2>}
      {children}
    </section>
  );
}

function Ext({ href, children }) {
  return (
    <a
      href={href}
      {...(href.startsWith("/") ? {} : { target: "_blank", rel: "noopener" })}
      className="inline-flex items-center gap-1 text-sm text-paper underline-offset-4 hover:underline"
    >
      {children} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

function Bullets({ items }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((t) => (
        <li key={t} className="relative pl-5 leading-relaxed text-graphite">
          <span aria-hidden="true" className="absolute top-[0.7rem] left-0 h-1.5 w-1.5 rounded-full bg-paper/60" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Resume() {
  return (
    <article className="px-5 pt-32 pb-8 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <p className="eyebrow">Resume</p>
        <h1 className="display mt-5 text-big">Ron Lenser</h1>
        <p className="mt-3 font-display text-xl text-paper md:text-2xl">AI First Engineer | Workflow Automation</p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-graphite">
          {CONTACT.map(([t, href]) => (
            <li key={t}>
              {href ? (
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                  className="underline-offset-4 hover:text-paper hover:underline"
                >
                  {t}
                </a>
              ) : (
                t
              )}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="/Ron_Lenser_Resume.pdf"
            download
            className="inline-flex items-center gap-3 rounded-full bg-paper py-3 pr-3 pl-7 text-ink transition-colors hover:bg-paper-deep"
          >
            <span className="font-medium">Download PDF</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/15">
              <Download className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
          <a
            href="mailto:ron@ronlenserdigital.com"
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-7 py-3.5 text-sm transition-colors hover:border-paper/40"
          >
            <Mail className="h-4 w-4" aria-hidden="true" /> Email me
          </a>
        </div>

        <p className="mt-12 max-w-4xl text-lg leading-relaxed text-paper">
          Builds AI applications and automates business workflows, with software delivered for 15+
          clients. Uses AI coding tools to develop integrations, test changes and deploy working
          systems. Project work includes access controls, encrypted messaging and checks on answers
          generated by AI. Seeking AI engineering and automation roles focused on security and
          compliance workflows.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-px border border-hairline bg-hairline md:grid-cols-4">
          {[
            ["15+", "clients delivered"],
            [String(WORK.length), "projects in the portfolio"],
            ["250+", "automated tests on Grounded"],
            ["3", "AI certifications in Oct 2026"],
          ].map(([b, s]) => (
            <div key={s} className="bg-ink p-5">
              <div className="font-display text-3xl font-semibold tracking-tight">{b}</div>
              <div className="mt-1 text-sm text-graphite">{s}</div>
            </div>
          ))}
        </div>

        {/* skills */}
        <Section label="Technical skills">
          <dl className="mt-6 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
            {SKILLS.map(([k, v]) => (
              <div key={k} className="bg-ink p-5">
                <dt className="font-mono text-[0.7rem] tracking-[0.14em] text-paper uppercase">{k}</dt>
                <dd className="mt-2 leading-relaxed text-graphite">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* experience */}
        <Section label="Technical experience">
          <div className="mt-6 space-y-12">
            {EXPERIENCE.map((e) => (
              <div key={e.org}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl text-paper">
                    {e.org} <span className="text-graphite">| {e.role}</span>
                  </h3>
                  <span className="font-mono text-xs tracking-[0.12em] text-graphite uppercase">{e.when}</span>
                </div>
                <Bullets items={e.points} />
              </div>
            ))}
          </div>
        </Section>

        {/* projects */}
        <Section label="Selected projects">
          <div className="mt-6 grid gap-px border border-hairline bg-hairline lg:grid-cols-2">
            <div className="bg-ink p-6">
              <h3 className="font-display text-2xl text-paper">
                Grounded <span className="text-graphite">| RAG Knowledge Assistant</span>
              </h3>
              <Bullets
                items={[
                  "Built and deployed an application that answers questions using uploaded documents with Python, FastAPI and PostgreSQL/pgvector. Combines keyword and vector search, checks citations and declines unsupported questions.",
                  "Added 250+ automated tests, a retrieval evaluation with 33 questions, rate limits and LLM budget controls. Set up GitHub Actions checks and deployed to Google Cloud Run with Docker.",
                ]}
              />
            </div>
            <div className="bg-ink p-6">
              <h3 className="font-display text-2xl text-paper">
                CIPHER_ <span className="text-graphite">| Encrypted Messaging Application</span>
              </h3>
              <Bullets
                items={[
                  "Built web and Windows applications with Next.js, Supabase and Tauri. Added encryption from sender to recipient, groups joined by invitation code, a lock screen and a vault using AES encryption in GCM mode.",
                ]}
              />
              <div className="mt-5 flex flex-wrap gap-5">
                <Ext href="https://cipher-swart-omega.vercel.app/">Live app</Ext>
                <Ext href="https://github.com/RonaldLenser/cipher-encrypted-messenger">Showcase repo</Ext>
              </div>
            </div>
          </div>

          <div className="mt-px grid gap-px border border-t-0 border-hairline bg-hairline lg:grid-cols-[1.4fr_1fr]">
            <div className="bg-ink p-4">
              <video
                controls
                playsInline
                preload="none"
                poster="/work/lead-gen-automation-film.jpg"
                className="block aspect-video w-full rounded-lg bg-black"
              >
                <source src="/work/lead-gen-automation.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="bg-ink p-6">
              <h3 className="font-display text-2xl text-paper">
                Lead Gen Automation <span className="text-graphite">| n8n + Claude</span>
              </h3>
              <Bullets
                items={[
                  "Six n8n workflows and one Google Sheet that find local businesses with no website, verify it nine ways, write personal emails with Claude, sort replies and build a sales pipeline.",
                  "Guardrails include a kill switch, auto pause on bounces, email validation and a quality gate on every AI written email.",
                ]}
              />
              <div className="mt-5 flex flex-wrap gap-5">
                <Ext href="/work/lead-gen-automation">Case study</Ext>
                <Ext href="https://github.com/RonaldLenser/lead-gen-automation">Code</Ext>
              </div>
            </div>
          </div>
        </Section>

        {/* certs + education */}
        <div className="grid gap-x-12 lg:grid-cols-[1.5fr_1fr]">
          <Section label="Certifications and professional learning">
            <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
              {CERTS.map(([n, by, when]) => (
                <li key={n} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                  <span>
                    <span className="text-paper">{n}</span> <span className="text-graphite">| {by}</span>
                  </span>
                  {when && <span className="font-mono text-xs tracking-[0.12em] text-graphite uppercase">{when}</span>}
                </li>
              ))}
            </ul>
          </Section>
          <Section label="Education">
            <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                <span>
                  <span className="text-paper">Stafford Senior High School</span>{" "}
                  <span className="text-graphite">| High School Diploma</span>
                </span>
                <span className="font-mono text-xs tracking-[0.12em] text-graphite uppercase">2024</span>
              </li>
            </ul>
          </Section>
        </div>

        {/* portfolio */}
        <Section label={`Portfolio / ${WORK.length} projects`} title="Everything I have shipped.">
          <p className="mt-4 max-w-3xl text-graphite">
            Websites, web apps and automations, all built with AI. Every card links to the live
            project, its code, or both.
          </p>
          <ProjectGrid />
        </Section>
      </div>
    </article>
  );
}
