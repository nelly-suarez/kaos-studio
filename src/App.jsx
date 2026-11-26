import React, { useEffect, useState } from "react";
import AscalaveraProject from "./AscalaveraProject";
import ContactPage from "./ContactPage";
import SenseiProject from "./SenseiProject";
import ServicesPage from "./ServicesPage";
import StudioPage from "./StudioPage";
import VariableText from "./VariableText";
import WorkPage from "./WorkPage";

const ASSET = "/assets";
const navItems = ["WORK", "SERVICES", "STUDIO", "CONTACT"];
const tickerItems = ["KAOS", "WEB DESIGN", "BRANDING", "SOCIAL MEDIA", "PACKAGING"];
const metadataByPath = {
  "/": {
    title: "Home — kaos.studio",
    description: "kaos.studio is an independent creative studio creating brand identities, editorial design, social media content and visual stories shaped with purpose.",
  },
  "/work": {
    title: "Work — kaos.studio",
    description: "Explore selected branding, editorial, social media and visual identity projects created by kaos.studio.",
  },
  "/work/sensei-tech": {
    title: "Sensei Tech — kaos.studio",
    description: "Sensei Tech social media content and visual communication by kaos.studio.",
  },
  "/work/ascalavera": {
    title: "Ascalavera — kaos.studio",
    description: "Ascalavera craft beer rebranding, identity and packaging design by kaos.studio.",
  },
  "/services": {
    title: "Services — kaos.studio",
    description: "Brand identity, social media content and editorial design services shaped with purpose by kaos.studio.",
  },
  "/studio": {
    title: "Studio — kaos.studio",
    description: "Meet kaos.studio, an independent creative studio turning ideas into clear visual identities and stories.",
  },
  "/contact": {
    title: "Contact — kaos.studio",
    description: "Contact kaos.studio to discuss a brand identity, editorial, social media or visual storytelling project.",
  },
};

function FutureLink({ label, onClick, className = "", currentPath = "" }) {
  const href = `/${label.toLowerCase()}`;
  const isCurrent = href === "/work"
    ? currentPath === href || currentPath.startsWith("/work/")
    : currentPath === href;
  return (
    <a className={className} href={href} onClick={onClick} aria-current={isCurrent ? "page" : undefined}>
      {label}
    </a>
  );
}

