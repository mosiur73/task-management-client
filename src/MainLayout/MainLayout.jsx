import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";


const MainLayout = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;