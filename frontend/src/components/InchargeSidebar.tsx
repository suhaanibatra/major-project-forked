import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';
import { FaChevronRight, FaSignOutAlt } from 'react-icons/fa';
import { HiBell, HiChartPie, HiClipboardList } from 'react-icons/hi';

const getInitials = (name: string) => {
    const nameParts = name.trim().split(" ");
    const initials =
      nameParts.length === 1
        ? nameParts[0][0]
        : nameParts[0][0] + nameParts[nameParts.length - 1][0];
    return initials.toUpperCase();
  };
  
function InchargeSidebar() {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    //TODO: add logout
    const handleSignout = async () => {
      try {
        const res = await fetch("", { method: "POST" });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signOutSuccess());
          navigate("/sign-in");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    const inchargeSidebarOptions = [
      {
        label: "Manage Complaints", //unsolved complaints
        icon: <HiClipboardList className="text-2xl" />,
        path: "/incharge/complaints",
      },
      {
        label: "Dashboard", //solved complaints
        icon: <HiChartPie className="text-2xl" />,
        path: "/incharge/dashboard",
      },
      {
        label: "Notifications",
        icon: <HiBell className="text-2xl" />,
        path: "/incharge/notifications",
      },
    ];
  
    return (
      <div
        className={`${
          open ? "w-full" : "w-24"
        } bg-[rgb(224,224,244)] p-5 pt-8 duration-300 sticky top-0 flex flex-col min-h-screen`}
      >
        {/* Sidebar Toggle */}
        <FaChevronRight
          className={`absolute cursor-pointer -right-3 top-9 w-7 bg-white border-dark-purple
          border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          color="bg-rgb[(224,224,244)]"
          fontSize="1.5em"
        />
  
        {/* Logo Section */}
        <div className={`flex gap-x-4 items-center`}>
          <img
            src="/manit_logo.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg] h-16"}`}
          />
          <div className={`${!open && "hidden"}`}>
            <span className="text-xl font-bold text-gray-800">Maulana Azad</span>
            <br />
            <span className="text-lg font-semibold text-gray-700">National Institute of Technology</span>
            <br />
            <span className="text-md font-light text-gray-600">Complaint Portal</span>
          </div>
        </div>
  
        {/* Sidebar Options */}
        <ul className="pt-6">
          <div className="flex-grow">
            {inchargeSidebarOptions.map((option, index) => (
              <Link to={option.path} key={index}>
                <li
                  className={`flex rounded-md p-3.5 cursor-pointer text-gray-800 hover:bg-gray-100 items-center gap-x-4 mt-3 text-2xl ${
                    location.pathname === option.path
                      ? "bg-[rgb(60,79,131)] text-white"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {option.icon}
                  <span className={`${!open && "hidden"} origin-left duration-200 text-2xl`}>
                    {option.label}
                  </span>
                </li>
              </Link>
            ))}
          </div>
        </ul>
  
        {/* Profile Section */}
        <Link to={"/incharge/profile"}>
          <li
            className={`flex rounded-md p-3.5 cursor-pointer hover:bg-light-white text-gray-800 items-center gap-x-4 mt-3`}
          >
            <div
              className={`flex items-center ${!open ? "justify-center" : "justify-start"} w-full p-4`}
            >
              <div
                className={`${
                  open ? "w-16 h-16" : "w-12 h-12 text-xl"
                } bg-[rgb(60,79,131)] rounded-full flex items-center justify-center text-white text-2xl font-bold`}
              >
                {getInitials(currentUser?.name || "Issue Incharge")}
              </div>
              {open && (
                <div className="ml-4">
                  <h2 className="font-bold">@{currentUser?.name}</h2>
                  <p className="text-gray-500">{currentUser?.email}</p>
                </div>
              )}
            </div>
          </li>
        </Link>
  
        {/* Sign Out Button */}
        <li
          className={`flex rounded-md p-3.5 cursor-pointer hover:bg-light-white text-gray-800 hover:bg-gray-100 items-center gap-x-4 mt-auto text-2xl`}
          onClick={handleSignout}
        >
          <FaSignOutAlt className="text-2xl" />
          <span className={`${!open && "hidden"} origin-left duration-200 text-2xl`}>
            Sign Out
          </span>
        </li>
      </div>
    );
  };

export default InchargeSidebar
