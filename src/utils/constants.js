export const ROUTES = {
  admin: [
    'overview',
    'supervisors',
    'supervisors/:id',
    'demands',
    'offers',
    'offers/:id',
    'interns',
    'interns/:id',
  ],
  supervisor: ['overview', 'projects', 'projects/new', 'projects/:id', 'projects/:id/:tab', 'interns', 'interns/:id'],
  intern: ['overview', 'projects', 'projects/:id', 'projects/:id/:tab', 'interns/:id'],
};

export const PAGE_LIMIT = 5;

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
