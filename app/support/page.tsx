"use client";

import { useState, type FormEvent } from "react";
import ProtectedPage from "../_components/ProtectedPage";
import { useAuth } from "../_components/AuthProvider";

const CATEGORIES = ["IT & Technical", "Academic", "Accommodation", "Finance", "Wellbeing", "Other"];
const URGENCIES  = ["Low", "Medium", "High"] as const;
type Urgency = (typeof URGENCIES)[number];

const URGENCY_STYLES: Record<Urgency, string> = {
  Low:    "bg-stone-100 text-stone-800 border-stone-300",
  Medium: "bg-amber-100 text-amber-900 border-amber-300",
  High:   "bg-rose-100 text-rose-900 border-rose-300",
};

export default function SupportPage() {
  const { user } = useAuth();
  const [category,    setCategory]    = useState("");
  const [subject,     setSubject]     = useState("");
  const [description, setDescription] = useState("");
  const [urgency,     setUrgency]     = useState<Urgency>("Low");
  const [submitted,   setSubmitted]   = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [errors,      setErrors]      = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!category)              e.category    = "Please select a category.";
    if (!subject.trim())        e.subject     = "Please enter a subject.";
    if (!description.trim())    e.description = "Please describe your issue.";
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <ProtectedPage>
        <div className="max-w-lg mx-auto text-center py-16">
          <span className="text-7xl inline-block" aria-hidden="true">📬</span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 mt-5 mb-3">Request submitted</h1>
          <p className="text-base text-stone-700 mb-7 leading-relaxed">
            Your request is logged and the support team will be in touch shortly.
          </p>
          <div className={`rounded-2xl px-6 py-5 text-base text-left mb-7 border-2 hc-card ${
            urgency === "High"   ? "bg-rose-50 border-rose-200 text-rose-900" :
            urgency === "Medium" ? "bg-amber-50 border-amber-200 text-amber-900" :
                                   "bg-stone-50 border-stone-200 text-stone-800"
          }`}>
            <p><span className="font-semibold">Category:</span> {category}</p>
            <p><span className="font-semibold">Subject:</span> {subject}</p>
            <p><span className="font-semibold">Urgency:</span> {urgency}</p>
            <p className="mt-3 text-sm opacity-80">Reference: SR-{Date.now().toString().slice(-6)}</p>
          </div>
          <button
            onClick={() => { setSubmitted(false); setCategory(""); setSubject(""); setDescription(""); setUrgency("Low"); }}
            className="bg-orange-600 hover:bg-orange-700 text-white text-base font-semibold px-7 py-3 rounded-xl min-h-[48px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-700"
          >
            Submit another request
          </button>
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage>
      <div className="max-w-lg">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">Get support</h1>
        <p className="text-stone-600 mb-8 text-base">
          Our team is here to help. Tell us what's going on.
        </p>

        <form onSubmit={handleSubmit} noValidate aria-label="Support request form" className="space-y-6 bg-white rounded-2xl border border-stone-200 p-7 hc-card">
          <div>
            <label htmlFor="sr-category" className="block text-base font-semibold text-stone-800 mb-2">
              Category <span aria-hidden="true" className="text-rose-600">*</span>
            </label>
            <select
              id="sr-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 text-base bg-white min-h-[48px] focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              aria-required="true"
              aria-invalid={!!errors.category}
              aria-describedby={errors.category ? "sr-cat-err" : undefined}
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p id="sr-cat-err" role="alert" className="text-rose-700 text-base mt-1.5">{errors.category}</p>}
          </div>

          <div>
            <label htmlFor="sr-subject" className="block text-base font-semibold text-stone-800 mb-2">
              Subject <span aria-hidden="true" className="text-rose-600">*</span>
            </label>
            <input
              id="sr-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="A short summary of the issue"
              className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 text-base bg-white min-h-[48px] focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "sr-sub-err" : undefined}
            />
            {errors.subject && <p id="sr-sub-err" role="alert" className="text-rose-700 text-base mt-1.5">{errors.subject}</p>}
          </div>

          <div>
            <p className="text-base font-semibold text-stone-800 mb-3">Urgency</p>
            <div role="radiogroup" aria-label="Urgency level" className="flex gap-3">
              {URGENCIES.map((u) => (
                <button
                  key={u}
                  type="button"
                  role="radio"
                  aria-checked={urgency === u}
                  onClick={() => setUrgency(u)}
                  className={`flex-1 py-3 rounded-xl border-2 text-base font-medium min-h-[48px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    urgency === u ? URGENCY_STYLES[u] : "bg-white text-stone-600 border-stone-300 hover:border-stone-400"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="sr-desc" className="block text-base font-semibold text-stone-800 mb-2">
              Description <span aria-hidden="true" className="text-rose-600">*</span>
            </label>
            <textarea
              id="sr-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              placeholder="Tell us what's happening…"
              className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 resize-none"
              aria-required="true"
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "sr-desc-err" : undefined}
            />
            {errors.description && <p id="sr-desc-err" role="alert" className="text-rose-700 text-base mt-1.5">{errors.description}</p>}
          </div>

          <p className="text-sm text-stone-500 hc-text-muted">Submitting as {user?.name} ({user?.studentId})</p>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white text-base font-semibold py-3.5 rounded-xl min-h-[48px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-700"
          >
            {loading ? "Submitting…" : "Submit request"}
          </button>
        </form>
      </div>
    </ProtectedPage>
  );
}
