import Project from "./Project";
import { useProjects } from "./useProjects";

export default function ProjectsList() {
  const { projects, isLoading, isError } = useProjects();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {projects?.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
}
