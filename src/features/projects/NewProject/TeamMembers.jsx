/* eslint-disable react-refresh/only-export-components */
import { CheckBox, SearchInput } from '@/components/ui';
import { useInterns } from '../../interns/useInterns';
import { Status } from '@/components/ui/Status';
import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const getSearchedInterns = (interns, query) =>
  interns?.filter((intern) =>
    `${intern.firstName} ${intern.lastName}`.trim().toLowerCase().includes(query.trim().toLowerCase())
  );

export const renderInternsStatus = (isLoading, error, searchedInterns) => {
  if (isLoading) return <Status status="loading" size="small" />;
  if (error) return <Status status="error" heading={error?.message} size="small" />;
  if (searchedInterns.length === 0) return <Status status="noResults" size="small" />;
};

export function TeamMembers({ updateStatus, updateState, state }) {
  const { interns, error, isLoading } = useInterns();
  const [teamMembers, setTeamMembers] = useState(state);
  const [query, setQuery] = useState('');
  const [parent] = useAutoAnimate();

  useEffect(() => {
    updateState?.(teamMembers);
    updateStatus(teamMembers.length ? 'completed' : 'skippable');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMembers]);

  const searchedInterns = getSearchedInterns(interns, query);

  const renderInterns = () => {
    if (isLoading) return <Status status="loading" size="small" />;
    if (error) return <Status status="error" heading={error?.message} size="small" />;
    if (searchedInterns.length === 0) return <Status status="noResults" size="small" />;

    return searchedInterns.map((intern) => (
      <Intern
        key={intern.id}
        intern={intern}
        onToggle={(intern) => {
          setTeamMembers((prev) => {
            return prev.map((i) => i.id).includes(intern.id)
              ? prev.filter((i) => i.id !== intern.id)
              : [...prev, intern];
          });
        }}
        isChosen={teamMembers.map((i) => i.id).includes(intern.id)}
      />
    ));
  };

  const renderTeam = () => {
    if (teamMembers.length === 0)
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <img src="/SVG/team.svg" alt="" className="w-[200px]" />
          <p className="text-center text-xs font-medium text-text-primary">
            Your team is waiting for you to assemble it.
          </p>
        </div>
      );
    return teamMembers?.map((intern) => <TeamMember key={intern.id} intern={intern} />);
  };

  return (
    <div className="grid h-full grid-rows-2 gap-3 divide-y-2 divide-border mobile:grid-cols-2 mobile:grid-rows-1 mobile:divide-x-2 mobile:divide-y-0">
      <div className="flex flex-col gap-3 pb-4 mobile:pb-0 mobile:pr-4">
        <h3 className="font-semibold text-text-secondary">All Interns</h3>
        <SearchInput placeholder="Search for interns" query={query} onChange={setQuery} />
        <div className="relative mt-5 flex-1 space-y-1 overflow-auto pr-2" ref={parent}>
          {renderInterns()}
        </div>
      </div>
      <div className="flex flex-col gap-5 pt-4 mobile:pl-4 mobile:pt-0">
        <h3 className="font-semibold text-text-secondary">Team Members ({teamMembers.length || '-'})</h3>
        <div className="relative h-full space-y-3 overflow-auto pr-2" ref={parent}>
          {renderTeam()}
        </div>
      </div>
    </div>
  );
}

function Intern({ intern, isChosen, onToggle }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg p-2.5 transition-colors duration-300 hover:bg-background-secondary ${
        isChosen ? 'bg-background-secondary' : ''
      }`}
    >
      <CheckBox checked={isChosen} onChange={() => onToggle(intern)} />
      <TeamMember intern={intern} />
    </div>
  );
}

export function TeamMember({ intern }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={intern?.image || '/images/default-profile.jpg'}
        alt={intern?.firstName}
        className="h-6 w-6 rounded-full border border-border"
      />
      <span className="text-sm font-semibold text-text-primary">{`${intern?.firstName} ${intern?.lastName}`}</span>
    </div>
  );
}
