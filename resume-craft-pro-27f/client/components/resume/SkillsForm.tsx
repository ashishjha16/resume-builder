import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SkillEntry } from "@/types/resume";
import { X, Plus } from "lucide-react";

interface SkillsFormProps {
  data: SkillEntry[];
  onChange: (data: SkillEntry[]) => void;
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const handleAddSkill = (category: "technical" | "soft") => {
    const newSkill: SkillEntry = {
      id: Date.now().toString(),
      category,
      name: "",
    };
    onChange([...data, newSkill]);
  };

  const handleUpdateSkill = (
    id: string,
    field: keyof SkillEntry,
    value: string
  ) => {
    onChange(
      data.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const handleRemoveSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const technicalSkills = data.filter((s) => s.category === "technical");
  const softSkills = data.filter((s) => s.category === "soft");

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <div>
        <h4 className="font-semibold text-foreground mb-4">Technical Skills</h4>
        <div className="space-y-3 mb-4">
          {technicalSkills.map((skill) => (
            <div key={skill.id} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label htmlFor={`skill-${skill.id}`} className="text-xs">
                  Skill Name
                </Label>
                <Input
                  id={`skill-${skill.id}`}
                  value={skill.name}
                  onChange={(e) =>
                    handleUpdateSkill(skill.id, "name", e.target.value)
                  }
                  placeholder="React.js, Node.js, Python, etc."
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill.id)}
                className="p-2 hover:bg-destructive/10 rounded text-destructive transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={() => handleAddSkill("technical")}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Technical Skill
        </Button>
      </div>

      {/* Soft Skills */}
      <div>
        <h4 className="font-semibold text-foreground mb-4">Soft Skills</h4>
        <div className="space-y-3 mb-4">
          {softSkills.map((skill) => (
            <div key={skill.id} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label htmlFor={`skill-${skill.id}`} className="text-xs">
                  Skill Name
                </Label>
                <Input
                  id={`skill-${skill.id}`}
                  value={skill.name}
                  onChange={(e) =>
                    handleUpdateSkill(skill.id, "name", e.target.value)
                  }
                  placeholder="Leadership, Communication, Problem Solving, etc."
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill.id)}
                className="p-2 hover:bg-destructive/10 rounded text-destructive transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={() => handleAddSkill("soft")}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Soft Skill
        </Button>
      </div>
    </div>
  );
}
