import React, { useState } from "react";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("menu");
  const [isDialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    closeDialog(); // Ensure dialog is closed on logout
  };

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <SidebarProvider defaultOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-200">
        <div
          className={`flex flex-col w-72 bg-classic-grey text-white ${
            sidebarOpen ? "shadow-lg" : "shadow-none"
          }`}
        >
          {/* Company Logo and Name */}
          <div className="px-5 py-4 border-b mb-4">
            <h1 className="text-2xl font-bold">Company Name</h1>
          </div>

          {/* Navigation Menu */}
          <ul className="flex-1 overflow-y-auto">
            <li
              className={`p-4 cursor-pointer hover:bg-gray-800 ${
                activeMenu === "menu" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveMenu("menu")}
            >
              Menu
            </li>
            <li
              className={`p-4 cursor-pointer hover:bg-gray-800 ${
                activeMenu === "orders" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveMenu("orders")}
            >
              Orders
            </li>
          </ul>

          {/* Logout Button at the bottom */}
          <SidebarFooter>
            <button
              onClick={openDialog}
              className="w-full py-2 text-md rounded-lg bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </button>
          </SidebarFooter>
        </div>

        {/* Main Content Area */}
        {activeMenu === "menu" && <MenuDetails />}
        {activeMenu === "orders" && <OrderDetails />}

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
