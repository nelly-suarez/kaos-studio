import React, { useRef, useState } from "react";
import VariableText from "./VariableText";

const ASSET = "/assets/contact-page";
const initialValues = { name: "", email: "", message: "", "bot-field": "" };

const contactCards = [
  { label: "email:", value: "kaos.studio@gmail.com", href: "mailto:kaos.studio@gmail.com", icon: "email.png" },
  { label: "phone number:", value: "+52 811 00 82 130", href: "tel:+528110082130", icon: "phone.png" },
  { label: "behance:", value: "behance.net/nss_design", href: "https://www.behance.net/nss_design", icon: "behance.png" },
  { label: "instagram:", value: "@_nss.design", href: "https://www.instagram.com/_nss.design/", icon: "instagram.png" },
];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

function ContactPage({ paused }) {
  const sendingRef = useRef(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [notice, setNotice] = useState("");
  const isValid = Object.keys(validate(values)).length === 0;
  const isSending = status === "sending";

  const change = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (sendingRef.current) return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length) return;

    const isPreview = /(?:figma\.site|localhost|127\.0\.0\.1)$/.test(window.location.hostname);
    if (isPreview) {
      setStatus("unavailable");
      setNotice("Form submission is not available in this preview. It will be enabled on the published Netlify site.");
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        "bot-field": values["bot-field"],
      });
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`Form request failed with ${response.status}`);
      setStatus("success");
      setNotice("Thank you! Your message has been sent.");
      setValues(initialValues);
    } catch {
      setStatus("error");
      setNotice("We couldn’t send your message. Please try again.");
    } finally {
      sendingRef.current = false;
    }
  };

  return (
    <article className="contact-page">
      <section className="contact-banner" aria-labelledby="contact-page-title">
        <h1 id="contact-page-title">
          <VariableText
            label="Contact us!"
            lines={[[{ text: "Contact us!" }]]}
            base={500}
            max={700}
            paused={paused}
          />
        </h1>
      </section>
      <div className="contact-page-content">
        <section className="contact-form-column" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title">Tell us about<br />your idea.</h2>
          <form className="contact-form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" noValidate onSubmit={submit}>
            <input type="hidden" name="form-name" value="contact" />
            <p className="netlify-honeypot" aria-hidden="true">
              <label>Don’t fill this out: <input name="bot-field" value={values["bot-field"]} onChange={change} tabIndex="-1" autoComplete="off" /></label>
            </p>
            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" autoComplete="name" required value={values.name} onChange={change} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
              {errors.name && <p className="field-error" id="contact-name-error">{errors.name}</p>}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={change} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
              {errors.email && <p className="field-error" id="contact-email-error">{errors.email}</p>}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" required value={values.message} onChange={change} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
              {errors.message && <p className="field-error" id="contact-message-error">{errors.message}</p>}
            </div>
            <button type="submit" disabled={!isValid || isSending}>{isSending ? "Sending…" : "Send message"}</button>
            <p className={`form-notice form-notice-${status}`} aria-live="polite">{notice}</p>
          </form>
        </section>
        <aside className="contact-details" aria-label="Contact details">
          <p>Have a project, an idea, or the beginning of something unexpected? Tell us where you are, and we’ll explore where it could go.</p>
          <div className="contact-card-list">
            {contactCards.map((card) => (
              <a className="contact-card" href={card.href} key={card.label} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                <img src={`${ASSET}/${card.icon}`} alt="" />
                <span><strong>{card.label}</strong><span>{card.value}</span></span>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}

export default ContactPage;
