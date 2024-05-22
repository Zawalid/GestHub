import { Modal, Status } from '../../components/ui';
import { useApplications } from '@/features/applications/useApplications';
import { BsClipboard2Check, MdOutlinePendingActions } from '@/components/ui/Icons';
import { Operations } from '@/components/shared/Operations/Operations';
import { useOperations } from '@/components/shared/Operations/useOperations';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { formatDate } from '@/utils/helpers';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';

export default function Applications() {
  const navigate = useNavigateWithQuery();
  const { applications, isLoading, error } = useApplications();

  return (
    <Modal
      isOpen={location.pathname === '/applications'}
      className='relative overflow-auto p-3 sm:p-5 md:h-[500px] md:w-[700px] md:border'
      onClose={() => navigate('/')}
      closeButton={false}
    >
      <h1 className='mb-5 text-lg font-bold text-text-primary'>My Applications</h1>
      <Operations
        data={applications?.filter((d) => d.status !== 'Rejected')}
        isLoading={isLoading}
        error={error}
        sortOptions={[
          { key: 'offer', display: 'Offer Title', type: 'string' },
          { key: 'created_at', display: 'Application Date', type: 'date' },
        ]}
        defaultSortBy='created_at'
        defaultDirection='desc'
        filters={{
          status: [
            { value: 'Pending', checked: false },
            { value: 'Approved', checked: false },
          ],
          sector: [...new Set(applications?.map((application) => application.sector))].map((s) => ({
            value: s,
            checked: false,
          })),
        }}
        fieldsToSearch={['offer', 'sector']}
      >
        <ApplicationsList />
      </Operations>
    </Modal>
  );
}

function ApplicationsList() {
  const { data: applications, isLoading, error, query, appliedFiltersNumber } = useOperations();
  const [parent] = useAutoAnimate({ duration: 400 });

  const render = () => {
    if (isLoading) {
      return (
        <div className='space-y-3 pr-2'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      );
    }
    if (error) return <Status status='error' heading={error.message} message='Please try again later' />;
    if (applications?.length === 0 && !query && !appliedFiltersNumber) {
      return (
        <div className='absolute grid h-full w-full place-content-center place-items-center gap-5'>
          <img src='/SVG/no-applications.svg' alt='' className='w-[140px]' />
          <div className='space-y-2 text-center'>
            <h2 className='font-medium text-text-primary'>No applications have been filed yet</h2>
            <p className='text-sm text-text-secondary'>Start by applying for an offer.</p>
          </div>
        </div>
      );
    }
    if (applications?.length === 0 && (query || appliedFiltersNumber)) {
      return (
        <Status
          status='noResults'
          heading='No applications found'
          message='Try changing your search query or filters'
        />
      );
    }
    return (
      <div className='space-y-3 pr-2' ref={parent}>
        {applications?.map((d) => (
          <Application key={d.id} application={d} />
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

function Application({ application: { id, offer, sector, status, created_at } }) {
  const navigate = useNavigateWithQuery();

  return (
    <button
      className='flex w-full flex-col items-center  gap-3 rounded-md px-3 py-2 text-center transition-colors duration-200 hover:bg-background-secondary xs:flex-row xs:text-start'
      onClick={() => navigate(`/applications/${id}`, { state: { source: '/applications' } })}
    >
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
        {formatDate(created_at, true)}
      </span>
    </button>
  );
}

export function Skeleton({ type = 'application' }) {
  return (
    <div className='flex animate-pulse cursor-auto items-center gap-5 px-3 py-2 hover:bg-transparent'>
      <div className='grid h-12 w-12 rounded-full bg-background-secondary'></div>
      <div className='flex-1 space-y-1.5'>
        <div className='h-2.5 w-40 rounded-lg bg-background-tertiary'></div>
        <div className='h-1 w-24 rounded-lg bg-background-secondary'></div>
        {type === 'application' && <div className='h-2 w-12 rounded-lg bg-background-secondary'></div>}
      </div>
      <div className='h-3 w-24 rounded-lg bg-background-secondary'></div>
    </div>
  );
}
