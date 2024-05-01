import { Heading } from '@/components/Heading';
import InternOverview from '@/features/overview/InternOverview';
import AdminOverview from '@/features/overview/AdminOverview';
import SupervisorOverview from '@/features/overview/SupervisorOverview';
import UserOverview from '@/features/overview/UserOverview';
import { useUser } from '../hooks';

export function Overview() {
  const { user } = useUser();

  const overviews = {
    admin: <AdminOverview />,
    supervisor: <SupervisorOverview />,
    intern: <InternOverview />,
    user: <UserOverview />,
  };

  return (
    <>
      <Heading>Overview</Heading>
      <div className='py-3 h-full'>{overviews[user?.role]}</div>
    </>
  );
}
