import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ExperienceEntry } from "@/types/resume";
import { X, Plus } from "lucide-react";

interface ExperienceFormProps {
  data: ExperienceEntry[];
  onChange: (data: ExperienceEntry[]) => void;
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const handleAddExperience = () => {
    const newEntry: ExperienceEntry = {
      id: Date.now().toString(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange([...data, newEntry]);
  };

  const handleUpdateExperience = (
    id: string,
    field: keyof ExperienceEntry,
    value: string
  ) => {
    onChange(
      data.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleRemoveExperience = (id: string) => {
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
              Experience #{index + 1}
            </h4>
            <button
              type="button"
              onClick={() => handleRemoveExperience(entry.id)}
              className="p-1 hover:bg-destructive/10 rounded text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`company-${entry.id}`}>Company Name *</Label>
                <Input
                  id={`company-${entry.id}`}
                  value={entry.company}
                  onChange={(e) =>
                    handleUpdateExperience(entry.id, "company", e.target.value)
                  }
                  placeholder="Tech Innovations Inc."
                />
              </div>

              <div>
                <Label htmlFor={`role-${entry.id}`}>Job Role / Title *</Label>
                <Input
                  id={`role-${entry.id}`}
                  value={entry.role}
                  onChange={(e) =>
                    handleUpdateExperience(entry.id, "role", e.target.value)
                  }
                  placeholder="Senior Full Stack Developer"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`startDate-${entry.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${entry.id}`}
                  value={entry.startDate}
                  onChange={(e) =>
                    handleUpdateExperience(
                      entry.id,
                      "startDate",
                      e.target.value
                    )
                  }
                  placeholder="2022-01"
                />
              </div>

              <div>
                <Label htmlFor={`endDate-${entry.id}`}>End Date</Label>
                <Input
                  id={`endDate-${entry.id}`}
                  value={entry.endDate}
                  onChange={(e) =>
                    handleUpdateExperience(entry.id, "endDate", e.target.value)
                  }
                  placeholder="2023-12 or Present"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${entry.id}`}>
                Job Description & Achievements
              </Label>
              <Textarea
                id={`description-${entry.id}`}
                value={entry.description}
                onChange={(e) =>
                  handleUpdateExperience(
                    entry.id,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Describe your responsibilities and key achievements in this role"
                className="min-h-24 resize-none"
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={handleAddExperience}
        variant="outline"
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
