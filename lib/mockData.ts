import type { Student, TimetableEntry, Event, StudyRoom, Course } from "./types";

export const MOCK_STUDENTS: Student[] = [
  {
    id: "s001",
    name: "Emma Murphy",
    email: "emma.murphy@campus.ie",
    password: "campus123",
    course: "Computer Science",
    courseCode: "CS101",
    year: 1,
    studentId: "23456789",
    avatar: "EM",
    bio: "First-year CS student interested in web development and AI.",
    interests: ["tech", "gaming", "music", "hackathons", "film"],
  },
  {
    id: "s002",
    name: "Ciarán Walsh",
    email: "ciaran.walsh@campus.ie",
    password: "campus123",
    course: "Business & Management",
    courseCode: "BM101",
    year: 1,
    studentId: "23456790",
    avatar: "CW",
    bio: "Business student passionate about entrepreneurship and sport.",
    interests: ["sports", "entrepreneurship", "travel", "food", "networking"],
  },
];

export const TIMETABLE_CS: TimetableEntry[] = [
  { id: "t1",  module: "Introduction to Programming", moduleCode: "CS1001", type: "Lecture",  day: "Monday",    startTime: "09:00", endTime: "10:00", location: "Room A101", lecturer: "Dr. Sarah Kelly" },
  { id: "t2",  module: "Mathematics for CS",          moduleCode: "CS1002", type: "Lecture",  day: "Monday",    startTime: "11:00", endTime: "12:00", location: "Room B204", lecturer: "Prof. James O'Brien" },
  { id: "t3",  module: "Introduction to Programming", moduleCode: "CS1001", type: "Lab",      day: "Tuesday",   startTime: "14:00", endTime: "16:00", location: "Lab C301", lecturer: "Dr. Sarah Kelly" },
  { id: "t4",  module: "Systems Architecture",        moduleCode: "CS1003", type: "Lecture",  day: "Wednesday", startTime: "10:00", endTime: "11:00", location: "Room A101", lecturer: "Dr. Niamh Ryan" },
  { id: "t5",  module: "Mathematics for CS",          moduleCode: "CS1002", type: "Tutorial", day: "Wednesday", startTime: "14:00", endTime: "15:00", location: "Room D102", lecturer: "Prof. James O'Brien" },
  { id: "t6",  module: "Communications & Society",    moduleCode: "CS1004", type: "Lecture",  day: "Thursday",  startTime: "09:00", endTime: "10:00", location: "Hall E001", lecturer: "Ms. Claire Daly" },
  { id: "t7",  module: "Systems Architecture",        moduleCode: "CS1003", type: "Tutorial", day: "Friday",    startTime: "11:00", endTime: "12:00", location: "Room B204", lecturer: "Dr. Niamh Ryan" },
  { id: "t8",  module: "Introduction to Programming", moduleCode: "CS1001", type: "Exam",     day: "Friday",    startTime: "14:00", endTime: "16:00", location: "Exam Hall 1", lecturer: "Dr. Sarah Kelly", week: "Week 12" },
];

export const TIMETABLE_BM: TimetableEntry[] = [
  { id: "b1",  module: "Principles of Management",    moduleCode: "BM1001", type: "Lecture",  day: "Monday",    startTime: "10:00", endTime: "11:00", location: "Room F201", lecturer: "Prof. Anne Byrne" },
  { id: "b2",  module: "Business Economics",          moduleCode: "BM1002", type: "Lecture",  day: "Tuesday",   startTime: "09:00", endTime: "10:00", location: "Room G102", lecturer: "Dr. Paul Connolly" },
  { id: "b3",  module: "Principles of Management",    moduleCode: "BM1001", type: "Tutorial", day: "Tuesday",   startTime: "14:00", endTime: "15:00", location: "Room F102", lecturer: "Prof. Anne Byrne" },
  { id: "b4",  module: "Marketing Fundamentals",      moduleCode: "BM1003", type: "Lecture",  day: "Wednesday", startTime: "11:00", endTime: "12:00", location: "Hall E001", lecturer: "Ms. Joan Fitzgerald" },
  { id: "b5",  module: "Business Economics",          moduleCode: "BM1002", type: "Tutorial", day: "Thursday",  startTime: "10:00", endTime: "11:00", location: "Room G205", lecturer: "Dr. Paul Connolly" },
  { id: "b6",  module: "Accounting Basics",           moduleCode: "BM1004", type: "Lecture",  day: "Thursday",  startTime: "13:00", endTime: "14:00", location: "Room F201", lecturer: "Mr. Declan Foley" },
  { id: "b7",  module: "Marketing Fundamentals",      moduleCode: "BM1003", type: "Exam",     day: "Friday",    startTime: "09:00", endTime: "11:00", location: "Exam Hall 2", lecturer: "Ms. Joan Fitzgerald", week: "Week 12" },
];

