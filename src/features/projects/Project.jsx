import { Button, DropDown } from "@/components/ui";
import {
  IoEllipsisHorizontalSharp,
  IoTrashOutline,
  MdDriveFileRenameOutline,
  FaPlus,
  IoEyeOutline,
} from "@/components/ui/Icons";
import { useConfirmationModal } from "@/hooks/useConfirmationModal";

const statusColors = {
  "Not Started": "bg-background-tertiary",
  "In Progress": "bg-primary",
  Completed: "bg-secondary",
};

const priorityColors = {
  Low: "bg-green-500",
  Medium: "bg-orange-500",
  High: "bg-red-500",
};

export default function Project({ project }) {
  const {
    name,
    description,
    startDate,
    endDate,
    teamId,
    status,
    supervisor,
    priority,
    budget,
    tasks,
    teamMembers,
    // emoji = "🚀",
  } = project;

  return (
    <div className="grid grid-rows-[24px_auto_20px_28px] relative gap-3 bg-background-disabled border border-border rounded-lg shadow-md p-3">
      <div
        className={`absolute -top-[1.5px] left-1/2 h-[2px] rounded-lg -translate-x-1/2 w-[150px] ${priorityColors[priority]}`}
      ></div>
      <div className="flex items-center justify-between gap-5">
        <span className="text-xs text-text-secondary font-medium">
          {startDate}
        </span>
        <Actions />
      </div>

      {/* <div className="span h-9 w-9 rounded-full border border-border grid place-content-center bg-background-tertiary">
        {emoji}
      </div> */}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
      <Progress tasks={tasks} statusColor={statusColors[status]} />
      <div className="mt-auto flex justify-between items-center ">
        <Avatars members={teamMembers} />
        <p
          className={`text-xs p-2 w-fit rounded-md text-text-primary py-1 ${statusColors[status]}`}
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
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const progress = (completedTasks.length / tasks.length) * 100;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold">
        {completedTasks.length}/{tasks.length}
      </span>
      <div className="py-1 w-full rounded-lg bg-background-tertiary relative">
        <div
          className={`absolute h-full top-0 rounded-lg ${statusColor}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

function Actions() {
  const { openModal } = useConfirmationModal();

  return (
    <DropDown
      toggler={
        <Button shape="icon" size="small">
          <IoEllipsisHorizontalSharp />
        </Button>
      }
    >
      <DropDown.Option>
        <IoEyeOutline />
        View Project
      </DropDown.Option>
      <DropDown.Option>
        <MdDriveFileRenameOutline />
        Edit Project
      </DropDown.Option>
      <DropDown.Option
        onClick={() =>
          openModal({
            message: "Are you sure you want to delete this project ?",
            title: "Delete Project",
            confirmText: "Delete",
          })
        }
      >
        <IoTrashOutline />
        Delete Project
      </DropDown.Option>
    </DropDown>
  );
}
