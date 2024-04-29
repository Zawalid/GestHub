import { Modal } from '@/components/ui';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntern } from './useInterns';

import {
  IoMailOutline,
  IoCalendarNumberOutline,
  FiPhone,
  MdDriveFileRenameOutline,
  BsBuilding,
  IoSchool,
  FaCity,
} from '@/components/ui/Icons';

export default function Intern() {
  const { id } = useParams();
  const { intern, isLoading, error } = useIntern(id);
  const navigate = useNavigate();

  const { avatar, fullName, email, phone, academicLevel, establishment, startDate, endDate, projects } = intern;

  return (
    <Modal
      isOpen={location.pathname.includes('/interns') && id}
      className='relative flex flex-col gap-4 p-5 sm:h-fit sm:w-[400px] sm:border'
      closeOnBlur={false}
      closeButton={true}
      onClose={() => navigate('/app/interns')}
    >
      <div className='mb-8 mt-5'>
        <div className='absolute left-0 top-0 h-24 w-full bg-background-secondary'></div>
        <div className='relative z-10 mb-4 flex items-center gap-5'>
          <img
            src={avatar || '/images/default-profile.jpg'}
            alt='avatar'
            className='h-24 w-24 rounded-full border border-border object-cover shadow-md'
          />
          <h3 className='text-2xl font-semibold text-text-primary'>{fullName}</h3>
        </div>
        <div className='grid grid-cols-2 gap-4 divide-x divide-border'>
          <div className='space-y-1'>
            <label className='text-sm font-medium text-text-tertiary'>Contact Info</label>
            <div className='flex items-center gap-1.5 text-text-secondary'>
              <IoMailOutline />
              <span className='text-sm font-medium'>{email}</span>
            </div>
            <div className='flex items-center gap-1.5 text-text-secondary'>
              <FiPhone />
              <span className='text-sm font-medium'>{phone}</span>
            </div>
          </div>
          <div className='space-y-1 pl-3'>
            <label className='text-sm font-medium text-text-tertiary'>Academic Info</label>
            <div className='flex items-center gap-1.5 text-text-secondary'>
              <IoSchool />
              <span className='text-sm font-medium'>{academicLevel}</span>
            </div>
            <div className='flex items-center gap-1.5 text-text-secondary'>
              <BsBuilding />
              <span className='text-sm font-medium'>{establishment}</span>
            </div>
          </div>
          <div className='space-y-1 border-none'>
            <label className='text-sm font-medium text-text-tertiary'>Internship Duration</label>
            <div className='flex items-center gap-1.5 text-text-secondary'>
              <IoCalendarNumberOutline />
              <span className='text-sm font-medium'>From: {startDate}</span>
            </div>
            <div className='flex items-center gap-1.5 text-text-secondary'>
              <IoCalendarNumberOutline />
              <span className='text-sm font-medium'>To: {endDate}</span>
            </div>
          </div>
          <div className='space-y-1 pl-3'>
            <label className='text-sm font-medium text-text-tertiary'>Projects</label>
            <div className='flex items-center gap-1.5 text-text-secondary'>
              <MdDriveFileRenameOutline />
              <span className='text-sm font-medium'>{projects?.length} Projects</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