export const EVENTS: Event[] = [
  { id: "e1", title: "Hackathon 2025",         description: "24-hour coding competition open to all years. Work in teams to build a product that solves a real campus problem.",                          date: "2025-05-10", time: "10:00", location: "Innovation Hub",    tags: ["tech", "hackathons", "gaming"],           capacity: 80,  registered: 64, organiser: "Computing Society", image: "💻" },
  { id: "e2", title: "Campus 5K Run",          description: "Fun run around the campus lake open to all students. All fitness levels welcome — it's about taking part!",                                  date: "2025-05-14", time: "08:30", location: "Campus Lake",        tags: ["sports", "health", "social"],             capacity: 200, registered: 134, organiser: "Athletics Club", image: "🏃" },
  { id: "e3", title: "Startup Pitch Night",    description: "Present your business idea to a panel of local entrepreneurs and investors. Win mentorship and seed funding.",                               date: "2025-05-17", time: "18:00", location: "Business School",   tags: ["entrepreneurship", "networking", "tech"],  capacity: 60,  registered: 48, organiser: "Entrepreneur Society", image: "🚀" },
  { id: "e4", title: "Film Club Screening",    description: "Weekly screening of a classic film followed by a group discussion. This week: 2001: A Space Odyssey.",                                      date: "2025-05-08", time: "19:00", location: "Arts Building",     tags: ["film", "arts", "social"],                 capacity: 40,  registered: 22, organiser: "Film Society", image: "🎬" },
  { id: "e5", title: "International Food Fair", description: "Sample food from over 20 countries, brought in by international student societies. Free entry for all students.",                           date: "2025-05-21", time: "12:00", location: "Student Plaza",     tags: ["food", "social", "travel", "culture"],    capacity: 500, registered: 210, organiser: "International Society", image: "🌍" },
  { id: "e6", title: "Music Open Mic Night",   description: "Grab the mic and share your talent — or just come and enjoy live music from your fellow students. Drinks provided.",                        date: "2025-05-09", time: "20:00", location: "Student Bar",       tags: ["music", "arts", "social"],                capacity: 120, registered: 67, organiser: "Music Society", image: "🎵" },
  { id: "e7", title: "CV & LinkedIn Workshop", description: "Learn how to write a standout CV and build your professional LinkedIn profile with guidance from the careers office.",                      date: "2025-05-13", time: "14:00", location: "Careers Centre",    tags: ["networking", "entrepreneurship", "career"], capacity: 50, registered: 38, organiser: "Careers Office", image: "📄" },
  { id: "e8", title: "Mindfulness & Wellbeing", description: "A guided mindfulness session for students. No experience needed — perfect if you're feeling exam stress.",                                 date: "2025-05-15", time: "17:00", location: "Wellness Centre",   tags: ["health", "social", "wellbeing"],          capacity: 30,  registered: 18, organiser: "Student Wellbeing", image: "🧘" },
];

export const STUDY_ROOMS: StudyRoom[] = [
  { id: "r1", name: "Silent Study Room A",  capacity: 8,  floor: "Ground", building: "Library",        features: ["Whiteboards", "Power sockets", "WiFi"] },
  { id: "r2", name: "Group Study Room B",   capacity: 12, floor: "First",  building: "Library",        features: ["Large screen", "Whiteboards", "Power sockets", "WiFi"] },
  { id: "r3", name: "Discussion Pod 1",     capacity: 4,  floor: "Ground", building: "Student Centre", features: ["Power sockets", "WiFi"] },
  { id: "r4", name: "Discussion Pod 2",     capacity: 4,  floor: "Ground", building: "Student Centre", features: ["Power sockets", "WiFi"] },
  { id: "r5", name: "Seminar Room 101",     capacity: 20, floor: "First",  building: "Main Block",     features: ["Projector", "Whiteboards", "Power sockets", "WiFi"] },
  { id: "r6", name: "Computer Lab C301",    capacity: 16, floor: "Third",  building: "Science Block",  features: ["Computers (x16)", "Power sockets", "WiFi", "Printer"] },
];

