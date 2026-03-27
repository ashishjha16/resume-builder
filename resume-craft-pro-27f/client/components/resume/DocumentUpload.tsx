import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Upload, FileText } from "lucide-react";
import type { DocumentFile } from "@/types/resume";

interface DocumentUploadProps {
  documents: DocumentFile[];
  onDocumentsChange: (documents: DocumentFile[]) => void;
}

const ALLOWED_FORMATS = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return "🖼️";
  if (type === "application/pdf") return "📄";
  return "📎";
};

const getDocumentTypeLabel = (type: string): string => {
  switch (type) {
    case "profile":
      return "Profile Photo";
    case "certificate":
      return "Certificate";
    case "portfolio":
      return "Portfolio";
    case "other":
      return "Other Document";
    default:
      return "Document";
  }
};

export function DocumentUpload({
  documents,
  onDocumentsChange,
}: DocumentUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState<
    "profile" | "certificate" | "portfolio" | "other"
  >("certificate");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FORMATS.includes(file.type)) {
      alert("Please upload a file in JPG, PNG, PDF, or DOC format");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      alert("File size must be less than 10MB");
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    const newDocument: DocumentFile = {
      id: Date.now().toString(),
      type: selectedType,
      file,
      name: file.name,
      url: fileUrl,
    };

    onDocumentsChange([...documents, newDocument]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveDocument = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      URL.revokeObjectURL(doc.url);
    }
    onDocumentsChange(documents.filter((d) => d.id !== id));
  };

  const documentsByType = {
    profile: documents.filter((d) => d.type === "profile"),
    certificate: documents.filter((d) => d.type === "certificate"),
    portfolio: documents.filter((d) => d.type === "portfolio"),
    other: documents.filter((d) => d.type === "other"),
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          className="hidden"
        />

        <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
        <p className="font-semibold text-foreground mb-2">Upload Document</p>

        <div className="mb-4">
          <Label className="text-xs">Document Type</Label>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {(
              ["profile", "certificate", "portfolio", "other"] as const
            ).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {getDocumentTypeLabel(type)}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          variant="default"
          size="sm"
        >
          <Upload className="w-4 h-4 mr-2" />
          Choose File
        </Button>

        <p className="text-xs text-muted-foreground mt-3">
          JPG, PNG, PDF, DOC • Max 10MB
        </p>
      </div>

      {/* Documents List */}
      {documents.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Uploaded Documents</h4>

          {Object.entries(documentsByType).map(([type, docs]) => {
            if (docs.length === 0) return null;
            return (
              <div key={type} className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {getDocumentTypeLabel(type as any)}
                </p>
                <div className="space-y-2">
                  {docs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-xl">
                          {getFileIcon(doc.file.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {doc.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(doc.file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveDocument(doc.id)}
                        className="p-1 hover:bg-destructive/10 rounded text-destructive transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
