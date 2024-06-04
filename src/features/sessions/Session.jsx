import { useParams } from 'react-router-dom';
import { useSession } from './useSessions';
import { Modal } from '@/components/ui';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';
import { Operations } from '@/components/shared/Operations/Operations';
import { useOperations } from '@/components/shared/Operations/useOperations';
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
import { render } from '../applications/Applications';
import { STATUS_COLORS } from '@/utils/constants';
import { useAutoAnimate } from '@formkit/auto-animate/react';

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
          {isLoading || <span className='count text-xs'>{session?.activities?.length}</span>}
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
        sortOptions={[{ key: 'created_at', display: 'Activity Date', type: 'date' }]}
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
        paginationKey='p'
        limitKey='p'
        directionQueryKey='d'
      >
        <ActivitiesList />
      </Operations>
    </Modal>
  );
}

function ActivitiesList() {
  const { data: activities, isLoading, error, query, appliedFiltersNumber, page, totalPages } = useOperations();
  const [parent] = useAutoAnimate({ duration: 400 });

  return (
    <>
      <div className='mb-4 flex items-center justify-between gap-5'>
        <div className='flex items-center gap-2'>
          <Operations.Sort />
          <Operations.Filter />
        </div>
        <Operations.Search />
      </div>
      <div className='scroll relative flex-1 space-y-3 overflow-y-auto overflow-x-hidden pr-2' ref={parent}>
        {render({
          isLoading,
          error,
          appliedFiltersNumber,
          data: activities,
          page,
          totalPages,
          query,
          message: {
            heading: 'This sessions has no activities yet',
            message: 'Activities will be displayed here once they are available.',
          },
          render: () => activities?.map((activity) => <Activity key={activity.id} activity={activity} />),
        })}
      </div>
      <Operations.Pagination onlyButtons={true} />
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
function Activity({ activity: { action, activity, object, created_at, model }, style }) {
  const colors = {
    Create: 'bg-blue-500',
    Update: 'bg-yellow-500',
    Delete: 'bg-red-500',
    Approve: 'bg-green-600',
    Reject: 'bg-orange-600',
    Upload: 'bg-purple-500',
  };

  return (
    <div
      className='flex w-full flex-col items-center  gap-5 rounded-md px-3 py-2 text-center transition-colors duration-200 hover:bg-background-secondary xs:flex-row xs:text-start'
      style={style}
    >
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
