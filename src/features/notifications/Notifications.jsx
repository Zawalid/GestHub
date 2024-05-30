import { IoNotificationsOutline } from 'react-icons/io5';
import { Button, DropDown } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { useMarkAllNotificationsAsRead, useMarkNotificationAsRead, useNotifications } from './useNotifications';

export function Notifications() {
  const { notifications, unreadNotifications, isLoading } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: markAllAsRead } = useMarkAllNotificationsAsRead();
  const navigate = useNavigate();

  // const notifications = useMemo(() => {
  //   return applications
  //     ?.filter((d) => d.status === 'Approved')
  //     .toSorted((a, b) => new Date(b?.updated_at) - new Date(a?.updated_at))
  //     ?.map((d) => ({
  //       id: d.id,
  //       icon: <FaRegCircleCheck />,
  //       title: 'Your application has been accepted',
  //       subtitle: d.offer,
  //       time: getRelativeTime(d.updated_at),
  //       isRead: d.isRead,
  //     }));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [applications, isOpen]);

  // const unreadNotifications = notifications?.filter((n) => !n.isRead).map((n) => n.id);

  const render = () => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />);
    }
    if (!notifications?.length) {
      return (
        <div className='absolute left-0 top-0 grid h-full w-full place-content-center place-items-center gap-3'>
          <img src='/images/no-notifications.png' alt='' className='w-16' />
          <h4 className='font-medium text-text-primary'>No notifications yet</h4>
          <p className='text-center text-xs text-text-secondary'>
            We&apos;ll notify you once your application has been <br /> processed.
          </p>
        </div>
      );
    }
    return notifications?.map((notification, index) => {
      const { id, title, subtitle, time, icon } = notification;

      return (
        <DropDown.Option
          key={index}
          className={unreadNotifications?.includes(id) ? 'bg-background-secondary' : 'hover:bg-background-disabled'}
          onClick={() => {
            unreadNotifications?.includes(id) && markAsRead(id);
            navigate(`/applications/${id}`, { state: { source: window.location.pathname } });
          }}
        >
          <div className='grid h-11 w-11 place-content-center rounded-full bg-green-600 text-white sm:text-xl'>
            {icon}
          </div>
          <div className='flex-1 space-y-0.5'>
            <h5 className='text-text-primary'>{title}</h5>
            <h6 className='text-xs text-text-secondary'>{subtitle}</h6>
            <p className='text-xs font-normal text-text-tertiary'>{time}</p>
          </div>
        </DropDown.Option>
      );
    });
  };

  return (
    <DropDown
      toggler={
        <Button shape='icon'>
          <IoNotificationsOutline />
          <span
            className={`absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary text-center text-xs font-bold leading-5 text-white transition-transform duration-300 ${
              unreadNotifications?.length > 0 ? 'scale-100' : 'scale-0'
            }`}
          >
            {unreadNotifications?.length}
          </span>
        </Button>
      }
      options={{
        className: 'notifications w-full mobile:w-[400px] max-h-max overflow-auto h-[400px]',
        shouldCloseOnClick: false,
      }}
      togglerClassName='relative'
    >
      <DropDown.Title className='z-10 flex items-center justify-between py-2'>
        <span className='text-base font-semibold'>Notifications</span>
        <button
          className='text-xs font-medium text-text-secondary transition-colors duration-300 hover:text-text-tertiary disabled:text-text-disabled'
          disabled={notifications?.every((n) => n.isRead)}
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>
      </DropDown.Title>
      <DropDown.Divider className='mb-2' />
      {render()}
    </DropDown>
  );
}

function Skeleton() {
  return (
    <DropDown.Option className='animate-puls cursor-auto hover:bg-transparent'>
      <div className='grid h-11 w-11 rounded-full bg-background-secondary'></div>
      <div className='flex-1 space-y-1.5'>
        <div className='h-2 rounded-lg bg-background-tertiary'></div>
        <div className='h-1 w-32 rounded-lg bg-background-secondary'></div>
        <div className='h-1 w-10 rounded-lg bg-background-secondary'></div>
      </div>
    </DropDown.Option>
  );
}
