import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { getOrders, markAsDelivered } from "@/services/delivery";
import { useToast } from "@/hooks/use-toast";

// Utility function to format dates and times
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US");
const formatTime = (dateString) =>
  new Date(dateString).toLocaleTimeString("en-US", { timeStyle: "short" });

// Utility function to summarize variants
const summarizeVariants = (menus) => {
  const summary = {};
  menus.forEach((menu) => {
    const variant = `${menu.quantity} x ${menu.variant}`;
    summary[variant] = (summary[variant] || '') ;
  });
  return Object.keys(summary)
    .map((key) => `${summary[key]} ${key}`)
    .join(", ");
};

const OrderCard = ({ order, type, onDeliver }) => {
    // Currency formatting for Indian Rupees
    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  
    return (
      <div className="border p-4 mb-4 relative rounded shadow bg-white text-gray-800">
        <h2 className="font-bold text-lg">Order Details #{order.id.toString().padStart(4, '0')}</h2>
        <div className="flex justify-between items-center">
          <p><strong>Date:</strong> {formatDate(order.orderDate)}</p>
          <p className="font-medium text-sm text-gray-500">{formatTime(order.orderDate)}</p>
        </div>
        <p><strong>Customer Mobile:</strong> {order.mobile_no}</p>
        <p><strong>Variants:</strong> {summarizeVariants(order.menus)}</p>
        <p><strong>Total Amount:</strong> {formatCurrency(order.totalAmount)}</p>
        {type === 1 && (
          <button 
            onClick={() => onDeliver(order.id)}
            className="mt-2 bg-classic-grey text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-150 ease-in-out">
            Mark as Delivered
          </button>
        )}
        {order.status ==='done' && <span className=" absolute bottom-3 right-3 text-green-500 font-semibold">Delivered</span>}
        {order.status ==='isAssigned' && <span className=" absolute bottom-3 right-3 text-red-500 font-semibold">Pending</span>}
      </div>
    );
  };
  

const DeliveryDashboard = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("pending");
    const [date, setDate] = useState(new Date());
    const [shift, setShift] = useState("Lunch");
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [mobile, setMobile] = useState(localStorage.getItem('mobile'));



  const handleLogout = () => {
    logout();
    navigate("/delivery/login");
  };

  useEffect(() => {
    if (!mobile) {
      logout();
      toast({
        title: "Session Expired",
        description: "Please login again.",
        variant: "destructive",
      });
      navigate("/delivery/login");

      return;
    }
  }, []);

  
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  useEffect(() => {
    // Fetch initial data
    applyFilters();
  }, []);

  const applyFilters = () => {
    setIsLoading(true);
    const params = {
      date: date.toISOString().split("T")[0],
      shift,
    };
    console.log(params);
    getOrders(mobile, params)
      .then((resp) => setOrders(resp.data))
      .catch((err) => {
        toast({
          title: "Error fetching orders",
          description: err.response?.data?.message || "Network error",
          variant: "destructive",
        });
        if(err.response.status===404)
        setOrders([])
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeliver = (orderId) => {
    setSelectedOrderId(orderId);
    setConfirmDialogOpen(true);
  };

  const confirmDelivery = () => {
    setIsLoading(true);
    markAsDelivered(selectedOrderId)
      .then(() => {
        toast({
          title: "Delivery Confirmed",
          description: "The order status has been updated to delivered.",
          variant: "positive",
        });
        applyFilters(); // Re-fetch or update orders list locally
      })
      .catch((err) => {
        toast({
          title: "Error updating order",
          description: err.response?.data?.message || "Network error",
          variant: "destructive",
        });
      })
      .finally(() => {
        setConfirmDialogOpen(false);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col h-screen w-96 mx-auto border border-spacing-2">
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}
      {/* Header with Menu Button */}
      <div className="bg-classic-grey text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Company Name</h1>
        <button
          onClick={openDialog}
          className="text-sm bg-red-500 p-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Tabs for Navigation */}
      <div className="flex bg-gray-200">
        <button
          className={`flex-1 relative text-center p-2 font-semibold ${
            activeTab === "pending" ? "bg-classic-grey text-white" : ""
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
          {orders.filter(order => order.status === "isAssigned").length > 0 && (
            <span className="absolute top-0 right-0 mr-2 mt-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {orders.filter(order => order.status === "isAssigned").length}
            </span>
          )}
        </button>
        <button
          className={`flex-1 relative text-center p-2 font-semibold ${
            activeTab === "completed" ? "bg-classic-grey text-white" : ""
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      {/* Filters Row */}
      <div className="flex items-center p-4 gap-2 bg-white">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-gray-700" />
          <input
            type="date"
            value={date ? date.toISOString().split("T")[0] : ""}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="p-2 border rounded w-full"
            style={{ height: "38px" }} // Adjust height to match Select
          />
        </div>
        <Select value={shift} onValueChange={setShift} className="flex-1">
          <SelectTrigger
            className="w-full bg-white border rounded p-2"
            style={{ height: "38px" }}
          >
            <SelectValue placeholder="Select Shift" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded border mt-2">
            <SelectItem value="Lunch" className="hover:bg-gray-100 p-2">
              Lunch
            </SelectItem>
            <SelectItem value="Dinner" className="hover:bg-gray-100 p-2">
              Dinner
            </SelectItem>
          </SelectContent>
        </Select>
        <button
          onClick={applyFilters}
          className="bg-classic-grey hover:bg-black text-white font-bold p-2 rounded"
        >
          Apply
        </button>
      </div>
      {console.log(orders)}

      {/* Content Area for Orders */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {/* {activeTab === "pending" ? (
          <p>Pending orders will be listed here.</p>
        ) : (
          <p>Completed orders will be listed here.</p>
        )} */}
        {orders.filter(o=>o.status === (activeTab==='pending'?'isAssigned':'done')).map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            type={activeTab === "pending" ? 1 : 2}
            onDeliver={handleDeliver}
          />
        ))}
        {
            activeTab==='pending' && orders.filter(o=>o.status === 'isAssigned').length === 0 && (
                <p className="text-center text-gray-500">No pending orders</p>
            )
        }
        {
            activeTab==='completed' && orders.filter(o=>o.status === 'done').length === 0 && (
                <p className="text-center text-gray-500">No completed orders</p>
            )
        }
      </div>

      {/* Logout Confirmation Dialog */}
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

      {/* Confirmation Dialog for Delivery */}
      {confirmDialogOpen && (
        <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" />
          <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h2 className="text-xl font-semibold mb-4">Confirm Delivery</h2>
            <p className="mb-6">Are you sure you want to mark this order as delivered?</p>
            <div className="flex justify-end">
              <button onClick={confirmDelivery} className="bg-classic-grey text-white p-2 rounded mr-2 hover:bg-classic-grey">
                Confirm
              </button>
              <button onClick={() => setConfirmDialogOpen(false)} className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DeliveryDashboard;
