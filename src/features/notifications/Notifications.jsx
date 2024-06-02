import { IoTrashOutline, IoNotificationsOutline } from 'react-icons/io5';
import { Button, DropDown } from '@/components/ui';
import {
  useDeleteNotification,
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
} from './useNotifications';
import {
  FaDiagramProject,
  FaCalendarXmark,
  FaRegCircleCheck,
  LuListTodo,
  FaRegCalendarCheck,
  LuTimerReset,
} from '@/components/ui/Icons';
import { useState } from 'react';

export function Notifications() {
  const { notifications, unreadNotifications, isLoading } = useNotifications();
  const [page, setPage] = useState(1);
  const { mutate } = useMarkAllNotificationsAsRead();

  const limit = 10;
  const totalPages = Math.ceil(notifications?.length / limit);

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
    return (
      <>
        {notifications?.slice(0, page * limit).map((notification, index) => (
          <Notification key={index} notification={notification} unreadNotifications={unreadNotifications} />
        ))}
        {totalPages > 1 && (
          <Button
            color='tertiary'
            size='small'
            onClick={() => (page === totalPages ? setPage(1) : setPage(page + 1))}
            className='mx-auto mt-3'
          >
            {page === totalPages ? 'View Less' : 'View More'}
          </Button>
        )}
      </>
    );
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
          onClick={mutate}
        >
          Mark all as read
        </button>
      </DropDown.Title>
      <DropDown.Divider className='mb-2' />
      {render()}
    </DropDown>
  );
}

const icons = {
  newProject: { icon: <FaDiagramProject />, color: 'bg-orange-500' },
  overdueProject: { icon: <FaCalendarXmark />, color: 'bg-red-500' },
  completedProject: { icon: <FaRegCircleCheck />, color: 'bg-blue-500' },
  newTask: { icon: <LuListTodo />, color: 'bg-yellow-500' },
  completedTask: { icon: <FaRegCircleCheck />, color: 'bg-blue-500' },
  overdueTask: { icon: <FaCalendarXmark />, color: 'bg-red-500' },
  acceptedApplication: { icon: <FaRegCircleCheck />, color: 'bg-green-600' },
  endingInternship: { icon: <LuTimerReset />, color: 'bg-teal-500' },
  completedInternship: { icon: <FaRegCalendarCheck />, color: 'bg-purple-500' },
  newIntern : null,
  newFile : null
};



function Notification({ notification, unreadNotifications }) {
  const { id, activity, object, time, action } = notification;
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate } = useDeleteNotification();

  return (
    <DropDown.Option
      className={unreadNotifications?.includes(id) ? 'bg-background-secondary' : 'hover:bg-background-disabled'}
      onClick={() => {
        unreadNotifications?.includes(id) && markAsRead(id);
        // navigate(`/applications/${id}`, { state: { source: window.location.pathname } });
      }}
    >
      <div className={`grid h-11 w-11 place-content-center rounded-full text-white sm:text-xl ${icons[action]?.color}`}>
        {icons[action]?.icon}
      </div>
      <div className='flex-1 space-y-1'>
        <div className='flex justify-between gap-2'>
          <div className='space-y-0.5'>
            <h5 className='text-text-primary'>{activity}</h5>
            {object && <h6 className='text-xs text-text-secondary'>{object}</h6>}
          </div>
          <Button shape='icon' size='small' onClick={() => mutate(id)}>
            <IoTrashOutline />
          </Button>
        </div>
        <p className='text-xs font-normal text-text-tertiary'>{time}</p>
      </div>
    </DropDown.Option>
  );
}

function Skeleton() {
  return (
    <DropDown.Option className='animate-pulse cursor-auto hover:bg-transparent'>
      <div className='grid h-11 w-11 rounded-full bg-background-secondary'></div>
      <div className='flex-1 space-y-1.5'>
        <div className='h-2 rounded-lg bg-background-tertiary'></div>
        <div className='h-1 w-32 rounded-lg bg-background-secondary'></div>
        <div className='h-1 w-10 rounded-lg bg-background-secondary'></div>
      </div>
    </DropDown.Option>
  );
}
