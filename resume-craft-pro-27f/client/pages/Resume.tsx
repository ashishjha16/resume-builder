import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { getAuthUser, getResumeData, saveResumeData, getDraft, saveDraft } from "@/lib/storage";
import { dummyResumeData } from "@/lib/dummyData";
import type { ResumeData } from "@/types/resume";
import { PersonalInfoForm } from "@/components/resume/PersonalInfoForm";
import { EducationForm } from "@/components/resume/EducationForm";
import { SkillsForm } from "@/components/resume/SkillsForm";
import { QualificationsForm } from "@/components/resume/QualificationsForm";
import { ProjectsForm } from "@/components/resume/ProjectsForm";
import { ExperienceForm } from "@/components/resume/ExperienceForm";
import { DocumentUpload } from "@/components/resume/DocumentUpload";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { LogOut, Download, RotateCcw } from "lucide-react";

export default function Resume() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(true);
  const user = getAuthUser();

  // Initialize data on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      // Load existing resume data or draft
      const saved = getResumeData();
      const draft = getDraft();

      if (saved) {
        setResumeData(saved);
      } else if (draft) {
        setResumeData(draft);
      } else {
        // Create new resume with basic user info
        setResumeData({
          ...dummyResumeData,
          personalInfo: {
            ...dummyResumeData.personalInfo,
            fullName: "",
            email: user.email,
            phone: user.phone,
          },
        });
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate, user]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!resumeData) return;

    const interval = setInterval(() => {
      saveDraft(resumeData);
    }, 30000); // Save every 30 seconds

    return () => clearInterval(interval);
  }, [resumeData]);

  const handleSave = () => {
    if (resumeData) {
      saveResumeData(resumeData);
      toast({
        title: "Success",
        description: "Resume saved successfully!",
      });
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the form? This will clear all data."
      )
    ) {
      const newData = {
        ...dummyResumeData,
        personalInfo: {
          ...dummyResumeData.personalInfo,
          fullName: "",
          email: user?.email || "",
          phone: user?.phone || "",
        },
        education: [],
        skills: [],
        qualifications: [],
        projects: [],
        experience: [],
        documents: [],
      };
      setResumeData(newData);
      toast({
        title: "Reset",
        description: "Form has been reset to empty.",
      });
    }
  };

  const handleLoadDummy = () => {
    setResumeData(dummyResumeData);
    toast({
      title: "Sample Data Loaded",
      description: "Dummy data has been filled in for testing.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("resumeBuilderUser");
    navigate("/auth");
  };

  if (loading || !resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-muted-foreground">Loading resume builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Resume Builder</h1>
            <p className="text-sm text-muted-foreground">
              Welcome, {user?.name || "User"}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              variant="default"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Save Resume
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* Tabs Navigation */}
                <TabsList className="w-full justify-start border-b border-border rounded-none bg-gray-50">
                  <TabsTrigger value="personal" className="rounded-none">
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="education" className="rounded-none">
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="rounded-none">
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="qualifications" className="rounded-none">
                    Qualifications
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="rounded-none">
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="rounded-none">
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="rounded-none">
                    Documents
                  </TabsTrigger>
                </TabsList>

                {/* Tabs Content */}
                <div className="p-6 space-y-6">
                  {/* Personal Information */}
                  <TabsContent value="personal" className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-1">
                        Personal Information
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Fill in your basic information that will appear at the top of your resume.
                      </p>
                    </div>
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      onChange={(personalInfo) =>
                        setResumeData({ ...resumeData, personalInfo })
                      }
                    />
                  </TabsContent>

                  {/* Education */}
                  <TabsContent value="education" className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-1">
                        Education
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Add your educational background and qualifications.
                      </p>
                    </div>
                    <EducationForm
                      data={resumeData.education}
                      onChange={(education) =>
                        setResumeData({ ...resumeData, education })
                      }
                    />
                  </TabsContent>

                  {/* Skills */}
                  <TabsContent value="skills" className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-1">
                        Skills
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        List your technical and soft skills.
                      </p>
                    </div>
                    <SkillsForm
                      data={resumeData.skills}
                      onChange={(skills) =>
                        setResumeData({ ...resumeData, skills })
                      }
                    />
                  </TabsContent>

                  {/* Qualifications */}
                  <TabsContent value="qualifications" className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-1">
                        Certifications & Achievements
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Add your certifications, courses, and achievements.
                      </p>
                    </div>
                    <QualificationsForm
                      data={resumeData.qualifications}
                      onChange={(qualifications) =>
                        setResumeData({ ...resumeData, qualifications })
                      }
                    />
                  </TabsContent>

                  {/* Projects */}
                  <TabsContent value="projects" className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-1">
                        Projects
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Showcase your notable projects and work.
                      </p>
                    </div>
                    <ProjectsForm
                      data={resumeData.projects}
                      onChange={(projects) =>
                        setResumeData({ ...resumeData, projects })
                      }
                    />
                  </TabsContent>

                  {/* Experience */}
                  <TabsContent value="experience" className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-1">
                        Work Experience
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Add your work history and roles.
                      </p>
                    </div>
                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(experience) =>
                        setResumeData({ ...resumeData, experience })
                      }
                    />
                  </TabsContent>

                  {/* Documents */}
                  <TabsContent value="documents" className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-1">
                        Documents & Files
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Upload supporting documents like certificates and portfolio files.
                      </p>
                    </div>
                    <DocumentUpload
                      documents={resumeData.documents}
                      onDocumentsChange={(documents) =>
                        setResumeData({ ...resumeData, documents })
                      }
                    />
                  </TabsContent>
                </div>
              </Tabs>

              {/* Form Actions */}
              <div className="border-t border-border bg-gray-50 px-6 py-4 flex gap-2 justify-end">
                <Button
                  onClick={handleReset}
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Form
                </Button>
                <Button
                  onClick={handleLoadDummy}
                  variant="outline"
                >
                  Load Sample Data
                </Button>
                <Button
                  onClick={handleSave}
                  variant="default"
                >
                  Save Resume
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-lg font-bold text-foreground">
                    Resume Preview
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Live preview of your resume
                  </p>
                </div>
                <ResumePreview
                  data={resumeData}
                  onGeneratePDF={handleSave}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
