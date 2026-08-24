import { Legal, H } from "./Legal.jsx";

export function Privacy() {
  return (
    <Legal title="Privacy policy" updated="August 24, 2026">
      <section>
        <H>The short version</H>
        <p>
          This site collects the details you type into the quote form and a
          cookieless count of visits. That is it. Nothing is sold, nothing is
          shared with advertisers, and there is no tracking pixel following you
          around the internet afterwards.
        </p>
      </section>

      <section>
        <H>What I collect</H>
        <p>
          <strong className="text-paper">Quote form.</strong> Name, phone, email,
          business name, what you need, and anything you write in the notes.
          It is sent to my inbox through Web3Forms, a form relay service. I use
          it to reply to you and for nothing else.
        </p>
        <p>
          <strong className="text-paper">Analytics.</strong> Vercel Web
          Analytics and Speed Insights. They record page views, the page you
          came from, rough location by country and region, device type, and
          load speed. They do not set cookies and do not identify you as a
          person. I use this to see which parts of the site people read and
          whether it loads fast.
        </p>
        <p>
          <strong className="text-paper">Calls and emails.</strong> If you call
          or email me, I keep the conversation so I can follow up. Normal
          business record keeping.
        </p>
      </section>

      <section>
        <H>Cookies</H>
        <p>
          One item in your browser's local storage remembers that you dismissed
          the notice at the bottom of the page. No advertising cookies, no
          third party tracking cookies.
        </p>
      </section>

      <section>
        <H>Who else sees it</H>
        <p>
          Vercel hosts the site and runs the analytics. Web3Forms relays the
          form. Google Workspace holds my email. Each of them has their own
          privacy policy and each of them is a normal business tool, not a data
          broker. I do not sell or rent your information to anyone.
        </p>
      </section>

      <section>
        <H>Your choices</H>
        <p>
          Want your details deleted? Email me and I will remove them from my
          inbox and anything I built from it. You can also just call instead of
          using the form. Analytics can be blocked with any content blocker and
          the site works fine without it.
        </p>
      </section>

      <section>
        <H>Client projects</H>
        <p>
          When I build something for you, the data inside it (your customers,
          your bookings, your invoices) is yours. It lives in accounts in your
          name. I access it only to build, fix, and support what you hired me
          for, and never for my own use.
        </p>
      </section>

      <section>
        <H>Changes</H>
        <p>
          If this changes in a way that matters, the date at the top moves and
          the change is written here in plain English.
        </p>
      </section>
    </Legal>
  );
}