function Navigation({ theme, toggleTheme, currentPath }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header className="navigation">
      <a className="brand-link" href="/" aria-label="Kaos Studio, home">
        <img src={`${ASSET}/kaos-logo.svg`} alt="Kaos" />
      </a>
      <nav id="mobile-navigation" className={`primary-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        {navItems.map((item) => (
          <FutureLink key={item} label={item} onClick={() => setOpen(false)} currentPath={currentPath} />
        ))}
      </nav>
      <button
        className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
      >
        <img src={`${ASSET}/${theme === "light" ? "theme-moon.svg" : "theme-sun.svg"}`} alt="" />
      </button>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

function Marquee({ direction, paused, items = tickerItems }) {
  const group = (
    <span className="ticker-group">
      {items.map((item, index) => (
        <span className="ticker-item" key={item}>
          {item}
          {index < items.length - 1 && <span className="ticker-dot">•</span>}
        </span>
      ))}
    </span>
  );

  return (
    <div className={`marquee marquee-${direction} ${paused ? "is-paused" : ""}`}>
      <div className="ticker-track">
        {group}
        <span aria-hidden="true">{group}</span>
        <span aria-hidden="true">{group}</span>
      </div>
    </div>
  );
}

function Hero({ paused }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy container">
        <VariableText
          className="studio-title"
          label="KAOS.STUDIO"
          lines={[[{ text: "KAOS.STUDIO" }]]}
          base={200}
          max={700}
          paused={paused}
        />
        <h1 id="hero-title">
          <VariableText
            className="hero-title"
            label="We solve the kaos in your head."
            lines={[
              [{ text: "We solve the" }],
              [
                { text: "kaos", accent: true },
                { text: " in your head." },
              ],
            ]}
            base={500}
            max={800}
            paused={paused}
          />
        </h1>
        <p className="hero-description body-copy">
          Brand identities, stories, and images in motion. We give your ideas a place to begin—and room to{" "}
          <span className="accent">grow</span> into something meaningful.
        </p>
      </div>
      <a className="primary-cta" href="#create-something-awesome">
        LET’S GET STARTED
      </a>
    </section>
  );
}

function StudioIntroduction() {
  return (
    <section className="studio-intro" aria-labelledby="studio-heading">
      <div className="intro-layout">
        <h2 id="studio-heading">
          We create order
          <br />
          within <span className="accent">chaos.</span>
        </h2>
        <div className="intro-copy body-copy">
          <p>We create identities, campaigns, and visual experiences born from exploration, shaped with intention, and designed to connect authentically.</p>
          <p>
            We turn <span className="accent">complexity</span> into something{" "}
            <span className="accent">clear, memorable, and alive.</span>
          </p>
        </div>
        <div className="studio-photo">
          <img src={`${ASSET}/studio-photo.png`} alt="Kaos Studio workspace in black and white" />
        </div>
      </div>
    </section>
  );
}

const services = [
  ["01 | BRANDING", "STORYTELLING · BRAND IDENTITY"],
  ["02 | SOCIAL MEDIA", "CREATIVE DIRECTION · STRATEGY"],
  ["03 | EDITORIAL", "COPYWRITING · COVER MAGAZINE"],
  ["04 | MOTION GRAPHICS", "2D ANIMATION · VISUAL STORYTELLING"],
];

function Services() {
  return (
    <section className="services" aria-labelledby="services-heading">
      <div className="services-layout container">
        <div className="services-copy">
          <h2 id="services-heading">Our services</h2>
          <p className="body-copy">
            Explore the world of <span className="accent">kaos</span> through the work we create, the ideas we shape, and the people behind them. Discover our projects, capabilities, creative philosophy, and the many ways we can build something meaningful together.
          </p>
        </div>
        <div className="services-grid">
          {services.map(([title, descriptor]) => (
            <article className="service-card" key={title}>
              <h3>{title}</h3>
              <p>{descriptor}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className="contact-cta" id="create-something-awesome" aria-labelledby="contact-heading">
      <img className="contact-photo" src={`${ASSET}/contact-photo.png`} alt="" />
      <div className="contact-overlay" />
      <div className="contact-layout container">
        <h2 id="contact-heading">
          Let’s create
          <br />
          something
          <br />
          awesome!
        </h2>
        <a className="round-cta" href="/contact" aria-label="Go to contact page">
          <img src={`${ASSET}/round-arrow.svg`} alt="" />
        </a>
      </div>
    </section>
  );
}

function Footer({ currentPath }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src={`${ASSET}/monogram.svg`} alt="Kaos Studio monogram" />
        <p>© KAOS STUDIO 2026</p>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <p>EXPLORE</p>
        <div>
          <a href="/" aria-current={currentPath === "/" ? "page" : undefined}>HOME</a>
          <FutureLink label="WORK" currentPath={currentPath} />
          <FutureLink label="SERVICES" currentPath={currentPath} />
          <FutureLink label="STUDIO" currentPath={currentPath} />
          <FutureLink label="CONTACT" currentPath={currentPath} />
        </div>
      </nav>
      <p className="location">BASED IN NL, MÉXICO.</p>
    </footer>
  );
}

function App() {
  const [paused, setPaused] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("kaos-theme") || "light");
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isWork = currentPath === "/work";
  const isAscalaveraProject = currentPath === "/work/ascalavera";
  const isSenseiProject = currentPath === "/work/sensei-tech";
  const isServices = currentPath === "/services";
  const isStudio = currentPath === "/studio";
  const isContact = currentPath === "/contact";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("kaos-theme", theme);
  }, [theme]);

  useEffect(() => {
    const metadata = metadataByPath[currentPath] || metadataByPath["/"];
    const canonicalUrl = `https://kaoscreativestudio.com${currentPath === "/" ? "/" : currentPath}`;
    document.title = metadata.title;
    [
      ["meta[name='description']", "content", metadata.description],
      ["meta[property='og:title']", "content", metadata.title],
      ["meta[property='og:description']", "content", metadata.description],
      ["meta[property='og:url']", "content", canonicalUrl],
    ].forEach(([selector, attribute, value]) => {
      document.querySelector(selector)?.setAttribute(attribute, value);
    });
  }, [currentPath]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [currentPath]);

  return (
    <>
      <Navigation
        theme={theme}
        currentPath={currentPath}
        toggleTheme={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
      />
      <main>
        {isAscalaveraProject ? (
          <AscalaveraProject paused={paused} />
        ) : isSenseiProject ? (
          <SenseiProject paused={paused} />
        ) : isServices ? (
          <ServicesPage paused={paused} />
        ) : isStudio ? (
          <StudioPage paused={paused} />
        ) : isContact ? (
          <ContactPage paused={paused} />
        ) : isWork ? (
          <WorkPage paused={paused} MarqueeComponent={Marquee} />
        ) : (
          <>
            <Hero paused={paused} />
            <Marquee direction="left" paused={paused} />
            <StudioIntroduction />
            <Marquee direction="right" paused={paused} />
            <Services />
            <ContactCta />
          </>
        )}
      </main>
      <Footer currentPath={currentPath} />
      <button className="motion-toggle" type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
        {paused ? "Play motion" : "Pause motion"}
      </button>
    </>
  );
}

export default App;
