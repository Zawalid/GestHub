import { Operations } from "@/components/shared/operations/Operations";
import Project from "./Project";
import { Button } from "@/components/ui";
import { FaPlus } from "react-icons/fa6";
import { useOperations } from "@/components/shared/operations/useOperations";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Status } from "@/components/ui/Status";
import ProjectsSkeleton from "./ProjectsSkeleton";

export default function ProjectsList({ onAddNewProject }) {
  const {
    data: projects,
    isLoading,
    error,
    layout,
    appliedFiltersNumber,
    query,
  } = useOperations();
  const [parent] = useAutoAnimate({ duration: 500 });

  const render = () => {
    if (isLoading) return <ProjectsSkeleton layout={layout} />;
    if (error)
      return (
        <Status
          status="error"
          heading={error.message}
          message="Try again later"
        />
      );
    if (projects.length === 0)
      return (
        <Status
          status="noResults"
          heading="No projects found"
          message="Try changing your search query or filters"
        />
      );
    return (
      <>
        {!appliedFiltersNumber && !query && (
          <NewProject onAdd={onAddNewProject} layout={layout} />
        )}
        {projects?.map((project) => (
          <Project key={project.id} project={project} layout={layout} />
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Operations.DropDown>
            <Operations.SortBy />
            <Operations.OrderBy />
          </Operations.DropDown>
          <Operations.Filter />
        </div>
        <Operations.Layout />
      </div>

      <div
        className={`gap-5 h-full ${
          layout === "grid"
            ? "grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]"
            : "flex flex-col"
        }`}
        ref={parent}
      >
        {render()}
      </div>
    </div>
  );
}

function NewProject({ onAdd, layout }) {
  return (
    <Button
      color="tertiary"
      className={`group bg-background-disabled flex items-center justify-center   border  border-border rounded-lg shadow-md p-3 ${
        layout === "grid" ? "h-[240px] flex-col gap-2" : "w- h-20 gap-4"
      }`}
      onClick={onAdd}
    >
      <div className="h-10 w-10 flex items-center justify-center rounded-full p-1 bg-background-secondary text-text-tertiary hover:bg-background-tertiary group-hover:bg-background-tertiary">
        <FaPlus />
      </div>
      <h3 className="font-semibold text-text-primary">Add New Project</h3>
    </Button>
  );
}
