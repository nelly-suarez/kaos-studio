import React, { useRef } from "react";
import VariableText from "./VariableText";

const ASSET = "/assets/sensei-project";

const resultPosts = [
  { src: `${ASSET}/semana-3-01.png`, alt: "Sensei Tech Pokémon introduction post featuring Playwright, Selenium and Postman" },
  { src: `${ASSET}/semana-3-04.png`, alt: "Sensei Tech Postman and Rotom social media post" },
  { src: `${ASSET}/semana-3-02.png`, alt: "Sensei Tech Playwright and Ditto social media post" },
  { src: `${ASSET}/carrusel-ia-01.jpg`, alt: "Sensei Tech post about AI replacing programmers" },
  { src: `${ASSET}/carrusel-ia-02.jpg`, alt: "Sensei Tech post with a cat and laptop about AI mistakes" },
  { src: `${ASSET}/carrusel-ia-03.jpg`, alt: "Sensei Tech post with a calculator explaining AI reality" },
  { src: `${ASSET}/b2b.jpg`, alt: "Sensei Tech QA team training post with three robots" },
  { src: `${ASSET}/publicacion-1.jpg`, alt: "Sensei Tech course promotion with a person and computer" },
  { src: `${ASSET}/dragon-ball-2.jpg`, alt: "Sensei Tech social post featuring Dragon Ball characters" },
];

function ResultsGallery() {
  const viewportRef = useRef(null);

  const move = (direction) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const nextPosition = Math.min(Math.max(viewport.scrollLeft + direction * 590, 0), maxScroll);
    viewport.scrollTo({ left: nextPosition, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="sensei-results-gallery">
      <div className="sensei-gallery-controls">
        <span>Scroll to view all posts</span>
        <button type="button" onClick={() => move(-1)} aria-label="Show previous Sensei Tech posts">←</button>
        <button type="button" onClick={() => move(1)} aria-label="Show next Sensei Tech posts">→</button>
      </div>
      <div
        className="sensei-gallery-viewport"
        ref={viewportRef}
        tabIndex="0"
        aria-label="Sensei Tech results gallery. Scroll horizontally to view all three columns."
      >
        <div className="sensei-gallery-track">
          {resultPosts.map((post) => (
            <figure key={post.src}>
              <img src={post.src} alt={post.alt} />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

function SenseiProject({ paused }) {
  return (
    <article className="sensei-project-page">
      <section className="sensei-project-intro" aria-labelledby="sensei-project-title">
        <div className="sensei-project-heading">
          <h1 id="sensei-project-title">
            <VariableText label="Sensei Tech" lines={[[{ text: "Sensei Tech" }]]} base={500} max={700} paused={paused} />
          </h1>
          <p>
            <VariableText
              label="Social media posts"
              lines={[[{ text: "Social " }, { text: "media posts", accent: true }]]}
              base={200}
              max={450}
              paused={paused}
            />
          </p>
        </div>
        <div className="sensei-project-summary">
          <div className="sensei-project-logo">
            <img src={`${ASSET}/logo-color.png`} alt="Sensei — Aprende, codifica, domina" />
          </div>
          <p>
            Sensei Tech is a specialized training platform for QA and test automation. The project focused on transforming technical knowledge into a clear, engaging, and recognizable social media presence for both individual learners and professional teams.
          </p>
        </div>
      </section>

      <section className="sensei-challenge" aria-label="Project problem and process">
        <div className="sensei-problem">
          <div>
            <h2><span>The</span><span>problem</span></h2>
            <p>QA automation can feel complex and difficult to communicate. Sensei needed a clear content system to promote its courses and connect with different audiences while maintaining technical credibility.</p>
          </div>
        </div>
        <div className="sensei-process">
          <div>
            <h2><span>The</span><span>process</span></h2>
            <p>We created a flexible content system that turns technical concepts into clear messages and consistent visuals across every format.</p>
          </div>
        </div>
      </section>

      <section className="sensei-results" aria-labelledby="sensei-result-title">
        <h2 id="sensei-result-title"><span>The </span><span>result</span></h2>
        <ResultsGallery />
      </section>
    </article>
  );
}

export default SenseiProject;
