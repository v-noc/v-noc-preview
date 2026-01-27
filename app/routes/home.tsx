import { useState } from "react";
import Header from "@/features/home/componets/Header";
import SearchAndViewController from "@/features/home/componets/SearchAndViewController";
import ProjectList from "@/features/home/componets/ProjectList";
import { useProjects } from "@/features/home/hook/useProject";

export function meta() {
  return [
    { title: "Home - v-noc" },
    { name: "description", content: "Welcome to v-noc" },
  ];
}

const HomePage = () => {
  const { data: projects, isLoading } = useProjects();

  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6 w-full">
      <div className="max-w-screen w-full mx-auto">
        <Header />
        <SearchAndViewController
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ProjectList viewMode={viewMode} projects={projects || []} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
