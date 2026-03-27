import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { QualificationEntry } from "@/types/resume";
import { X, Plus } from "lucide-react";

interface QualificationsFormProps {
  data: QualificationEntry[];
  onChange: (data: QualificationEntry[]) => void;
}

export function QualificationsForm({
  data,
  onChange,
}: QualificationsFormProps) {
  const handleAddQualification = () => {
    const newEntry: QualificationEntry = {
      id: Date.now().toString(),
      title: "",
      description: "",
      date: "",
    };
    onChange([...data, newEntry]);
  };

  const handleUpdateQualification = (
    id: string,
    field: keyof QualificationEntry,
    value: string
  ) => {
    onChange(
      data.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleRemoveQualification = (id: string) => {
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
              Qualification #{index + 1}
            </h4>
            <button
              type="button"
              onClick={() => handleRemoveQualification(entry.id)}
              className="p-1 hover:bg-destructive/10 rounded text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`title-${entry.id}`}>Title / Name *</Label>
                <Input
                  id={`title-${entry.id}`}
                  value={entry.title}
                  onChange={(e) =>
                    handleUpdateQualification(entry.id, "title", e.target.value)
                  }
                  placeholder="AWS Solutions Architect"
                />
              </div>

              <div>
                <Label htmlFor={`date-${entry.id}`}>Date / Year</Label>
                <Input
                  id={`date-${entry.id}`}
                  value={entry.date}
                  onChange={(e) =>
                    handleUpdateQualification(entry.id, "date", e.target.value)
                  }
                  placeholder="2022"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${entry.id}`}>Description</Label>
              <Textarea
                id={`description-${entry.id}`}
                value={entry.description}
                onChange={(e) =>
                  handleUpdateQualification(
                    entry.id,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Brief description of the certification or achievement"
                className="min-h-20 resize-none"
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={handleAddQualification}
        variant="outline"
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Certification / Achievement
      </Button>
    </div>
  );
}
