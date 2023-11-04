import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import JobContext from "../context/JobContext";

function Navbar({ className }) {
  const { user, logOut } = useContext(JobContext);
  const navigate = useNavigate();
  console.log(user);
  console.log(user?.photoURL);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // console.log("Logged out");
        navigate("/login");
      })
      .catch(() => {});
  };

  return (
    <div
      className={`container mx-auto pt-4 navbar ${className}`}
      style={{ fontWeight: 500 }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-30 p-2 py-4 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/jobs">All Jobs</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/applied-jobs">Applied Jobs</NavLink>
                </li>
                <li>
                  <NavLink to="/add-jobs">Add a Job</NavLink>
                </li>
                <li>
                  <NavLink to="/my-jobs">My Jobs</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="text-xl tracking-widest font-bold flex items-center space-x-4 px-6 py-4 rounded-lg">
          <div className="w-32 md:w-40 ">
            <img className="w-full h-full" src="/logo.png" alt="" />
          </div>
          {/* <span className="bg-gradient-to-r from-yellow-500 to-orange-400 text-transparent bg-clip-text text-xl lg:text-2xl">
            JobZen
          </span> */}
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="option-menu flex space-x-4 text-[#0B0B0B] text-lg">
          <li>
            <NavLink
              className="cursor-pointer hover:bg-[#aea1ea] hover:text-white px-3 py-2 rounded-md "
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="cursor-pointer hover:bg-[#aea1ea] hover:text-white px-3 py-2 rounded-md "
              to="/jobs"
            >
              All Jobs
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink
                  className="cursor-pointer hover:bg-[#aea1ea] hover:text-white px-3 py-2 rounded-md "
                  to="/applied-jobs"
                >
                  Applied Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="cursor-pointer hover:bg-[#aea1ea] hover:text-white px-3 py-2 rounded-md "
                  to="/add-jobs"
                >
                  Add a Job
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="cursor-pointer hover:bg-[#aea1ea] hover:text-white px-3 py-2 rounded-md "
                  to="/my-jobs"
                >
                  My Jobs
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={`${user.photoURL}`} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="hover:bg-[#aea1ea] rounded-lg">
                <a className="hover:text-white">{user?.displayName}</a>
              </li>
              <li
                className="hover:bg-[#aea1ea] rounded-lg"
                onClick={handleLogOut}
              >
                <a className="hover:text-white">Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          // <div className="flex justify-center items-center space-x-2">
          //   <div>
          //     <div>
          //       <img src="./defaultProPic.png" alt="" />
          //     </div>
          //     <div>
          //       <span>fahim</span>
          //     </div>
          //   </div>
          //   <div>log out</div>
          // </div>
          <div>
            <Link to="/login">
              <button className="bg-[#aea1ea] text-white px-3 py-2 rounded-md hover:bg-[#9b8ed7] active:bg-[#aea1ea]">
                Log in
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
