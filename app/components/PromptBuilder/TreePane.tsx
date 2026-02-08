import React, { useMemo } from "react";
import type { AnyNodeTree, ContainerNodeTree } from "@/types/project";
import { TreeView, type TreeDataItem } from "@/components/ui/tree-view";
import { Checkbox } from "@/components/ui/checkbox";

interface TreePaneProps {
  root: ContainerNodeTree;
  checked: Record<string, boolean>;
  expanded: Record<string, boolean>;
  selectedNodeKey: string | null;
  onToggleChecked: (key: string) => void;
  onToggleExpanded: (key: string) => void;
  onSelect: (key: string) => void;
}

import {
  FileCode2,
  Folder,
  Box,
  FunctionSquare,
  Link2,
  Files,
  Library
} from "lucide-react";

const getNodeIcon = (type: string) => {
  switch (type) {
    case "file": return FileCode2;
    case "folder": return Folder;
    case "project": return Library;
    case "function": return FunctionSquare;
    case "class": return Box;
    case "call": return Link2;
    case "group": return Files;
    default: return FileCode2;
  }
};

const nodeToTreeItem = (
  node: AnyNodeTree,
  checked: Record<string, boolean>,
  onToggleChecked: (key: string) => void
): TreeDataItem => {
  const isCall = node.node_type === "call";
  const targetNode = isCall ? (node as any).target : null;
  const effectiveNode = targetNode || node;

  const Icon = getNodeIcon(node.node_type);
  const subtitle = (effectiveNode.description && effectiveNode.description.trim())
    ? effectiveNode.description.substring(0, 100)
    : effectiveNode.qname;

  return {
    id: node._key,
    name: node.name,
    subtitle,
    icon: Icon,
    children: (node.children ?? []).map((c) =>
      nodeToTreeItem(c as AnyNodeTree, checked, onToggleChecked)
    ),
    actions: (
      <Checkbox
        checked={!!checked[node._key]}
        onCheckedChange={() => {
          onToggleChecked(node._key);
        }}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  };
};

export const TreePane: React.FC<TreePaneProps> = ({
  root,
  checked,
  selectedNodeKey,
  onToggleChecked,
  onSelect,
}) => {
  const treeData = useMemo(
    () => nodeToTreeItem(root as AnyNodeTree, checked, onToggleChecked),
    [root, checked, onToggleChecked]
  );

  return (
    <TreeView
      data={treeData}
      initialSelectedItemId={selectedNodeKey ?? root._key}
      onSelectChange={(item) => item && onSelect(item.id)}
      expandAll={false}
      className="h-full overflow-y-auto"
    />
  );
};

export default TreePane;
