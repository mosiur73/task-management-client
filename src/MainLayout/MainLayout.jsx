import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;