import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import VariableText from "./VariableText";
import { brandLogos, featuredCases, galleryProjects } from "./workProjects";

const workTickerItems = ["KAOS", "DAWN & DUSK", "SENSEI TECH", "ASCALAVERA"];

function FeaturedCase({ project }) {
  return (
    <section className={`featured-case featured-${project.id}`} aria-labelledby={`${project.id}-title`}>
      <div className="featured-image">
        <img src={project.image} alt="" />
      </div>
      <div className="featured-content">
        <h2 id={`${project.id}-title`}>{project.name}</h2>
        <p>{project.description}</p>
        <a
          href={project.destination || "#"}
          aria-disabled={project.destination ? undefined : "true"}
          title={project.destination ? undefined : "Case study pending"}
          onClick={project.destination ? undefined : (event) => event.preventDefault()}
        >
          View {project.name} case study →
        </a>
      </div>
    </section>
  );
}

function ProjectDialog({ project, onClose, returnFocusRef }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus());
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", closeOnEscape);
      returnFocusRef.current?.focus();
    };
  }, []);

  return createPortal(
    <div className="project-dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
        <div className="project-dialog-header">
          <h2 id="project-dialog-title">{project.name}</h2>
          <button ref={closeRef} type="button" onClick={onClose} autoFocus>Close</button>
        </div>
        <div className="project-dialog-gallery">
          <img src={project.main} alt={project.mainAlt} />
          {project.additional.map((image) => <img key={image.src} src={image.src} alt={image.alt} />)}
        </div>
      </section>
    </div>,
    document.body,
  );
}

function SelectedGallery() {
  const sectionRef = useRef(null);
  const projectRefs = useRef(new Map());
  const returnFocusRef = useRef(null);
  const previewRef = useRef(null);
  const intentRef = useRef(0);
  const exitTimerRef = useRef(0);
  const preloadRef = useRef(new Map());
  const [preview, setPreview] = useState(null);
  const [dialogProject, setDialogProject] = useState(null);

  const clearExitTimer = useCallback(() => {
    const timer = exitTimerRef.current;
    if (!timer) return;
    window.clearTimeout(timer.id);
    exitTimerRef.current = null;
    timer.resolve?.();
  }, []);

  const commitPreview = useCallback((next) => {
    setPreview((current) => {
      const value = typeof next === "function" ? next(current) : next;
      previewRef.current = value;
      return value;
    });
  }, []);

  const getPreviewPositions = useCallback((id) => {
    const element = projectRefs.current.get(id);
    const section = sectionRef.current;
    if (!element || !section) return null;
    const card = element.getBoundingClientRect();
    const bounds = section.getBoundingClientRect();
    if (card.bottom < 88 || card.top > window.innerHeight) return null;

    const clampX = (value, width) => Math.min(Math.max(value, 16), window.innerWidth - width - 16);
    const clampY = (value) => Math.max(value, 104);
    return [
      {
        left: clampX(card.left + Math.min(56, card.width * 0.1), 280) - bounds.left,
        top: clampY(card.top - 92) - bounds.top,
      },
      {
        left: clampX(card.right - 270, 230) - bounds.left,
        top: clampY(card.top - 52) - bounds.top,
      },
    ];
  }, []);

  const preloadProject = useCallback((project) => {
    if (preloadRef.current.has(project.id)) return preloadRef.current.get(project.id);
    const request = Promise.all(project.additional.slice(0, 2).map(async ({ src }) => {
      const image = new Image();
      image.src = src;
      if (!image.complete) {
        await new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }
      if (image.naturalWidth && image.decode) {
        try {
          await image.decode();
        } catch {
          // A loaded image is still safe to reveal when decode() is unavailable.
        }
      }
    }));
    preloadRef.current.set(project.id, request);
    return request;
  }, []);

  const hidePreview = useCallback(() => {
    const ticket = ++intentRef.current;
    clearExitTimer();
    const current = previewRef.current;
    if (!current) return;
    commitPreview({ ...current, phase: "exiting" });
    const id = window.setTimeout(() => {
      exitTimerRef.current = null;
      if (intentRef.current === ticket) commitPreview(null);
    }, 350);
    exitTimerRef.current = { id };
  }, [clearExitTimer, commitPreview]);

  const activate = useCallback(async (project, element) => {
    returnFocusRef.current = element;
    const ticket = ++intentRef.current;
    clearExitTimer();

    const current = previewRef.current;
    const positions = getPreviewPositions(project.id);
    if (!positions) {
      hidePreview();
      return;
    }
    if (current?.project.id === project.id) {
      commitPreview({ ...current, positions, phase: "entering-active" });
      return;
    }

    await preloadProject(project);
    if (intentRef.current !== ticket) return;

    const previous = previewRef.current;
    if (previous) {
      commitPreview({ ...previous, phase: "exiting" });
      await new Promise((resolve) => {
        const id = window.setTimeout(() => {
          exitTimerRef.current = null;
          resolve();
        }, 350);
        exitTimerRef.current = { id, resolve };
      });
      if (intentRef.current !== ticket) return;
    }

    const nextPositions = getPreviewPositions(project.id);
    if (!nextPositions) return;
    commitPreview({ project, positions: nextPositions, phase: "entering" });
    requestAnimationFrame(() => {
      if (intentRef.current === ticket) {
        commitPreview((mounted) => mounted?.project.id === project.id
          ? { ...mounted, phase: "entering-active" }
          : mounted);
      }
    });
  }, [clearExitTimer, commitPreview, getPreviewPositions, hidePreview, preloadProject]);

  useEffect(() => {
    const update = () => {
      const current = previewRef.current;
      if (!current) return;
      const positions = getPreviewPositions(current.project.id);
      if (positions) commitPreview({ ...current, positions });
      else hidePreview();
    };
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      intentRef.current += 1;
      clearExitTimer();
    };
  }, [clearExitTimer, commitPreview, getPreviewPositions, hidePreview]);

  return (
    <section className="work-selected" ref={sectionRef} aria-labelledby="more-work-title">
      <h2 id="more-work-title"><span>More </span><span>selected work.</span></h2>
      <div className="work-gallery">
        {galleryProjects.map((project) => (
          <article className={`gallery-project gallery-${project.id}`} key={project.id}>
            <button
              ref={(node) => node && projectRefs.current.set(project.id, node)}
              type="button"
              onPointerEnter={(event) => activate(project, event.currentTarget)}
              onPointerLeave={(event) => {
                if (document.activeElement !== event.currentTarget) hidePreview();
              }}
              onFocus={(event) => activate(project, event.currentTarget)}
              onBlur={() => !dialogProject && hidePreview()}
              onClick={(event) => {
                returnFocusRef.current = event.currentTarget;
                setDialogProject(project);
              }}
              aria-label={`View more images from ${project.name}`}
            >
              <img src={project.main} alt={project.mainAlt} />
              <span>View more images</span>
            </button>
          </article>
        ))}
      </div>
      <div className={`floating-previews ${preview ? `is-${preview.phase}` : ""}`} aria-hidden="true">
        {preview && preview.project.additional.slice(0, 2).map((image, index) => (
          <img
            key={image.src}
            className={`floating-preview floating-preview-${index + 1}`}
            src={image.src}
            alt=""
            style={preview.positions[index]}
          />
        ))}
      </div>
      {dialogProject && (
        <ProjectDialog
          project={dialogProject}
          returnFocusRef={returnFocusRef}
          onClose={() => setDialogProject(null)}
        />
      )}
    </section>
  );
}

