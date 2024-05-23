import { useEffect, useState } from 'react';
import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PieChartStats, { Legend, createCustomTooltip } from './PieChart';
import { AllInterns, Intern } from '../projects/NewProject/TeamMembers';
import { IoPeople, LuClipboardList, MdOutlinePendingActions } from '@/components/ui/Icons';
import { Button, Modal, Status } from '@/components/ui';
import { getTimelineDates } from '@/utils/helpers';
import { useGenerateAttestation, useGenerateAttestations } from '../interns/useInterns';
import { useAdmins, useApplications, useOffers, useSupervisors, useInterns } from '@/hooks/index';
import { useNavigate } from 'react-router-dom';
import { Stat } from './Stat';
import SupervisorOverview from './SupervisorOverview';

export default function AdminOverview() {
  const [current, setCurrent] = useState('offers');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setCurrent('offers');
      if (e.key === 'ArrowRight') setCurrent('projects');
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-1 self-center'>
        {['offers', 'projects'].map((e) => (
          <button
            key={e}
            className={`h-3 w-3 rounded-full border border-border shadow-md transition-colors duration-300 ${e === current ? 'bg-text-primary ' : 'bg-background-secondary'}`}
            onClick={() => setCurrent(e)}
          ></button>
        ))}
      </div>
      <div className='grid overflow-hidden'>
        <div
          className={`col-[1] row-[1] flex h-full flex-col gap-5 overflow-x-auto transition-transform duration-500 ${current === 'offers' ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Stats />
          <OffersAnalytics />
        </div>
        <div
          className={`col-[1] row-[1] h-fit overflow-x-auto transition-transform duration-500 ${current === 'projects' ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <SupervisorOverview />
        </div>
      </div>
    </div>
  );
}

function Stats() {
  const { applications, isLoading: isApplicationsLoading } = useApplications();
  const { interns, isLoading: isInternsLoading } = useInterns();
  const { supervisors, isLoading: isSupervisorsLoading } = useSupervisors();
  const { admins, isLoading: isAdminsLoading } = useAdmins();
  const navigate = useNavigate();

  const stats = [
    {
      label: { value: 'Total Applications' },
      value: { value: applications?.length },
      icon: { icon: <LuClipboardList /> },
      className: 'bg-primary',
      onClick: () => navigate('/app/applications'),
    },
    {
      label: { value: 'Pending Applications' },
      value: { value: applications?.filter((p) => p.status === 'Pending').length },
      icon: { icon: <MdOutlinePendingActions /> },
      className: 'bg-orange-500 dark:bg-orange-600',
      onClick: () => navigate('/app/applications', { state: { filter: 'Pending' } }),
    },
  ];

  return (
    <div className='flex flex-col gap-5 mobile:grid mobile:grid-cols-2 md:grid-cols-4 md:grid-rows-[repeat(3,auto)]'>
      {stats.map((stat, index) => (
        <Stat key={index} isLoading={isApplicationsLoading} {...stat} />
      ))}

      <PieChartStats
        data={[
          { name: 'Pending', value: applications?.filter((p) => p.status === 'Pending').length },
          { name: 'Approved', value: applications?.filter((p) => p.status === 'Approved').length },
          { name: 'Rejected', value: applications?.filter((p) => p.status === 'Rejected').length },
        ]}
        title='Applications Status'
        legend={[
          { text: 'Pending', color: 'bg-orange-500' },
          { text: 'Approved', color: 'bg-green-600' },
          { text: 'Rejected', color: 'bg-red-500' },
        ]}
        COLORS={['#f97316', '#16a34a', '#ef4444']}
        className='col-span-2 row-span-3 min-h-[350px]'
        isLoading={isApplicationsLoading}
      />

      <div className='col-span-2 flex items-start justify-between rounded-lg border border-border bg-background-secondary p-3 shadow-md'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-text-secondary'>Total Personnel</h4>
          <div className='flex gap-4 flex-wrap'>
            {[
              { name: 'admins', value: admins?.length, isLoading: isAdminsLoading },
              { name: 'supervisors', value: supervisors?.length, isLoading: isSupervisorsLoading },
              { name: 'interns', value: interns?.length, isLoading: isInternsLoading },
            ].map(({ name, value, isLoading }) => (
              <Button
                key={name}
                display='with-icon'
                className='bg-background-tertiary'
                onClick={() => navigate(`/app/${name}`)}
              >
                {isLoading ? (
                  <div className='sending'></div>
                ) : (
                  <h3 className='font-bold lg:text-xl'>{value}</h3>
                )}
                <h5 className='text-xs capitalize lg:text-sm'>{name}</h5>
              </Button>
            ))}
          </div>
        </div>
        <div className='rounded-lg bg-background-tertiary p-2 text-xl'>
          <IoPeople />
        </div>
      </div>

      <CompletedInternships />
    </div>
  );
}

function CompletedInternships() {
  const { interns, isLoading, error } = useInterns();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useGenerateAttestation();

  const completedInternships = interns
    ?.filter((intern) => {
      const { isOverdue } = getTimelineDates(intern.startDate, intern.endDate);
      return isOverdue && !intern.attestation;
    })
    .toSorted((a, b) => new Date(a?.startDate) - new Date(b?.startDate));

  const render = () => {
    if (isLoading) {
      return Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className='flex animate-puls items-center justify-between gap-5 rounded-lg border border-border px-3 py-1.5'
        >
          <div className='h-9 w-9 rounded-full border border-border bg-background-tertiary'></div>
          <div className='flex-1 space-y-2'>
            <div className='h-2.5 w-24 rounded-lg bg-background-tertiary'></div>
            <div className='h-1.5 w-28 rounded-lg bg-background-secondary'></div>
          </div>
          <div className='h-3.5 w-14 rounded-lg bg-background-secondary'></div>
        </div>
      ));
    }
    if (error) {
      return <p className='text-sm font-medium text-text-secondary'>Something went wrong. Please try again later.</p>;
    }
    if (completedInternships?.length === 0) {
      return <p className='text-sm font-medium text-text-secondary'>No interns have finished their internship yet.</p>;
    }
    return completedInternships?.slice(0, 2).map((intern) => (
      <div
        key={Intern.id}
        className='flex items-center justify-between gap-5 rounded-lg border border-border px-3 py-1.5'
      >
        <Intern intern={intern} />
        <Button color='tertiary' size='small' onClick={() => mutate(intern.id)}>
          Generate
        </Button>
      </div>
    ));
  };

  return (
    <>
      <div className='min-h-[100px] col-span-2 flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-text-primary'>Completed Internship</h3>
          <Button
            color='secondary'
            size='small'
            disabled={!completedInternships?.length || isLoading || error}
            onClick={() => setIsOpen(true)}
          >
            Show All
          </Button>
        </div>

        {render()}
      </div>
      <GenerateAttestation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        completedInternships={completedInternships}
      />
    </>
  );
}

