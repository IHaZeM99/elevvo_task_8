import { MoveLeft, Save, ChevronDown } from "lucide-react";  
import { useNavigate, useParams } from "react-router-dom";  
import { useState, useEffect } from "react";  
import { useJobs } from "../context/useJobs";
import Swal from "sweetalert2";

export const EditJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { updateJob, jobs } = useJobs();

  // Find the job
  const job = jobs.find(job => job.id === id);

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  // Initialize form data with proper defaults
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    status: "Applied",
    applicationDate: "",
    notes: ""
  });

  // Update form data when job is found
  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company || "",
        title: job.title || "",
        status: job.status || "Applied",
        applicationDate: job.applicationDate || "",
        notes: job.notes || ""
      });
    }
  }, [job]);

  // Handle case where job is not found
  if (!job) {
    return (
      <div className="w-full bg-white px-5 py-10 flex flex-col gap-6 md:px-10 lg:px-10">
        <div className="flex items-center gap-6">
          <div
            onClick={() => navigate("/")}
            className="rounded-lg p-2 flex justify-between text-gray-700 border border-gray-500 hover:bg-[#059669] hover:text-white cursor-pointer transition-colors duration-300"
          >
            <MoveLeft size={20} />
            <p className="text-md ml-3">Back to Dashboard</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Job Not Found</h2>
            <p className="text-gray-600">The job you're looking for doesn't exist.</p>
          </div>
        </div>
        
        <div className="p-6 bg-red-100 rounded-xl border border-red-300">
          <p className="text-red-700 text-lg">
            The job with ID "{id}" could not be found.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const statusOptions = ["Applied", "Interviewing", "Offer", "Rejected"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (status) => {
    setFormData((prevData) => ({
      ...prevData,
      status: status,
    }));
    setIsDropdownOpen(false);
  };

  const handleUpdateJob = (e) => {
    e.preventDefault();

    if (!formData.company || !formData.title || !formData.applicationDate) {
      Swal.fire({
        title: "Error!",
        text: "You need to fill the required fields",
        icon: "error",
      });
      return;
    }

    const updatedJob = {
      id: job.id,  
      company: formData.company.trim(),
      title: formData.title.trim(),
      status: formData.status,
      applicationDate: formData.applicationDate,
      notes: formData.notes.trim(),
    };

    
    updateJob(updatedJob);  

    // Show success message
    Swal.fire({
      title: "Success!",
      text: "Job application updated successfully",
      icon: "success",
      timer: 1500
    });

    navigate("/");
  };

  return (
    <div className="w-full bg-white px-5 py-10 flex flex-col gap-6 md:px-10 lg:px-10">
      <div className="flex items-center gap-6">
        <div
          onClick={() => navigate("/")}
          className="rounded-lg p-2 flex justify-between text-gray-700 border border-gray-500 hover:bg-[#059669] hover:text-white cursor-pointer transition-colors duration-300"
        >
          <MoveLeft size={20} />
          <p className="text-md ml-3">Back to Dashboard</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Update Job Application</h2>  
          <p className="text-gray-600">
            Update details for your job application
          </p>
        </div>
      </div>

      <div className="p-6 bg-gray-100 flex flex-col gap-4 justify-start rounded-xl">
        <div className="flex items-center gap-6">
          <Save size={20} />  
          <h4 className="text-lg font-semibold">Job Application Details</h4>
        </div>

        <form onSubmit={handleUpdateJob} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h4>Company Name *</h4>
            <input
              type="text"
              required
              placeholder="e.g., Google, Microsoft"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h4>Job Title *</h4>
            <input
              type="text"
              required
              placeholder="e.g., Software Engineer, Designer"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h4>Application Status *</h4>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full items-center justify-between md:w-48 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-300"
              >
                <span className="text-gray-700">{formData.status}</span>
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
                      type="button"
                      onClick={() => handleStatusChange(status)}
                      className={`w-full px-4 py-2 text-left transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                        formData.status === status
                          ? "bg-[#059669] text-white hover:bg-[#10b981]"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {status}
                      {formData.status === status && (
                        <span className="float-right">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4>Application Date *</h4>
            <input
              type="date"
              required
              name="applicationDate"
              value={formData.applicationDate}
              max={getTodayDate()}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h4>Notes</h4>
            <textarea
              rows={4}
              placeholder="Add any additional notes about this application (optional)..."
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-300 resize-vertical"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-5 text-white rounded-lg flex items-center justify-center gap-4 bg-[#059669] hover:bg-[#10b981] transition-colors duration-300"
          >
            <Save size={20} />
            <h4 className="font-semibold">Update Job Application</h4>  
          </button>

          <div
            onClick={() => navigate("/")}
            className="w-full cursor-pointer py-2 mt-5 text-black border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
          >
            <h4 className="font-semibold">Cancel</h4>
          </div>
        </form>
      </div>
    </div>
  );
};
