"use client";

import { useState } from "react";
import ProtectedPage from "../_components/ProtectedPage";
import { useAuth } from "../_components/AuthProvider";
import { EVENTS } from "@/lib/mockData";
import { getRecommendedEvents } from "@/lib/recommendations";
import type { Event } from "@/lib/types";

const ALL_TAGS = Array.from(new Set(EVENTS.flatMap((e) => e.tags))).sort();

export default function EventsPage() {
  const { user } = useAuth();
  const [filter, setFilter]         = useState("all");
  const [registered, setRegistered] = useState<Set<string>>(new Set());
  const [confirmed, setConfirmed]   = useState<string | null>(null);

  const recommended = user ? getRecommendedEvents(user, EVENTS).map((e) => e.id) : [];

  const filtered: Event[] =
    filter === "all"         ? EVENTS :
    filter === "recommended" ? EVENTS.filter((e) => recommended.includes(e.id)) :
    EVENTS.filter((e) => e.tags.includes(filter));

  function handleRegister(event: Event) {
    setRegistered((prev) => new Set([...prev, event.id]));
    setConfirmed(event.id);
    setTimeout(() => setConfirmed(null), 4000);
  }

  return (
    <ProtectedPage>
      <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">Campus Events</h1>
      <p className="text-stone-600 mb-8 text-base">Find something fun, social or inspiring this week</p>

      <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Filter events">
        {["all", "recommended", ...ALL_TAGS].map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            aria-pressed={filter === tag}
            className={`px-4 py-2.5 rounded-full text-base font-medium border-2 min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 ${
              filter === tag
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white text-stone-700 border-stone-300 hover:border-orange-400"
            }`}
          >
            {tag === "recommended" ? "⭐ For you" : tag === "all" ? "All events" : tag}
          </button>
        ))}
      </div>

      {confirmed && (
        <div role="status" aria-live="polite" className="mb-6 bg-emerald-50 border-2 border-emerald-200 text-emerald-900 rounded-2xl px-6 py-4 text-base font-medium hc-card">
          ✅ You're registered! Your place has been saved.
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-stone-500 text-base text-center py-16 hc-text-muted">No events match this filter.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5" role="list">
          {filtered.map((event) => {
            const isReg  = registered.has(event.id);
            const spots  = event.capacity - event.registered;
            const isFull = spots <= 0;
            const forYou = recommended.includes(event.id);
            return (
              <li key={event.id} className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col hover:shadow-md transition-shadow hc-card">
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-4xl shrink-0" aria-hidden="true">{event.image}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-serif font-bold text-stone-900 text-xl">{event.title}</h2>
                      {forYou && <span className="bg-orange-100 text-orange-800 text-sm px-2.5 py-1 rounded-full font-medium shrink-0">For you</span>}
                    </div>
                    <p className="text-sm text-stone-600 mt-1 hc-text-muted">{event.organiser}</p>
                  </div>
                </div>
                <p className="text-base text-stone-700 mb-4 leading-relaxed">{event.description}</p>
                <dl className="text-base text-stone-700 space-y-1 mb-4">
                  <div><dt className="sr-only">Date and time</dt><dd>📅 {event.date} · {event.time}</dd></div>
                  <div><dt className="sr-only">Location</dt><dd>📍 {event.location}</dd></div>
                  <div><dt className="sr-only">Spaces</dt><dd>👥 {isFull ? "Fully booked" : `${spots} spots left`} ({event.registered}/{event.capacity})</dd></div>
                </dl>
                <div className="flex flex-wrap gap-2 mb-5">
                  {event.tags.map((tag) => <span key={tag} className="bg-stone-100 text-stone-700 text-sm px-3 py-1 rounded-full">{tag}</span>)}
                </div>
                <div className="mt-auto">
                  {isReg ? (
                    <span className="inline-flex items-center gap-2 text-emerald-700 text-base font-semibold" role="status">
                      <span aria-hidden="true">✅</span> Registered
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRegister(event)}
                      disabled={isFull}
                      aria-label={isFull ? `${event.title} is fully booked` : `Register for ${event.title}`}
                      className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-base font-semibold py-3 rounded-xl min-h-[48px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
                    >
                      {isFull ? "Fully booked" : "Register"}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </ProtectedPage>
  );
}
