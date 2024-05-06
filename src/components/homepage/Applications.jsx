import { useNavigate } from 'react-router-dom';
import { Modal, Status } from '../ui';
import { useUserDemands } from '@/features/demands/useDemands';
import { BsClipboard2Check, MdOutlinePendingActions } from '@/components/ui/Icons';
import { Operations } from '../shared/operations/Operations';
import { useOperations } from '../shared/operations/useOperations';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Applications() {
  const navigate = useNavigate();
  const { demands, isLoading, error } = useUserDemands();

  return (
    <Modal
      isOpen={location.pathname === '/applications'}
      className='relative overflow-auto p-5 sm:h-fit md:h-[500px] md:w-[700px] md:border'
      onClose={() => navigate('/')}
    >
      <h1 className='mb-5 text-lg font-bold text-text-primary'>My Applications</h1>
      <Operations
        data={demands}
        isLoading={isLoading}
        error={error}
        sortOptions={[
          { key: 'offer', display: 'Offer Title', type: 'string' },
          { key: 'created_at', display: 'Application Date', type: 'date' },
        ]}
        defaultSortBy='created_at'
        filters={{
          status: [
            { value: 'Pending', checked: false },
            { value: 'Approved', checked: false },
          ],
          sector: [...new Set(demands?.map((demand) => demand.sector))].map((s) => ({ value: s, checked: false })),
        }}
        fieldsToSearch={['offer', 'sector']}
      >
        <ApplicationsList demands={demands} />
      </Operations>
    </Modal>
  );
}

function ApplicationsList() {
  const { data: demands, isLoading, error, query, appliedFiltersNumber } = useOperations();
  const [parent] = useAutoAnimate({ duration: 400 });

  const render = () => {
    if (isLoading) return <Status status='loading' />;
    if (error) return <Status status='error' heading={error.message} message='Please try again later' />;
    if (demands?.length === 0 && (query || appliedFiltersNumber))
      return (
        <Status
          status='noResults'
          heading='No applications found'
          message='Try changing your search query or filters'
        />
      );
    return (
      <div className='space-y-3 pr-2' ref={parent}>
        {demands?.map((d) => (
          <Application key={d.id} demand={d} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className='mb-4 flex items-center justify-between gap-5'>
        <div className='flex items-center gap-2'>
          <Operations.DropDown>
            <Operations.SortBy />
            <Operations.OrderBy />
          </Operations.DropDown>
          <Operations.Filter />
        </div>
        <Operations.Search />
      </div>
      <div className='relative flex-1 overflow-auto'>{render()}</div>
    </>
  );
}

function Application({ demand: { id,offer, sector, status, startDate } }) {
  const navigate = useNavigate()

  return (
    <button className='flex w-full items-center gap-3 rounded-md px-3 py-2 text-start transition-colors duration-200 hover:bg-background-secondary' onClick={() => navigate(String(id))}>
      <div
        className={`grid h-11 w-11 place-content-center rounded-full bg-green-600 text-white sm:text-xl ${status === 'Pending' ? 'bg-orange-500' : 'bg-green-600'}`}
      >
        {status === 'Pending' ? <MdOutlinePendingActions /> : <BsClipboard2Check />}
      </div>
      <div className='flex-1 space-y-0.5'>
        <h5 className='text-sm font-semibold text-text-primary'>{offer}</h5>
        <h6 className='text-xs font-medium text-text-secondary'>{sector}</h6>
        <span
          className={`rounded-lg px-2 py-0.5 text-[10px] font-bold text-white ${status === 'Pending' ? 'bg-orange-500' : 'bg-green-600'}`}
        >
          {status}
        </span>
      </div>
      <span className='rounded-md bg-background-tertiary px-2 py-1 text-xs font-medium text-text-secondary'>
        {startDate}
      </span>
    </button>
  );
}
