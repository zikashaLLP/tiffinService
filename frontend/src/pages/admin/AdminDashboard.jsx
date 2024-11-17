import React, { useEffect, useState } from "react";
import { logout } from "../../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarProvider,
  SidebarFooter,
  Dialog,
  DialogOverlay,
  DialogContent,
} from "@/components/ui/sidebar"; // Adjust the import path as needed
import OrderDetails from "@/components/OrderDetails";
import MenuDetails from "@/components/MenuDetails";
// import Logo from '../../assets/images/logo-light.png';


const AdminDashboard = ({children}) => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current URL

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("menu");
  const [isDialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility

  const handleLogout = () => {
    // debugger;
    logout();
    navigate("/adminn/login");
    closeDialog(); // Ensure dialog is closed on logout
  };
  useEffect(() => {
    if (location.pathname.includes("/menu")) {
      setActiveMenu("menu");
    } else if (location.pathname.includes("/orders")) {
      setActiveMenu("orders");
    }
  }, [location.pathname]); // Run whenever the URL changes


  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <SidebarProvider defaultOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-200">
        <div
          className={`flex flex-col w-72 bg-white rounded-r-lg ${
            sidebarOpen ? "shadow-lg" : "shadow-none"
          }`}
        >
          {/* Company Logo and Name */}
          <div className="px-5 py-4 border-b mb-4">
            <div>
              <img className="h-[64px]" src={'/logo-light.png'} alt="Daily Dose" />
            </div>
          </div>

          {/* Navigation Menu */}
          <ul className="flex-1 overflow-y-auto px-3">
            <li
              className={`px-3 py-2 rounded cursor-pointer ${
                activeMenu === "menu" ? "bg-primary text-white hover:text-white" : "hover:text-primary"
              }`}
            >
              <Link to={'/adminn/dashboard/menu'}>Menu</Link> 
            </li>
            <li
              className={`px-3 py-2 rounded cursor-pointer ${
                activeMenu === "orders" ? "bg-primary text-white hover:text-white" : "hover:text-primary"
              }`}
            >
              <Link to={'/adminn/dashboard/orders'}>Orders</Link> 
            </li>
          </ul>

          {/* Logout Button at the bottom */}
          <SidebarFooter>
            <button
              onClick={openDialog}
              className="w-full py-2 text-md rounded-lg text-red-500 border border-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center gap-3 p-4"
            >
              <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
              Logout
            </button>
          </SidebarFooter>
        </div>

        {/* Main Content Area
        {activeMenu === "menu" && <MenuDetails />}
        {activeMenu === "orders" && <OrderDetails />} */}
        {children}

        {/* Confirmation Dialog */}
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" />
            <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50">
              <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
              <p className="mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white p-2 rounded mr-2 hover:bg-red-600 transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={closeDialog}
                  className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
