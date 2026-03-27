import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EducationEntry } from "@/types/resume";
import { X, Plus } from "lucide-react";

interface EducationFormProps {
  data: EducationEntry[];
  onChange: (data: EducationEntry[]) => void;
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddEducation = () => {
    const newEntry: EducationEntry = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      university: "",
      startYear: "",
      endYear: "",
      cgpa: "",
    };
    onChange([...data, newEntry]);
  };

  const handleUpdateEducation = (
    id: string,
    field: keyof EducationEntry,
    value: string
  ) => {
    onChange(
      data.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
    if (errors[`${id}-${field}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${id}-${field}`];
        return newErrors;
      });
    }
  };

  const handleRemoveEducation = (id: string) => {
    onChange(data.filter((entry) => entry.id !== id));
  };

  return (
    <div className="space-y-4">
      {data.map((entry, index) => (
        <div
          key={entry.id}
          className="p-4 border border-border rounded-lg bg-card"
        >
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-semibold text-foreground">
              Education #{index + 1}
            </h4>
            <button
              type="button"
              onClick={() => handleRemoveEducation(entry.id)}
              className="p-1 hover:bg-destructive/10 rounded text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`degree-${entry.id}`}>Degree / Course *</Label>
                <Input
                  id={`degree-${entry.id}`}
                  value={entry.degree}
                  onChange={(e) =>
                    handleUpdateEducation(entry.id, "degree", e.target.value)
                  }
                  placeholder="Bachelor of Science"
                />
              </div>

              <div>
                <Label htmlFor={`school-${entry.id}`}>School / Field *</Label>
                <Input
                  id={`school-${entry.id}`}
                  value={entry.school}
                  onChange={(e) =>
                    handleUpdateEducation(entry.id, "school", e.target.value)
                  }
                  placeholder="Computer Science"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`university-${entry.id}`}>
                University / Board *
              </Label>
              <Input
                id={`university-${entry.id}`}
                value={entry.university}
                onChange={(e) =>
                  handleUpdateEducation(entry.id, "university", e.target.value)
                }
                placeholder="California Institute of Technology"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`startYear-${entry.id}`}>Start Year</Label>
                <Input
                  id={`startYear-${entry.id}`}
                  value={entry.startYear}
                  onChange={(e) =>
                    handleUpdateEducation(entry.id, "startYear", e.target.value)
                  }
                  placeholder="2016"
                />
              </div>

              <div>
                <Label htmlFor={`endYear-${entry.id}`}>End Year</Label>
                <Input
                  id={`endYear-${entry.id}`}
                  value={entry.endYear}
                  onChange={(e) =>
                    handleUpdateEducation(entry.id, "endYear", e.target.value)
                  }
                  placeholder="2020"
                />
              </div>

              <div>
                <Label htmlFor={`cgpa-${entry.id}`}>CGPA / Percentage</Label>
                <Input
                  id={`cgpa-${entry.id}`}
                  value={entry.cgpa}
                  onChange={(e) =>
                    handleUpdateEducation(entry.id, "cgpa", e.target.value)
                  }
                  placeholder="3.8"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={handleAddEducation}
        variant="outline"
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
