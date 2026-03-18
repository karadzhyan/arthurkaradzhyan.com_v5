"use client";
import { useState } from "react";

export default function ContactForm() {
  var [form, setForm] = useState({ name: "", email: "", phone: "", matter: "", message: "" });
  var [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm(function (prev) {
      var next = {};
      for (var k in prev) next[k] = prev[k];
      next[e.target.name] = e.target.value;
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    var subject = encodeURIComponent("Website Inquiry: " + (form.matter || "General"));
    var body = encodeURIComponent(
      "Name: " + form.name + "\n" +
      "Email: " + form.email + "\n" +
      (form.phone ? "Phone: " + form.phone + "\n" : "") +
      "Matter Type: " + (form.matter || "Not specified") + "\n\n" +
      form.message
    );

    window.location.href = "mailto:arthur.karadzhyan@gmail.com?subject=" + subject + "&body=" + body;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="contact-form">
        <div className="contact-form-success">
          <div className="contact-form-success-text">
            Your email client should have opened with the message prepared. If it did not,
            please email <strong>arthur.karadzhyan@gmail.com</strong> directly or call{" "}
            <strong>(818) 421-8324</strong>.
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <label className="contact-form-label" htmlFor="cf-name">Name *</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          className="contact-form-input"
          placeholder="Your full name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
      </div>
      <div className="contact-form-row">
        <label className="contact-form-label" htmlFor="cf-email">Email *</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          className="contact-form-input"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>
      <div className="contact-form-row">
        <label className="contact-form-label" htmlFor="cf-phone">Phone</label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          className="contact-form-input"
          placeholder="(555) 555-5555"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
        />
      </div>
      <div className="contact-form-row">
        <label className="contact-form-label" htmlFor="cf-matter">Matter Type</label>
        <select
          id="cf-matter"
          name="matter"
          className="contact-form-select"
          value={form.matter}
          onChange={handleChange}
        >
          <option value="">Select a matter type...</option>
          <option value="PAGA Notice Response">PAGA Notice Response</option>
          <option value="Wage-and-Hour Class Action">Wage-and-Hour Class Action</option>
          <option value="Workplace Investigation">Workplace Investigation</option>
          <option value="Compliance Advisory">Compliance Advisory</option>
          <option value="Carrier-Assigned Defense">Carrier-Assigned Defense</option>
          <option value="Co-Counsel / Referral">Co-Counsel / Referral</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="contact-form-row">
        <label className="contact-form-label" htmlFor="cf-message">Message *</label>
        <textarea
          id="cf-message"
          name="message"
          className="contact-form-textarea"
          placeholder="Brief description of your situation and any upcoming deadlines..."
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="contact-form-submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Opening Email..." : "Send Message"}
      </button>
      <div className="contact-form-note">
        This form opens your email client with a pre-filled message.
        No data is transmitted through this website. You can also email{" "}
        arthur.karadzhyan@gmail.com or call (818) 421-8324 directly.
      </div>
    </form>
  );
}
