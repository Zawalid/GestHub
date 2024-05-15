import InternOverview from '@/features/overview/InternOverview';
import AdminOverview from '@/features/overview/AdminOverview';
import SupervisorOverview from '@/features/overview/SupervisorOverview';
import UserOverview from '@/features/overview/UserOverview';
import { useUser } from '../hooks';

export function Overview() {
  const { user } = useUser();

  const overviews = {
    admin: <AdminOverview />,
    'super-admin': <AdminOverview />,
    supervisor: <SupervisorOverview />,
    intern: <InternOverview />,
    user: <UserOverview />,
  };

  return <div className='h-full py-3'>{overviews[user?.role]}</div>;
}
