import AsIdebar from "@/components/ui/AsIdebar";
import { Outlet } from "react-router";
import { useState } from "react";

const LayoutAsidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className="md:hidden bg-white flex py-2 px-5 border-b border-gray-200">
        <button onClick={toggleSidebar} className="ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </nav>

      <section className="grid__menu overflow-hidden md:h-screen">

        <aside
          className={`bg-white h-screen border-r fixed top-0 bottom-0 right-0 left-0 border-gray-200 flex flex-col md:static w-[16rem] 
        ${isSidebarOpen ? "z-20" : "hidden md:flex"}`}
        >
          <AsIdebar />
        </aside>

        {/* Contenido principal */}
        <main className="overflow-auto ">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default LayoutAsidebar;
