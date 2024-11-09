import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  UserCheck,
  Truck,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

import { Dialog, DialogContent, DialogOverlay } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { assignOrder, getDeliveryBoys, getOrders } from "@/services/admin";
import { useToast } from "@/hooks/use-toast";
import DeliveryBoyCard from "./DeliveryBoyCard";

function OrderDetails() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [currentItems, setcurrentItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isGroupedByAddress, setIsGroupedByAddress] = useState(true);
  const { toast } = useToast();
  // Filters state
  const [date, setDate] = useState();
  const [shift, setShift] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrder, setIsOrder] = useState(true);
  const [flag, setflag] = useState(true);
  useEffect(() => {
    const params = {};
    params.orderdate = new Date().toISOString().slice(0, 10);
    params.deliverydate = new Date().toISOString().slice(0, 10);
    params.shift = "Lunch";
    params.isorder = true;
    // console.log(params);
    if (params.status === '') {
      delete params.status;
  }
  setIsLoading(true);
    getOrders(params)
      .then((res) => {
        // console.log(res.data);
        setOrders(res.orders);
        setcurrentItems(
          res.orders.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.status === 404)
          toast({
            variant: "warning",
            title: "Uh oh! Something went wrong.",
            description: err.response.data.message,
          });
        else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            // description: err.response.data.message,
          });
        }
      }).finally(()=>{
        setIsLoading(false);
      });
  }, [flag]);

  useEffect(() => {
    getDeliveryBoys().then((resp) => {
      // console.log(resp.data);
      const d = resp.data;
      // console.log('ddd',d);
      setDeliveryBoys([...d]);
    });
  }, []);

  useEffect(() => {
    const dateParam = searchParams.get("date");
    const shiftParam = searchParams.get("shift");
    const statusParam = searchParams.get("status");

    // Set default date to today's date if not present in the URL
    setDate(dateParam ? new Date(dateParam) : new Date());
    setShift(shiftParam || "Lunch"); // Default to "lunch"
    setStatus(statusParam || "");

    const params = {};
    params.orderdate = new Date().toISOString().slice(0, 10);
    params.deliverydate = new Date().toISOString().slice(0, 10);
    params.shift = "Lunch";
    params.isorder = isOrder;
    console.log(params);
    if (params.status === '') {
      delete params.status;
  }
  setIsLoading(true);
    getOrders(params)
      .then((res) => {
        // console.log(res.data);
        setOrders(res.orders);
        setcurrentItems(
          res.orders.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.status === 404)
          toast({
            variant: "warning",
            title: "Uh oh! Something went wrong.",
            description: err.response.data.message,
          });
        else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            // description: err.response.data.message,
          });
        }
      }).finally(()=>{
        setIsLoading(false);
      });;

    // console.log(searchParams);
  }, [searchParams]);

  const applyFilters = () => {
    const params = {
      orderdate: date
        ? format(date, "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      deliverydate: date
        ? format(date, "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      shift: shift,
      status: status !== "all" ? status : undefined,
      isorder: isOrder,
    };

    // console.log("Applying filters with params:", params);
    if (params.status === '') {
      delete params.status;
  }
  setIsLoading(true);
    getOrders(params)
      .then((res) => {
        console.log("Orders fetched:", res.orders);
        setOrders(res.orders);
        setCurrentPage(1); // Reset to first page if filters change
        setcurrentItems(sliceItems(res.orders, 1, itemsPerPage));
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: err.response.data.message || "Could not fetch orders.",
        });
        setOrders([]);
        setCurrentPage(1); // Reset to first page if filters change
        setcurrentItems([]);
      }).finally(()=>{
        setIsLoading(false);
      });;
  };

  function sliceItems(items, page, perPage) {
    return items.slice((page - 1) * perPage, page * perPage);
  }

  useEffect(() => {
    // This will run when currentPage or itemsPerPage changes
    setcurrentItems(sliceItems(orders, currentPage, itemsPerPage));
  }, [currentPage, itemsPerPage, orders]);

  const handleRowSelection = (id) => {
    setSelectedRows(
      selectedRows.includes(id)
        ? selectedRows.filter((x) => x !== id)
        : [...selectedRows, id]
    );
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // const currentItems = orders.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const handleSelectAllRows = (checked) => {
    setSelectedRows(checked ? orders.map((order) => order.id) : []);
  };

  const handleAssignDeliveryBox = () => {
    console.log(`Assigning delivery box to orders:`, selectedRows);
    setIsModalOpen(false);
    setSelectedRows([]);
  };

  const handleToggleGroupByAddress = (checked) => {
    // console.log("Toggling group by address to:", checked); // Debugging output
    setIsGroupedByAddress(checked);
  };

  const handleToggleDeliveryOrder = (checked) => {
    setIsOrder(checked);
  };

  const handleAssignOrders = () => {
    if (selectedRows.length > 0) {
      setIsModalOpen(true); // Open the modal only if there are selected rows
    } else {
      toast({
        variant: "info",
        title: "No selection",
        description: "Please select at least one order to assign.",
      });
    }
  };

  const closeAssignModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const assignDeliveryBoy = (deliveryBoyId) => {
    // console.log(
    //   `Assigning orders ${selectedRows} to delivery boy ${deliveryBoyId}`
    // );
    // Here you would call an API to assign the orders, then close the modal
    const assign = {
      orderIds: selectedRows,
      delivery_boy_id: deliveryBoyId,
    };
    // console.log(assign);
    assignOrder(assign)
      .then((res) => {
        console.log(res);
        toast({
          variant: "success",
          title: `Orders Assigned to `,
          description: "Orders have been assigned successfully.",
        });
        // applyFilters();
        setflag((f) => !f);
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: err.response.data.message,
        });
      });
    setIsModalOpen(false);
    setSelectedRows([]); // Optionally reset the selection
  };

  const statusFormat = {
    pending:'Pending',
    isAssigned:'Assigned',
    outForDelivery:'Out for delivery',
    done:'Delivered',
    unexpected:'Cancelled'
  }

  return (
    <div className="container mx-auto p-10 h-screen overflow-auto">
      {isLoading && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="loader"></div>
      </div>
    )}
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      {/* Filters UI here */}
      <div className="bg-white p-4 rounded-lg mb-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Filters</h2>
        <div className="flex items-center justify-between gap-4 w-full overflow-x-auto">
          <div className="flex items-center flex-1 space-x-2">
            <span>Delivery</span>
            <div
              onClick={() => handleToggleDeliveryOrder(!isOrder)}
              className={`relative inline-flex items-center h-6 w-12 cursor-pointer rounded-full transition-colors duration-300 ${
                isOrder ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <span
                className={`inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-300 ${
                  isOrder ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
            <span>Order</span>
          </div>
          {/* Date Picker */}
          <div className="flex items-center flex-1 space-x-2">
            <CalendarIcon className="h-5 w-5 text-gray-700" />
            <input
              type="date"
              value={date ? format(date, "yyyy-MM-dd") : ""}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="p-2 border rounded w-full"
            />
          </div>

          {/* Shift Dropdown */}
          {!isOrder && (
            <div className="flex-1">
              <Select value={shift} onValueChange={setShift}>
                <SelectTrigger className="w-full bg-white border rounded">
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
            </div>
          )}

          {/* Status Dropdown */}
          <div className="flex-1">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full bg-white border rounded">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg rounded border mt-2">
                <SelectItem value="all" className="hover:bg-gray-100 p-2">
                  All Statuses
                </SelectItem>
                <SelectItem value="pending" className="hover:bg-gray-100 p-2">
                  Pending
                </SelectItem>
                <SelectItem
                  value="isAssigned"
                  className="hover:bg-gray-100 p-2"
                >
                  Is Assigned
                </SelectItem>
                <SelectItem
                  value="outForDelivery"
                  className="hover:bg-gray-100 p-2"
                >
                  Out For Delivery
                </SelectItem>
                <SelectItem value="done" className="hover:bg-gray-100 p-2">
                  Done
                </SelectItem>
                <SelectItem
                  value="unexpected"
                  className="hover:bg-gray-100 p-2"
                >
                  Unexpected
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Group by Address Toggle */}
          <div className="flex items-center flex-1 space-x-2">
            <span>Group by Address</span>
            <div
              onClick={() => handleToggleGroupByAddress(!isGroupedByAddress)}
              className={`relative inline-flex items-center h-6 w-12 cursor-pointer rounded-full transition-colors duration-300 ${
                isGroupedByAddress ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <span
                className={`inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-300 ${
                  isGroupedByAddress ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={applyFilters}
            className="p-2 bg-blue-500 text-white rounded shadow"
          >
            Apply Filters
          </button>
        </div>

        {/* Hello */}
      </div>

      {/* ... Filter UI setup ... */}

      {/* Table UI here */}
      {/* Table to display currentItems based on pagination */}
      <div className="bg-white p-4 rounded-lg shadow">
        {/* Assign Orders Button */}
        {/* Assign Orders Button */}
        <Button
          onClick={handleAssignOrders}
          disabled={selectedRows.length === 0}
          className={`mb-2 ${
            selectedRows.length > 0
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-200"
          } text-white font-bold py-2 px-4 rounded`}
        >
          Assign Orders
        </Button>

        {/* Modal for assigning delivery boys */}
        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" />
            <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                Assign Delivery Boy
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {console.log(deliveryBoys)}
                {/* Assuming deliveryBoys is fetched elsewhere and set in state */}
                {deliveryBoys.map((boy) => {
                  console.log(boy);
                  return (
                    <DeliveryBoyCard
                      key={boy.id}
                      deliveryBoy={boy}
                      onSelect={() => assignDeliveryBoy(boy.id)}
                    />
                  );
                })}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeAssignModal}
                  className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead as="th">Select/Status</TableHead>
              <TableHead as="th">Address</TableHead>
              <TableHead as="th">Mobile No</TableHead>
              <TableHead as="th">Order Date</TableHead>
              <TableHead as="th">Status</TableHead>
              <TableHead as="th">Shift</TableHead>
              <TableHead as="th">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {order.status === "pending" ? (
                    <Checkbox
                      checked={selectedRows.includes(order.id)}
                      onCheckedChange={() => handleRowSelection(order.id)}
                    />
                  ) : (
                    <span className="icon">
                      {order.status === "isAssigned" && <UserCheck />}
                      {order.status === "outForDelivery" && <Truck />}
                      {order.status === "done" && <CheckCircle />}
                      {order.status === "unexpected" && <AlertTriangle />}
                    </span>
                  )}
                </TableCell>
                <TableCell>{order.address.address}</TableCell>
                <TableCell>{order.mobile_no}</TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{statusFormat[order.status]}</TableCell>
                <TableCell>{order.shift}</TableCell>
                <TableCell>₹ {(+order.totalAmount).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ... Table setup ... */}

      {/* Pagination and other controls */}
      <div className="flex justify-between items-center mt-4 p-4">
        <div>
          {selectedRows.length} of {orders.length} rows selected
        </div>
        <div className="flex items-center gap-2">
          {/* Page size selector */}
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(parseInt(value))}
          >
            <SelectTrigger>{itemsPerPage} per page</SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          {/* Pagination buttons */}
          <div className="flex items-center">
            <Button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeftIcon className="w-5 h-5" />
            </Button>
            <Button
              onClick={() =>
                setCurrentPage((current) => Math.max(1, current - 1))
              }
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Button>
            <span className="w-24">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      {/* ... Pagination setup ... */}

      {/* Dialog for assigning delivery box */}
      {/* Assuming Dialog, DialogContent, etc. are correctly imported */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* Dialog content here */}
      </Dialog>
    </div>
  );
}

export default OrderDetails;
