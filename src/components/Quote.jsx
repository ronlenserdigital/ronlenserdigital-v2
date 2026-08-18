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
  { value: "website", label: "Custom website — $1,000 one time" },
  { value: "logo", label: "Logo and brand marks — $150" },
  { value: "seo", label: "Local SEO and Google Business Profile" },
  { value: "chatbot", label: "AI chatbot — $49 per month" },
  { value: "receptionist", label: "AI receptionist — $99 per month" },
  { value: "ads", label: "Social and paid ads" },
  { value: "rescue", label: "Fix or rebuild the site I already have" },
  { value: "unsure", label: "Not sure yet, I want advice" },
];

const TIMELINES = [
  { value: "", label: "Pick one", disabled: true },
  { value: "asap", label: "As soon as you can start" },
  { value: "month", label: "Within a month" },
  { value: "quarter", label: "Next couple of months" },
  { value: "looking", label: "Just getting prices" },
];

export function Quote() {
  const uid = useId();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.company) return setStatus("sent"); // honeypot tripped, silently drop

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
      className="border-t border-hairline px-6 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <p className="eyebrow reveal">Start a project</p>
          <h2 className="display reveal mt-6 max-w-[14ch] text-big">
            Tell me what you need.
          </h2>
          <p className="reveal mt-6 max-w-sm text-graphite">
            Two minutes to fill out. I reply the same day, usually within an
            hour. If you would rather talk, call{" "}
            <a href="tel:+15403956493" className="text-ink underline underline-offset-4">
              (540) 395-6493
            </a>
            .
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="reveal space-y-6 md:col-span-7 md:col-start-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${uid}-name`}>Your name</Label>
              <Input id={`${uid}-name`} name="name" required autoComplete="name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${uid}-phone`}>Phone</Label>
              <Input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="(540) 000-0000"
              />
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
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${uid}-service`}>What you need</Label>
              <SelectNative id={`${uid}-service`} name="service" defaultValue="" required>
                {SERVICES.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.disabled}>
                    {o.label}
                  </option>
                ))}
              </SelectNative>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${uid}-timeline`}>How soon</Label>
              <SelectNative id={`${uid}-timeline`} name="timeline" defaultValue="" required>
                {TIMELINES.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.disabled}>
                    {o.label}
                  </option>
                ))}
              </SelectNative>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${uid}-details`}>Anything else</Label>
            <Textarea
              id={`${uid}-details`}
              name="details"
              placeholder="What does the business do, and what is wrong with the site you have now?"
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

            <p aria-live="polite" className="text-sm">
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

function SubmitButton({ status }) {
  const ref = useMagnetic(0.24);
  const sending = status === "sending";

  return (
    <button
      ref={ref}
      type="submit"
      disabled={sending}
      data-cursor="SEND"
      className="inline-flex items-center gap-4 rounded-full bg-ink py-3 pr-3 pl-8 text-paper transition-colors hover:bg-accent disabled:opacity-60"
    >
      <span className="font-medium">{sending ? "Sending" : "Send it"}</span>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-paper/15">
        &rarr;
      </span>
    </button>
  );
}
