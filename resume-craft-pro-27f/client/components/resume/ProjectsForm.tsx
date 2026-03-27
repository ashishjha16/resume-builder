import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectEntry } from "@/types/resume";
import { X, Plus } from "lucide-react";

interface ProjectsFormProps {
  data: ProjectEntry[];
  onChange: (data: ProjectEntry[]) => void;
}

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const handleAddProject = () => {
    const newEntry: ProjectEntry = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: "",
      link: "",
    };
    onChange([...data, newEntry]);
  };

  const handleUpdateProject = (
    id: string,
    field: keyof ProjectEntry,
    value: string
  ) => {
    onChange(
      data.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleRemoveProject = (id: string) => {
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
              Project #{index + 1}
            </h4>
            <button
              type="button"
              onClick={() => handleRemoveProject(entry.id)}
              className="p-1 hover:bg-destructive/10 rounded text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor={`title-${entry.id}`}>Project Title *</Label>
              <Input
                id={`title-${entry.id}`}
                value={entry.title}
                onChange={(e) =>
                  handleUpdateProject(entry.id, "title", e.target.value)
                }
                placeholder="E-Commerce Platform"
              />
            </div>

            <div>
              <Label htmlFor={`description-${entry.id}`}>Description</Label>
              <Textarea
                id={`description-${entry.id}`}
                value={entry.description}
                onChange={(e) =>
                  handleUpdateProject(entry.id, "description", e.target.value)
                }
                placeholder="Brief description of what the project does and your role"
                className="min-h-20 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`technologies-${entry.id}`}>Technologies</Label>
                <Input
                  id={`technologies-${entry.id}`}
                  value={entry.technologies}
                  onChange={(e) =>
                    handleUpdateProject(entry.id, "technologies", e.target.value)
                  }
                  placeholder="React, Node.js, MongoDB, Stripe"
                />
              </div>

              <div>
                <Label htmlFor={`link-${entry.id}`}>Project Link</Label>
                <Input
                  id={`link-${entry.id}`}
                  value={entry.link}
                  onChange={(e) =>
                    handleUpdateProject(entry.id, "link", e.target.value)
                  }
                  placeholder="github.com/username/project"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={handleAddProject}
        variant="outline"
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
