import { useState } from 'react';
import { MdOutlineDoNotDisturb } from 'react-icons/md';
import { DropDown } from '@/components/ui';
import { useInterns } from '@/features/interns/useInterns';
import { Intern, getSearchedInterns, renderInternsStatus } from './TeamMembers';

export function InternsDropDown({ getValue, setValue }) {
  const { interns, error, isLoading } = useInterns();
  const [query, setQuery] = useState('');

  const searchedInterns = getSearchedInterns(interns, query);

  const render = () => {
    return (
      <>
        {searchedInterns?.map((intern) => (
          <DropDown.Option
            size='small'
            key={intern.id}
            className='capitalize'
            onClick={() => setValue('assignee', intern)}
            isCurrent={intern === getValue('assignee')}
          >
            <Intern intern={intern} />
          </DropDown.Option>
        ))}
        <DropDown.Option onClick={() => setValue('assignee', 'None')} isCurrent={'None' === getValue('assignee')}>
          <MdOutlineDoNotDisturb size={20} />
          <span className='text-base'>None</span>
        </DropDown.Option>
      </>
    );
  };

  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-sm font-medium capitalize text-text-tertiary'>Assignee</label>
      <DropDown
        toggler={
          <DropDown.Toggler>
            {getValue('assignee') === 'None' ? 'None' : <Intern intern={getValue('assignee')} />}
          </DropDown.Toggler>
        }
        options={{
          shouldCloseOnClick: false,
          className: 'max-h-[250px] overflow-x-hidden relative h-[230px] overflow-y-auto',
        }}
      >
        <DropDown.SearchBar placeholder='Search...' query={query} onChange={setQuery} />
        {renderInternsStatus(isLoading, error, searchedInterns, render)}
      </DropDown>
    </div>
  );
}
