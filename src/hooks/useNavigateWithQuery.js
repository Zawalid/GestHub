import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useNavigateWithQuery() {
  const navigate = useNavigate();
  const location = useLocation();

  return (to, options) => navigate(String(to) + location.search, options);
}

export function useNavigateState() {
  const location = useLocation();
  const [state, setState] = useState();

  useEffect(() => {
    if(location.state) setState(location.state)
  },[location.state])


  return state;
}
