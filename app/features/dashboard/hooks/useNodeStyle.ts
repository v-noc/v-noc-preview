import { useMemo } from 'react';
// @ts-ignore - Case sensitivity issue with file paths on macOS
import useProjectStore from '@/features/dashboard/store/useProjectStore';
import { findNodeByKey } from '@/features/dashboard/utils/findNode';
import getNodeStyle from '@/features/dashboard/utils/getNodeStyle';
import type { ContainerNodeTree, CallNodeTree, AnyNodeTree } from '@/types/project';

/**
 * Get styled properties for a node.
 * Resolves target for call nodes.
 */
export function useNodeStyle(node: ContainerNodeTree) {
  const projectData = useProjectStore((s) => s.projectData);

  return useMemo(() => {
    // @ts-expect-error - ContainerNodeTree is compatible with AnyNodeTree at runtime
    let effectiveNode: AnyNodeTree = node;

    // For call nodes, use target's style
    if (node.node_type === 'call' && (node as CallNodeTree).target && projectData) {
      const callNode = node as CallNodeTree;
      const targetNode = findNodeByKey(projectData, callNode.target!._key);
      if (targetNode) {
        effectiveNode = targetNode;
      }
    }

    const style = getNodeStyle(effectiveNode);

    return {
      backgroundColor: style.cardColor,
      color: style.color,
      borderColor: style.borderColor,
      iconColor: style.iconColor,
    };
  }, [node, projectData]);
}
