import type { ResumeData } from "@/types/resume";

export const dummyResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    jobTitle: "Full Stack Developer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA, USA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    objective:
      "Passionate Full Stack Developer with 5+ years of experience in building scalable web applications. Seeking a challenging role to leverage my skills in React, Node.js, and cloud technologies.",
  },
  education: [
    {
      id: "1",
      degree: "Bachelor of Science",
      school: "Computer Science",
      university: "California Institute of Technology",
      startYear: "2016",
      endYear: "2020",
      cgpa: "3.8",
    },
  ],
  skills: [
    { id: "1", category: "technical", name: "React.js" },
    { id: "2", category: "technical", name: "Node.js" },
    { id: "3", category: "technical", name: "TypeScript" },
    { id: "4", category: "technical", name: "PostgreSQL" },
    { id: "5", category: "technical", name: "AWS" },
    { id: "6", category: "soft", name: "Team Leadership" },
    { id: "7", category: "soft", name: "Problem Solving" },
    { id: "8", category: "soft", name: "Communication" },
  ],
  qualifications: [
    {
      id: "1",
      title: "AWS Solutions Architect Associate",
      description: "Certified cloud architect with expertise in AWS services",
      date: "2022",
    },
    {
      id: "2",
      title: "Google Cloud Associate Cloud Engineer",
      description: "Proficient in Google Cloud Platform services",
      date: "2021",
    },
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "Built a full-stack e-commerce platform serving 100K+ users",
      technologies: "React, Node.js, MongoDB, Stripe",
      link: "github.com/johndoe/ecommerce",
    },
    {
      id: "2",
      title: "Real-time Analytics Dashboard",
      description:
        "Developed real-time data visualization dashboard for enterprise clients",
      technologies: "React, D3.js, WebSocket, PostgreSQL",
      link: "github.com/johndoe/analytics",
    },
  ],
  experience: [
    {
      id: "1",
      company: "Tech Innovations Inc.",
      role: "Senior Full Stack Developer",
      startDate: "2022-01",
      endDate: "Present",
      description:
        "Led development of microservices architecture, mentored junior developers, and improved system performance by 40%",
    },
    {
      id: "2",
      company: "Digital Solutions Ltd.",
      role: "Full Stack Developer",
      startDate: "2020-06",
      endDate: "2021-12",
      description:
        "Developed and maintained multiple client-facing web applications, reduced load time by 35%, implemented automated testing",
    },
  ],
  documents: [],
};
