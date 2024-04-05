import { Operations } from "@/components/shared/operations/Operations";
import AddMembers from "./AddMembers";
import Project from "./Project";
import { useProjects } from "./useProjects";
import { Button } from "@/components/ui";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function ProjectsList() {
  const { projects: initialProjects, isLoading, error } = useProjects();
  const [projects, setProjects] = useState(initialProjects);

  const getOperatedOnData = (data) => setProjects(data);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="flex flex-col gap-5">
      <Operations
        data={initialProjects}
        getData={getOperatedOnData}
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
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Operations.Search />
            <Operations.DropDown>
              <Operations.SortBy />
              <Operations.OrderBy />
            </Operations.DropDown>
          </div>
          <div className="flex items-center gap-3">
            <Operations.Filter />
            <Operations.Layout />
          </div>
        </div>
      </Operations>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-5">
        <NewProject />
        {projects?.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </div>
      {/* <AddMembers /> */}
    </div>
  );
}

function NewProject() {
  return (
    <Button
      color="tertiary"
      className="group bg-background-disabled flex items-center justify-center flex-col gap-2 border  border-border rounded-lg shadow-md p-3"
    >
      <div className="h-10 w-10 flex items-center justify-center rounded-full p-1 bg-background-secondary text-text-tertiary hover:bg-background-tertiary group-hover:bg-background-tertiary">
        <FaPlus />
      </div>
      <h3 className="font-semibold text-text-primary">Add New Project</h3>
    </Button>
  );
}
