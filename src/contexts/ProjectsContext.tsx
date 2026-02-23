// src/contexts/ProjectsContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { ProjectData } from "@/types/content";
import { fetchProjects, createProject, updateProject, deleteProject as apiDeleteProject } from "@/api";

interface ProjectsContextValue {
  projects: ProjectData[];
  getProject: (slug: string) => ProjectData | undefined;
  saveProject: (project: ProjectData) => Promise<void>;
  deleteProject: (slug: string) => Promise<void>;
  refreshProjects: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const getProject = (slug: string) => projects.find((p) => p.slug === slug);

  const saveProject = async (project: ProjectData) => {
    try {
      const existing = projects.find((p) => p.slug === project.slug);
      if (existing) {
        await updateProject(project.slug, project);
      } else {
        await createProject(project);
      }
      await loadProjects(); // Refresh UI
    } catch (error) {
      console.error("Failed to save project", error);
    }
  };

  const deleteProject = async (slug: string) => {
    try {
      await apiDeleteProject(slug);
      await loadProjects();
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  return (
    <ProjectsContext.Provider value={{ projects, getProject, saveProject, deleteProject, refreshProjects: loadProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be inside ProjectsProvider");
  return ctx;
};