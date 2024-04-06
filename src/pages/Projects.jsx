import { Heading } from "@/components/Heading";
import { Operations } from "@/components/shared/operations/Operations";
import ProjectsList from "@/features/projects/ProjectsList";
import { useProjects } from "@/features/projects/useProjects";

export function Projects() {
  const { projects, isLoading, error } = useProjects();

  return (
    <Operations
      data={projects}
      isLoading={isLoading}
      error={error}
      sortOptions={[
        { key: "name", display: "Name", type: "string" },
        { key: "startDate", display: "Start Date", type: "date" },
        { key: "endDate", display: "End Date", type: "date" },
        { key: "tasksNumber", display: "Tasks Number", type: "number" },
        { key: "membersNumber", display: "Members Number", type: "number" },
        { key: "progress", display: "Progress", type: "number" },
      ]}
      defaultSortBy="startDate"
      defaultDirection="asc"
      filters={{
        status: [
          { value: "Not Started", checked: false },
          { value: "In Progress", checked: false },
          { value: "Completed", checked: false },
        ],
        priority: [
          { value: "Low", checked: false },
          { value: "Medium", checked: false },
          { value: "High", checked: false },
        ],
      }}
      defaultLayout="grid"
      fieldsToSearch={["name"]}
    >
      <div className="flex justify-between items-center">
        <Heading>Projects</Heading>
        <Operations.Search />
      </div>
      <ProjectsList />
    </Operations>
  );
}
