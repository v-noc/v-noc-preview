import { memo } from "react";
import { SidebarHeader } from "./SidebarHeader";

import { TabContextStack } from "./TabContextStack";

import { useSidebarData } from "../hooks/useSidebarData";
import useProjectStore from "../../../store/useProjectStore";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Main Sidebar Container
 * Manages the layout of project tree, search, and other sidebar features.
 * Supports hierarchical Context Panels.
 */
export const SideBar = memo(function SideBar() {
  const projectData = useProjectStore((s) => s.projectData);
  const { filteredProjectData, searchQuery, isLoading, setSearchQuery } =
    useSidebarData();

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-sidebar border-r overflow-hidden pt-8">
        {/* Header Skeleton */}
        <div className="flex-none">
          <div className="flex items-center p-4 gap-2 h-[57px]">
            <Skeleton className="size-6 rounded-md bg-border" />
            <Skeleton className="h-6 w-20 bg-border" />
          </div>
          <div className="h-px bg-border" />
          <div className="px-3 pt-2">
            <Skeleton className="h-9 w-full rounded-md bg-border" />
          </div>
        </div>
        {/* Content Skeleton */}
        <div className="flex-1 overflow-hidden p-4 space-y-2">
          <Skeleton className="h-8 w-full bg-border" />
          <Skeleton className="h-8 w-3/4 bg-border" />
          <Skeleton className="h-8 w-5/6 bg-border" />
          <Skeleton className="h-8 w-2/3 bg-border" />
          <Skeleton className="h-8 w-4/5 bg-border" />
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        No project loaded
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-sidebar border-r overflow-hidden">
      {/* 1. Static Header */}
      <div className="flex-none transition-all duration-300">
        <SidebarHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* 2. Dynamic Context Stack */}
      <div className="flex-1 overflow-hidden">
        <TabContextStack
          projectData={projectData}
          filteredProjectData={filteredProjectData}
        />
      </div>
    </div>
  );
});

export default SideBar;