function BrandGroup({ decorative = false, groupRef }) {
  return (
    <div className="brand-group" ref={groupRef} aria-hidden={decorative || undefined}>
      {brandLogos.map((logo) => (
        <span className={`brand-logo-box brand-logo-${logo.id}`} key={logo.src}>
          <img src={logo.src} alt={decorative ? "" : logo.alt} />
        </span>
      ))}
    </div>
  );
}

function Brands({ paused }) {
  const groupRef = useRef(null);
  const [duration, setDuration] = useState(38);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return undefined;
    let mounted = true;
    const measure = () => setDuration(Math.max(group.getBoundingClientRect().width / 30, 1));
    const images = [...group.querySelectorAll("img")];
    const loaded = Promise.all(images.map(async (image) => {
      if (!image.complete) {
        await new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }
    }));
    loaded.then(() => {
      if (!mounted) return;
      measure();
      setReady(true);
      Promise.all(images.map((image) => image.decode?.().catch(() => undefined))).then(() => {
        if (mounted) measure();
      });
    });
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, []);

  return (
    <section className="brands" aria-labelledby="brands-title">
      <div className="brands-inner">
        <div className="brands-heading">
          <h2 id="brands-title">Brands</h2>
          <p>we’ve worked with</p>
        </div>
        <div className={`brand-marquee ${paused || !ready ? "is-paused" : ""}`} style={{ "--brand-duration": `${duration}s` }}>
          <div className="brand-track">
            <BrandGroup groupRef={groupRef} />
            <BrandGroup decorative />
            <BrandGroup decorative />
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkPage({ paused, MarqueeComponent }) {
  return (
    <div className={`work-page ${paused ? "is-motion-paused" : ""}`}>
      <section className="work-intro" aria-labelledby="work-title">
        <div className="container">
          <h1 id="work-title">
            <VariableText
              label="Selected work"
              lines={[[{ text: "Selected " }, { text: "work", accent: true }]]}
              base={500}
              max={700}
              paused={paused}
            />
          </h1>
          <p>Ideas shaped into identities, experiences, and stories. A selection of projects where strategy and experimentation come together to create work with a distinct point of view.</p>
          <p>Every project creates its own kind of kaos. Let’s make the next one together.</p>
        </div>
      </section>
      <MarqueeComponent direction="left" paused={paused} items={workTickerItems} />
      <FeaturedCase project={featuredCases[0]} />
      <MarqueeComponent direction="right" paused={paused} items={workTickerItems} />
      <FeaturedCase project={featuredCases[1]} />
      <SelectedGallery />
      <Brands paused={paused} />
    </div>
  );
}

export default WorkPage;
