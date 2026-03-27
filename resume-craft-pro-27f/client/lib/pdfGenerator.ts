import { jsPDF } from "jspdf";
import type { ResumeData } from "@/types/resume";

// Generate PDF from resume data
export const generateResumePDF = (data: ResumeData) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.getPageWidth();
  const pageHeight = doc.getPageHeight();
  const margin = 12;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Set default font
  doc.setFont("helvetica", "normal");

  // Helper function to add spacing
  const addSpacing = (space: number = 5) => {
    yPosition += space;
  };

  // Helper function to check if we need a new page
  const checkPageBreak = (spaceNeeded: number = 15) => {
    if (yPosition + spaceNeeded > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
  };

  // Helper function to add section title
  const addSectionTitle = (title: string) => {
    checkPageBreak();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(23, 114, 175); // Primary color
    doc.text(title, margin, yPosition);
    yPosition += 5;
    doc.setDrawColor(23, 114, 175);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 4;
    doc.setTextColor(0, 0, 0);
  };

  // Helper function to wrap text
  const wrapText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number = 4
  ) => {
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length * lineHeight;
  };

  // 1. Personal Information
  // Check if we have a profile image
  let hasProfileImage = false;
  if (data.personalInfo.profileImage) {
    try {
      // Add profile image to the left
      const imgWidth = 25;
      const imgHeight = 30;
      doc.addImage(
        data.personalInfo.profileImage.url,
        "JPEG",
        margin,
        yPosition,
        imgWidth,
        imgHeight
      );
      hasProfileImage = true;
    } catch (error) {
      console.error("Failed to add profile image to PDF:", error);
    }
  }

  // Name and title (positioned to the right of image if it exists)
  const nameX = hasProfileImage ? margin + 30 : margin;
  const nameWidth = hasProfileImage ? contentWidth - 30 : contentWidth;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(23, 114, 175);
  doc.text(data.personalInfo.fullName, nameX, yPosition);
  yPosition += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);

  const contactInfo = [
    data.personalInfo.jobTitle,
    data.personalInfo.email,
    data.personalInfo.phone,
  ]
    .filter(Boolean)
    .join(" | ");
  wrapText(contactInfo, nameX, yPosition, nameWidth);
  yPosition += 5;

  if (data.personalInfo.address) {
    wrapText(data.personalInfo.address, nameX, yPosition, nameWidth);
    yPosition += 4;
  }

  // Adjust yPosition if image was added
  if (hasProfileImage) {
    yPosition = Math.max(yPosition, margin + 35);
  }

  doc.setTextColor(0, 0, 0);
  addSpacing(3);

  // 2. Professional Summary
  if (data.personalInfo.objective) {
    addSectionTitle("PROFESSIONAL SUMMARY");
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const objectiveHeight = wrapText(
      data.personalInfo.objective,
      margin,
      yPosition,
      contentWidth,
      4
    );
    yPosition += objectiveHeight + 2;
    addSpacing(2);
  }

  // 3. Experience
  if (data.experience.length > 0) {
    addSectionTitle("EXPERIENCE");
    doc.setFontSize(9);

    data.experience.forEach((exp, index) => {
      if (index > 0) addSpacing(1);
      checkPageBreak(12);

      doc.setFont("helvetica", "bold");
      doc.text(exp.role, margin, yPosition);
      yPosition += 4;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      const dateRange = `${exp.startDate} - ${exp.endDate}`;
      doc.text(`${exp.company} | ${dateRange}`, margin, yPosition);
      yPosition += 4;

      doc.setTextColor(0, 0, 0);
      const descHeight = wrapText(
        exp.description,
        margin,
        yPosition,
        contentWidth,
        4
      );
      yPosition += descHeight + 2;
    });

    addSpacing(2);
  }

  // 4. Education
  if (data.education.length > 0) {
    addSectionTitle("EDUCATION");
    doc.setFontSize(9);

    data.education.forEach((edu, index) => {
      if (index > 0) addSpacing(1);
      checkPageBreak(12);

      doc.setFont("helvetica", "bold");
      doc.text(`${edu.degree} in ${edu.school}`, margin, yPosition);
      yPosition += 4;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(
        `${edu.university} | ${edu.startYear} - ${edu.endYear} | CGPA: ${edu.cgpa}`,
        margin,
        yPosition
      );
      yPosition += 4;

      doc.setTextColor(0, 0, 0);
    });

    addSpacing(2);
  }

  // 5. Skills
  if (data.skills.length > 0) {
    addSectionTitle("SKILLS");
    doc.setFontSize(9);

    const technicalSkills = data.skills
      .filter((s) => s.category === "technical")
      .map((s) => s.name);
    const softSkills = data.skills
      .filter((s) => s.category === "soft")
      .map((s) => s.name);

    if (technicalSkills.length > 0) {
      checkPageBreak();
      doc.setFont("helvetica", "bold");
      doc.text("Technical:", margin, yPosition);
      yPosition += 3;
      doc.setFont("helvetica", "normal");
      const techHeight = wrapText(
        technicalSkills.join(", "),
        margin + 5,
        yPosition,
        contentWidth - 5,
        4
      );
      yPosition += techHeight + 1;
    }

    if (softSkills.length > 0) {
      checkPageBreak();
      doc.setFont("helvetica", "bold");
      doc.text("Soft Skills:", margin, yPosition);
      yPosition += 3;
      doc.setFont("helvetica", "normal");
      const softHeight = wrapText(
        softSkills.join(", "),
        margin + 5,
        yPosition,
        contentWidth - 5,
        4
      );
      yPosition += softHeight;
    }

    addSpacing(2);
  }

  // 6. Projects
  if (data.projects.length > 0) {
    addSectionTitle("PROJECTS");
    doc.setFontSize(9);

    data.projects.forEach((project, index) => {
      if (index > 0) addSpacing(1);
      checkPageBreak(12);

      doc.setFont("helvetica", "bold");
      doc.text(project.title, margin, yPosition);
      yPosition += 4;

      doc.setFont("helvetica", "normal");
      const descHeight = wrapText(
        project.description,
        margin,
        yPosition,
        contentWidth,
        4
      );
      yPosition += descHeight + 1;

      doc.setTextColor(80, 80, 80);
      doc.text(`Technologies: ${project.technologies}`, margin, yPosition);
      yPosition += 3;

      if (project.link) {
        doc.text(`Link: ${project.link}`, margin, yPosition);
        yPosition += 3;
      }

      doc.setTextColor(0, 0, 0);
    });

    addSpacing(2);
  }

  // 7. Certifications
  if (data.qualifications.length > 0) {
    addSectionTitle("CERTIFICATIONS & ACHIEVEMENTS");
    doc.setFontSize(9);

    data.qualifications.forEach((qual, index) => {
      if (index > 0) addSpacing(1);
      checkPageBreak(10);

      doc.setFont("helvetica", "bold");
      doc.text(qual.title, margin, yPosition);
      yPosition += 4;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(qual.date, margin, yPosition);
      yPosition += 3;

      if (qual.description) {
        doc.setTextColor(0, 0, 0);
        const descHeight = wrapText(
          qual.description,
          margin,
          yPosition,
          contentWidth,
          4
        );
        yPosition += descHeight + 1;
      }
    });
  }

  // Save the PDF
  doc.save(`${data.personalInfo.fullName}-Resume.pdf`);
};
