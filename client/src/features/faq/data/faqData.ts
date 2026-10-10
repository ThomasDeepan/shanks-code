/**
 * FAQ content — single source of truth.
 *
 * Every answer below is grounded in services that already exist in the project
 * (programs catalog, campus workshops, internships, applied R&D, MoUs and the
 * Student Portal). No unsupported claims, guarantees, pricing or placement
 * numbers have been introduced.
 */

export interface FaqItem {
  question: string;
  answer: string;
  /** Grouping used by the filter chips on the About page. */
  topic: 'about' | 'programs' | 'workshops' | 'portal';
}

export const faqItems: FaqItem[] = [
  {
    topic: 'about',
    question: 'What is Shank’s Code?',
    answer:
      'Shank’s Code Edutech is a technical training and applied R&D organisation founded in 2023 in ' +
      'Villupuram, Tamil Nadu. We work with engineering and polytechnic students, colleges and industry ' +
      'partners on three things: practical technical training, AICTE-approved internships, and applied ' +
      'research that is built, bench-tested and taken through to deployment or patent filing.',
  },
  {
    topic: 'programs',
    question: 'What programs does Shank’s Code offer?',
    answer:
      'Eight applied tracks across two groupings — Software & Data Systems (Python & Data Analytics, ' +
      'Full Stack Web Development, Cloud Computing & DevOps, Cybersecurity & Defenses) and Intelligence & ' +
      'Physical Systems (Embedded Systems & IoT, Artificial Intelligence & ML, Robotics & Automation, ' +
      'Smart Agriculture & AgriTech). The full catalog with durations and skill lists is on the ' +
      'Programs page.',
  },
  {
    topic: 'programs',
    question: 'Who can join the programs?',
    answer:
      'Engineering and polytechnic students who want practical, project-based technical training. ' +
      'Sessions run in classroom, online and hybrid modes, and entry requirements are published per ' +
      'training batch rather than as a single blanket rule.',
  },
  {
    topic: 'programs',
    question: 'Do students get internships and certificates?',
    answer:
      'Yes. Internships are delivered on live industry projects and systems under an AICTE-approved ' +
      'workflow, and each program closes with a reviewed, recordable deliverable plus a verified ' +
      'completion certificate backed by the internship workflow and a project defense.',
  },
  {
    topic: 'workshops',
    question: 'Does Shank’s Code conduct college workshops?',
    answer:
      'Yes. We run hands-on technical workshops for engineering colleges, polytechnic colleges and ' +
      'academic institutions, and we tailor the session format around the technical domain your students ' +
      'need. Documented sessions include UCEV (Villupuram), a polytechnic student workshop in Vellore, ' +
      'MAM Engineering College and Saveetha Engineering College.',
  },
  {
    topic: 'workshops',
    question: 'How can a college collaborate with Shank’s Code?',
    answer:
      'Through MoUs, faculty enablement and shared lab access for applied R&D, through skill-development ' +
      'programmes that align course outcomes with workplace expectations, or by hosting a campus workshop. ' +
      'Use the workshop request option on the Workshops page or email admin@shankscode.com to start the ' +
      'conversation.',
  },
  {
    topic: 'about',
    question: 'What technical domains are covered?',
    answer:
      'Four capability domains: Software Systems (architecture & cloud), AI & Data Science (intelligent ' +
      'systems), IoT & Embedded (hardware systems), and the Applied R&D Lab itself (engineering research). ' +
      'Programs, workshops and research engagements are all built on these.',
  },
  {
    topic: 'portal',
    question: 'What is the Student Portal?',
    answer:
      'The Student Portal is the authenticated area of the site. Students create an account or sign in, and ' +
      'then reach their dashboard, enrolled coursework and lesson progression. Announcements, internship ' +
      'information, certificates and applications are surfaced in the same place as backend support for ' +
      'those records is confirmed.',
  },
  {
    topic: 'portal',
    question: 'How can students register?',
    answer:
      'Create an account from the Student Portal entry point using your email address and a password. ' +
      'Enrollment into a specific program or cohort is then confirmed by the Shank’s Code team — ' +
      'registering an account does not by itself enrol you in a batch.',
  },
];

/** Convenience subsets so a page can show only the questions it needs. */
export const faqByTopic = (topics: FaqItem['topic'][]): FaqItem[] =>
  faqItems.filter((item) => topics.includes(item.topic));

export const PROGRAM_FAQ = faqByTopic(['programs']);
export const WORKSHOP_FAQ = faqByTopic(['workshops']);
