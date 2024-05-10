import { DateTime } from 'luxon';

export const ROUTES = {
  'super-admin': [
    'overview',
    'admins',
    'supervisors',
    'projects',
    'projects/new',
    'projects/:id',
    'projects/:id/:tab',
    'applications',
    'applications/:id',
    'offers',
    'offers/:id',
    'interns',
    'interns/:id',
  ],
  admin: ['overview', 'supervisors', 'applications', 'applications/:id', 'offers', 'offers/:id', 'interns', 'interns/:id'],
  supervisor: ['overview', 'projects', 'projects/new', 'projects/:id', 'projects/:id/:tab', 'interns', 'interns/:id'],
  intern: ['overview', 'projects', 'projects/:id', 'projects/:id/:tab'],
  user: ['applications','applications/:id'],
};

export const PAGE_LIMIT = 10;

export const STATUS_COLORS = {
  'Not Started': { bg: 'bg-gray-500', text: 'text-gray-500' },
  'In Progress': { bg: 'bg-blue-500', text: 'text-blue-500' },
  Completed: { bg: 'bg-green-600', text: 'text-green-600' },
};

export const PRIORITY_COLORS = {
  Low: { bg: 'bg-green-600', text: 'text-green-600' },
  Medium: { bg: 'bg-orange-500', text: 'text-orange-500' },
  High: { bg: 'bg-red-500', text: 'text-red-500' },
};

export const LEVELS = ['Bac+1', 'Bac+2', 'Bac+3', 'Master', 'Doctorate'];

export const RULES = {
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Invalid email address',
    },
  },
  phone: {
    pattern: {
      value: /^(\+212\s?0?|0)(5|6|7)\d{8}$/,
      message: 'Invalid phone number format. \n Ex: +212 0637814207 or 0637814207',
    },
  },
  password: {
    pattern: {
      value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/,
      message:
'Password must contain at least 8 characters, one letter (either uppercase or lowercase), and one number',    },
  },
  passwordConfirmation: {
    validate: (value, getValue) => value === getValue('password') || 'Passwords do not match',
  },
  endDate: {
    validate: (val, getValue) => {
      return DateTime.fromISO(val) > DateTime.fromISO(getValue('startDate')) || 'End date must be after start date';
    },
  },
  academicLevel: {
    validate: (value) =>
      LEVELS.includes(value) ||
      `The provided Academic Level is invalid. It must be one of the following: ${LEVELS.join(', ')}`,
  },
};
