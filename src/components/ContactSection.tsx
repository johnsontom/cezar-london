"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal, RevealLines } from "./Reveal";
import { InstagramIcon, TikTokIcon } from "./SocialIcons";

type Status = "idle" | "pending" | "sent" | "problem";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactSection({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState({ name: "", email: "", message: "", company: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const update = (field: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== "company") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (values.message.trim().length < 10) {
      next.message = "Please add a little more detail (10 characters minimum).";
    }
    return next;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "pending") return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      setFeedback(null);
      return;
    }

    setStatus("pending");
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        delivered?: boolean;
        errors?: FieldErrors;
        message?: string;
      };

      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }

      if (response.ok && data.delivered) {
        setStatus("sent");
        setFeedback("Thank you — your message has reached the studio. We will reply shortly.");
        setValues({ name: "", email: "", message: "", company: "" });
        return;
      }

      setStatus("problem");
      setFeedback(
        data.message ??
          "Your message could not be sent. Please email us directly and we will pick it up.",
      );
    } catch {
      setStatus("problem");
      setFeedback("We could not reach the server. Please email us directly.");
    }
  };

  const details = (
    <div className="flex flex-col gap-5">
      <a
        href={`mailto:${site.contact.email}`}
        className="group flex items-start gap-3 text-sm text-ivory/70 transition-colors duration-500 hover:text-ivory"
      >
        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-chrome" strokeWidth={1.25} aria-hidden="true" />
        <span>
          <span className="eyebrow block text-[9px] text-ivory/40">Enquiries</span>
          <span className="link-underline mt-1 inline-block">{site.contact.email}</span>
        </span>
      </a>
      <a
        href={`mailto:${site.contact.businessEmail}`}
        className="group flex items-start gap-3 text-sm text-ivory/70 transition-colors duration-500 hover:text-ivory"
      >
        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-chrome" strokeWidth={1.25} aria-hidden="true" />
        <span>
          <span className="eyebrow block text-[9px] text-ivory/40">Press &amp; business</span>
          <span className="link-underline mt-1 inline-block">
            {site.contact.businessEmail}
          </span>
        </span>
      </a>
      <a
        href={site.contact.whatsappUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="group flex items-start gap-3 text-sm text-ivory/70 transition-colors duration-500 hover:text-ivory"
      >
        <MessageCircle
          className="mt-0.5 h-4 w-4 shrink-0 text-chrome"
          strokeWidth={1.25}
          aria-hidden="true"
        />
        <span>
          <span className="eyebrow block text-[9px] text-ivory/40">WhatsApp</span>
          <span className="link-underline mt-1 inline-block">
            {site.contact.whatsappLabel}
          </span>
        </span>
      </a>
      <div className="flex items-start gap-3 text-sm text-ivory/70">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-chrome" strokeWidth={1.25} aria-hidden="true" />
        <span>
          <span className="eyebrow block text-[9px] text-ivory/40">Studio</span>
          <span className="mt-1 inline-block">{site.contact.location}</span>
        </span>
      </div>
      <div className="mt-2 flex items-center gap-5 border-t border-ivory/10 pt-6">
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-2 text-ivory/60 transition-colors duration-500 hover:text-ivory"
        >
          <InstagramIcon className="h-4 w-4" />
          <span className="eyebrow text-[9px]">Instagram</span>
        </a>
        <a
          href={site.social.tiktok}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-2 text-ivory/60 transition-colors duration-500 hover:text-ivory"
        >
          <TikTokIcon className="h-4 w-4" />
          <span className="eyebrow text-[9px]">TikTok</span>
        </a>
      </div>
      <p className="text-[11px] leading-relaxed text-ivory/35">
        Contact details and social links are placeholders ready to be replaced with the
        brand&apos;s real information.
      </p>
    </div>
  );

  const form = (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="eyebrow text-ivory/50">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className="field mt-3"
            placeholder="Your name"
          />
          {errors.name ? (
            <p id="contact-name-error" role="alert" className="mt-2 text-[11px] text-burgundy-500">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-email" className="eyebrow text-ivory/50">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className="field mt-3"
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id="contact-email-error" role="alert" className="mt-2 text-[11px] text-burgundy-500">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="eyebrow text-ivory/50">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="field mt-3 resize-none"
          placeholder="Tell us what you need"
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="mt-2 text-[11px] text-burgundy-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from people, catches bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" disabled={status === "pending"} className="btn">
          <span>{status === "pending" ? "Sending" : "Send enquiry"}</span>
        </button>
        <a
          href={`mailto:${site.contact.email}`}
          className="link-underline eyebrow inline-flex items-center gap-2 text-ivory/60 transition-colors duration-500 hover:text-ivory"
        >
          Or email us
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
        </a>
      </div>

      {feedback ? (
        <p
          role="status"
          className={`max-w-prose text-[12px] leading-relaxed ${
            status === "sent" ? "text-chrome" : "text-burgundy-500"
          }`}
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );

  if (compact) {
    return (
      <section
        id="enquire"
        aria-labelledby="enquire-heading"
        className="relative bg-ink py-24 md:py-32"
      >
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal y={16}>
              <span className="eyebrow text-chrome">Enquiries</span>
            </Reveal>
            <h2
              id="enquire-heading"
              className="display mt-6 text-[2.4rem] leading-[0.95] text-ivory sm:text-[3rem]"
            >
              <RevealLines lines={["SPEAK TO", "THE STUDIO"]} />
            </h2>
            <Reveal delay={0.15} y={20} className="mt-8">
              {details}
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1} y={24}>
              {form}
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="enquire"
      aria-labelledby="contact-heading"
      className="relative bg-ink py-24 md:py-32 lg:py-40"
    >
      <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal y={16}>
            <span className="eyebrow text-chrome">Contact</span>
          </Reveal>
          <h2
            id="contact-heading"
            className="display mt-6 text-[2.6rem] leading-[0.95] text-ivory sm:text-[3.25rem] lg:text-[3.75rem]"
          >
            <RevealLines lines={["LET'S", "TALK."]} />
          </h2>
          <Reveal delay={0.15} y={20}>
            <p className="mt-8 max-w-prose text-sm leading-relaxed text-ivory/55 md:text-[0.9375rem]">
              For orders, sizing, press or partnerships, send us a note. Every message
              reaches the studio directly.
            </p>
          </Reveal>
          <Reveal delay={0.2} y={20} className="mt-10">
            {details}
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.1} y={24}>
            {form}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
