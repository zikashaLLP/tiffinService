import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast"; // Assuming toast notifications are used
import { Separator } from "@/components/ui/separator";
import { addOrder, getAddress } from "@/services/user";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const cart = location.state?.cart;

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getAddress().then((resp) => {
      setAddresses(resp.addresses);
    });
  }, []);

  // Redirect to home if the cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  // Sample addresses for the dropdown
  const sampleAddresses = [
    { id: 1, label: "123 Main St, Springfield" },
    { id: 2, label: "456 Elm St, Shelbyville" },
    { id: 3, label: "789 Oak St, Capital City" },
  ];

  // Form state
  const [form, setForm] = useState({
    address_id: "",
    mobile_no: "",
    note: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" })); // Clear error on change
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    if (!form.address_id) newErrors.address_id = "Please select an address.";
    if (!form.mobile_no || !/^\d{10}$/.test(form.mobile_no)) {
      newErrors.mobile_no = "Please enter a valid 10-digit mobile number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // console.log("Order Data:", form);
      const orderData = { ...form, menus:cart };
      // console.log("Submitting Order:", orderData);
      addOrder(orderData)
        .then((resp) => {
          console.log(resp);
          toast({
            title: "Order Submitted",
            description: "Your order has been placed successfully.",
            variant: "success",
          });
          
          navigate("/")
        })
        .catch((err) => {
          console.log(err);
        });

      // navigate("/confirmation"); // Navigate to confirmation page
    } else {
      toast({
        title: "Form Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg"
      >
        {/* Address Selection */}
        <div className="mb-4">
          <Label>Address</Label>
          <Select
            value={form.address_id}
            onValueChange={(value) => handleChange("address_id", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Address" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg rounded-md">
              {addresses.map((address) => (
                <SelectItem
                  key={address.id}
                  value={address.id.toString()}
                  className="hover:bg-gray-100" // Optional: adds hover effect
                >
                  {address.shortname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.address_id && (
            <p className="text-red-500 text-sm">{errors.address_id}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <Label>Mobile Number</Label>
          <Input
            type="text"
            placeholder="Enter your 10-digit mobile number"
            value={form.mobile_no}
            onChange={(e) => handleChange("mobile_no", e.target.value)}
          />
          {errors.mobile_no && (
            <p className="text-red-500 text-sm">{errors.mobile_no}</p>
          )}
        </div>

        {/* Note (Optional) */}
        <div className="mb-4">
          <Label>Note (Optional)</Label>
          <Input
            type="text"
            placeholder="Add a note for the delivery (optional)"
            value={form.note}
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </div>

        <Separator className="my-4" />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-teal-500 text-white hover:bg-teal-600"
        >
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
