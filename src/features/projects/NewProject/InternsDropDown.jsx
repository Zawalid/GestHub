import { DropDown } from "@/components/ui";
import { useInterns } from "@/features/interns/useInterns";
import {
  TeamMember,
  getSearchedInterns,
  renderInternsStatus
} from "./TeamMembers";
import { useState } from "react";

export function InternsDropDown({ getValue, setValue }) {
  const { interns, error, isLoading } = useInterns();
  const [query, setQuery] = useState("");

  const searchedInterns = getSearchedInterns(interns, query);

  const render = () => {
    renderInternsStatus(isLoading, error, searchedInterns);

    return (
      <>
        <DropDown.Option
          onClick={() => setValue("assignee", "None")}
          isCurrent={"None" === getValue("assignee")}
        >
          None
        </DropDown.Option>
        {searchedInterns?.map((intern) => (
          <DropDown.Option
            key={intern.id}
            className="capitalize"
            onClick={() => setValue("assignee", intern)}
            isCurrent={intern === getValue("assignee")}
          >
            <TeamMember intern={intern} />
          </DropDown.Option>
        ))}
      </>
    );
  };

  return (
    <div className="gap-1.5 flex flex-col">
      <label className="font-medium text-text-tertiary capitalize text-sm">
        Assignee
      </label>
      <DropDown
        toggler={<DropDown.Toggler>
          {getValue("assignee") === "None" ? (
            "None"
          ) : (
            <TeamMember intern={getValue("assignee")} />
          )}
        </DropDown.Toggler>}
        options={{
          shouldCloseOnClick: false,
          className: "max-h-[250px] h-[230px]",
        }}
      >
        <DropDown.SearchBar
          placeholder="Search..."
          query={query}
          onChange={setQuery} />
        {render()}
      </DropDown>
    </div>
  );
}
