/**
 * Question pages.
 *
 * The QUESTION role from the topical map: each one catches a sub-question
 * from the fan-out for "web designer Fredericksburg VA". These four started
 * as FAQ accordion entries on the home page, where they could not rank for
 * anything. The short answer here is the same answer, unchanged, so the FAQ
 * schema and the page never contradict each other. The body is the longer
 * version Ron gives on the phone.
 *
 * Rule for this file: nothing goes in the body that Ron has not actually
 * said. No invented timelines, no invented prices, no invented case studies.
 */

export const ANSWERS = [
  {
    slug: "how-long-does-a-website-take",
    question: "How long does a website take to build?",
    title:
      "How Long Does a Website Take to Build? | Fredericksburg VA | Ron Lenser Digital",
    description:
      "A straightforward site is about a week from the day you say go. Here is what happens in that week, what makes a build take longer, and why you get the date in writing first.",
    short:
      "A straightforward site is usually about a week from the day you say go. Apps and custom tools run longer depending on what they have to do. You get a date in writing before I start and I hold to it.",
    body: [
      {
        h: "The week, day by day",
        p: [
          "Day one is a call and a quote. Fifteen minutes on the phone, then one number and one date in writing, usually the same day. Nothing starts before you have both.",
          "Days two through six are the build. You get a live preview link from the first day of work, so you are watching it fill in rather than waiting for a reveal at the end. That is deliberate. Changing your mind on day two is free, and changing it after launch is not.",
          "The last day is hand off. Deployed, connected, and everything put in your name.",
        ],
      },
      {
        h: "What makes it take longer",
        p: [
          "Anything that has to remember things. A customer portal, a login, a booking system that holds appointments, an internal tool that tracks jobs. Those need a database behind them and they run longer than a site that just has to say who you are and get you called.",
          "Automations and AI answering depend on what they have to connect to. Two tools talking to each other is quick. Six tools with one of them being something nobody has built against before is not.",
          "The other one nobody likes hearing: waiting on you. If I need photos, copy or a logo and they take a week to arrive, the build takes a week longer. I will tell you upfront exactly what I need from you and when.",
        ],
      },
      {
        h: "Why a shop of ten quotes months",
        p: [
          "Most of those months are not spent building. They are discovery calls, a deck, a designer mocking it up, a round of notes, another round, then the build getting handed to whoever is free that sprint, then every change going through a project manager.",
          "I build with AI, which collapses the part that was always slow: the typing. The judgement is still mine and the testing is still mine. That is the whole reason one person can quote days for work that used to need a room.",
        ],
      },
      {
        h: "The date is in writing",
        p: [
          "You get a fixed date before anything starts, and it does not move because something took me longer than I thought. If I underestimate the job, that is my problem, not your invoice.",
        ],
      },
    ],
    related: ["who-owns-my-website", "what-a-build-includes"],
  },

  {
    slug: "who-owns-my-website",
    question: "Who owns the website when it is finished?",
    title:
      "Who Owns Your Website? Code, Domain and Hosting Explained | Ron Lenser Digital",
    description:
      "You do. The code, the repo, the domain and the hosting all go in your name. Here is why that matters and what to check before you hire anyone.",
    short:
      "You do. The code, the repo, the domain, the hosting account, all of it in your name. If you fire me tomorrow you keep everything and any other developer can pick it up.",
    body: [
      {
        h: "What you own",
        p: [
          "The code and the repository it lives in. The domain name. The hosting account. Any accounts created for the project. All of it in your name, on your card, under your login.",
          "You buy the domain and hosting yourself rather than through me. It is a few dollars a month and it means nobody, including me, can hold your website hostage. If you do not have a domain yet I will tell you exactly what to buy.",
        ],
      },
      {
        h: "Why this is worth asking about",
        p: [
          "A common arrangement in this industry is that the agency owns the domain, the hosting and sometimes the code. It works fine right up until you want to leave, and then leaving means starting over.",
          "The version of this I see most often around Fredericksburg is a site built years ago by someone who is now unreachable, on a hosting account nobody has the login for. The business does not own its own website and does not find out until it needs changing.",
        ],
      },
      {
        h: "What to ask anyone you are considering",
        p: [
          "Whose name is the domain registered in. Whose name is the hosting account in. Do I get the source code. Can another developer take this over without a rebuild.",
          "If any answer is vague, that is the answer. Ask me the same four and you will get the same reply every time: yours, yours, yes, yes.",
        ],
      },
      {
        h: "If you fire me",
        p: [
          "You keep everything and any other developer can pick it up. I would rather earn the next project than trap you into it.",
        ],
      },
    ],
    related: ["what-a-build-includes", "how-long-does-a-website-take"],
  },

  {
    slug: "is-ai-built-software-worse",
    question: "Is software built with AI worse?",
    title:
      "Is Software Built With AI Worse? An Honest Answer | Ron Lenser Digital",
    description:
      "Not if the person driving knows what good looks like. What AI actually changes, what it does not, and the questions to ask anyone who builds this way.",
    short:
      "Not if the person driving knows what good looks like. I test everything, I deploy it, and I am the one on the phone when it breaks. Ask any agency what their junior developer wrote last week and you will get a much vaguer answer.",
    body: [
      {
        h: "What AI actually changes",
        p: [
          "Typing. The slow, expensive, repetitive part of building software got fast. A screen that took two days takes an afternoon. A change that took a week takes an hour.",
          "That is a real change and it is the reason one person can quote days instead of months. It is not a trick and I am not hiding it.",
        ],
      },
      {
        h: "What it does not change",
        p: [
          "Judgement. AI will happily build the wrong thing beautifully. Knowing what your business actually needs, knowing what to leave out, and knowing when the answer is not software at all, is still the entire job.",
          "That is why the call comes first. If software is not the fix for what is slowing you down, I will say so on that call and it costs you nothing.",
        ],
      },
      {
        h: "The comparison nobody makes",
        p: [
          "The real question is not AI versus a human. It is who is accountable for the result.",
          "At a shop of ten, the person who took your call is usually not the person building it, and the person building it may be the most junior developer available that sprint. Nobody frames that as a quality risk, but it is the same risk people worry about with AI: work you did not see, from someone you did not talk to.",
          "With me there is one person to ask. I test it, I deploy it, and I am the one who picks up the phone when something breaks.",
        ],
      },
      {
        h: "Fair questions to ask me",
        p: [
          "Did you test this. What happens when it breaks. Can another developer read this code. Who do I call.",
          "Those are the right questions for any developer, AI or not. I would rather you ask them than assume.",
        ],
      },
    ],
    related: ["why-not-an-agency", "what-a-build-includes"],
  },

  {
    slug: "what-a-build-includes",
    question: "What does a build actually include?",
    title:
      "What Does a Custom Website Build Include? | Ron Lenser Digital",
    description:
      "The thing itself: pages, copy, forms, mobile, the code, and getting it live. One fixed number agreed before work starts, no monthly fee afterwards.",
    short:
      "The thing itself. Pages, copy, forms, mobile, the code, and getting it live. One fixed number agreed before I start, and no monthly fee to me afterwards.",
    body: [
      {
        h: "What is in it",
        p: [
          "The pages, written and built. The copy, unless you want to write it yourself. Forms that actually deliver to you. Mobile, which is where most of your visitors are. The code. And getting the whole thing live and connected.",
          "Small tweaks are usually free for the first month after launch. After that you can pay per change or keep me on for ongoing work, and you are never stuck waiting on me either way, because you own the code.",
        ],
      },
      {
        h: "What is not in it",
        p: [
          "Your domain and hosting, which you buy and own yourself, in your name. It is a few dollars a month. I set it all up and connect it.",
          "Advertising budget. Ongoing marketing work, which is optional, separate, and cancellable any time. Anything outside what the written quote says, which gets quoted separately before any work starts.",
        ],
      },
      {
        h: "How the price works",
        p: [
          "One fixed number, in writing, before anything starts. Never hourly. Nothing monthly owed to me for the build.",
          "There is no price list on this site because a one page site and a scheduling app are not the same job, and a made up range would be useless to you. Fifteen minutes on the phone and you get a real number, usually the same day.",
        ],
      },
      {
        h: "It is not only websites",
        p: [
          "Websites are the common ask, but the same terms cover apps, customer portals, internal dashboards, scheduling and job tracking, automations, and AI that answers your phone and books work. If it can be built, ask.",
        ],
      },
    ],
    related: ["how-long-does-a-website-take", "who-owns-my-website"],
  },
];

export const answerFor = (slug) => ANSWERS.find((a) => a.slug === slug);
