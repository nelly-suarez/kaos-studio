import React, { useEffect, useRef, useState } from "react";
import VariableText from "./VariableText";

const ASSET = "/assets/studio-page";

const team = [
  {
    id: "francisco",
    name: "FRANCISCO HEREDIA",
    role: "CREATIVE DIRECTOR",
    description: "Shapes ideas into clear creative visions.",
    image: `${ASSET}/francisco.png`,
    alt: "Francisco Heredia",
  },
  {
    id: "nelly",
    name: "NELLY SUÁREZ",
    role: "GRAPHIC DESIGNER",
    description: "Builds visual systems with character and purpose.",
    image: `${ASSET}/nelly.jpg`,
    alt: "Nelly Suárez",
  },
  {
    id: "walter",
    name: "WALTER REYNA",
    role: "CONTENT STRATEGIST",
    description: "Creates stories and voices people remember.",
    image: `${ASSET}/walter.png`,
    alt: "Walter Reyna",
  },
  {
    id: "fernanda",
    name: "FERNANDA DE LA CRUZ",
    role: "CONTENT STRATEGIST",
    description: "Creates stories and voices people remember.",
    image: `${ASSET}/fernanda.jpg`,
    alt: "Fernanda de la Cruz",
  },
];

function StudioPage({ paused }) {
  const storyRef = useRef(null);
  const [storyVisible, setStoryVisible] = useState(false);

  useEffect(() => {
    const section = storyRef.current;
    if (!section) return undefined;
    const updateVisibility = () => {
      const bounds = section.getBoundingClientRect();
      setStoryVisible(bounds.bottom > 0 && bounds.top < window.innerHeight);
    };
    const observer = new IntersectionObserver(([entry]) => setStoryVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(section);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    updateVisibility();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <article className="studio-page">
      <section className="page-intro studio-page-intro" aria-labelledby="studio-page-title">
        <h1 id="studio-page-title">
          <VariableText
            label="Ideas begin in kaos"
            lines={[[{ text: "Ideas begin in " }, { text: "kaos", accent: true }]]}
            base={500}
            max={700}
            paused={paused}
          />
          <VariableText
            label="we give them direction."
            lines={[[{ text: "we give them " }, { text: "direction.", accent: true }]]}
            base={200}
            max={450}
            paused={paused}
          />
        </h1>
        <p>kaos is an independent creative studio creating identities, digital experiences, and visual stories with a distinct point of view.</p>
      </section>

      <section className="studio-story" ref={storyRef} aria-labelledby="studio-story-title">
        <div className={`chaos-symbol-position ${paused || !storyVisible ? "is-paused" : ""}`} aria-hidden="true">
          <div className="chaos-symbol-motion">
            <img src={`${ASSET}/chaos-symbol.svg`} alt="" />
          </div>
        </div>
        <div className="studio-story-copy">
          <h2 id="studio-story-title">Who we are</h2>
          <p>We believe the strongest ideas begin with a little uncertainty. We explore, question, and connect what feels unexpected until every possibility finds its purpose. What begins as kaos becomes a clear visual language with its own voice, rhythm, and place in the world.</p>
        </div>
      </section>

      <section className="studio-team" aria-labelledby="studio-team-title">
        <div className="studio-team-heading">
          <h2 id="studio-team-title">Meet the team</h2>
          <p>Four perspectives. One shared curiosity.</p>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <article className={`team-member team-member-${member.id}`} key={member.id}>
              <div className="team-photo-box">
                <img src={member.image} alt={member.alt} />
              </div>
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.description}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}

export default StudioPage;
