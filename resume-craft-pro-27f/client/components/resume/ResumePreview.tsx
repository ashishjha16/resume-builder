import type { ResumeData } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { generateResumePDF } from "@/lib/pdfGenerator";
import { Download, FileText } from "lucide-react";
import { useState } from "react";

interface ResumePreviewProps {
  data: ResumeData;
  onGeneratePDF?: () => void;
}

export function ResumePreview({ data, onGeneratePDF }: ResumePreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      generateResumePDF(data);
    } finally {
      setIsGenerating(false);
    }
    onGeneratePDF?.();
  };

  return (
    <div className="space-y-4">
      {/* PDF Generation Button */}
      <Button
        onClick={handleGeneratePDF}
        disabled={isGenerating || !data.personalInfo.fullName}
        className="w-full h-10"
        size="lg"
      >
        {isGenerating ? (
          <>
            <span className="inline-block animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"></span>
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Generate & Download Resume
          </>
        )}
      </Button>

      {/* Resume Preview */}
      <div className="bg-white border border-border rounded-lg overflow-hidden shadow-lg">
        {/* Preview Container (A4 size) */}
        <div className="aspect-[8.5/11] bg-white p-8 overflow-y-auto text-black text-sm">
          {/* Header with optional profile photo */}
          <div className="mb-4 border-b-2 border-blue-600 pb-4">
            <div className="flex gap-4 items-start">
              {/* Profile Photo */}
              {data.personalInfo.profileImage && (
                <div className="flex-shrink-0">
                  <img
                    src={data.personalInfo.profileImage.url}
                    alt="Profile"
                    className="w-20 h-24 rounded-lg object-cover border border-gray-300"
                  />
                </div>
              )}

              {/* Name and Title */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-blue-600">
                  {data.personalInfo.fullName || "Your Name"}
                </h1>
                <p className="text-gray-600 font-semibold">
                  {data.personalInfo.jobTitle || "Job Title"}
                </p>

                {/* Contact Info */}
                <div className="text-xs text-gray-700 mt-2 space-y-0.5">
                  {data.personalInfo.email && (
                    <p>{data.personalInfo.email}</p>
                  )}
                  {data.personalInfo.phone && (
                    <p>{data.personalInfo.phone}</p>
                  )}
                  {data.personalInfo.address && (
                    <p>{data.personalInfo.address}</p>
                  )}
                  {(data.personalInfo.linkedin || data.personalInfo.github) && (
                    <p>
                      {[data.personalInfo.linkedin, data.personalInfo.github]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          {data.personalInfo.objective && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">
                Professional Summary
              </h2>
              <p className="text-gray-800 text-xs leading-relaxed">
                {data.personalInfo.objective}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1.5">
                Experience
              </h2>
              <div className="space-y-1.5">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-gray-800">
                        {exp.role}
                      </p>
                      <span className="text-xs text-gray-600">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700">
                      {exp.company}
                    </p>
                    <p className="text-xs text-gray-800 mt-0.5 leading-tight">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1.5">
                Education
              </h2>
              <div className="space-y-1.5">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-gray-800">
                        {edu.degree} in {edu.school}
                      </p>
                      <span className="text-xs text-gray-600">
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700">
                      {edu.university} • CGPA: {edu.cgpa}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1.5">
                Skills
              </h2>
              <div className="space-y-1">
                {/* Technical Skills */}
                {data.skills.filter((s) => s.category === "technical").length >
                  0 && (
                  <div>
                    <p className="font-semibold text-gray-800 text-xs">
                      Technical:
                    </p>
                    <p className="text-xs text-gray-800">
                      {data.skills
                        .filter((s) => s.category === "technical")
                        .map((s) => s.name)
                        .join(", ")}
                    </p>
                  </div>
                )}

                {/* Soft Skills */}
                {data.skills.filter((s) => s.category === "soft").length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-800 text-xs">
                      Soft Skills:
                    </p>
                    <p className="text-xs text-gray-800">
                      {data.skills
                        .filter((s) => s.category === "soft")
                        .map((s) => s.name)
                        .join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1.5">
                Projects
              </h2>
              <div className="space-y-1.5">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <p className="font-semibold text-gray-800">
                      {project.title}
                    </p>
                    <p className="text-xs text-gray-800 leading-tight">
                      {project.description}
                    </p>
                    <p className="text-xs text-gray-700">
                      Tech: {project.technologies}
                    </p>
                    {project.link && (
                      <p className="text-xs text-gray-700">
                        Link: {project.link}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.qualifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1.5">
                Certifications & Achievements
              </h2>
              <div className="space-y-1">
                {data.qualifications.map((qual) => (
                  <div key={qual.id}>
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-gray-800">
                        {qual.title}
                      </p>
                      <span className="text-xs text-gray-600">
                        {qual.date}
                      </span>
                    </div>
                    {qual.description && (
                      <p className="text-xs text-gray-800">
                        {qual.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Message */}
      {!data.personalInfo.fullName && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900">
          <FileText className="w-4 h-4 inline mr-2" />
          Please fill in at least your full name to generate a resume.
        </div>
      )}
    </div>
  );
}
