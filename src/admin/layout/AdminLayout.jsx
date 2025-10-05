import { useState } from "react";
import SidebarComponent from "../components/SideBarComponent";
import TopbarComponent from "../components/TopBarComponent";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <TopbarComponent toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
