import { IoPeople, LuClipboardList, MdOutlinePendingActions } from '@/components/ui/Icons';
import { useDemands } from '../demands/useDemands';
import { useGenerateAttestation, useGenerateAttestations, useInterns } from '../interns/useInterns';
import PieChartStats from './PieChart';
import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useSupervisors } from '../supervisors/useSupervisors';
import { useOffers } from '../offers/useOffers';
import { Button, Modal } from '@/components/ui';
import { AllInterns, Intern } from '../projects/NewProject/TeamMembers';
import { getTimelineDates } from '@/utils/helpers';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminOverview() {
  return (
    <div className='flex h-full flex-col  gap-5'>
      <Stats />
      <OffersAnalytics />
    </div>
  );
}

function Stats() {
  const { demands } = useDemands();
  const { interns } = useInterns();
  const { supervisors } = useSupervisors();
  // const { admins } = useAdmins();

  return (
    <div className='flex flex-col mobile:grid md:grid-rows-[repeat(3,auto)] gap-5 mobile:grid-cols-2 md:grid-cols-4'>
      <div className='flex items-start justify-between rounded-lg bg-primary p-3 shadow-md'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/80'>Total Demands</h4>
          <h3 className='text-3xl font-bold text-white'>{demands?.length}</h3>
        </div>
        <div className='rounded-lg bg-white/30 p-2 text-xl text-white'>
          <LuClipboardList />
        </div>
      </div>
      <div className='flex items-start justify-between rounded-lg bg-orange-500 p-3 shadow-md dark:bg-orange-600'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/80'>Pending Demands</h4>
          <h3 className='text-3xl font-bold text-white'>{demands?.filter((p) => p.status === 'Pending').length}</h3>
        </div>
        <div className='rounded-lg bg-white/30 p-2 text-xl text-white'>
          <MdOutlinePendingActions />
        </div>
      </div>

      <PieChartStats
        data={[
          { name: 'Pending', value: demands?.filter((p) => p.status === 'Pending').length },
          { name: 'Approved', value: demands?.filter((p) => p.status === 'Approved').length },
          { name: 'Rejected', value: demands?.filter((p) => p.status === 'Rejected').length },
        ]}
        title='Demands Status'
        legend={[
          { text: 'Pending', color: 'bg-orange-500' },
          { text: 'Approved', color: 'bg-green-600' },
          { text: 'Rejected', color: 'bg-red-500' },
        ]}
        COLORS={['#16a34a', '#f97316', '#ef4444']}
        className='col-span-2 row-span-3 min-h-[350px]'
      />

      <div className='col-span-2 flex items-start justify-between rounded-lg border border-border bg-background-secondary p-3 shadow-md'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-text-secondary'>Total Personnel</h4>
          <div className='flex gap-4'>
            <div className='flex items-center gap-3 rounded-lg bg-background-tertiary p-2'>
              <h3 className='lg:text-xl font-bold text-text-primary'>{interns?.length}</h3>
              <h5 className='text-xs lg:text-sm text-text-secondary'>Interns</h5>
            </div>
            <div className='flex items-center gap-3 rounded-lg bg-background-tertiary p-2'>
              <h3 className='lg:text-xl font-bold text-text-primary'>{supervisors?.length}</h3>
              <h5 className='text-xs lg:text-sm text-text-secondary'>Supervisors</h5>
            </div>
            <div className='flex items-center gap-3 rounded-lg bg-background-tertiary p-2'>
              <h3 className='lg:text-xl font-bold text-text-primary'>{interns?.length}</h3>
              <h5 className='text-xs lg:text-sm text-text-secondary'>Admins</h5>
            </div>
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
  const {mutate} = useGenerateAttestation()

  const completedInternships = interns
    ?.filter((intern) => {
      const { isOverdue } = getTimelineDates(intern.startDate, intern.endDate);
      return isOverdue && !intern.attestation
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
  const {mutate} = useGenerateAttestations()

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
            mutate({ids : generateTo.map(g => g.id)},{
              onSuccess : () => toast.success('Attestations generated successfully')
            });
          }}
        >
          Generate
        </Button>
      </div>
    </Modal>
  );
}

function OffersAnalytics() {
  const { offers } = useOffers();

  const latestOffers = offers
    ?.filter((offer) => offer.demands?.length > 0)
    .toSorted((a, b) => new Date(b?.publicationDate) - new Date(a?.publicationDate))
    .slice(0, 7);

  const data = latestOffers?.map((offer) => {
    const rejected = offer?.demands.filter((demand) => demand.status === 'Rejected');
    const approved = offer?.demands.filter((demand) => demand.status === 'Approved');
    return {
      name: offer?.title,
      Approved: approved?.length,
      Rejected: rejected?.length,
    };
  });

  return (
    <div className='grid min-h-[300px] gap-5 rounded-lg border border-border bg-background-secondary p-3'>
      <div className='flex justify-between gap-5'>
        <h2 className='text-lg font-bold text-text-primary'>Latest Offers</h2>
        <div className='flex gap-3'>
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

      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
          <XAxis dataKey='name' className='text-xs font-medium' />
          <YAxis domain={[0, 'dataMax']} allowDecimals={false} />{' '}
          <Tooltip
            wrapperClassName='tooltip'
            itemStyle={{ color: 'var(--text-primary)' }}
            cursor={<Rectangle radius={5} stroke='var(--border)' fill='var(--background-tertiary)' />}
          />
          <Bar dataKey='Approved' fill='#16a34a' legendType='circle' />
          <Bar dataKey='Rejected' fill='#ef4444' legendType='circle' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
