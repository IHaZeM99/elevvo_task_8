
import { loadJobsFromStorage } from '../utils/localStorage.js';

export const JOB_ACTIONS = {
  SET_JOBS: "SET_JOBS",
  ADD_JOB: "ADD_JOB",
  UPDATE_JOB: "UPDATE_JOB",
  DELETE_JOB: "DELETE_JOB",
  SET_FILTER: "SET_FILTER",
  SET_SEARCH: "SET_SEARCH",
};

// Initial State - load jobs from localStorage
export const initialState = {
  jobs: loadJobsFromStorage(), 
  filter: "All Statuses",
  searchTerm: "",
};