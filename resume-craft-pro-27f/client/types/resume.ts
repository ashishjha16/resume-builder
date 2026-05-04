// Resume data structure
export interface EducationEntry {
  id: string;
  degree: string;
  school: string;
  university: string;
  startYear: string;
  endYear: string;
  cgpa: string;
}

export interface SkillEntry {
  id: string;
  category: "technical" | "soft";
  name: string;
}

export interface QualificationEntry {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface DocumentFile {
  id: string;
  type: "profile" | "certificate" | "portfolio" | "other";
  file: File;
  name: string;
  url: string;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  objective: string;
  profileImage?: DocumentFile;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: EducationEntry[];
  skills: SkillEntry[];
  qualifications: QualificationEntry[];
  projects: ProjectEntry[];
  experience: ExperienceEntry[];
  documents: DocumentFile[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface VisitorHistoryEntry {
  id: string;
  visitorId: string;
  visitorName?: string;
  email?: string;
  phone?: string;
  pageVisited: string;
  action: string;
  authStatus: "guest" | "logged_in" | "signed_up";
  loginSignupStatus?: "login" | "signup" | "none";
  activityCount?: number;
  orderOrHistory?: string;
  visitDate: string;
  visitTime: string;
  createdAt: string;
}
