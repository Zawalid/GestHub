import { useEffect, useState } from 'react';
import { getProgress } from '@/utils/helpers';

export function useAnimatedProgress(progress) {
  const [pr, setPr] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      const pr = getProgress(progress);
      setPr(pr);
    }, 500);

    return () => clearTimeout(id);
  }, [progress]);

  return pr;
}
