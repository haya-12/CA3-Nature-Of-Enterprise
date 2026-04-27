"use client";

import { useState } from "react";
import ProtectedPage from "../_components/ProtectedPage";
import { useAuth } from "../_components/AuthProvider";
import { EVENTS } from "@/lib/mockData";
import { getRecommendedEvents, getMatchedTags } from "@/lib/recommendations";

const ALL_INTERESTS = [
  "tech", "gaming", "music", "hackathons", "film", "arts",
  "sports", "entrepreneurship", "travel", "food", "networking",
  "health", "reading", "photography", "volunteering", "culture",
];

export default function ProfilePage() {
  const { user } = useAuth();
  const [interests, setInterests] = useState<string[]>(user?.interests ?? []);
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const fakeUser = { ...user, interests };
  const recommended = getRecommendedEvents(fakeUser, EVENTS);

  function toggleInterest(tag: string) {
    setSaved(false);
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((i) => i !== tag) : [...prev, tag]
    );
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <ProtectedPage>
      <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">My Profile</h1>
      <p className="text-stone-600 mb-8 text-base">Tell us what you're into — we'll personalise your campus experience</p>

      {/* Profile card */}
      <section
        aria-labelledby="profile-card-heading"
        className="bg-white rounded-2xl border border-stone-200 p-7 mb-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center hc-card"
      >
        <div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-white text-2xl font-serif font-bold flex items-center justify-center shrink-0 shadow-sm"
          aria-label={`Avatar for ${user.name}`}
        >
          {user.avatar}
        </div>
        <div className="flex-1">
          <h2 id="profile-card-heading" className="font-serif text-2xl font-bold text-stone-900">{user.name}</h2>
          <p className="text-stone-600 text-base mt-1 hc-text-muted">{user.email}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full font-medium">{user.course}</span>
            <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full font-medium">Year {user.year}</span>
            <span className="bg-stone-100 text-stone-700 text-sm px-3 py-1 rounded-full font-medium">ID: {user.studentId}</span>
          </div>
          <p className="text-base text-stone-700 mt-3 leading-relaxed">{user.bio}</p>
        </div>
      </section>

      {/* Interests */}
      <section aria-labelledby="interests-heading" className="bg-white rounded-2xl border border-stone-200 p-7 mb-8 hc-card">
        <h2 id="interests-heading" className="font-serif text-xl font-bold text-stone-900 mb-2">
          What are you into?
        </h2>
        <p className="text-base text-stone-600 mb-5 hc-text-muted">
          Select interests to personalise event recommendations.
        </p>
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Interest selection">
          {ALL_INTERESTS.map((tag) => {
            const selected = interests.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleInterest(tag)}
                aria-pressed={selected}
                className={`px-4 py-2.5 rounded-full text-base border-2 font-medium min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 ${
                  selected
                    ? "bg-orange-600 text-white border-orange-600"
                    : "bg-white text-stone-700 border-stone-300 hover:border-orange-400 hover:text-orange-700"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
        <div className="mt-6 flex items-center gap-4 flex-wrap">
          <button
            onClick={handleSave}
            className="bg-orange-600 hover:bg-orange-700 text-white text-base font-semibold px-6 py-3 rounded-xl min-h-[48px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
          >
            Save preferences
          </button>
          {saved && (
            <p role="status" className="text-base text-emerald-700 font-medium">
              ✓ Preferences saved
            </p>
          )}
        </div>
      </section>

      {/* Recommendations */}
      <section aria-labelledby="rec-heading">
        <h2 id="rec-heading" className="font-serif text-xl font-bold text-stone-900 mb-2">
          Picked just for you
        </h2>
        <p className="text-base text-stone-600 mb-5 hc-text-muted">
          Events that match your interests
        </p>

        {recommended.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-stone-300 p-8 text-center hc-card">
            <p className="text-base text-stone-600 hc-text-muted">
              Pick a few interests above to see personalised recommendations.
            </p>
          </div>
        ) : (
          <ul className="space-y-4" role="list">
            {recommended.map((event) => {
              const matched = getMatchedTags(fakeUser, event);
              return (
                <li key={event.id} className="bg-white rounded-2xl border border-stone-200 p-6 flex gap-5 hc-card">
                  <span className="text-4xl shrink-0" aria-hidden="true">{event.image}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif font-bold text-stone-900 text-lg">{event.title}</p>
                    <p className="text-base text-stone-600 mt-1 hc-text-muted">{event.date} · {event.time} · {event.location}</p>
                    <p className="text-base text-stone-700 mt-2 leading-relaxed">{event.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {matched.map((tag) => (
                        <span key={tag} className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full font-medium">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </ProtectedPage>
  );
}