export const ROOM_TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export const COURSES_CS: Course[] = [
  {
    id: "c1", code: "CS1001", name: "Introduction to Programming", credits: 10,
    lecturer: "Dr. Sarah Kelly", email: "s.kelly@campus.ie",
    description: "Fundamentals of programming using Python. Covers variables, control flow, functions, data structures, and object-oriented principles.",
    modules: ["Variables & Data Types", "Control Flow", "Functions", "Lists & Dictionaries", "OOP Basics", "File I/O"],
    assessments: [
      { title: "Lab Portfolio",       type: "Practical",   weight: 30, dueDate: "2025-04-30" },
      { title: "Mid-Term Assignment", type: "Assignment",  weight: 20, dueDate: "2025-03-14" },
      { title: "Final Exam",          type: "Exam",        weight: 50, dueDate: "2025-05-16" },
    ],
  },
  {
    id: "c2", code: "CS1002", name: "Mathematics for CS", credits: 10,
    lecturer: "Prof. James O'Brien", email: "j.obrien@campus.ie",
    description: "Discrete mathematics, logic, set theory, and probability relevant to computer science. Builds the mathematical foundation for algorithms and data structures.",
    modules: ["Logic & Proofs", "Set Theory", "Graph Theory", "Probability", "Combinatorics", "Number Theory"],
    assessments: [
      { title: "Weekly Problem Sets", type: "Assignment",  weight: 40, dueDate: "Ongoing" },
      { title: "Final Exam",          type: "Exam",        weight: 60, dueDate: "2025-05-20" },
    ],
  },
  {
    id: "c3", code: "CS1003", name: "Systems Architecture", credits: 10,
    lecturer: "Dr. Niamh Ryan", email: "n.ryan@campus.ie",
    description: "Introduction to computer organisation, memory hierarchy, CPU architecture, and operating systems fundamentals.",
    modules: ["Binary & Number Systems", "CPU Architecture", "Memory Hierarchy", "I/O Systems", "OS Basics", "Networking Intro"],
    assessments: [
      { title: "Architecture Project", type: "Project",   weight: 30, dueDate: "2025-04-25" },
      { title: "Final Exam",           type: "Exam",      weight: 70, dueDate: "2025-05-22" },
    ],
  },
];

export const COURSES_BM: Course[] = [
  {
    id: "b1", code: "BM1001", name: "Principles of Management", credits: 10,
    lecturer: "Prof. Anne Byrne", email: "a.byrne@campus.ie",
    description: "Core management theories and their application in modern organisations. Covers planning, organising, leading, and controlling.",
    modules: ["Management History", "Planning & Strategy", "Organisational Structure", "Leadership", "Motivation", "Control Systems"],
    assessments: [
      { title: "Case Study Report", type: "Assignment", weight: 40, dueDate: "2025-04-18" },
      { title: "Final Exam",        type: "Exam",       weight: 60, dueDate: "2025-05-18" },
    ],
  },
  {
    id: "b2", code: "BM1002", name: "Business Economics", credits: 10,
    lecturer: "Dr. Paul Connolly", email: "p.connolly@campus.ie",
    description: "Micro and macroeconomic principles applied to business decision-making. Supply and demand, market structures, GDP, and fiscal policy.",
    modules: ["Supply & Demand", "Market Structures", "Consumer Theory", "GDP & Growth", "Inflation", "Fiscal Policy"],
    assessments: [
      { title: "Economic Analysis",  type: "Assignment", weight: 30, dueDate: "2025-04-10" },
      { title: "Final Exam",         type: "Exam",       weight: 70, dueDate: "2025-05-19" },
    ],
  },
  {
    id: "b3", code: "BM1003", name: "Marketing Fundamentals", credits: 10,
    lecturer: "Ms. Joan Fitzgerald", email: "j.fitzgerald@campus.ie",
    description: "Introduction to marketing concepts including the marketing mix, consumer behaviour, market research, and digital marketing basics.",
    modules: ["Marketing Mix (4Ps)", "Consumer Behaviour", "Market Research", "Branding", "Digital Marketing", "Campaign Planning"],
    assessments: [
      { title: "Marketing Plan",  type: "Project",   weight: 50, dueDate: "2025-04-28" },
      { title: "Final Exam",      type: "Exam",      weight: 50, dueDate: "2025-05-15" },
    ],
  },
];
