import { Heading } from "@/components/Heading";
import { Link, useParams } from "react-router-dom";
import { useIntern } from "./useInterns";
import { Button } from "@/components/ui";
import { IoChevronBack } from "react-icons/io5";

export default function InternDetails() {
  const { id } = useParams();

  const { intern, isLoading, error } = useIntern(id);

  if (isLoading) {
    return <Heading>Loading...</Heading>;
  }
  if (error) {
    return <Heading>{error}</Heading>;
  }
  if (!intern) {
    return <Heading>Intern not found</Heading>;
  }

  return (
    <>
      <Link to="/app/supervisors" replace={true}>
        <Button color="tertiary" display="with-icon" size="small">
          <IoChevronBack />
          Back
        </Button>
      </Link>
      <Heading>InternDetails</Heading>
      <div className="">
        <p>{intern.firstName}</p>
        <p>{intern.lastName}</p>
        <p>{intern.email}</p>
        <p>{intern.phone}</p>
        <p>{intern.birthday}</p>
        <p>{intern.major}</p>
        <p>{intern.university}</p>
        <p>{intern.startDate}</p>
        <p>{intern.endDate}</p>
      </div>
    </>
  );
}
