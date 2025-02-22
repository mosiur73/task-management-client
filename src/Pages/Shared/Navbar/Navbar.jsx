import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { toast } from "react-toastify";


const Navbar = () => {
    const {signOutUser,user} =useContext(AuthContext)

    const handleSignOut = () => {
        signOutUser()
          .then(() => {
            // console.log('successful sign out')
            toast.success('successful sign out')
          })
          .catch(error => {
            // console.log('failed to sign out .stay here. dont leave me alone',error)
          })
      }
    return (
        <div className="navbar fixed top-0 z-10 left-0 right-0 bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
         <li><NavLink className="text-xl font-bold" to="/">Home</NavLink></li>
         {/* <li><NavLink className="text-xl font-bold" to="/tasks">TaskManagement </NavLink></li> */}
         <li><NavLink className="text-xl font-bold" to="/dashboard/dashboardHome">Dashboard </NavLink></li>

      </ul>
    </div>
    <a className="btn btn-ghost text-xl text-teal-900">TaskManagement</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><NavLink className="text-xl font-bold" to="/">Home</NavLink></li>
    {/* <li><NavLink className="text-xl font-bold" to="/tasks">TaskManagement </NavLink></li> */}
    <li><NavLink className="text-xl font-bold" to="/dashboard/dashboardHome">Dashboard </NavLink></li>
      
    </ul>
  </div>
  <div className="navbar-end pr-6">
   {/* <Link to="/login">
   <button className="btn btn-info">Login</button>
   </Link> */}
   {
          user ? <>

            <button onClick={handleSignOut} className="btn">Sign out</button>
            <div   title={user?.displayName} className='w-10 rounded-full ml-2'>
              <img className='rounded-full'
                referrerPolicy='no-referrer'
                alt='no Photo'
                src={user?.photoURL}
              />
            </div>
           
          </> : <>
            <Link to="/login">
              <button className='btn btn-outline'><FaArrowRightFromBracket /> Login</button>
            </Link>
          </>
        }
  </div>
</div>
    );
};

export default Navbar;