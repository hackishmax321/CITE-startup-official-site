
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setStatus("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed.");
      }

      setStatus("success");
      setMessage(result.message);

    //   event.currentTarget.reset();

    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="mb-2 block text-sm font-medium">
          Your Name
        </label>
        <input
          name="name"
          required
          maxLength={80}
          className="theme-input"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          required
          maxLength={150}
          className="theme-input"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Phone Number
        </label>
        <input
          name="phone"
          maxLength={30}
          className="theme-input"
          placeholder="Optional"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Subject
        </label>
        <input
          name="subject"
          required
          maxLength={120}
          className="theme-input"
          placeholder="What do you need?"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={5}
          className="theme-input"
          placeholder="Tell us about your project..."
        />
      </div>

      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Send Enquiry →"}
      </button>

      {message && (
        <p
          role="status"
          aria-live="polite"
          className={
            status === "success"
              ? "text-sm text-success"
              : "text-sm text-danger"
          }
        >
          {message}
        </p>
      )}

    </form>
  );
}
