import { useContext } from 'react';
import { JobContext } from './jobContext.js';

// Custom hook to use the context
export const useJobs = () => {
  const context = useContext(JobContext);

  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
