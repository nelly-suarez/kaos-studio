import React from "react";
import VariableText from "./VariableText";

const ASSET = "/assets/services-page";

const services = [
  {
    id: "brand",
    title: ["Brand", "identity"],
    description: "We shape the ideas behind your brand into a distinct visual language, creating identities that feel recognizable, intentional, and entirely your own.",
    image: `${ASSET}/brand-identity.png`,
    alt: "Ascalavera skull symbol and wordmark on black",
  },
  {
    id: "social",
    title: ["Social", "media"],
    description: "We turn your brand into content designed to move, connect, and stay relevant across digital spaces.",
    image: `${ASSET}/social-media.png`,
    alt: "Phone displaying social media in front of a computer",
  },
  {
    id: "editorial",
    title: ["Editorial", "design"],
    description: "We organize ideas into thoughtful visual narratives, bringing clarity, rhythm, and character to every page.",
    image: `${ASSET}/editorial-design.png`,
    alt: "360 UDEM magazine and open editorial spread",
  },
];

function ServicesPage({ paused }) {
  return (
    <article className={`services-page ${paused ? "is-motion-paused" : ""}`}>
      <section className="page-intro services-intro" aria-labelledby="services-title">
        <h1 id="services-title">
          <VariableText
            label="Your ideas"
            lines={[[{ text: "Your " }, { text: "ideas", accent: true }]]}
            base={500}
            max={700}
            paused={paused}
          />
          <VariableText
            label="shaped with purpose."
            lines={[[{ text: "shaped with " }, { text: "purpose.", accent: true }]]}
            base={200}
            max={450}
            paused={paused}
          />
        </h1>
        <p>From the first thought to the final expression, we combine strategy, design, and storytelling to create brands that feel clear, relevant, and alive.</p>
      </section>
      <section className="services-list" aria-label="Services">
        {services.map((service, index) => (
          <React.Fragment key={service.id}>
            <article className={`service-row service-row-${service.id}`}>
              <div className="service-row-image">
                <img src={service.image} alt={service.alt} />
              </div>
              <div className="service-row-copy">
                <h2>{service.title.map((line) => <span key={line}>{line}</span>)}</h2>
                <p>{service.description}</p>
              </div>
            </article>
            {index < services.length - 1 && <div className="services-divider" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </section>
    </article>
  );
}

export default ServicesPage;
