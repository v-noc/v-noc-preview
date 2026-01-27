import { useCallback } from 'react';
import useProjectStore from '@/features/dashboard/store/useProjectStore';
import useTabStore from '@/features/dashboard/store/useTabStore';

import type { AnyNodeTree, ProjectNodeTree, ThemeConfig } from '@/types/project';

type NodeWithChildren = AnyNodeTree & { children?: AnyNodeTree[] };

/**
 * Update a node in the tree immutably.
 * Strictly extracted from RightSidebar layout logic.
 */
function updateNodeInTree(
  tree: ProjectNodeTree,
  key: string,
  updater: (node: AnyNodeTree) => AnyNodeTree
): ProjectNodeTree {
  const walk = (node: AnyNodeTree): AnyNodeTree => {
    if (node._key === key) {
      return updater({ ...node });
    }
    const children = (node as NodeWithChildren).children;
    if (Array.isArray(children) && children.length) {
      return {
        ...node,
        children: children.map((c) => walk(c)),
      } as AnyNodeTree;
    }
    return node;
  };

  return walk(tree) as ProjectNodeTree;
}

/**
 * Mutation actions for the Right Sidebar.
 * Handles the logic of updating the project tree and selection.
 */
export function useRightSidebarActions() {
  const activeTabId = useTabStore((s) => s.activeTabId);
  const selectedNode = useProjectStore((s) => s.selectedNode[activeTabId]);
  const projectData = useProjectStore((s) => s.projectData);
  const setProjectData = useProjectStore((s) => s.setProjectData);
  const setSelectedNode = useProjectStore((s) => s.setSelectedNode);



  const updateTheme = useCallback((theme: ThemeConfig) => {
    if (!selectedNode || !projectData) return;

    const updatedSelected: AnyNodeTree = {
      ...selectedNode,
      theme_config: theme,
    } as AnyNodeTree;

    const updatedTree = updateNodeInTree(
      projectData,
      selectedNode._key,
      (node) => ({
        ...node,
        theme_config: theme,
      })
    );


    setProjectData(updatedTree);
    setSelectedNode(activeTabId, updatedSelected);
  }, [projectData, selectedNode, setProjectData, setSelectedNode, activeTabId]);

  const updateBasicInfo = useCallback((info: { name: string; description: string; icon: string }) => {
    if (!selectedNode || !projectData) return;

    const updatedSelected: AnyNodeTree = {
      ...selectedNode,
      ...info,
    } as AnyNodeTree;

    const updatedTree = updateNodeInTree(
      projectData,
      selectedNode._key,
      (node) => ({
        ...node,
        ...info,
      })
    );


    setProjectData(updatedTree);
    setSelectedNode(activeTabId, updatedSelected);
  }, [projectData, selectedNode, setProjectData, setSelectedNode]);

  return {
    updateTheme,
    updateBasicInfo,
  };
}
