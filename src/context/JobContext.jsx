import { useReducer, useEffect } from "react";
import { JOB_ACTIONS, initialState } from "./jobConstants.js";
import { JobContext } from "./jobContext.js";
import { saveJobsToStorage } from "../utils/localStorage.js";

// Action types imported from files


// Reducer function
const jobReducer = (state, action) => {
  switch (action.type) {
    case JOB_ACTIONS.SET_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };

    case JOB_ACTIONS.ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, { ...action.payload, id: generateId() }],
      };

    case JOB_ACTIONS.UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === action.payload.id ? action.payload : job
        ),
      };

    case JOB_ACTIONS.DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
      };

    case JOB_ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case JOB_ACTIONS.SET_SEARCH:
      return {
        ...state,
        searchTerm: action.payload,
      };

    default:
      return state;
  }
};

// ID handler
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Provider component
export const JobProvider = ({ children }) => {
  //useReducer
  const [state, dispatch] = useReducer(jobReducer, initialState);

  // Save to localStorage whenever jobs change
  useEffect(() => {
    saveJobsToStorage(state.jobs);
  }, [state.jobs]); 

  // Helper functions
  const addJob = (jobData) => {
    dispatch({
      type: JOB_ACTIONS.ADD_JOB,
      payload: jobData,
    });
  };

  const updateJob = (jobData) => {
    dispatch({
      type: JOB_ACTIONS.UPDATE_JOB,
      payload: jobData,
    });
  };

  const deleteJob = (jobId) => {
    dispatch({
      type: JOB_ACTIONS.DELETE_JOB,
      payload: jobId,
    });
  };

  const setFilter = (filter) => {
    dispatch({
      type: JOB_ACTIONS.SET_FILTER,
      payload: filter,
    });
  };

  const setSearchTerm = (searchTerm) => {
    dispatch({
      type: JOB_ACTIONS.SET_SEARCH,
      payload: searchTerm,
    });
  };

  // Computed values
  const getFilteredJobs = () => {
    let filtered = state.jobs;

    // Apply status filter
    if (state.filter !== "All Statuses") {
      filtered = filtered.filter((job) => job.status === state.filter);
    }

    // Apply search filter
    if (state.searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.company.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          job.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    // return filtered
    return filtered;
  };

  const getJobStats = () => {
    // return { total, applied, interviewing, offers, rejected };
    const total = state.jobs.length;
    const applied = state.jobs.filter(job => job.status === 'Applied').length;
    const interviewing = state.jobs.filter(job => job.status === 'Interviewing').length;
    const offer = state.jobs.filter(job => job.status === 'Offer').length;
    const rejected = state.jobs.filter(job => job.status === 'Rejected').length;

    return { total, applied, interviewing, offer, rejected };
  };

  const value = {
    // State
    jobs: state.jobs,
    filter: state.filter,
    searchTerm: state.searchTerm,

    // Actions
    addJob,
    updateJob,
    deleteJob,
    setFilter,
    setSearchTerm,
  
    // Computed
    filteredJobs: getFilteredJobs(),
    jobStats: getJobStats()
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
