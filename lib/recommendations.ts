import type { Event, Student } from "./types";

/**
 * Simple interest-matching recommendation engine.
 * Scores each event by the number of tag overlaps with the student's interests.
 * Ties are broken by registration rate (popularity).
 */
export function getRecommendedEvents(student: Student, events: Event[]): Event[] {
  const interestSet = new Set(student.interests.map((i) => i.toLowerCase()));

  const scored = events.map((event) => {
    const tagMatches = event.tags.filter((tag) =>
      interestSet.has(tag.toLowerCase())
    ).length;

    // Normalised popularity as a secondary signal (0–1)
    const popularity = event.capacity > 0 ? event.registered / event.capacity : 0;

    // Score = tag matches + small popularity boost
    const score = tagMatches + popularity * 0.3;

    return { event, score, tagMatches };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.event);
}

/** Returns the matched interest tags for an event + student pair */
export function getMatchedTags(student: Student, event: Event): string[] {
  const interestSet = new Set(student.interests.map((i) => i.toLowerCase()));
  return event.tags.filter((tag) => interestSet.has(tag.toLowerCase()));
}
