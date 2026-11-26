import React, { useEffect } from "react";
import VariableText from "./VariableText";

const ASSET = "/assets/ascalavera-project";

const graphicResources = [
  {
    src: `${ASSET}/recurso-7.png`,
    alt: "Ascalavera illustrated character on a turquoise background",
    className: "ascalavera-graphic-left",
  },
  {
    src: `${ASSET}/recurso-9.png`,
    alt: "Vertical Ascalavera craft beer logo with skull symbol",
    className: "ascalavera-graphic-center",
  },
  {
    src: `${ASSET}/recurso-8.png`,
    alt: "Ascalavera illustrated character on a dark blue background",
    className: "ascalavera-graphic-right",
  },
];

const productPhotos = [
  {
    src: `${ASSET}/img-2015.jpg`,
    alt: "Hands holding Ascalavera beer bottles beside an ice bucket",
  },
  {
    src: `${ASSET}/img-2031.jpg`,
    alt: "Ascalavera bottles in an ice bucket with brand materials on a table",
  },
  {
    src: `${ASSET}/img-2060.jpg`,
    alt: "Ascalavera beer being poured into a glass",
  },
  {
    src: `${ASSET}/img-2008.jpg`,
    alt: "Ascalavera beer bottles resting in ice",
  },
];

function LiftedImage({ src, alt, className = "" }) {
  return (
    <figure className={`ascalavera-image-box ${className}`}>
      <img src={src} alt={alt} />
    </figure>
  );
}

function AscalaveraProject({ paused }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <article className="ascalavera-project-page">
      <section className="ascalavera-project-intro" aria-labelledby="ascalavera-project-title">
        <div className="ascalavera-project-heading">
          <h1 id="ascalavera-project-title">
            <VariableText label="Ascalavera" lines={[[{ text: "Ascalavera" }]]} base={500} max={700} paused={paused} />
          </h1>
          <p>
            <VariableText label="Re-branding" lines={[[{ text: "Re-branding" }]]} base={200} max={450} paused={paused} />
          </p>
        </div>
        <div className="ascalavera-project-summary">
          <div className="ascalavera-project-logo">
            <img src={`${ASSET}/logo-horizontal.png`} alt="Ascalavera" />
          </div>
          <p>
            Ascalavera is a craft beer brand built around a bold and memorable identity. The project focused on creating a distinctive logo and label system that combines skull-inspired imagery, expressive typography, and an illustrated style across its beer packaging.
          </p>
        </div>
      </section>

      <section className="ascalavera-challenge" aria-label="Project problem and process">
        <div className="ascalavera-problem">
          <div>
            <h2><span>The</span><span>problem</span></h2>
            <p>
              With so many beer brands competing for attention, Ascalavera needed packaging that felt recognizable and original. The challenge was to bring its skull-inspired concept to life while keeping the labels clear, cohesive, and visually appealing.
            </p>
          </div>
        </div>
        <div className="ascalavera-process">
          <div>
            <h2><span>The</span><span>process</span></h2>
            <p>We developed the identity around the calavera symbol, pairing expressive lettering with a warm, hand-drawn visual style.</p>
            <p>The label design gives the beer a distinctive personality while keeping the packaging consistent with the brand.</p>
          </div>
        </div>
      </section>

      <section className="ascalavera-results" aria-labelledby="ascalavera-result-title">
        <h2 id="ascalavera-result-title"><span>The </span><span>result</span></h2>
        <div className="ascalavera-graphics">
          {graphicResources.map((resource) => (
            <LiftedImage key={resource.src} {...resource} />
          ))}
        </div>
        <div className="ascalavera-photo-grid">
          {productPhotos.map((photo) => (
            <LiftedImage key={photo.src} {...photo} className="ascalavera-photo" />
          ))}
        </div>
      </section>
    </article>
  );
}

export default AscalaveraProject;
