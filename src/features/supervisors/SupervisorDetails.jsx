import { Heading } from "@/components/Heading";
import { Link, useParams } from "react-router-dom";
import { useSupervisor } from "./useSupervisors";
import { Button } from "@/components/ui";
import { IoChevronBack } from "react-icons/io5";

export default function SupervisorDetails() {
  const { id } = useParams();

  const { supervisor, isLoading, error } = useSupervisor(id);

  if (isLoading) {
    return <Heading>Loading...</Heading>;
  }
  if (error) {
    return <Heading>{error}</Heading>;
  }
  if (!supervisor) {
    return <Heading>Supervisor not found</Heading>;
  }

  return (
    <>
      <Link to="/app/supervisors" replace={true}>
        <Button color="tertiary" display="with-icon" size="small">
        <IoChevronBack />
          Back</Button>
      </Link>

      <Heading>SupervisorDetails</Heading>
      <div className="">
        <p>{supervisor.firstName}</p>
        <p>{supervisor.lastName}</p>
        <p>{supervisor.email}</p>
        <p>{supervisor.phone}</p>
        <p>{supervisor.department}</p>
      </div>
    </>
  );
}
