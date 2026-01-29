import { useState } from "react";
import { useCode } from "@/services/code";
import { useEditableCode } from "@/features/dashboard/features/Main/components/Code/useEditableCode";
import { detectLanguage } from "@/components/CodeEditor/detectLanguage";
import useProjectStore from "@/features/dashboard/store/useProjectStore";
import { useSidebarModalStore } from "@/features/dashboard/store/useSidebarModalStore";
import type { AnyNodeTree } from "@/types/project";

export interface UseNodeCodeOptions {
  nodeId: string;
  targetKey?: string;
  nodeType?: string;
}

export function useNodeCode({ nodeId, targetKey, nodeType }: UseNodeCodeOptions) {
  const [showCode, setShowCode] = useState(false);
  const { projectData } = useProjectStore();
  const projectId = projectData?._key;
  const openModal = useSidebarModalStore(s => s.openModal);

  // Fetch code dynamically for the node
  const effectiveNodeId = nodeType === "call" && targetKey ? targetKey : nodeId;
  // For call nodes, use the target's node type, otherwise use the node's type
  const effectiveNodeType = nodeType === "call" ? "call" : nodeType;

  const { data: codeData } = useCode(
    showCode ? effectiveNodeId : undefined,
    effectiveNodeType
  );

  const {
    editorValue,
    hasChanges,
    isLoading,
    isError,
    isSaving,
    handleEditorChange,
    handleSave,
  } = useEditableCode(effectiveNodeId, projectId, effectiveNodeType);

  const hasCode =
    (codeData?.code && codeData.code.length > 0) ||
    (editorValue && editorValue.length > 0);

  const fileName = codeData?.file_name || codeData?.file_path || "";
  const language = detectLanguage(fileName);

  const toggleCode = () => setShowCode((prev) => !prev);

  const interceptedHandleSave = () => {
    openModal('demo-read-only', projectData as AnyNodeTree);
  };

  return {
    showCode,
    toggleCode,
    hasCode,
    code: editorValue,
    setCode: handleEditorChange,
    hasChanges,
    isSaving,
    isLoading,
    isError,
    fileName,
    language,
    handleSave: interceptedHandleSave,
  };
}
