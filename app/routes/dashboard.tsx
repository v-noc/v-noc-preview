import { useParams } from "react-router";
import Layout from "@/features/dashboard/components/Layout";
import SideBar from "@/features/dashboard/features/Sidebar/components/SideBar";
import Navbar from "@/features/dashboard/features/Navbar/components/Navbar";
import Workspace from "@/features/dashboard/features/Main";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { RightSidebar } from "@/features/dashboard/features/Main/components/RightSidebar";
import useProjectStore from "@/features/dashboard/store/useProjectStore";
import useTabStore from "@/features/dashboard/store/useTabStore";
import { useEffect } from "react";
import { useGroupFlattening } from "@/features/dashboard/hooks/useGroupFlattening";

import { selectTabStack } from "@/features/dashboard/store/selectors/tabSelectors";
import { cn } from "@/lib/utils";

import { useShallow } from "zustand/react/shallow";
import { SidebarDialogs } from "@/features/dashboard/components/SidebarDialogs";

/**
 * Dashboard Page - Entry point for the IDE dashboard.
 * Orchestrates the high-level layout and global sub-systems.
 */
export function meta() {
  return [
    { title: "Dashboard - v-noc" },
    { name: "description", content: "AI-Powered IDE Dashboard" },
  ];
}

const Dashboard = () => {
  const { projectId } = useParams();
  const activeTabId = useTabStore((s) => s.activeTabId);
  const selectedNode = useProjectStore((s) => s.selectedNode[activeTabId]);
  const projectData = useProjectStore((s) => s.projectData);
  const handleNodeSelection = useTabStore((s) => s.handleNodeSelection);

  const tabStack = useTabStore(useShallow(selectTabStack));

  // Transformation hooks
  useGroupFlattening();

  // Set default selection for the active tab if nothing is selected
  useEffect(() => {
    if (!selectedNode && projectData != null) {
      handleNodeSelection(activeTabId, projectData, "primary");
    }
  }, [selectedNode, projectData, handleNodeSelection, activeTabId]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <Layout
        main={
          <RightSidebar>
            {tabStack.map((tab) => (
              <div
                key={tab.id}
                className={cn(
                  "h-full w-full",
                  tab.id !== activeTabId && "hidden"
                )}
              >
                <Workspace tabId={tab.id} />
              </div>
            ))}
          </RightSidebar>
        }
        navbar={<Navbar />}
        leftSidebar={<SideBar />}
      />
      <SidebarDialogs />
    </ResizablePanelGroup>
  );
};

export default Dashboard;
