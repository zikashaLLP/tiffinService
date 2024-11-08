import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { Dialog } from "./ui/dialog";
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

const orders = [
  {
    id: 1,
    name: "John Doe",
    mobile: "123-456-7890",
    address: "123 Main St",
    status: "Pending",
    assignedTo: "Agent 1",
  },
  {
    id: 2,
    name: "Jane Smith",
    mobile: "098-765-4321",
    address: "456 Elm St",
    status: "Completed",
    assignedTo: "Agent 2",
  },
  {
    id: 3,
    name: "Bob Johnson",
    mobile: "555-555-5555",
    address: "789 Oak St",
    status: "In Progress",
    assignedTo: "Agent 3",
  },
  {
    id: 4,
    name: "Alice Brown",
    mobile: "123-111-7890",
    address: "124 Main St",
    status: "Pending",
    assignedTo: "Agent 4",
  },
  {
    id: 5,
    name: "Charlie Green",
    mobile: "123-456-7891",
    address: "125 Main St",
    status: "Completed",
    assignedTo: "Agent 5",
  },
  {
    id: 6,
    name: "Diana White",
    mobile: "123-456-7892",
    address: "126 Main St",
    status: "In Progress",
    assignedTo: "Agent 1",
  },
  {
    id: 7,
    name: "Eve Black",
    mobile: "123-456-7893",
    address: "127 Main St",
    status: "Pending",
    assignedTo: "Agent 2",
  },
  {
    id: 8,
    name: "Frank Harris",
    mobile: "123-456-7894",
    address: "128 Main St",
    status: "Completed",
    assignedTo: "Agent 3",
  },
  {
    id: 9,
    name: "Grace Lee",
    mobile: "123-456-7895",
    address: "129 Main St",
    status: "In Progress",
    assignedTo: "Agent 4",
  },
  {
    id: 10,
    name: "Hank Walker",
    mobile: "123-456-7896",
    address: "130 Main St",
    status: "Pending",
    assignedTo: "Agent 5",
  },
  {
    id: 11,
    name: "Ivy Young",
    mobile: "123-456-7897",
    address: "131 Main St",
    status: "Completed",
    assignedTo: "Agent 1",
  },
  {
    id: 12,
    name: "Jack King",
    mobile: "123-456-7898",
    address: "132 Main St",
    status: "In Progress",
    assignedTo: "Agent 2",
  },
  {
    id: 13,
    name: "Karen Scott",
    mobile: "123-456-7899",
    address: "133 Main St",
    status: "Pending",
    assignedTo: "Agent 3",
  },
  {
    id: 14,
    name: "Leo Adams",
    mobile: "223-456-7890",
    address: "134 Main St",
    status: "Completed",
    assignedTo: "Agent 4",
  },
  {
    id: 15,
    name: "Mia Martinez",
    mobile: "323-456-7890",
    address: "135 Main St",
    status: "In Progress",
    assignedTo: "Agent 5",
  },
  {
    id: 16,
    name: "Nina Thomas",
    mobile: "423-456-7890",
    address: "136 Main St",
    status: "Pending",
    assignedTo: "Agent 1",
  },
  {
    id: 17,
    name: "Oscar Wilson",
    mobile: "523-456-7890",
    address: "137 Main St",
    status: "Completed",
    assignedTo: "Agent 2",
  },
  {
    id: 18,
    name: "Paula Clark",
    mobile: "623-456-7890",
    address: "138 Main St",
    status: "In Progress",
    assignedTo: "Agent 3",
  },
  {
    id: 19,
    name: "Quincy Robinson",
    mobile: "723-456-7890",
    address: "139 Main St",
    status: "Pending",
    assignedTo: "Agent 4",
  },
  {
    id: 20,
    name: "Rachel Lewis",
    mobile: "823-456-7890",
    address: "140 Main St",
    status: "Completed",
    assignedTo: "Agent 5",
  },
  {
    id: 21,
    name: "Steve Walker",
    mobile: "123-556-7890",
    address: "141 Main St",
    status: "In Progress",
    assignedTo: "Agent 1",
  },
  {
    id: 22,
    name: "Tom Hall",
    mobile: "223-456-7990",
    address: "142 Main St",
    status: "Pending",
    assignedTo: "Agent 2",
  },
  {
    id: 23,
    name: "Uma Bell",
    mobile: "323-456-7090",
    address: "143 Main St",
    status: "Completed",
    assignedTo: "Agent 3",
  },
  {
    id: 24,
    name: "Victor Perez",
    mobile: "423-456-7190",
    address: "144 Main St",
    status: "In Progress",
    assignedTo: "Agent 4",
  },
  {
    id: 25,
    name: "Wendy Cox",
    mobile: "523-456-7290",
    address: "145 Main St",
    status: "Pending",
    assignedTo: "Agent 5",
  },
];

