import { useLocation } from 'react-router'
import { House, Plus, Folder } from "lucide-react";
import { useNavigate } from 'react-router';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  return (
    <div className="w-full bg-gray-100 px-5 py-5 flex flex-col gap-6 items-start justify-start md:items-center lg:items-center md:flex-row lg:flex-row md:px-10 lg:px-10">
      {/**Logo */}
      <div id="logo" onClick={() => navigate('/')} className="flex cursor-pointer items-center gap-2 text-2xl">
        <Folder size={40} className="text-[#059669]" />
        <h2 className="font-semibold text-2xl text-gray-800">Job Tracker</h2>
      </div>

      <div className="grid grid-cols-2 gap-10 md:gap-6 lg:gap-6">
        <div onClick={() => navigate('/')} className={`flex px-2 py-6 items-center gap-3 text-lg cursor-pointer hover:bg-[#10b981] hover:text-white transition-colors duration-300 rounded-lg md:p-2 lg:p-2  ${location.pathname === '/' ? 'bg-[#059669] text-white' : 'text-gray-800'}`}>
          <House size={20} className="" />
          <p className="text-lg ">Dashboard</p>
        </div>

        <div onClick={() => navigate('/add-job')} className={`flex px-2 py-6 items-center gap-3 text-lg cursor-pointer hover:bg-[#10b981] hover:text-white transition-colors duration-300 rounded-lg md:p-2 lg:p-2  ${location.pathname === '/add-job' ? 'bg-[#059669] text-white' : 'text-gray-800'}`}>
          <Plus size={20} className="" />
          <p className="text-lg ">Add Job</p>
        </div>
      </div>
    </div>
  );
};
