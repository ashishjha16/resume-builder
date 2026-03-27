import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/lib/storage";
import { useEffect } from "react";
import { FileText, Users, Zap, Shield, Award, BarChart3 } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const user = getAuthUser();

  // Redirect to resume if already logged in
  useEffect(() => {
    if (user) {
      navigate("/resume");
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Resume Builder</h1>
          </div>

          <Button onClick={handleGetStarted} size="lg" className="rounded-full">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <div className="mb-8 inline-block px-4 py-2 bg-blue-100 text-primary rounded-full">
          <p className="text-sm font-semibold">The Easiest Way to Build Your Resume</p>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Create Your Professional Resume
          <span className="text-primary"> in Minutes</span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Build a recruiter-friendly resume with our simple, intuitive resume builder.
          Download your resume as PDF and start your job search today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleGetStarted} size="lg" className="h-12 px-8 rounded-lg text-base">
            Create Your Resume
          </Button>
          <Button
            onClick={handleGetStarted}
            variant="outline"
            size="lg"
            className="h-12 px-8 rounded-lg text-base"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Resume Builder?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need to create an outstanding resume
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">
              Fast & Easy
            </h4>
            <p className="text-muted-foreground">
              Build your complete resume in just a few minutes with our user-friendly interface
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">
              100% Private
            </h4>
            <p className="text-muted-foreground">
              Your data stays with you. We never share your information with anyone
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">
              Professional Design
            </h4>
            <p className="text-muted-foreground">
              Choose from professionally designed resume templates that impress recruiters
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">
              PDF Download
            </h4>
            <p className="text-muted-foreground">
              Download your resume as a professionally formatted PDF ready to send
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">
              Complete Sections
            </h4>
            <p className="text-muted-foreground">
              Include all important sections: experience, education, skills, and more
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">
              Free to Use
            </h4>
            <p className="text-muted-foreground">
              No credit card required. Create and download unlimited resumes for free
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white border-t border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to create your professional resume
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-block w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Create Account
              </h4>
              <p className="text-muted-foreground">
                Sign up with your email to get started
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-block w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Fill Your Details
              </h4>
              <p className="text-muted-foreground">
                Enter your education, experience, skills and more
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-block w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Download PDF
              </h4>
              <p className="text-muted-foreground">
                Generate and download your resume as PDF
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Land Your Next Opportunity?
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of job seekers who have created impressive resumes with Resume Builder
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-white text-primary hover:bg-blue-50 h-12 px-8 rounded-lg text-base font-semibold"
          >
            Get Started Now - It's Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Resume Builder. All rights reserved. | Built to help you succeed.</p>
        </div>
      </footer>
    </div>
  );
}
