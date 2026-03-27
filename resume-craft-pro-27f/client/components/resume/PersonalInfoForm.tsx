import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PersonalInfo, DocumentFile } from "@/types/resume";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload } from "lucide-react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({
  data,
  onChange,
}: PersonalInfoFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    field: keyof PersonalInfo,
    value: string
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleProfilePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    const newProfileImage: DocumentFile = {
      id: Date.now().toString(),
      type: "profile",
      file,
      name: file.name,
      url: fileUrl,
    };

    onChange({
      ...data,
      profileImage: newProfileImage,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveProfilePhoto = () => {
    if (data.profileImage) {
      URL.revokeObjectURL(data.profileImage.url);
      onChange({
        ...data,
        profileImage: undefined,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo Section */}
      <div className="border border-border rounded-lg p-4 bg-secondary/30">
        <Label className="text-base font-semibold mb-3 block">Profile Photo</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Upload your professional profile photo to be displayed at the top of your resume
        </p>

        {data.profileImage ? (
          <div className="flex items-center gap-4">
            <div className="w-32 h-40 rounded-lg overflow-hidden border-2 border-primary">
              <img
                src={data.profileImage.url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground mb-2">
                {data.profileImage.name}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {(data.profileImage.file.size / 1024).toFixed(2)} KB
              </p>
              <button
                type="button"
                onClick={handleRemoveProfilePhoto}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4" />
                Remove Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleProfilePhotoSelect}
              accept="image/jpeg,image/png,image/jpg,image/webp"
              className="hidden"
            />
            <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="font-semibold text-foreground mb-1">Upload Photo</p>
            <p className="text-xs text-muted-foreground mb-3">JPG, PNG • Max 5MB</p>
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
            >
              Choose File
            </Button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
            className={errors.fullName ? "border-destructive" : ""}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="jobTitle">Job Title / Designation *</Label>
          <Input
            id="jobTitle"
            value={data.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            placeholder="Full Stack Developer"
            className={errors.jobTitle ? "border-destructive" : ""}
          />
          {errors.jobTitle && (
            <p className="text-xs text-destructive mt-1">{errors.jobTitle}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-destructive mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={data.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="City, Country"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <Label htmlFor="github">GitHub / Portfolio Link</Label>
          <Input
            id="github"
            value={data.github}
            onChange={(e) => handleChange("github", e.target.value)}
            placeholder="github.com/johndoe"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="objective">Career Objective / Professional Summary</Label>
        <Textarea
          id="objective"
          value={data.objective}
          onChange={(e) => handleChange("objective", e.target.value)}
          placeholder="Write a brief summary of your professional goals and experience..."
          className="min-h-24 resize-none"
        />
      </div>
    </div>
  );
}
