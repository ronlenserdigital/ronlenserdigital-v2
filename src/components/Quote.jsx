import { useId, useState } from "react";
import { Label } from "./ui/label.jsx";
import { SelectNative } from "./ui/select-native.jsx";
import { Input, Textarea } from "./ui/field.jsx";
import { useMagnetic } from "../lib/motion.js";

/* Put your Web3Forms access key in .env as VITE_WEB3FORMS_KEY */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? "";

/* What Ron Lenser Digital actually sells. Keep this list honest. */
const SERVICES = [
  { value: "", label: "Pick one", disabled: true },
  { value: "website", label: "Website" },
  { value: "app", label: "App, portal or internal tool" },
  { value: "automation", label: "Automation or integration" },
  { value: "ai-answering", label: "AI chat or phone answering" },
  { value: "seo", label: "Local SEO and Google Business Profile" },
  { value: "logo", label: "Logo and brand marks" },
  { value: "rescue", label: "Fix or rebuild something I already have" },
  { value: "unsure", label: "Not sure yet, I want advice" },
];

const TIMELINES = [
  { value: "", label: "Pick one", disabled: true },
  { value: "asap", label: "As soon as you can start" },
  { value: "month", label: "Within a month" },
  { value: "quarter", label: "Next couple of months" },
  { value: "looking", label: "Getting a number before I commit" },
];

/* Field level checks. Runs on submit, and again per field once that field
   has already shown an error, so the message clears as soon as it is fixed. */
function validate(data) {
  const errors = {};
  if (!data.name?.trim()) errors.name = "I need a name to reply to.";
  const digits = (data.phone || "").replace(/\D/g, "");
  if (digits.length < 10) errors.phone = "That does not look like a full phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || ""))
    errors.email = "That email will bounce. Check it.";
  if (!data.service) errors.service = "Pick the closest one.";
  if (!data.timeline) errors.timeline = "Rough is fine.";
  return errors;
}

export function Quote() {
  const uid = useId();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  function onChange(e) {
    if (!errors[e.target.name]) return;
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setErrors(validate(data));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.company) return setStatus("sent"); // honeypot tripped, silently drop

    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = e.currentTarget.querySelector("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New quote request — ${data.business || data.name}`,
          from_name: "ronlenserdigital.com",
          ...data,
        }),
      });
      const json = await res.json();
      setStatus(json.success ? "sent" : "error");
      if (json.success) e.target.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="quote"
      className="border-t border-hairline px-5 py-20 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="eyebrow reveal">Start a project</p>
          <h2 className="display reveal mt-4 text-big">
            Tell me what you need.
          </h2>
          <p className="reveal mx-auto mt-5 max-w-[52ch] text-graphite">
            This is how you get a number. Two minutes to fill out, I reply the
            same day, usually within an hour. If you would rather talk, call{" "}
            <a href="tel:+15403956493" className="text-paper underline underline-offset-4">
              (540) 395-6493
            </a>
            .
          </p>
        </div>

        <form onSubmit={onSubmit} onChange={onChange} noValidate className="reveal space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${uid}-name`}>Your name</Label>
              <Input
                id={`${uid}-name`}
                name="name"
                required
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${uid}-name-err` : undefined}
              />
              <Err id={`${uid}-name-err`} msg={errors.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${uid}-phone`}>Phone</Label>
              <Input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                placeholder="(540) 000-0000"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
              />
              <Err id={`${uid}-phone-err`} msg={errors.phone} />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${uid}-business`}>Business name</Label>
              <Input id={`${uid}-business`} name="business" autoComplete="organization" />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${uid}-email`}>Email</Label>
              <Input
                id={`${uid}-email`}
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${uid}-email-err` : undefined}
              />
              <Err id={`${uid}-email-err`} msg={errors.email} />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${uid}-service`}>What you need</Label>
              <SelectNative
                id={`${uid}-service`}
                name="service"
                defaultValue=""
                required
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? `${uid}-service-err` : undefined}
              >
                {SERVICES.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.disabled}>
                    {o.label}
                  </option>
                ))}
              </SelectNative>
              <Err id={`${uid}-service-err`} msg={errors.service} />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${uid}-timeline`}>How soon</Label>
              <SelectNative
                id={`${uid}-timeline`}
                name="timeline"
                defaultValue=""
                required
                aria-invalid={!!errors.timeline}
                aria-describedby={errors.timeline ? `${uid}-timeline-err` : undefined}
              >
                {TIMELINES.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.disabled}>
                    {o.label}
                  </option>
                ))}
              </SelectNative>
              <Err id={`${uid}-timeline-err`} msg={errors.timeline} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${uid}-details`}>Anything else</Label>
            <Textarea
              id={`${uid}-details`}
              name="details"
              placeholder="What does the business do, and what is the thing that is slowing it down?"
            />
          </div>

          {/* honeypot, hidden from people and screen readers */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="flex flex-wrap items-center gap-5 pt-2">
            <SubmitButton status={status} />

            <p role="status" aria-live="polite" className="text-sm">
              {Object.keys(errors).length > 0 && status !== "sent" && (
                <span className="text-graphite">Fix the marked fields and send again.</span>
              )}
              {status === "sent" && (
                <span className="text-accent">Got it. I will get back to you today.</span>
              )}
              {status === "error" && (
                <span className="text-graphite">
                  That did not send. Call or text (540) 395-6493 instead.
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Err({ id, msg }) {
  if (!msg) return null;
  return (
    <p id={id} className="text-xs text-[#ff6b6b]">
      {msg}
    </p>
  );
}

function SubmitButton({ status }) {
  const ref = useMagnetic(0.24);
  const sending = status === "sending";

  return (
    <button
      ref={ref}
      type="submit"
      disabled={sending}
      aria-busy={sending}
      className="inline-flex items-center gap-4 rounded-full bg-paper py-3 pr-3 pl-8 text-ink transition-colors hover:bg-paper-deep disabled:opacity-60"
    >
      <span className="font-medium">{sending ? "Sending" : "Send it"}</span>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/15">
        {sending ? <span className="spinner" aria-hidden="true" /> : <>&rarr;</>}
      </span>
    </button>
  );
}