function GenerateAttestation({ isOpen, onClose, completedInternships }) {
  const [generateTo, setGenerateTo] = useState([]);
  const { mutate } = useGenerateAttestations();

  const close = () => (onClose(), setGenerateTo([]));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='flex flex-col gap-4 p-5 sm:h-[550px] sm:w-[400px] sm:border'
      closeOnBlur={true}
    >
      <h1 className='mb-2 text-lg font-bold text-text-primary'>Generate Attestations</h1>
      <AllInterns
        teamMembers={generateTo}
        setTeamMembers={setGenerateTo}
        filter={(interns) => interns?.filter((intern) => completedInternships?.map((m) => m.id).includes(intern.id))}
        selectedMembers={generateTo}
      />
      <div className='mt-2 grid grid-cols-2 gap-4'>
        <Button color='tertiary' onClick={close}>
          Cancel
        </Button>
        <Button
          color='secondary'
          disabled={generateTo.length === 0}
          onClick={() => {
            close();
            mutate(generateTo.map((g) => g.id));
          }}
        >
          Generate
        </Button>
      </div>
    </Modal>
  );
}

function OffersAnalytics() {
  const { offers, isLoading } = useOffers();
  const navigate = useNavigate();

  const onClick = (data) => navigate('/app/applications', { state: { filter: data.fullName } });

  const latestOffers = offers
    ?.filter((offer) => offer.applications?.length > 0)
    .toSorted((a, b) => new Date(b?.publicationDate) - new Date(a?.publicationDate))
    .slice(0, 7);

  const data = latestOffers?.map((offer) => {
    const rejected = offer?.applications.filter((application) => application.status === 'Rejected');
    const approved = offer?.applications.filter((application) => application.status === 'Approved');
    return {
      id: offer?.id,
      name: `${offer?.title.slice(0, 8)}${offer?.title.slice(8).length ? '...' : ''}`,
      fullName: offer?.title,
      Approved: approved?.length,
      Rejected: rejected?.length,
    };
  });

  const CustomTooltip = createCustomTooltip([
    { key: 'fullName', label: 'Offer' },
    { key: 'Approved', intro: 'Approved' },
    { key: 'Rejected', intro: 'Rejected' },
  ]);

  return (
    <div className='relative grid min-h-[300px] gap-5 rounded-lg border border-border bg-background-secondary p-3'>
      <div className='flex flex-col items-center justify-between gap-2 self-start mobile:flex-row'>
        <h2 className='text-lg font-bold text-text-primary'>Latest Offers</h2>
        <Legend
          legend={[
            { text: 'Approved', color: 'bg-green-500' },
            { text: 'Rejected', color: 'bg-red-500' },
          ]}
        />
      </div>
      {isLoading ? (
        <Status status='loading' />
      ) : (
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data}>
            <XAxis dataKey='name' className='text-xs font-medium' />
            <YAxis width={35} domain={[0, 'dataMax']} allowDecimals={false} />

            <Tooltip
              content={CustomTooltip}
              wrapperClassName='tooltip'
              cursor={<Rectangle radius={5} stroke='var(--border)' fill='var(--background-tertiary)' />}
            />
            <Bar dataKey='Approved' fill='#16a34a' className='cursor-pointer' legendType='circle' onClick={onClick} />
            <Bar dataKey='Rejected' fill='#ef4444' className='cursor-pointer' legendType='circle' onClick={onClick} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
