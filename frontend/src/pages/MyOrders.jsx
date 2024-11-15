import React, { useState } from "react";

import { Search } from "lucide-react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
  AlertTriangleIcon,
} from "lucide-react"; // Use appropriate icons for visual cues
import { getMyOrder } from "@/services/user";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const MyOrders = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(""); // State to store the error message
  const [myOrders, setmyOrders] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const statusFormat = {
    pending: "Pending",
    isAssigned: "Assigned",
    outForDelivery: "Out for delivery",
    done: "Delivered",
    unexpected: "Cancelled",
  };

  const statusIcons = {
    pending: <ClockIcon className="text-yellow-500" />,
    isAssigned: <CheckCircleIcon className="text-green-500" />,
    outForDelivery: <TruckIcon className="text-blue-500" />,
    done: <CheckCircleIcon className="text-teal-500" />,
    unexpected: <XCircleIcon className="text-red-500" />,
  };

  const paymentStatusColors = {
    done: "bg-green-500",
    pending: "bg-yellow-500",
    failed: "bg-red-500",
  };

  const renderOrders = () => {
    return myOrders.map((order) => (
      <Card
        key={order.id}
        className="mb-4 shadow-lg rounded-lg mt-4 bg-white relative"
      >
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold text-white ${
            paymentStatusColors[order.payment_status]
          }`}
        >
          Payment Status : {order.payment_status}
        </div>
        <CardHeader className="relative p-3">
          {/* <Pill
            className={`absolute top-3 right-3 ${
              paymentStatusColors[order.payment_status]
            }`}
          >
            {order.payment_status.charAt(0).toUpperCase() +
              order.payment_status.slice(1)}
          </Pill> */}
          <Label className="text-lg font-semibold ms-6">
            Order ID: {order.id}
          </Label>

          <Tooltip content={statusFormat[order.status]} position="top">
            <div className="absolute top-3 left-3">
              {statusIcons[order.status]}
            </div>
          </Tooltip>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">
                <strong>Mobile No:</strong> {order.mobile_no}
              </p>
              <p className="text-sm">
                <strong>Address:</strong> {order.address.address}
              </p>
              <p className="text-sm">
                <strong>Order Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-teal-600">
                ₹{order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Label className="font-semibold">Menus:</Label>
            {order.menus.map((menu) => (
              <div key={menu.id} className="mt-2">
                <p className="text-sm font-semibold">{menu.variant}</p>
                <p className="text-xs">{menu.description}</p>
                <p className="text-xs">
                  <strong>Items:</strong> {menu.menu_items.join(", ")}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-xs">Quantity: {menu.quantity}</p>
                  <p className="text-xs">
                    Item Total: ₹{menu.itemTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ));
  };

  const {toast} = useToast()

  const search = (mobile_no) => {
    const data = { mobile_no };
    setisLoading(true);
    getMyOrder(data)
      .then((resp) => {
        console.log(resp);
        setmyOrders(resp.orders);
      })
      .catch((err) => {
        // console.log(err);
        toast({
          title: "Warning",
          description: err.response.data.message,
          variant: "warning",
        });
        setmyOrders([]);

      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const handleSearch = () => {
    // Simple validation for mobile number: must be 10 digits
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return; // Stop the search if validation fails
    }
    setError(""); // Clear any existing errors if the number is valid
    // console.log("Searching orders for mobile:", mobile);
    // Trigger search logic or API call here
    search(mobile);
  };

  return (
    <TooltipProvider>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}
      <Header />
      <div className="container mx-auto p-4 py-16">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardHeader>
              <Label className="text-xl font-semibold">Search Orders</Label>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-3 items-center">
                <Input
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className={`${error ? "border-red-500" : ""}`}
                />
                <Button className="text-white" onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">
                Enter a mobile number to search for related orders.
              </p>
            </CardFooter>
          </Card>
          {/* Render order details */}
          {renderOrders()}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MyOrders;
