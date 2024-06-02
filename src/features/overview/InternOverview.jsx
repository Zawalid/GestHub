import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  FaCalendarXmark,
  FaDiagramProject,
  LuClipboardList,
  FaListCheck,
  FaGithub,
  FaGoogleDrive,
} from '@/components/ui/Icons';
import { getIsoDate, getTimelineDates } from '@/utils/helpers';
import { TasksAnalytics } from './SupervisorOverview';
import { Stat } from './Stat';
import { useUser } from '@/hooks/useUser';
import { Button, ToolTip } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { FileView } from '@/components/ui/FileView';
import { useForm } from '@/hooks/index';
import { File } from '../applications/NewApplication';
import { ErrorTooltip } from '@/components/ui/InputField';
import { useSendInfo } from '../interns/useInterns';
import { useStats } from './useStats';

export default function InternOverview() {
  const { user } = useUser();
  const { startDate, endDate } = user || {};
  const { daysLeft, isOverdue } = getTimelineDates(startDate, endDate);

  return (
    <div className='flex h-full flex-col gap-5 overflow-x-auto'>
      <Stats />
      <div className='grid gap-5 lg:grid-cols-[4fr_2fr]'>
        <TasksAnalytics />
        {isOverdue ? <InternshipCompleted user={user} /> : <Calendar {...{ startDate, endDate, daysLeft }} />}
      </div>
    </div>
  );
}

function Stats() {
  const { stats, isLoading } = useStats();

  const statistics = [
    {
      label: { value: 'Active Projects' },
      value: { value: stats?.projects?.totalProjects },
      icon: { icon: <FaDiagramProject /> },
      className: 'bg-primary',
    },
    {
      label: { value: 'Assigned Tasks' },
      value: { value: stats?.tasks?.totalTasks },
      icon: { icon: <LuClipboardList /> },
      className: 'bg-blue-500 dark:bg-blue-600',
    },
    {
      label: { value: 'Completed Tasks' },
      value: { value: stats?.tasks?.completedTasks },
      icon: { icon: <FaListCheck /> },
      className: 'bg-green-500 dark:bg-green-600',
    },
    {
      label: { value: 'Overdue Tasks' },
      value: { value: stats?.tasks?.overdueTasks },
      icon: { icon: <FaCalendarXmark /> },
      className: 'bg-red-400 dark:bg-red-500',
    },
  ];
  return (
    <div className='flex flex-col gap-5 mobile:grid mobile:grid-cols-2 md:grid-cols-4'>
      {statistics.map((stat, index) => (
        <Stat key={index} isLoading={isLoading} {...stat} />
      ))}
    </div>
  );
}

function CustomDay({ day, startDate, endDate, value, today, ...other }) {
  const isEndDate = day.hasSame(endDate, 'day');
  const isStartDate = day.hasSame(startDate, 'day');
  const isBetween = day > startDate && day < endDate;
  const isSameAsValue = value && day.hasSame(value, 'day');
  const isSpecialDay = isEndDate || isStartDate || today;

  const getDayStyle = () => {
    if (isSpecialDay && isSameAsValue) return { backgroundColor: 'var(--primary)', color: 'white' };
    if (isStartDate || isEndDate) return { backgroundColor: isStartDate ? '#2563eb' : '#ef4444', color: 'white' };
    if (isBetween) return { backgroundColor: 'var(--background-secondary)', borderRadius: 0 };
    return { backgroundColor: 'transparent' };
  };

  const getToolTipText = () => {
    if (isStartDate) return 'Start Date';
    if (isEndDate) return 'End Date';
    return 'Today';
  };

  const getClassName = () => {
    let className = 'flex h-9 w-9';
    if (isSpecialDay || isSameAsValue) className += ' bg-background-secondary p-1';
    if (isStartDate) className += ' rounded-l-full';
    else if (isEndDate) className += ' rounded-r-full';
    return className;
  };

  return (
    <ToolTip content={<span className='text-xs text-text-secondary'>{getToolTipText()}</span>} hidden={!isSpecialDay}>
      <div className={getClassName()}>
        <PickersDay
          {...other}
          day={day}
          style={{ margin: 0, width: '100%', height: '100%', transition: '0.5s background-color', ...getDayStyle() }}
        />
      </div>
    </ToolTip>
  );
}

