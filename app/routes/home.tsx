import { useState } from "react";
import Header from "@/features/home/componets/Header";
import SearchAndViewController from "@/features/home/componets/SearchAndViewController";
import ProjectList from "@/features/home/componets/ProjectList";
import { useProjects } from "@/features/home/hook/useProject";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";

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
    <div className="min-h-screen bg-[#f9f9f9] w-full flex flex-col">
      <div className="max-w-screen w-full mx-auto flex-grow p-6">
        <Header />
        <SearchAndViewController
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ProjectList viewMode={viewMode} projects={projects || []} />
        )}
      </div>
      <footer className="flex justify-center pb-4">
        <Link
          to="/about"
          className="text-sm text-blue-600 hover:underline transition-colors"
        >
          About
        </Link>
      </footer>
    </div>
  );
};

export default HomePage;
