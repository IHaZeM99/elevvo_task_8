import { useNavigate } from "react-router";
import { Plus, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useJobs } from "../context/useJobs";

export const DashboardPage = () => {
  const navigate = useNavigate();
  // const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    filteredJobs,
    filter,
    searchTerm,
    setFilter,
    setSearchTerm,
    jobStats,
  } = useJobs();

  const getStatusColors = (status) => {
    switch (status) {
      case "Applied":
        return "text-green-800 bg-green-200";
      case "Interviewing":
        return "text-orange-800 bg-orange-200";
      case "Offer":
        return "text-blue-800 bg-blue-200";
      case "Rejected":
        return "text-red-800 bg-red-200";
      default:
        return "text-gray-800 bg-gray-200";
    }
  };

  const statusOptions = [
    "All Statuses",
    "Applied",
    "Interviewing",
    "Offer",
    "Rejected",
  ];

  return (
    <div className="w-full bg-white px-5 py-10 flex flex-col gap-6 md:px-10 lg:px-10">
      <div>
        <h1 className="text-3xl font-bold">Job Applications</h1>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-lg">
          Track and manage your job applications
        </p>
        <div
          onClick={() => navigate("/add-job")}
          className="flex p-2 text-white items-center gap-3 text-lg cursor-pointer bg-[#059669] hover:bg-[#10b981]  transition-colors duration-300 rounded-lg"
        >
          <Plus size={20} className="" />
          <p className="text-lg ">Add Job</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4">
        <div className="rounded-lg border-none shadow-lg bg-gray-100 flex flex-col justify-center items-start gap-1 px-4 py-8 md:py-15 lg:py-15">
          <h4 className="text-xl font-semibold">{jobStats.total}</h4>
          <p className="text-gray-600">Total</p>
        </div>

        <div className="rounded-lg border-none shadow-lg bg-gray-100 flex flex-col justify-center items-start gap-1 px-4 py-8 md:py-15 lg:py-15">
          <h4 className="text-xl font-semibold text-green-700">
            {jobStats.applied}
          </h4>
          <p className="text-gray-600">Applied</p>
        </div>

        <div className="rounded-lg border-none shadow-lg bg-gray-100 flex flex-col justify-center items-start gap-1 px-4 py-8 md:py-15 lg:py-15">
          <h4 className="text-xl font-semibold text-orange-700">
            {jobStats.interviewing}
          </h4>
          <p className="text-gray-600">Interviewing</p>
        </div>

        <div className="rounded-lg border-none shadow-lg bg-gray-100 flex flex-col justify-center items-start gap-1 px-4 py-8 md:py-15 lg:py-15">
          <h4 className="text-xl font-semibold text-blue-700">
            {jobStats.offer}
          </h4>
          <p className="text-gray-600">Offers</p>
        </div>

        <div className="rounded-lg border-none shadow-lg bg-gray-100 flex flex-col justify-center items-start gap-1 px-4 py-8 md:py-15 lg:py-15">
          <h4 className="text-xl font-semibold text-red-700">
            {jobStats.rejected}
          </h4>
          <p className="text-gray-600">Rejected</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by Company Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex w-full items-center justify-between md:w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-300"
          >
            <span className="text-gray-700">{filter}</span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {statusOptions.map((status, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // setSelectedStatus(status);
                    setFilter(status);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left  transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                    filter === status
                      ? "bg-[#059669] text-white hover:bg-[#10b981]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {status}
                  {filter === status && <span className="float-right">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No job applications found.</p>
            <p className="text-gray-400">
              Add your first job application to get started!
            </p>
          </div>
        ) : (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              onClick={() => navigate(`/job/${job.id}`)}
              className="bg-gray-100 rounded-2xl border-none px-8 py-8 flex flex-col justify-between shadow-lg min-h-[200px] hover:shadow-2xl transition-all duration-300"
            >
              {/**Top section - title and status */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">{job.title}</h4>
                  <div
                    className={`rounded-lg px-3 py-1 flex justify-center items-center ${getStatusColors(
                      job.status
                    )}`}
                  >
                    <p className="text-sm font-medium">{job.status}</p>
                  </div>
                </div>
                <div>
                  <p className="text-start text-md text-gray-700">
                    {job.company}
                  </p>
                </div>
              </div>

              {/**Bottom section - applied date */}
              <div className="mt-6 flex flex-col gap-2">
                <p className="text-start text-gray-600 text-md">
                  Applied: {job.applicationDate}
                </p>
                {job.notes && (
                  <p className="text-start text-gray-600 text-md">
                    {job.notes}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