function Calendar({ startDate, endDate, daysLeft }) {
  const { theme } = useTheme();
  const [value, setValue] = useState(getIsoDate(new Date()));

  return (
    <div className='flex flex-col items-center gap-3 rounded-lg border border-border p-3 shadow-md'>
      <div className='space-y-1 self-start'>
        <h3 className='text-lg font-semibold text-text-primary'>Internship Duration</h3>
        <p className='text-sm font-medium text-text-secondary'>You have {daysLeft} days left on your internship.</p>
      </div>

      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <ThemeProvider theme={createTheme({ palette: { mode: theme } })}>
          <DateCalendar
            value={value}
            readOnly
            className='calendar'
            views={['day']}
            slots={{ day: CustomDay }}
            slotProps={{
              day: { startDate: getIsoDate(startDate), endDate: getIsoDate(endDate), value },
            }}
          />
        </ThemeProvider>
        <div className='grid grid-cols-3 gap-3'>
          {[
            {
              label: 'Today',
              value: getIsoDate(new Date()),
            },
            {
              label: 'Start Date',
              value: getIsoDate(startDate),
            },
            {
              label: 'End Date',
              value: getIsoDate(endDate),
            },
          ].map(({ label, value: val }) => (
            <Button
              key={label}
              onClick={() => setValue(val)}
              size='small'
              color='tertiary'
              state={value && val.hasSame(value, 'day') ? 'active' : ''}
            >
              {label}
            </Button>
          ))}
        </div>
      </LocalizationProvider>
    </div>
  );
}

