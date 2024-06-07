import { formatDate, getIntervals } from '@/utils/helpers';
import { useSessions, useDeleteSession, useDeleteSessions, useAbortSession, useAbortSessions } from './useSessions';
import { TableLayout } from '@/layouts/TableLayout';
import { useUser } from '@/hooks/useUser';
import { FiActivity, FiLogOut } from 'react-icons/fi';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';
import { TbDeviceDesktop, TbDeviceMobile, TbDeviceTablet } from 'react-icons/tb';

const BROWSERS_IMAGES = [
  {
    name: 'Chrome',
    display: 'Google Chrome',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/chrome/chrome.png',
  },
  {
    name: 'Firefox',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/firefox/firefox.png',
  },
  {
    name: 'YaBrowser',
    display: 'Yandex',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/yandex/yandex.png',
  },
  {
    name: 'Safari',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/safari/safari.png',
  },
  {
    name: 'Brave',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/brave/brave.png',
  },
  {
    name: 'Edge',
    display: 'Microsoft Edge',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/edge/edge.png',
  },
  {
    name: 'Opera',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/opera/opera.png',
  },
];

export default function SessionsList() {
  const { user } = useUser();
  const { sessions, isLoading, error } = useSessions();
  const { mutate: deleteSession } = useDeleteSession();
  const { mutate: deleteSessions } = useDeleteSessions();
  const { abort } = useAbortSession();
  const { abort: abortMultiple } = useAbortSessions();
  const navigate = useNavigateWithQuery();

  return (
    <TableLayout
      data={sessions}
      resourceName='Session'
      isLoading={isLoading}
      error={error}
      columns={[
        ...(user?.role === 'super-admin'
          ? [
              {
                key: 'fullName',
                displayLabel: 'Full Name',
                visible: true,
                type: 'string',
                format: (val, id) => `${(sessions || []).find((i) => i.id === id)?.gender || 'M'}. ${val}`,
              },
            ]
          : []),
        {
          key: 'location',
          displayLabel: 'Location',
          visible: true,
          type: 'string',
        },
        {
          key: 'ip',
          displayLabel: 'IP Address',
          visible: true,
          type: 'string',
        },
        {
          key: 'device',
          displayLabel: 'Device',
          visible: true,
          type: 'string',
          format: (val, id, isDownload) => {
            const icons = {
              Desktop: <TbDeviceDesktop size={20} />,
              Phone: <TbDeviceMobile size={20} />,
              Tablet: <TbDeviceTablet size={20} />,
            };
            return isDownload ? (
              val
            ) : (
              <div className='flex items-center gap-1.5'>
                {icons[val]}
                {val}
              </div>
            );
          },
          filter: [
            { value: 'Desktop', checked: false },
            { value: 'Tablet', checked: false },
            { value: 'Phone', checked: false },
          ],
        },
        {
          key: 'browser',
          displayLabel: 'Browser',
          visible: true,
          type: 'string',
          format: (val, id, isDownload) => {
            const browser = BROWSERS_IMAGES.find((b) => val?.toLowerCase().includes(b.name?.toLowerCase()));

            return isDownload ? (
              browser?.display || browser?.name || 'Unknown'
            ) : (
              <div className='flex items-center gap-2'>
                <img src={browser?.image || '/images/default-browser.png'} alt='browser' className='h-7 w-7' />
                <span className='text-sm font-medium text-text-primary'>
                  {browser?.display || browser?.name || 'Unknown'}
                </span>
              </div>
            );
          },
          filter: [
            {
              value: { value: 'Google Chrome', condition: (el) => el.browser === 'Chrome' },
              checked: false,
            },
            {
              value: { value: 'Microsoft Edge', condition: (el) => el.browser === 'Edge' },
              checked: false,
            },
            { value: 'Safari', checked: false },
            { value: 'Brave', checked: false },
            { value: 'Firefox', checked: false },
            { value: 'Opera', checked: false },
            {
              value: { value: 'Yandex', condition: (el) => el.browser === 'YaBrowser' },
              checked: false,
            },
          ],
        },
        {
          key: 'activities',
          displayLabel: 'Activities',
          visible: true,
          format : (val) =>  `${val.length} Activites`,
          fn(a, b, direction) {
            return direction === 'asc' ? a?.activities.length - b?.activities.length : b?.activities.length - a?.activities.length;
          },
          type: 'custom',
        },
        // {
        //   key: 'status',
        //   displayLabel: 'Status',
        //   visible: true,
        //   type: 'string',
        //   format: (val, id, isDownload) => {
        //     const colors = { Online: 'bg-green-600', Offline: 'bg-red-500', Current: 'bg-blue-600' };
        //     return isDownload ? (
        //       val
        //     ) : (
        //       <span className={`rounded-lg  px-2.5 py-1 text-white ${colors[val]}`}>{val}</span>
        //     );
        //   },
        //   filter: [
        //     { value: 'Online', checked: true },
        //     { value: 'Offline', checked: false },
        //   ],
        // },
        {
          key: 'created_at',
          displayLabel: 'Signed In At',
          visible: true,
          type: 'date',
          format: (val) => formatDate(val, true),
          filter: getIntervals('created_at', ['present', 'past']),
        },
      ]}
      fieldsToSearch={['firstName', 'lastName', 'location']}
      defaultSortBy='created_at'
      defaultDirection='desc'
      downloadOptions={{
        csvFileName: 'Sessions',
        pdfFileName: 'Sessions',
      }}
      onDelete={deleteSession}
      layoutOptions={{
        displayNewRecord: false,
        actions: (def) => [
          {
            text: 'Activities',
            icon: <FiActivity />,
            onClick: (session) => user?.role === 'super-admin' && navigate(session.id),
          },
          {
            text: 'Abort',
            icon: <FiLogOut />,
            onClick: (session) => abort(session.id),
            hidden: (session) => session?.status !== 'Online',
          },
          {
            ...def.delete,
            hidden: (session) => session?.status !== 'Offline',
          },
        ],
      }}
      canView={user?.role === 'super-admin'}
      selectedOptions={{
        actions: [
          {
            text: 'Abort',
            color: 'orange',
            onClick: (ids, onClose) => {
              abortMultiple(ids);
              onClose();
            },
            disabledCondition: (ids, data) => data?.some((app) => ids.includes(app.id) && app.status !== 'Online'),
            message: (data) =>
              data.length === 1
                ? 'This session has already been aborted.'
                : 'Some of these sessions have already been aborted.',
          },
        ],
        deleteOptions: {
          resourceName: 'session',
          onConfirm: (ids) => deleteSessions(ids, ),
        },
      }}
      hideAllRowsActions={user?.role !== 'super-admin'}
      hideRowActions={(row) => row.isCurrent === 'true'}
      hiddenActionsContent={(row) =>
        row.isCurrent === 'true' ? (
          <span className='rounded-lg  bg-blue-600 px-2.5 py-1 text-white'>Current</span>
        ) : null
      }
    />
  );
}
