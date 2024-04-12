export const ROUTES = {
  admin: [
    'overview',
    'supervisors',
    'supervisors/:id',
    'interns',
    'interns/:id',
    'teams',
    'absences',
    'offers',
    'demands',
    'projects',
  ],
  supervisor: ['overview', 'interns', 'teams', 'absences', 'projects'],
  intern: ['overview', 'absences'],
};
export const routes = [
  { label: 'home', path: '/' },
  { label: 'offers', path: '#offers' },
  { label: 'about', path: '#about' },
];

export const PAGE_LIMIT = 5;

export const STATUS_COLORS = {
  'Not Started': { bg: 'bg-gray-500', text: 'text-gray-500' },
  'In Progress': { bg: 'bg-blue-500', text: 'text-blue-500' },
  Completed: { bg: 'bg-green-600', text: 'text-green-600' },
};

export const PRIORITY_COLORS = {
  Low: 'bg-green-600',
  Medium: 'bg-orange-500',
  High: 'bg-red-500',
};
