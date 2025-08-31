

// Key name for storing jobs in localStorage
const JOBS_STORAGE_KEY = 'jobTracker_jobs';


export const saveJobsToStorage = (jobs) => {
  try {
    
    const jobsJSON = JSON.stringify(jobs);
    
    localStorage.setItem(JOBS_STORAGE_KEY, jobsJSON);
    console.log('Jobs saved to localStorage:', jobs);
  } catch (error) {
    console.error('Error saving jobs to localStorage:', error);
  }
};

// Load jobs from localStorage
export const loadJobsFromStorage = () => {
  try {
    
    const jobsJSON = localStorage.getItem(JOBS_STORAGE_KEY);
    
    
    if (!jobsJSON) {
      console.log('No jobs found in localStorage, starting fresh');
      return [];
    }
    
    
    const jobs = JSON.parse(jobsJSON);
    console.log('Jobs loaded from localStorage:', jobs);
    return jobs;
  } catch (error) {
    console.error('Error loading jobs from localStorage:', error);
    
    return [];
  }
};


export const clearJobsFromStorage = () => {
  try {
    localStorage.removeItem(JOBS_STORAGE_KEY);
    console.log('Jobs cleared from localStorage');
  } catch (error) {
    console.error('Error clearing jobs from localStorage:', error);
  }
};
