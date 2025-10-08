import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useOrganization } from "../../contexts/OrganizationContext";
// import user_img from "../../assets/images/user_img.jpg";

function TopbarComponent({ toggleSidebar }) {
  const location = useLocation();
  const { orgName } = useOrganization();

  const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/election": "Danh sách cuộc bầu cử",
    "/admin/trustee": "Danh sách Trustee",
  };

  let currentPage = "Admin Panel";
  if (location.pathname.startsWith("/admin/order-details/")) {
    currentPage = "Chi tiết đơn hàng";
  } else if (location.pathname.startsWith("/admin/history/")) {
    currentPage = "Chi tiết lịch sử";
  } else if (pageTitles[location.pathname]) {
    currentPage = pageTitles[location.pathname];
  }

  return (
    <div className="fixed top-0 left-0 lg:left-[300px] z-10 bg-white right-0 h-16 flex items-center justify-between px-2 lg:px-6 shadow-md transition-all duration-300">
      <div className="flex items-center gap-3">
        <button className="lg:hidden text-gray-700" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-semibold mt-1">{currentPage}</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-md">{orgName}</span>
        {/* <img
          src={user_img}
          alt="Admin Avatar"
          className="w-12 h-12 rounded-full"
        /> */}
      </div>
    </div>
  );
}

export default TopbarComponent;
