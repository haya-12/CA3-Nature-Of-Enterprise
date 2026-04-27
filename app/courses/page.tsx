"use client";

import { useState } from "react";
import ProtectedPage from "../_components/ProtectedPage";
import { useAuth } from "../_components/AuthProvider";
import { COURSES_CS, COURSES_BM } from "@/lib/mockData";
import type { Course } from "@/lib/types";

const TYPE_BADGE: Record<string, string> = {
  Exam:       "bg-rose-100 text-rose-900 border-rose-300",
  Assignment: "bg-amber-100 text-amber-900 border-amber-300",
  Project:    "bg-orange-100 text-orange-900 border-orange-300",
  Practical:  "bg-emerald-100 text-emerald-900 border-emerald-300",
};

function CourseCard({ course }: { course: Course }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden hc-card">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left px-6 py-5 flex items-center gap-4 hover:bg-orange-50/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-500 min-h-[64px]"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-orange-100 text-orange-800 text-sm font-bold px-2.5 py-1 rounded-md font-mono">{course.code}</span>
            <h2 className="font-serif font-bold text-stone-900 text-lg">{course.name}</h2>
          </div>
          <p className="text-base text-stone-600 mt-1 hc-text-muted">{course.lecturer} · {course.credits} credits</p>
        </div>
        <span aria-hidden="true" className="text-stone-400 text-2xl shrink-0">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-stone-100">
          <p className="text-base text-stone-700 mt-5 mb-4 leading-relaxed">{course.description}</p>
          <p className="text-sm text-stone-600 mb-5 hc-text-muted">
            📧 <a href={`mailto:${course.email}`} className="text-orange-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded">{course.email}</a>
          </p>

          <div className="mb-6">
            <h3 className="font-serif text-base font-bold text-stone-900 mb-3">Topics covered</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.modules.map((m) => (
                <li key={m} className="text-base text-stone-700 flex items-start gap-2">
                  <span aria-hidden="true" className="text-orange-500 mt-0.5">•</span>{m}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base font-bold text-stone-900 mb-3">Assessments</h3>
            <ul className="space-y-2.5">
              {course.assessments.map((a) => (
                <li key={a.title} className="flex items-center gap-3 text-base flex-wrap">
                  <span className={`text-sm px-3 py-1 rounded-md border-2 font-semibold w-28 text-center shrink-0 ${TYPE_BADGE[a.type] ?? ""}`}>
                    {a.type}
                  </span>
                  <span className="font-medium text-stone-800 flex-1 min-w-[120px]">{a.title}</span>
                  <span className="text-stone-700 text-sm shrink-0 font-medium">{a.weight}%</span>
                  <span className="text-stone-500 text-sm shrink-0 hc-text-muted">{a.dueDate}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CoursesPage() {
  const { user } = useAuth();
  const courses: Course[] = user?.courseCode === "CS101" ? COURSES_CS : COURSES_BM;
  return (
    <ProtectedPage>
      <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">My Courses</h1>
      <p className="text-stone-600 mb-8 text-base">
        {user?.course} · Year {user?.year} · Tap a course to see modules and assessments
      </p>
      <ul className="space-y-4" role="list">
        {courses.map((course) => (
          <li key={course.id}><CourseCard course={course} /></li>
        ))}
      </ul>
    </ProtectedPage>
  );
}
