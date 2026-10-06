"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Status = "idle" | "pending" | "done" | "problem";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "pending") return;
    setStatus("pending");
    setFeedback(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        subscribed?: boolean;
        message?: string;
      };

      if (response.ok && data.subscribed) {
        setStatus("done");
        setFeedback("Thank you — you are on the list.");
        setEmail("");
        return;
      }

      setStatus("problem");
      setFeedback(data.message ?? "We could not complete that request.");
    } catch {
      setStatus("problem");
      setFeedback("We could not reach the server. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
      <label htmlFor="newsletter-email" className="eyebrow text-ivory/50">
        Newsletter
      </label>
      <div className="mt-4 flex items-center gap-3 border-b border-ivory/20 focus-within:border-ivory">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          aria-invalid={status === "problem"}
          className="w-full bg-transparent py-3 text-sm text-ivory outline-none placeholder:text-ivory/30"
        />
        <button
          type="submit"
          disabled={status === "pending"}
          className="flex items-center gap-2 whitespace-nowrap pb-3 pt-3 text-[10px] uppercase tracking-[0.3em] text-ivory/75 transition-colors duration-500 hover:text-ivory disabled:opacity-40"
        >
          {status === "pending" ? "Sending" : "Submit"}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
        </button>
      </div>
      {feedback ? (
        <p
          role="status"
          className={`mt-4 text-[11px] leading-relaxed ${
            status === "done" ? "text-chrome" : "text-burgundy-500"
          }`}
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
