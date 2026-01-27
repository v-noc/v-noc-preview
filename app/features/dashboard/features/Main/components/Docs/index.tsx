import { Suspense, useEffect, useState } from "react";
import { DocumentEditor } from "./DocumentEditor";
import type { DocumentData } from "@/services/documents";

type DocumentsProps = {
  /**
   * Document to edit. Can be DocumentType or legacy format { id, data }.
   * If undefined, shows empty state.
   */
  document?: DocumentData | { id: string; data?: string } | null;

  /**
   * Callback when document content changes.
   * Note: Auto-save is handled by DocumentEditor if nodeId is provided.
   */
  onChange?: (data: string) => void;

  /**
   * Node ID for API calls. Required for auto-save.
   */
  nodeId?: string;
};

/**
 * Documents Component (Legacy wrapper for DocumentEditor)
 *
 * This component maintains backward compatibility with the old API
 * while using the new DocumentEditor internally.
 *
 * @deprecated Consider using DocumentEditor directly for new code.
 */
const Documents = ({ document, onChange, nodeId }: DocumentsProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // Convert legacy format to DocumentType
  const doc: DocumentData | null = document
    ? "_key" in document
      ? (document as DocumentData)
      : {
          _key: document.id,
          _id: document.id,
          name: "",
          description: "",
          data: document.data || "",
          created_at: "",
          updated_at: "",
        }
    : null;

  // 3. Return null or a skeleton on the server
  if (!isMounted) {
    return <div className="h-full w-full bg-background" />;
  }
  return (
    <Suspense fallback={<div className="h-full w-full bg-background" />}>
      <DocumentEditor
        document={doc}
        nodeId={nodeId}
        autoSave={!!nodeId}
        onChange={onChange}
      />
    </Suspense>
  );
};

export default Documents;
