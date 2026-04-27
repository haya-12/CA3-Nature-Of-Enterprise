"use client";

import { useState } from "react";
import ProtectedPage from "../_components/ProtectedPage";
import { useAuth } from "../_components/AuthProvider";
import { TIMETABLE_CS, TIMETABLE_BM } from "@/lib/mockData";
import type { TimetableEntry } from "@/lib/types";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const TYPE_STYLES: Record<TimetableEntry["type"], string> = {
  Lecture:  "bg-amber-100 text-amber-900 border-amber-300",
  Tutorial: "bg-emerald-100 text-emerald-900 border-emerald-300",
  Lab:      "bg-orange-100 text-orange-900 border-orange-300",
  Exam:     "bg-rose-100 text-rose-900 border-rose-300",
};

export default function TimetablePage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"weekly" | "exams">("weekly");

  const entries: TimetableEntry[] =
    user?.courseCode === "CS101" ? TIMETABLE_CS : TIMETABLE_BM;

  const weekly = entries.filter((e) => e.type !== "Exam");
  const exams  = entries.filter((e) => e.type === "Exam");

  return (
    <ProtectedPage>
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold text-stone-900">My Timetable</h1>
          <p className="text-stone-600 mt-2 text-base">Your week at a glance</p>
        </div>
        <div role="tablist" aria-label="Timetable view" className="flex bg-stone-100 rounded-xl p-1.5 hc-card">
          {(["weekly", "exams"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-lg text-base font-medium min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                tab === t ? "bg-white text-orange-700 shadow-sm" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {t === "weekly" ? "Weekly" : "Exams"}
            </button>
          ))}
        </div>
      </div>

      {tab === "weekly" && (
        <section aria-label="Weekly schedule">
          <div className="space-y-8">
            {DAYS.map((day) => {
              const dayEntries = weekly.filter((e) => e.day === day);
              return (
                <div key={day}>
                  <h2 className="font-serif text-xl font-semibold text-stone-900 mb-3">{day}</h2>
                  {dayEntries.length === 0 ? (
                    <p className="text-base text-stone-500 italic pl-1 hc-text-muted">No classes</p>
                  ) : (
                    <ul className="space-y-3" role="list">
                      {dayEntries
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map((entry) => (
                          <li
                            key={entry.id}
                            className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-sm transition-shadow hc-card"
                          >
                            <div className="text-base font-mono font-medium text-stone-700 w-32 shrink-0 hc-text-muted">
                              {entry.startTime} – {entry.endTime}
                            </div>
                            <span className={`text-sm font-semibold px-3 py-1 rounded-lg border-2 w-24 text-center shrink-0 ${TYPE_STYLES[entry.type]}`}>
                              {entry.type}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-stone-900 text-lg">{entry.module}</p>
                              <p className="text-sm text-stone-600 mt-1 hc-text-muted">
                                {entry.moduleCode} · {entry.location} · {entry.lecturer}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {tab === "exams" && (
        <section aria-label="Exam timetable">
          {exams.length === 0 ? (
            <p className="text-stone-500 text-base">No exams scheduled yet.</p>
          ) : (
            <ul className="space-y-4" role="list">
              {exams.map((exam) => (
                <li
                  key={exam.id}
                  className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 hc-card"
                >
                  <span className="text-3xl shrink-0" aria-hidden="true">📝</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif font-bold text-stone-900 text-lg">{exam.module}</p>
                    <p className="text-base text-stone-700 mt-1">
                      {exam.moduleCode} · {exam.week ?? "Exam period"}
                    </p>
                    <p className="text-base text-stone-600 mt-0.5">
                      {exam.day} · {exam.startTime} – {exam.endTime} · {exam.location}
                    </p>
                  </div>
                  <span className="bg-rose-200 text-rose-900 text-sm font-semibold px-4 py-1.5 rounded-full border-2 border-rose-300 shrink-0">
                    Exam
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </ProtectedPage>
  );
}
