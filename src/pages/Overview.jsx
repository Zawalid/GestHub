import InternOverview from '@/features/overview/InternOverview';
import AdminOverview from '@/features/overview/AdminOverview';
import SupervisorOverview from '@/features/overview/SupervisorOverview';
import { useUser } from '../hooks';

export function Overview() {
  const { user } = useUser();

  const overviews = {
    admin: <AdminOverview />,
    'super-admin': <AdminOverview />,
    supervisor: <SupervisorOverview />,
    intern: <InternOverview />,
  };

  return <div className='flex-1'>{overviews[user?.role]}</div>;
}
