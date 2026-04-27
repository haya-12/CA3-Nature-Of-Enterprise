export interface Student {
  id: string;
  name: string;
  email: string;
  password: string;
  course: string;
  courseCode: string;
  year: number;
  studentId: string;
  avatar: string;
  bio: string;
  interests: string[];
}

export interface TimetableEntry {
  id: string;
  module: string;
  moduleCode: string;
  type: "Lecture" | "Tutorial" | "Lab" | "Exam";
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  startTime: string;
  endTime: string;
  location: string;
  lecturer: string;
  week?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  capacity: number;
  registered: number;
  organiser: string;
  image: string;
}

export interface StudyRoom {
  id: string;
  name: string;
  capacity: number;
  floor: string;
  building: string;
  features: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
  email: string;
  description: string;
  modules: string[];
  assessments: Assessment[];
}

export interface Assessment {
  title: string;
  type: "Exam" | "Assignment" | "Project" | "Practical";
  weight: number;
  dueDate: string;
}

export interface FeedbackForm {
  category: string;
  subject: string;
  message: string;
  rating: number;
}

export interface SupportForm {
  category: string;
  subject: string;
  description: string;
  urgency: "Low" | "Medium" | "High";
}
