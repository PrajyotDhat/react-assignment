import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ open }) {
  const location = useLocation();
  const navigate = useNavigate();

  const dashboardMenuItems = [
    { name: "DashBoard", url: "/"}
  ];

  return (
    <div className={`hidden lg:fixed lg:inset-y-0 lg:w-[10vw] lg:flex lg:flex-col ${open ? "w-70" : "w-24"} duration-300 relative`}>
      <div className="flex grow flex-col gap-y-5 bg-blue-300 px-4 pt-7">
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-3 pr-2.5">
            <li className="">
              <ul role="list" className="space-y-1 -mx-2 overflow-y-auto sidebar-height">
                {dashboardMenuItems.map((item, index) => (
                  <NavLink
                    to={item.url}
                    key={index}
                    onClick={() => navigate(item.url)}
                    activeclassname="bg-[#E6E6E6] text-[#000000] cursor-default"
                    className="nav-link"
                  >
                    <li>
                      <span className="flex gap-x-3 rounded-md mb-3 p-2 text-base leading-6 font-medium items-center">
                        {item.icon}
                        <span className={`flex-1 futura-pt font-medium ${!open && "hidden"}`}>
                          {item.name}
                        </span>
                      </span>
                    </li>
                  </NavLink>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}