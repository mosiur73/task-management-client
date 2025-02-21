import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaHome, FaSearch, FaTasks, FaBars } from "react-icons/fa";
import { FcParallelTasks } from "react-icons/fc";
import { LuListTodo } from "react-icons/lu";
import { RiProgress5Line } from "react-icons/ri";
import { IoIosCloudDone } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside
                className={`bg-white shadow-lg fixed top-0 left-0 h-full p-6 overflow-y-auto transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:w-72`}
            >
                {/* Sidebar Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FcParallelTasks className="text-2xl" /> TaskMe
                    </h2>
                    <IoMdClose
                        className="text-2xl cursor-pointer md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                </div>

                {/* Sidebar Links */}
                <ul className="space-y-6 text-lg font-semibold">
                    <li>
                        <Link to="/dashboard/dashboardHome" className="flex items-center gap-3">
                            <MdDashboard /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/tasks" className="flex items-center gap-3">
                            <FaTasks /> Task
                        </Link>
                    </li>
                    <li>
                        <Link className="flex items-center gap-3">
                            <LuListTodo /> To Do
                        </Link>
                    </li>
                    <li>
                        <Link className="flex items-center gap-3">
                            <RiProgress5Line /> In Progress
                        </Link>
                    </li>
                    <li>
                        <Link className="flex items-center gap-3">
                            <IoIosCloudDone /> Done
                        </Link>
                    </li>
                    <div className="border-t my-4"></div>
                    <li>
                        <Link to="/" className="flex items-center gap-3">
                            <FaHome /> Home
                        </Link>
                    </li>
                </ul>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-72 p-6 transition-all">
                {/* Navbar */}
                <div className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center mb-6">
                    {/* Sidebar Toggle for Mobile */}
                    <FaBars
                        className="text-2xl cursor-pointer md:hidden"
                        onClick={() => setIsSidebarOpen(true)}
                    />

                    {/* Search Bar */}
                    <div className="flex items-center mx-2 flex-1  max-w-lg">
                        {/* <FaSearch className="text-gray-500 " /> */}
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="flex-grow bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>

                    {/* User Info */}
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700 text-lg font-medium">Welcome</span>
                        {user && (
                            <div title={user?.displayName} className="w-10 h-10 rounded-full">
                                <img
                                    className="rounded-full"
                                    referrerPolicy="no-referrer"
                                    alt="User"
                                    src={user?.photoURL}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Outlet for Nested Pages */}
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
