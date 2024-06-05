/* eslint-disable react-refresh/only-export-components */
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, CheckBox, SearchInput, Status, ToolTip } from '@/components/ui';
import { useInterns } from '../../interns/useInterns';
import { useEffect, useState } from 'react';
import { Radio } from '@/components/ui/Radio';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri';
import Avatar from '@/components/ui/Avatar';

export const getSearchedInterns = (interns, query) => {
  return interns
    ?.filter((intern) => intern.fullName.trim().toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => a.firstName.localeCompare(b.firstName))
};
export const renderInternsStatus = (isLoading, error, searchedInterns, render, query) => {
  console.log(searchedInterns)
  if (isLoading) return <Status status='loading' />;
  if (error) return <Status status='error' heading={error?.message} size='small' />;
  if (searchedInterns?.length === 0 && query) return <Status status='noResults' size='small' />;
  if (searchedInterns?.length === 0)
    return (
      <div className='absolute grid h-full w-full place-content-center gap-2 text-center'>
        <h2 className='font-semibold text-text-primary'>Oops! It&apos;s empty here.</h2>
        <p className='text-xs font-medium text-text-secondary'>
          It seems like there&apos;s nothing to show at the moment. Please check back later.
        </p>
      </div>
    );

  return render();
};

export function TeamMembers({ updateStatus, updateState, state, projectManager, setProjectManager }) {
  const [teamMembers, setTeamMembers] = useState(state);
  const [parent] = useAutoAnimate({ duration: 400 });

  useEffect(() => {
    updateState?.(teamMembers);
    updateStatus(teamMembers.length ? 'completed' : 'skippable');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMembers]);

  useEffect(() => {
    if (teamMembers.length === 0) setProjectManager(null);
    if (teamMembers.length === 1) setProjectManager(teamMembers[0].id);
  }, [teamMembers, setProjectManager]);

  const render = () => {
    if (teamMembers.length === 0)
      return (
        <div className='flex h-full flex-col items-center justify-center gap-3'>
          <img src='/SVG/team.svg' alt='' className='w-[200px]' />
          <p className='text-center text-xs font-medium text-text-primary'>
            Your team is waiting for you to assemble it.
          </p>
        </div>
      );
    return teamMembers?.map((intern) => (
      <div key={intern.id} className='flex items-center gap-2'>
        <Radio
          name='projectManager'
          checked={projectManager === intern.id}
          onChange={(e) => setProjectManager(e.target.checked ? intern.id : null)}
        />
        <Intern intern={intern} isProjectManager={projectManager === intern.id} />
      </div>
    ));
  };

  return (
    <div className='grid h-full grid-rows-2 gap-3 divide-y-2 divide-border mobile:grid-cols-2 mobile:grid-rows-1 mobile:divide-x-2 mobile:divide-y-0'>
      <div className='flex flex-col gap-3 pb-4 mobile:pb-0 mobile:pr-4'>
        <h3 className='font-semibold text-text-secondary'>All Interns</h3>
        <AllInterns teamMembers={teamMembers} setTeamMembers={setTeamMembers} />
      </div>
      <div className='flex flex-col gap-5 pt-4 mobile:pl-4 mobile:pt-0'>
        <h3 className='font-semibold text-text-secondary'>Team Members ({teamMembers.length || '-'})</h3>
        <div className='relative h-full space-y-3 overflow-auto pr-2' ref={parent}>
          {render()}
        </div>
      </div>
    </div>
  );
}

export function AllInterns({ teamMembers, setTeamMembers, filter, selectedMembers, users }) {
  const { interns, error, isLoading } = useInterns();
  const [query, setQuery] = useState('');
  const [parent] = useAutoAnimate({ duration: 400 });

  const searchedInterns = getSearchedInterns(users ? users : filter ? filter(interns) : interns, query);

  const render = () => {
    return searchedInterns?.map((intern) => {
      const isChosen = teamMembers?.map((i) => i.id).includes(intern.id);

      return (
        <div
          key={intern.id}
          className={`flex items-center justify-between gap-3 rounded-lg p-2.5 transition-colors duration-300 hover:bg-background-secondary ${
            isChosen ? 'bg-background-secondary' : ''
          }`}
        >
          <CheckBox
            checked={isChosen}
            onChange={() => {
              const { id, firstName, lastName, email, avatar } = intern;
              setTeamMembers((prev) => {
                return prev.map((i) => i.id).includes(id)
                  ? prev.filter((i) => i.id !== id)
                  : [...prev, { id, fullName: `${firstName} ${lastName}`, email, avatar }];
              });
            }}
          />
          <div className='flex-1'>
            <Intern intern={intern} />
          </div>
          {intern?.projects && (
            <ToolTip content={'Assigned Projects'}>
              <span className='rounded-md bg-background-tertiary px-2.5 py-1 text-xs font-medium'>
                {intern.projects.length}
              </span>
            </ToolTip>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div className='grid grid-cols-[auto_min-content] items-center'>
        <SearchInput
          placeholder={`Search for ${users ? 'users' : 'interns'}`}
          query={query}
          onChange={setQuery}
          disabled={searchedInterns?.length === 0 && !query}
        />

        {selectedMembers && (
          <ToolTip content={<span>Uncheck All</span>}>
            <Button
              shape='icon'
              className='relative ml-3'
              disabled={selectedMembers.length === 0}
              onClick={() => setTeamMembers([])}
            >
              <RiCheckboxMultipleBlankLine />
              <span
                className={`absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary text-center text-xs font-bold leading-5 text-white transition-transform duration-300 ${
                  selectedMembers.length > 0 ? 'scale-100' : 'scale-0'
                }`}
              >
                {selectedMembers.length}
              </span>
            </Button>
          </ToolTip>
        )}
      </div>
      <div className='relative flex-1 space-y-1 overflow-y-auto overflow-x-hidden pr-2' ref={parent}>
        {renderInternsStatus(isLoading, error, searchedInterns, render, query)}
      </div>
    </>
  );
}

export function Intern({ intern: { fullName, email, avatar, gender } = {}, isProjectManager }) {
  return (
    <div className='flex items-center gap-2'>
      <Avatar custom={{ avatar, gender }} alt={fullName} />
      <div>
        <p className='mb-1 text-sm font-semibold text-text-primary'>
          {fullName}
          {isProjectManager && (
            <span className='ml-1 text-xs font-normal text-text-secondary'>( Project Manager )</span>
          )}
        </p>
        <p className='text-xs font-medium text-text-secondary'>{email}</p>
      </div>
    </div>
  );
}