function OrderDetails() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isGroupedByAddress, setIsGroupedByAddress] = useState(true);

  // Filters state
  const [date, setDate] = useState();
  const [shift, setShift] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const dateParam = searchParams.get("date");
    const shiftParam = searchParams.get("shift");
    const statusParam = searchParams.get("status");

    setDate(dateParam ? new Date(dateParam) : undefined);
    setShift(shiftParam || "");
    setStatus(statusParam || "");
  }, [searchParams]);

  const applyFilters = () => {
    const params = {};
    if (date) params.date = date.toISOString();
    if (shift) params.shift = shift;
    if (status) params.status = status;

    setSearchParams(params);
  };

  const handleRowSelection = (id) => {
    setSelectedRows(
      selectedRows.includes(id)
        ? selectedRows.filter((x) => x !== id)
        : [...selectedRows, id]
    );
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const currentItems = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  return (
    <div className="container mx-auto p-10 h-screen overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      {/* Filters UI here */}
      <div className="bg-white p-4 rounded-lg mb-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Filters</h2>
        <div className="flex items-center justify-start gap-8 overflow-x-auto">
          {/* Date Picker */}
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-700" />
            <input
              type="date"
              value={date ? format(date, "yyyy-MM-dd") : ""}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="p-2 border rounded w-[150px]" // Controlled width
            />
          </div>

          {/* Shift Dropdown with controlled width */}
          <Select value={shift} onValueChange={setShift}>
            <SelectTrigger className="w-[150px] bg-white border rounded">
              {" "}
              <SelectValue placeholder="Select Shift" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded border mt-2">
              {" "}
              <SelectItem value="lunch" className="hover:bg-gray-100 p-2">
                Lunch
              </SelectItem>
              <SelectItem value="dinner" className="hover:bg-gray-100 p-2">
                Dinner
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Status Dropdown with controlled width */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[150px] bg-white border rounded">
              {" "}
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded border mt-2">
              {" "}
              <SelectItem value="all" className="hover:bg-gray-100 p-2">
                All Statuses
              </SelectItem>
              <SelectItem value="pending" className="hover:bg-gray-100 p-2">
                Pending
              </SelectItem>
              <SelectItem value="in-progress" className="hover:bg-gray-100 p-2">
                In Progress
              </SelectItem>
              <SelectItem value="completed" className="hover:bg-gray-100 p-2">
                Completed
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Group by Address Toggle */}
          <label className="flex items-center space-x-4">
            <span>Group by Address</span>
            <div
              onClick={() => handleToggleGroupByAddress(!isGroupedByAddress)}
              className={`relative inline-flex items-center h-8 w-12 cursor-pointer rounded-full transition-colors duration-300 ${
                isGroupedByAddress ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <span
                className={`inline-block w-6 h-6 transform bg-white rounded-full shadow transition-transform duration-300 ${
                  isGroupedByAddress ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </label>

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
      <div className="bg-white p-4 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead as="th">Select</TableHead>
              <TableHead as="th">Name</TableHead>
              <TableHead as="th">Mobile</TableHead>
              <TableHead as="th">Address</TableHead>
              <TableHead as="th">Status</TableHead>
              <TableHead as="th">Assigned To</TableHead>
              {/* <TableHead as="th">Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(order.id)}
                    onCheckedChange={() => handleRowSelection(order.id)}
                  />
                </TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.mobile}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.assignedTo}</TableCell>
                {/* <TableCell>
                  <Button onClick={() => console.log("Updating", order)}>
                    Update
                  </Button>
                </TableCell> */}
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
