import { Button, Modal, Status, ToolTip } from '@/components/ui';
import { useParams } from 'react-router-dom';
import { useIntern } from './useInterns';
import {
  IoMailOutline,
  FiPhone,
  BsBuilding,
  IoSchool,
  BsListCheck,
  FaDiagramProject,
  FaFileContract,
  FaImagePortrait,
} from '@/components/ui/Icons';
import { formatDate, getTimelineDates } from '@/utils/helpers';
import { useAnimatedProgress } from '@/hooks/useAnimatedProgress';
import { useState } from 'react';
import { FileView } from '@/components/ui/FileView';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';
import Avatar from '@/components/ui/Avatar';

export default function Intern() {
  const { id } = useParams();
  const { intern, isLoading, error } = useIntern(id);
  const [openedFile, setOpenedFile] = useState(null);
  const navigate = useNavigateWithQuery();
  const {
    avatar,
    fullName,
    email,
    phone,
    gender,
    academicLevel,
    establishment,
    startDate,
    endDate,
    specialty,
    projects,
    tasks,
    cv,
    attestation,
  } = intern;
  const { isOverdue } = getTimelineDates(startDate, endDate);

  const render = () => {
    if (isLoading) return <Skeleton />;
    if (error)
      return (
        <Status
          status='error'
          heading={error.message === 'Not found' && "Sorry, we couldn't find the intern you're looking for."}
          message={error.message === 'Not found' ? 'Please check the intern ID and try again.' : error.message}
          size='small'
        />
      );
    return (
      <>
        {isOverdue && (
          <div className='absolute -left-9 top-9 z-20 grid w-44 rotate-[318deg] place-content-center justify-self-end bg-primary px-3 py-1'>
            <span className='text-xs font-medium text-white'>Internship Completed</span>
          </div>
        )}
        <div className='absolute left-0 top-0 h-[90px] w-full bg-background-secondary'></div>
        <div className='relative z-10 mt-5 flex items-center gap-5'>
          <Avatar className='h-24 w-24' custom={{ avatar, gender }} />
          <div className='flex flex-1 items-center justify-between gap-6'>
            <div>
              <h3 className='text-xl font-semibold text-text-primary'>{fullName}</h3>
              <p className='text-sm font-medium text-text-secondary'>{specialty || 'Not specified'}</p>
            </div>
            <div className='flex gap-2'>
              <ToolTip content={<span className='text-xs text-text-secondary'>View CV</span>}>
                <Button shape='icon' color='secondary' onClick={() => setOpenedFile(cv)} disabled={!cv}>
                  <FaImagePortrait />
                </Button>
              </ToolTip>
              <ToolTip content={<span className='text-xs text-text-secondary'>View attestation</span>}>
                <Button
                  shape='icon'
                  color='secondary'
                  onClick={() => setOpenedFile(attestation)}
                  disabled={!attestation}
                >
                  <FaFileContract />
                </Button>
              </ToolTip>
            </div>
          </div>
        </div>
        <div className='mb-5 flex justify-between border-t border-border pt-3'>
          <ul className='flex-1 space-y-2 '>
            <li className='flex items-center gap-3 text-text-secondary'>
              <IoMailOutline className='text-xl' />
              <div>
                <label className='text-sm font-medium text-text-tertiary'>Email</label>
                <p className='text-sm font-medium text-text-primary'>{email}</p>
              </div>
            </li>
            <li className='flex items-center gap-3 text-text-secondary'>
              <FiPhone className='text-xl' />
              <div>
                <label className='text-sm font-medium text-text-tertiary'>Phone</label>
                <p className='text-sm font-medium text-text-primary'>{phone}</p>
              </div>
            </li>
            <li className='flex items-center gap-3 text-text-secondary'>
              <IoSchool className='text-xl' />
              <div>
                <label className='text-sm font-medium text-text-tertiary'>Academic Level</label>
                <p className='text-sm font-medium text-text-primary'>{academicLevel}</p>
              </div>
            </li>
            <li className='flex items-center gap-3 text-text-secondary'>
              <BsBuilding className='text-xl' />
              <div>
                <label className='text-sm font-medium text-text-tertiary'>Establishment</label>
                <p className='text-sm font-medium text-text-primary'>{establishment}</p>
              </div>
            </li>
          </ul>
          <TimeLine startDate={startDate} endDate={endDate} />
        </div>
        <div className='mt-auto grid grid-cols-2 gap-3'>
          <div className='flex items-center gap-3 rounded-lg bg-blue-600 p-2'>
            <div className='grid h-8 w-8 place-content-center rounded-full bg-white text-black'>
              <BsListCheck />
            </div>
            <div className='flex-1 text-end'>
              <h4 className='text-xs font-medium text-white/80'>Tasks Assigned</h4>
              <h5 className='font-bold text-white'>{tasks?.length}</h5>
            </div>
          </div>
          <div className='flex items-center gap-3 rounded-lg bg-green-600 p-2'>
            <div className='grid h-8 w-8 place-content-center rounded-full bg-white  text-black'>
              <FaDiagramProject />
            </div>
            <div className='flex-1 text-end'>
              <h4 className='text-xs font-medium text-white/80'>Projects</h4>
              <h5 className='font-bold text-white'>{projects?.length}</h5>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Modal
        isOpen={location.pathname.includes('/interns') && id}
        className='relative flex flex-col gap-3 p-5 sm:h-fit sm:min-h-[450px] sm:w-[450px] sm:border'
        closeButton={true}
        onClose={() => navigate('/app/interns')}
      >
        {render()}
      </Modal>
      <FileView isOpen={openedFile} onClose={() => setOpenedFile(null)} file={openedFile} />
    </>
  );
}

function TimeLine({ startDate, endDate }) {
  const { currentDay, duration, daysToStart, isOverdue } = getTimelineDates(startDate, endDate);
  const progress = useAnimatedProgress((currentDay / duration) * 100);

  return (
    <div className='flex flex-col items-end justify-between gap-1'>
      <span className='text-xs font-medium text-text-secondary'>{formatDate(startDate)}</span>
      <div className='relative w-2 flex-1 rounded-lg bg-background-tertiary py-1'>
        <div
          className={`absolute top-0 w-full max-w-full rounded-lg transition-all duration-[3s] ${isOverdue ? 'bg-primary' : 'bg-secondary'}`}
          style={{ height: daysToStart > 0 ? '12px' : `${isOverdue ? 100 : progress}%` }}
        >
          <span className='absolute -right-0.5 bottom-0 h-3 w-3 rounded-full bg-text-primary'></span>
        </div>
      </div>
      <span className='text-xs font-medium text-text-secondary'>{formatDate(endDate)}</span>
    </div>
  );
}

function Skeleton() {
  return (
    <div className='flex flex-1 animate-puls flex-col'>
      <div className='mt-8 flex items-center gap-3'>
        <div className='h-24 w-24 rounded-full border border-border bg-background-secondary shadow-md'></div>
        <div className='flex flex-1 items-center justify-between'>
          <div className='space-y-2'>
            <div className='h-3 w-40 rounded-lg bg-background-tertiary'></div>
            <div className='h-2 w-24 rounded-lg bg-background-secondary'></div>
          </div>
          <div className='flex gap-2'>
            <div className='h-6 w-5 rounded-sm bg-background-secondary'></div>
            <div className='h-6 w-5 rounded-sm bg-background-secondary'></div>
          </div>
        </div>
      </div>
      <div className='my-7 flex flex-1 justify-between border-t border-border pt-5'>
        <div className='flex-1 space-y-4'>
          <div className='flex items-center gap-3'>
            <div className='h-5 w-7 rounded-md bg-background-secondary'></div>
            <div className='space-y-2'>
              <div className='h-2 w-12 rounded-lg bg-background-tertiary'></div>
              <div className='h-2 w-28 rounded-lg bg-background-secondary'></div>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='h-5 w-7 rounded-md bg-background-secondary'></div>
            <div className='space-y-2'>
              <div className='h-2 w-12 rounded-lg bg-background-tertiary'></div>
              <div className='h-2 w-28 rounded-lg bg-background-secondary'></div>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='h-4 w-7 rounded-md bg-background-secondary'></div>
            <div className='space-y-2'>
              <div className='h-2 w-12 rounded-lg bg-background-tertiary'></div>
              <div className='h-2 w-28 rounded-lg bg-background-secondary'></div>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='h-4 w-7 rounded-md bg-background-secondary'></div>
            <div className='space-y-2'>
              <div className='h-2 w-12 rounded-lg bg-background-tertiary'></div>
              <div className='h-2 w-28 rounded-lg bg-background-secondary'></div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end gap-1'>
          <div className='h-2 w-14 rounded-lg bg-background-secondary'></div>
          <div className='relative w-2 flex-1 rounded-lg bg-background-tertiary py-1'></div>
          <div className='h-2 w-14 rounded-lg bg-background-secondary'></div>
        </div>
      </div>
      <div className='mt-auto grid grid-cols-2 gap-3'>
        <div className='flex items-center gap-3 rounded-lg bg-background-disabled p-2'>
          <div className='h-8 w-8 rounded-full bg-background-secondary'></div>
          <div className='flex flex-1 flex-col items-end space-y-1.5'>
            <div className='h-2 w-14 rounded-lg bg-background-tertiary'></div>
            <div className='h-2 w-6 rounded-lg bg-background-secondary'></div>
          </div>
        </div>
        <div className='flex items-center gap-3 rounded-lg bg-background-disabled p-2'>
          <div className='h-8 w-8 rounded-full bg-background-secondary'></div>
          <div className='flex flex-1 flex-col items-end space-y-1.5'>
            <div className='h-2 w-14 rounded-lg bg-background-tertiary'></div>
            <div className='h-2 w-6 rounded-lg bg-background-secondary'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