function InternshipCompleted({ user }) {
  const [current, setCurrent] = useState('congrats');
  const { attestation, projectLink, report } = user || {};

  return (
    <>
      <div className='relative min-w-[360px] overflow-hidden rounded-lg border border-border shadow-md'>
        <div
          className={`absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between gap-5 overflow-auto bg-background-primary p-3 transition-transform duration-500 ${['congrats', 'attestation'].includes(current) ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className='space-y-1 text-center'>
            <h3 className='text-xl font-bold text-primary'>Congratulations</h3>
            <p className='text-sm font-medium text-text-secondary'>You have completed your internship</p>
          </div>
          <img src='/SVG/internship-completed.svg' alt='' className='w-36' />
          <Button
            className='w-full'
            disabled={!attestation}
            onClick={() => setCurrent(projectLink && report ? 'attestation' : 'info')}
          >
            Get Attestation
          </Button>
        </div>
        <ProjectInfo current={current} setCurrent={setCurrent} />
      </div>
      <FileView isOpen={current === 'attestation'} onClose={() => setCurrent('congrats')} file={attestation} />
    </>
  );
}

function ProjectInfo({ current, setCurrent }) {
  const [url, setUrl] = useState('github');
  const { mutate } = useSendInfo();

  const {
    options: { formInputs, isUpdated, isValid, errors, getValue, setValue, handleSubmit },
  } = useForm({
    defaultValues: {
      report: null,
      github: '',
      drive: '',
    },
    fields: [
      {
        name: 'report',
        hidden: true,
      },
      ...[
        {
          name: 'github',
          href: 'https://www.github.com',
          color: '#000000',
          icon: <FaGithub />,
          pattern: `^(https://(www\\.)?github\\.com)/.*$`,
        },
        {
          name: 'drive',
          href: 'https://www.drive.google.com',
          color: '#4285F4',
          icon: <FaGoogleDrive />,
          pattern: `^(https://drive\\.google\\.com)/.*$`,
        },
      ].map((s) => ({
        name: s.name.toLowerCase(),
        placeholder: s.href,
        rules: {
          pattern: {
            value: new RegExp(s.pattern),
            message: `Invalid URL. Please enter a valid ${s.name} link.`,
          },
          required: url === s.name,
        },
        customIcon: (
          <span
            className='absolute left-0 top-0 z-10 grid h-full w-7 place-content-center border-r border-border text-white'
            style={{ backgroundColor: s.color }}
          >
            {s.icon}
          </span>
        ),
      })),
    ],
    onSubmit: (data) => {
      mutate({ projectLink: data?.[url], report: data?.report?.file }, { onSuccess: () => setCurrent('congrats') });
    },
  });

  return (
    <div
      className={`absolute left-0 top-0 flex h-full w-full flex-col gap-5 overflow-auto  bg-background-primary p-3 transition-transform duration-500  ${current === 'info' ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className='space-y-1'>
        <h1 className='text-lg font-bold text-text-primary'>Internship&apos;s Project Info</h1>
        <p className='text-xs font-medium text-text-secondary'>Please provide the following info about your project.</p>
      </div>

      <div className='space-y-1.5'>
        <label className='text-sm font-medium text-text-tertiary'>
          Report
          <span className='ml-1 text-[10px] font-normal text-text-secondary'>
            ( Supports: .pdf, .doc, .docx. Max size: 10MB. )
          </span>
        </label>

        <File
          type={'Report'}
          file={getValue('report')?.file || {}}
          onChange={(file) => setValue('report', file)}
          options={{ maxFileSize: 10 }}
        />
      </div>
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <label className='text-sm font-medium text-text-tertiary'>Project URL</label>
            <ErrorTooltip message={errors?.[url]?.message} />
          </div>
          <div className='flex gap-1'>
            {[
              { url: 'github', icon: <FaGithub /> },
              { url: 'drive', icon: <FaGoogleDrive /> },
            ].map((button) => (
              <Button
                key={button.url}
                shape='icon'
                size='small'
                state={url === button.url ? 'active' : null}
                onClick={() => setUrl(button.url)}
              >
                {button.icon}
              </Button>
            ))}
          </div>
        </div>
        {formInputs[url]}
      </div>
      {url === 'github' && (
        <GitHub url={url} getValue={getValue} onClick={handleSubmit} disabled={!isUpdated || !isValid} />
      )}
    </div>
  );
}

function GitHub({ url, getValue, onClick, disabled }) {
  const github = getValue('github');
  const isValidRepo = /^https:\/\/(www\.)?github\.com\/[A-z0-9_.-]+\/[A-z0-9_.-]+$/.test(github);
  const {
    data: repo,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['repo'],
    queryFn: async () => {
      try {
        const repoPath = github.replace('https://github.com/', '');
        const res = await axios.get(`https://api.github.com/repos/${repoPath}`);
        return res?.data;
      } catch (e) {
        throw Error(e.response?.data.message || 'Something went wrong. Please try again.');
      }
    },
    retry: 0,
    enabled: isValidRepo,
  });

  useEffect(() => {
    if (url === 'github' && isValidRepo) refetch();
  }, [url, isValidRepo, refetch, github]);

  const render = () => {
    if (!isValidRepo) return <p className='text-xs font-medium'>Waiting for a GitHub repository URL...</p>;
    if (isLoading) return <div className='sending mx-auto'></div>;
    if (error) return <p className='line-clamp-2 text-xs font-medium'>{error?.message}</p>;
    return (
      <>
        <div className='flex-1'>
          <h4 className='text-sm font-medium text-text-primary'>{repo?.name}</h4>
          <p className='text-[10px] font-medium text-text-secondary'>{repo?.language}</p>
        </div>
        <div className='rounded-md bg-background-tertiary px-1 py-0.5 text-[10px] font-medium capitalize text-text-primary'>
          {repo?.visibility}
        </div>
      </>
    );
  };

  return (
    <>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-text-tertiary'>Repository</label>
        <a
          className='flex items-center gap-3 rounded-lg bg-background-secondary p-2 transition-colors duration-300 hover:bg-background-tertiary'
          href={repo?.html_url}
          target='_blank'
        >
          <FaGithub className='text-xl' />
          {render()}
        </a>
      </div>
      <Button className='mt-auto' onClick={onClick} disabled={disabled || error}>
        Send Info
      </Button>
    </>
  );
}
