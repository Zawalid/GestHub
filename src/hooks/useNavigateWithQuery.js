import { useNavigate, useLocation } from 'react-router-dom';

export function useNavigateWithQuery() {
  const navigate = useNavigate();
  const location = useLocation();

  return (to, options) => navigate(String(to) + location.search, options);
}
