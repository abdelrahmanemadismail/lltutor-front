import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Image from "react-image";
import { CloseSquare } from "iconsax-react";

// Define NavItem type for better TypeScript support
interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  navItems: NavItem[];
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, navItems }: SidebarProps) => {
  const location = useLocation();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const userType = "user"; // Mock userType as an example

  let storedSidebarExpanded = localStorage.getItem("sidebar-expanded") || "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === "true"
  );

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Save sidebar expanded state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const checkActive = (str: string) => {
    if (str[str.length - 1] === "/") {
      return str.slice(0, -1);
    } else {
      return str;
    }
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-62.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-center pr-6 py-4">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="230"
            height="62"
            viewBox="0 0 230 62"
            fill="none"
          >
            {/* SVG content here */}
          </svg>
        </Link>
      </div>

      {/* SIDEBAR CONTENT */}
      <div className="flex flex-col flex-grow">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <SidebarLinkGroup
              key={item.name}
              item={item}
              isActive={checkActive(location.pathname) === item.path}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;