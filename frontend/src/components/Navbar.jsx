import { NavLink } from "react-router-dom";
import {  logo } from "../assets/images";
import { navLinks, navlogin } from "../data/index.js";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
const Navbar = () => {
  const [toggle, setToggle] = useState(false); 
 
  const { user } = useAuthContext();
  
  return (
    <nav className="w-full flex py-6 justify-between gap-44  items-center navbar bg-black fixed">
      <NavLink to={'/'}>
        
        <img src={logo} alt="" className="w-28 ml-9" />
        </NavLink>

      <ul className="list-none sm:flex hidden justify-center items-center flex-1 space-x-6  ">
        {navLinks.map((nav) => (
          <li
            key={nav.id}
            className="font-mono font-medium cursor-pointer text-[20px] text-white hover:text-yellow-400 "
          >
            <NavLink
              to={nav.id}
              className={({ isActive }) =>
                isActive ? "text-yellow-400" : "text-dimWhite"
              }
            >
              {nav.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="list-none sm:flex hidden justify-center items-center  space-x-6 mr-10 ">
        {!user &&
          navlogin.map((nav) => (
            <li
              key={nav.id}
              className="font-mono font-medium cursor-pointer text-[20px] text-white hover:text-yellow-400 "
            >
              <NavLink
                to={nav.id}
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-dimWhite"
                }
              >
                {nav.title}
              </NavLink>
            </li>
          ))}
        {user && (
          <li>
            <NavLink className="font-mono font-medium cursor-pointer text-[20px] text-yellow-400" to={'user/'+user.userID} >{user.email}</NavLink>
           
          </li>
        )}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        {toggle ? <IoIosCloseCircle className="mr-5" color="yellow" size={30} onClick={() => setToggle(!toggle)} />:<IoMdMenu className="mr-5" color="yellow" size={30} onClick={() => setToggle(!toggle)}/>}
        

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-50`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col space-y-3">
          {user && (
          <li>
            <NavLink className="font-mono font-medium cursor-pointer text-[16px] text-yellow-700" to={'user/'+user.userID} >{user.email}</NavLink>
           
          </li>
        )}
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className="font-poppins font-medium cursor-pointer text-[16px] hover:text-yellow-400"
              >
                <NavLink
                  to={nav.id}
                  className={({ isActive }) =>
                    isActive ? "text-yellow-400" : "text-dimWhite"
                  }
                >
                  {nav.title}
                </NavLink>
              </li>
            ))}
             {!user &&
          navlogin.map((nav) => (
            <li
              key={nav.id}
              className="font-mono font-medium cursor-pointer text-[16px] text-black hover:text-yellow-400 "
            >
              <NavLink
                to={nav.id}
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-black"
                }
              >
                {nav.title}
              </NavLink>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
