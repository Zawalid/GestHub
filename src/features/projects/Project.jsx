import { Button, DropDown } from "@/components/ui";
import {
  IoEllipsisHorizontalSharp,
  IoTrashOutline,
  MdDriveFileRenameOutline,
  FaPlus,
} from "@/components/ui/Icons";

export default function Project({ project }) {
  const { name, startDate, endDate, description, status } = project;
  const statusColor =
    status === "Completed"
      ? "bg-secondary"
      : status === "In Progress"
      ? "bg-primary"
      : "bg-background-tertiary";

  return (
    <div className="flex gap-2.5 flex-col bg-background-disabled border border-border rounded-lg shadow-md p-3">
      <div className="flex items-center justify-between gap-5">
        <span className="text-xs text-text-secondary font-medium">
          {startDate}
        </span>
        <Actions />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
      <Progress statusColor={statusColor} />
      <div className="mt-auto flex justify-between items-center ">
        <Avatars members={[1, 2, 3, 4]} />
        <p
          className={`text-xs p-2 w-fit rounded-md text-white py-1 text-text-secondary ${statusColor}`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}

function Avatars({ members }) {
  return (
    <div className="flex-1 relative h-7">
      {members.map((m, i) => (
        <img
          key={m}
          src="/images/default-profile.jpg"
          alt="avatar"
          className="absolute top-0 z-[1] h-7 w-7 rounded-full border-2 border-border-color bg-grey-100 bg-person1"
          style={{ left: `${i * 15}px` }}
        />
      ))}
      <Button
        className="w-7 h-7 rounded-full z-[1] border border-border absolute grid place-content-center"
        style={{ left: `${members.length * 15}px` }}
        color="tertiary"
      >
        <FaPlus />
      </Button>
    </div>
  );
}

function Progress({ tasks, statusColor }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold">25/40</span>
      <div className="py-1 w-full rounded-lg bg-background-tertiary relative">
        <div
          className={`absolute h-full w-1/2 top-0 rounded-lg ${statusColor}`}
        ></div>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <DropDown
      toggler={
        <Button shape="icon" size="small">
          <IoEllipsisHorizontalSharp />
        </Button>
      }
    >
      <DropDown.Option>
        <MdDriveFileRenameOutline />
        Edit Project
      </DropDown.Option>
      <DropDown.Option>
        <IoTrashOutline />
        Delete Project
      </DropDown.Option>
    </DropDown>
  );
}
