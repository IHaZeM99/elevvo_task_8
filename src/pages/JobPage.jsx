import { useNavigate, useParams } from "react-router";
import { MoveLeft, SquarePen, Trash, BriefcaseBusiness,Building2,Calendar } from "lucide-react";
import { useJobs } from "../context/useJobs";
import Swal from "sweetalert2";

export const JobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { jobs, deleteJob } = useJobs();

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

  const job = jobs.find((job) => job.id === id);

  // Handle case where job is not found
  if (!job) {
    return (
      <div className="w-full bg-white px-5 py-10 flex flex-col gap-6 md:px-10 lg:px-10">
        <p>Job not found</p>
        <button onClick={() => navigate("/")} className="btn">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJob(id);
        navigate("/");
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="w-full bg-white px-5 py-10 flex flex-col gap-6 md:px-10 lg:px-10">
      <div className="flex items-center justify-between gap-6">
        <div
          onClick={() => navigate("/")}
          className="rounded-lg p-2 flex justify-between text-gray-700 border border-gray-500 hover:bg-[#059669] hover:text-white cursor-pointer transition-colors duration-300"
        >
          <MoveLeft size={20} />
          <p className="text-md ml-3">Back to Dashboard</p>
        </div>
        <div className="flex gap-2 items-center">
          <div onClick={() => navigate(`/edit-job/${job.id}`)} className="rounded-lg p-2 flex justify-between text-gray-700 border border-gray-500 hover:bg-[#059669] hover:text-white cursor-pointer transition-colors duration-300">
            <SquarePen size={20} />
            <p className="text-md ml-3">Edit</p>
          </div>
          <div
            onClick={handleDelete}
            className="rounded-lg p-2 flex justify-between text-white bg-red-600 hover:bg-red-800 cursor-pointer transition-colors duration-300"
          >
            <Trash size={20} />
            <p className="text-md ml-3">Delete</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-100 flex flex-col gap-6 justify-start rounded-xl">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BriefcaseBusiness size={20} />
              <h4 className="font-semibold text-lg">{job.title}</h4>
            </div>
            <div
              className={`rounded-lg px-3 py-1 flex justify-center items-center ${getStatusColors(
                job.status
              )}`}
            >
              <p className="text-sm font-medium">{job.status}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
              <Building2 size={15}/>
              <p className="font-semibold text-sm">{job.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Calendar size={15}/>
            <p className="text-gray-600 text-md">Applied on {job.applicationDate}</p>
        </div>
        {job.notes && (
          <h4 className="font-semibold text-md">{job.notes}</h4>
        )}
      </div>
    </div>
  );
};
