import { useParams } from 'react-router-dom';
import { useSession } from './useSessions';
import { Modal, Status } from '@/components/ui';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';
import { Operations } from '@/components/shared/Operations/Operations';
import { useOperations } from '@/components/shared/Operations/useOperations';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { formatDate } from '@/utils/helpers';
import {
  IoTrashOutline,
  MdDriveFileRenameOutline,
  LuPlus,
  FaRegCircleXmark,
  FaRegCircleCheck,
  LuUpload,
  LiaUserPlusSolid,
  LiaUserMinusSolid,
  LiaUserEditSolid,
} from '@/components/ui/Icons';
import { Skeleton } from '../applications/Applications';
import { STATUS_COLORS } from '@/utils/constants';

export default function Session() {
  const { id } = useParams();
  const { session, isLoading, error } = useSession(id);
  const navigate = useNavigateWithQuery();

  return (
    <Modal
      isOpen={location.pathname.includes('/sessions') && id}
      className='relative overflow-auto p-3 sm:p-5 md:h-[500px] md:w-[700px] md:border'
      onClose={() => navigate('/app/sessions')}
      closeButton={false}
    >
      <div className='mb-5 flex items-center justify-between gap-3 pt-7 md:pt-0'>
        <h1 className='mobile::text-xl flex items-center gap-2 text-lg font-bold text-text-primary'>
          Activities
          {isLoading || (
            <span className='rounded-lg border border-border bg-background-tertiary px-2 py-0.5 text-sm text-text-primary'>
              {session?.activities?.length}
            </span>
          )}
        </h1>
        {isLoading || (
          <span
            className={`rounded-lg bg-background-secondary px-2.5 py-1 text-sm text-white ${session?.isCurrent === 'true' ? 'bg-blue-500' : session?.status === 'Online' ? 'bg-green-600' : 'bg-red-500'}`}
          >
            {session?.isCurrent === 'true' ? 'Current' : session?.status}
          </span>
        )}
      </div>
      <Operations
        data={session?.activities}
        isLoading={isLoading}
        error={error}
        sortOptions={[{ key: 'created_at', display: 'Activity Date', action: 'date' }]}
        defaultSortBy='created_at'
        defaultDirection='desc'
        filters={{
          action: [
            { value: 'Create', checked: false },
            { value: 'Update', checked: false },
            { value: 'Delete', checked: false },
            { value: 'Approve', checked: false },
            { value: 'Reject', checked: false },
            { value: 'Upload', checked: false },
          ],
        }}
        fieldsToSearch={['activity', 'object']}
        searchQueryKey='s'
        sortQueryKey='so'
        directionQueryKey='d'
      >
        <ActivitiesList />
      </Operations>
    </Modal>
  );
}

function ActivitiesList() {
  const { data: activities, isLoading, error, query, appliedFiltersNumber } = useOperations();
  const [parent] = useAutoAnimate({ duration: 400 });

  const render = () => {
    if (isLoading) {
      return (
        <div className='space-y-3 pr-2'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} type='session' />
          ))}
        </div>
      );
    }
    if (error) return <Status status='error' heading={error.message} message='Please try again later' />;
    if (activities?.length === 0 && !query && !appliedFiltersNumber) {
      return (
        <div className='absolute grid h-full w-full place-content-center place-items-center gap-5'>
          <img src='/SVG/no-applications.svg' alt='' className='w-[140px]' />
          <div className='space-y-2 text-center'>
            <h2 className='font-medium text-text-primary'>This sessions has no activities yet</h2>
            <p className='text-sm text-text-secondary'>Activities will be displayed here once they are available.</p>
          </div>
        </div>
      );
    }
    if (activities?.length === 0 && (query || appliedFiltersNumber)) {
      return (
        <Status status='noResults' heading='No activities found' message='Try changing your search query or filters' />
      );
    }
    return (
      <div className='space-y-3 pr-2' ref={parent}>
        {activities?.map((ac) => (
          <Activity key={ac.id} activity={ac} />
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
      <div className='relative mb-4 flex-1 overflow-y-auto overflow-x-hidden'>{render()}</div>
      <Operations.ShowMore />
    </>
  );
}

const getIcon = (action, model) => {
  if (model === 'Profile') {
    return { Create: <LiaUserPlusSolid />, Update: <LiaUserEditSolid />, Delete: <LiaUserMinusSolid /> }[action];
  }
  if (model === 'Application') {
    return { Approve: <FaRegCircleCheck />, Reject: <FaRegCircleXmark />, Delete: <IoTrashOutline /> }[action];
  }
  if (model === 'File') return { Upload: <LuUpload />, Delete: <IoTrashOutline /> }[action];
  return { Create: <LuPlus />, Update: <MdDriveFileRenameOutline />, Delete: <IoTrashOutline /> }[action];
};
function Activity({ activity: { action, activity, object, created_at, model } }) {
  const colors = {
    Create: 'bg-green-600',
    Update: 'bg-blue-500',
    Delete: 'bg-red-500',
    Approve: 'bg-green-600',
    Reject: 'bg-orange-600',
    Upload: 'bg-purple-500',
  };

  return (
    <div className='flex w-full flex-col items-center  gap-5 rounded-md px-3 py-2 text-center transition-colors duration-200 hover:bg-background-secondary xs:flex-row xs:text-start'>
      <div className={`grid h-11 w-11 place-content-center rounded-full text-white sm:text-xl ${colors[action]}`}>
        {getIcon(action, model)}
      </div>
      <div className='flex-1 space-y-0.5'>
        <h5 className='text-sm font-medium capitalize text-text-primary'>{activity}</h5>
        <h6 className='text-wrap text-xs font-semibold text-text-secondary'>{object?.object || object}</h6>
        {action === 'Update' && ['Task', 'Project'].includes(model) && object.status && (
          <span
            className={`rounded-lg px-2 py-0.5 text-[10px] font-bold text-white ${STATUS_COLORS[object.status]?.bg}`}
          >
            {object.status}
          </span>
        )}
      </div>
      <span className='rounded-md bg-background-tertiary px-2 py-1 text-xs font-medium text-text-secondary'>
        {formatDate(created_at, true)}
      </span>
    </div>
  );
}
