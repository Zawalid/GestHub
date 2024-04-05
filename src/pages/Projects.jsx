import { Heading } from "@/components/Heading";
import { Operations } from "@/components/shared/operations/Operations";
import ProjectsList from "@/features/projects/ProjectsList";

export function Projects() {
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading>Projects</Heading>
        {/* <Operations>
          <Operations.Search />
        </Operations> */}
      </div>
      <ProjectsList />
    </>
  );
}
