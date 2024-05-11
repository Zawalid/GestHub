import { useState } from 'react';
import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PieChartStats from './PieChart';
import { AllInterns, Intern } from '../projects/NewProject/TeamMembers';
import { IoPeople, LuClipboardList, MdOutlinePendingActions } from '@/components/ui/Icons';
import { Button, Modal, Status } from '@/components/ui';
import { getTimelineDates } from '@/utils/helpers';
import { useGenerateAttestation, useGenerateAttestations } from '../interns/useInterns';
import { useAdmins, useApplications, useOffers, useSupervisors, useInterns } from '@/hooks/index';
import { useNavigate } from 'react-router-dom';
import { Stat } from './Stat';

export default function AdminOverview() {
  return (
    <div className='flex h-full flex-col  gap-5'>
      <Stats />
      <OffersAnalytics />
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
      className: 'bg-primary p-3 shadow-md',
    },
    {
      label: { value: 'Pending Applications' },
      value: { value: applications?.filter((p) => p.status === 'Pending').length },
      icon: { icon: <MdOutlinePendingActions /> },
      className: 'bg-orange-500 p-3 shadow-md dark:bg-orange-600',
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
          <div className='flex gap-4'>
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
                  <h3 className='font-bold text-text-primary lg:text-xl'>{value}</h3>
                )}
                <h5 className='text-xs capitalize text-text-secondary lg:text-sm'>{name}</h5>
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
  const { interns } = useInterns();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useGenerateAttestation();

  const completedInternships = interns
    ?.filter((intern) => {
      const { isOverdue } = getTimelineDates(intern.startDate, intern.endDate);
      return isOverdue 
      && !intern.attestation;
    })
    .toSorted((a, b) => new Date(a?.startDate) - new Date(b?.startDate));

  return (
    <>
      <div className='col-span-2 flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-text-primary'>Completed Internship</h3>
          <Button
            color='secondary'
            size='small'
            disabled={!completedInternships?.length}
            onClick={() => setIsOpen(true)}
          >
            Show All
          </Button>
        </div>

        {completedInternships?.length ? (
          completedInternships?.slice(0, 2).map((intern) => (
            <div
              key={Intern.id}
              className='flex items-center justify-between gap-5 rounded-lg border border-border px-3 py-1.5'
            >
              <Intern intern={intern} />
              <Button color='tertiary' size='small' onClick={() => mutate(intern.id)}>
                Generate
              </Button>
            </div>
          ))
        ) : (
          <p className='text-sm font-medium text-text-secondary'>No interns have finished their internship yet.</p>
        )}
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
      closeOnBlur={false}
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
            mutate({ ids: generateTo.map((g) => g.id) });
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

  const latestOffers = offers
    ?.filter((offer) => offer.applications?.length > 0)
    .toSorted((a, b) => new Date(b?.publicationDate) - new Date(a?.publicationDate))
    .slice(0, 7);

  const data = latestOffers?.map((offer) => {
    const rejected = offer?.applications.filter((application) => application.status === 'Rejected');
    const approved = offer?.applications.filter((application) => application.status === 'Approved');
    return {
      name: `${offer?.title.slice(0, 8)}${offer?.title.slice(8).length ? '...' : ''}`,
      fullName: offer?.title,
      Approved: approved?.length,
      Rejected: rejected?.length,
    };
  });

  return (
    <div className='relative grid min-h-[300px] gap-5 rounded-lg border border-border bg-background-secondary p-3'>
      <div className='flex justify-between gap-5'>
        <h2 className='text-lg font-bold text-text-primary'>Latest Offers</h2>
        <div className='flex items-start gap-3 pt-3'>
          <div className='flex items-center gap-2'>
            <span className='h-3 w-6 rounded-md bg-green-500'></span>
            <span className='text-xs font-medium'>Approved</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='h-3 w-6 rounded-md bg-red-500'></span>
            <span className='text-xs font-medium'>Rejected</span>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Status status='loading' />
      ) : (
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data}>
            <XAxis dataKey='name' className='text-xs font-medium' />
            <YAxis domain={[0, 'dataMax']} allowDecimals={false} />

            <Tooltip
              content={CustomTooltip}
              wrapperClassName='tooltip'
              itemStyle={{ color: 'var(--text-primary)' }}
              cursor={<Rectangle radius={5} stroke='var(--border)' fill='var(--background-tertiary)' />}
            />
            <Bar dataKey='Approved' fill='#16a34a' legendType='circle' />
            <Bar dataKey='Rejected' fill='#ef4444' legendType='circle' />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function CustomTooltip({ payload, active }) {
  if (active && payload && payload.length) {
    return (
      <div className='tooltip'>
        <p className='label'>{`Offer : ${payload[0].payload.fullName}`}</p>
        <p className='intro'>{`Approved : ${payload[0].payload.Approved}`}</p>
        <p className='intro'>{`Rejected : ${payload[0].payload.Rejected}`}</p>
      </div>
    );
  }

  return null;
}
