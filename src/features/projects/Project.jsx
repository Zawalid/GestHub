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
  "Not Started": "bg-gray-500",
  "In Progress": "bg-primary",
  Completed: "bg-green-600",
};

const priorityColors = {
  Low: "bg-green-500",
  Medium: "bg-orange-500",
  High: "bg-red-500",
};

export default function Project({ project, layout }) {
  const {
    name,
    description,
    startDate,
    endDate,
    status,
    priority,
    tasks,
    teamMembers,
    progress,
  } = project;

  return (
    <div
      className={`grid rounded-tr-none grid-rows-[24px_auto_20px_28px] relative gap-3 bg-background-disabled border border-border rounded-lg shadow-md p-3 ${
        layout === "grid" ? "h-[240px]" : ""
      }`}
    >
      <div
        className={`absolute -top-[1.5px] -right-[1.2px] h-[2px] rounded-lg w-16 ${priorityColors[priority]}`}
      ></div>
      <div
        className={`absolute -right-[1px] -top-[1.2px] w-[2px] rounded-lg h-16 ${priorityColors[priority]}`}
      ></div>
      <div className="flex items-center justify-between gap-5">
        <Date startDate={startDate} endDate={endDate} />
        <Actions />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
        <p className="text-text-secondary text-sm line-clamp-2">
          {description}
        </p>
      </div>
      <Progress
        tasks={tasks}
        statusColor={statusColors[status]}
        progress={progress}
      />
      <div className="mt-auto flex justify-between items-center ">
        <Members members={teamMembers} />
        <p
          className={`text-xs p-2 w-fit rounded-md text-white py-1 ${statusColors[status]}`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}

function Members({ members }) {
  return (
    <div className="flex-1 relative h-7">
      {members.map((m, i) => (
        <img
          key={m}
          src="/images/default-profile.jpg"
          alt="avatar"
          className="absolute top-0 z-[1] h-7 w-7 rounded-full border-2 border-border"
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

function Progress({ tasks, statusColor, progress }) {
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-primary font-bold">
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

function Date({ startDate, endDate }) {
  return (
    <div className="project-date h-6 w-20 relative">
      <div className="side z-[1] bg-background-secondary absolute">
        <span className="text-text-secondary ">{startDate}</span>
      </div>
      <div className="side bg-red-500 overflow-hidden -z-[1]">
        <span className="text-white">{endDate}</span>
      </div>
    </div>
  );
}
