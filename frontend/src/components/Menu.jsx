import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash,
  Loader as LoaderIcon,
  Image as ImageIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { addMenu, updateMenu } from "@/services/admin";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { handleUpload } from "@/services/upload";

export default function Menu({ menu, date, setFlag }) {
  // console.log(date);
  const [menuData, setMenuData] = useState(menu.length > 0 ? menu : []);
  const [newMenuItem, setNewMenuItem] = useState("");
  const [selectedShift, setSelectedShift] = useState("Lunch");
  const [editingMenuId, setEditingMenuId] = useState(null);
  const [RealeditingMenuId, setRealEditingMenuId] = useState(null);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();
  const [loader, setloader] = useState(false);

  const [lunchData, setLunchData] = useState(
    menuData.filter((m) => m.shift === "Lunch")
  );
  const [dinnerData, setDinnerData] = useState(
    menuData.filter((m) => m.shift === "Dinner")
  );

  //   useEffect(() => {
  //     setFlag(f=>!f)
  //   }, [])

  const validateForm = (menu) => {
    const newErrors = {};
    if (!menu.variant) newErrors.variant = "Variant is required";
    if (!menu.description) newErrors.description = "Description is required";
    if (!menu.price || isNaN(menu.price) || menu.price <= 0)
      newErrors.price = "Valid price is required";
    if (!menu.status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMenuItem = (index) => {
    if (selectedShift === "Lunch") {
      const updatedMenu = [...lunchData];
      updatedMenu[index].menu_items = [
        ...updatedMenu[index].menu_items,
        newMenuItem,
      ];
      setLunchData(updatedMenu);
      setNewMenuItem("");
    } else {
      const updatedMenu = [...dinnerData];
      updatedMenu[index].menu_items = [
        ...updatedMenu[index].menu_items,
        newMenuItem,
      ];
      setDinnerData(updatedMenu);
      setNewMenuItem("");
    }
  };

  const handleInputChange = (index, field, value) => {
    if (selectedShift === "Lunch") {
      console.log(value);
      const updatedLunchData = [...lunchData];
      updatedLunchData[index][field] = value;
      setLunchData(updatedLunchData);
      // Update menuData to keep it in sync
      setMenuData([...updatedLunchData, ...dinnerData]);
    } else {
      const updatedDinnerData = [...dinnerData];
      updatedDinnerData[index][field] = value;
      setDinnerData(updatedDinnerData);
      // Update menuData to keep it in sync
      setMenuData([...lunchData, ...updatedDinnerData]);
    }
  };

  const handleImageUpload = async (e, menuIndex) => {
    const file = e.target.files[0];
    if (file) {
      setloader(true);
      handleUpload(e).then((resp) => {
        const updatedMenu =
          selectedShift === "Lunch" ? [...lunchData] : [...dinnerData];
        // console.log(updatedMenu[menuIndex]);
        // console.log(resp.data.fileLink);
        updatedMenu[menuIndex].photo_url = resp.data.fileLink;
        selectedShift === "Lunch"
          ? setLunchData(updatedMenu)
          : setDinnerData(updatedMenu);
        setloader(false);
      });
    }
  };

  const handleAddMenu = () => {
    // console.log(date.toISOString());
    const newMenu = {
      id: Date.now().toString(),
      date: new Date(date.getTime() + 5.5 * 60 * 60 * 1000).toISOString().split("T")[0],
      isPublished: true,
      shift: selectedShift,
      variant: "",
      description: "",
      menu_items: [],
      price: "",
      status: "",
      photo_url: "",
    };
    if (selectedShift === "Lunch") {
      setLunchData([...lunchData, newMenu]);
    } else {
      setDinnerData([...dinnerData, newMenu]);
    }
    setMenuData([...menuData, newMenu]);
    setEditingMenuId(newMenu.id); // Set editing mode to the new menu
  };

  const handleDiscardChanges = () => {
    setEditingMenuId(null);
    if(selectedShift=='Lunch'){
    setLunchData(l=>l.filter(k=>k.id!==editingMenuId))
    }else{
    setDinnerData(l=>l.filter(k=>k.id!==editingMenuId))
    }
    // setMenuData(menu.length > 0 ? menu : []);
    setErrors({});
  };

  const handleUpdateChanges = (menuIndex) => {
    // console.log(menuIndex);
    const menuToSave =
      selectedShift === "Lunch" ? lunchData[menuIndex] : dinnerData[menuIndex];
    // console.log(menuToSave);
    if (validateForm(menuToSave)) {
      const { id, ...rest } = menuToSave;
      updateMenu(rest, id)
        .then((resp) => {
          console.log(resp);
          toast({
            title: "Menu Updated",
            description: "Menu has been updated successfully.",
            variant: "default",
          });
          setRealEditingMenuId(null);
          setFlag((f) => !f);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("Saved menu:", menuToSave); // Log the saved menu
      setEditingMenuId(null);
    }
  };

  const handleSaveChanges = (menuIndex) => {
    // console.log(menuIndex);
    const menuToSave =
      selectedShift === "Lunch" ? lunchData[menuIndex] : dinnerData[menuIndex];
    // console.log(menuToSave);
    if (validateForm(menuToSave)) {
      const { id, ...rest } = menuToSave;
      addMenu([rest])
        .then((resp) => {
          console.log(resp);
          toast({
            title: "Menu Saved",
            description: "Menu has been saved successfully.",
            variant: "default",
          });
          setFlag((f) => !f);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("Saved menu:", menuToSave); // Log the saved menu
      setEditingMenuId(null);
    }
  };

  const formatDate = (date) => format(date, "MMMM dd, yyyy");
  const handleRemoveMenuItem = (menuIndex, menuItemIndex) => {
    if (selectedShift === "Lunch") {
      const updatedMenu = [...lunchData];
      updatedMenu[menuIndex].menu_items.splice(menuItemIndex, 1);
      setLunchData(updatedMenu);
    } else {
      const updatedMenu = [...dinnerData];
      updatedMenu[menuIndex].menu_items.splice(menuItemIndex, 1);
      setDinnerData(updatedMenu);
    }
  };

  const renderMenuForm = (menuIndex, selectedShift) => (
    <>
      {selectedShift === "Lunch" && (
        <Card key={menuIndex} className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Add Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={lunchData[menuIndex].date}
                    disabled
                  />
                </div>
                <div className="flex-1">
                  <Label>Shift</Label>
                  <Input value={selectedShift} disabled />
                </div>
                <div className="flex-1">
                  <Label>Variant</Label>
                  <Select
                    value={lunchData[menuIndex].variant}
                    onValueChange={(value) =>
                      handleInputChange(menuIndex, "variant", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Variant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-Dish">Full-Dish</SelectItem>
                      <SelectItem value="Half-Dish">Half-Dish</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.variant && (
                    <p className="text-red-500 text-sm">{errors.variant}</p>
                  )}
                </div>
              </div>

              <Label>Description</Label>
              <textarea
                placeholder="Description"
                value={lunchData[menuIndex].description}
                onChange={(e) =>
                  handleInputChange(menuIndex, "description", e.target.value)
                }
                className="w-full p-2 border rounded"
                rows={3}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}

              <div className="flex space-x-4">
                {/* Image Upload */}
                <div className="flex space-x-4 items-center">
                  <div className="flex-1">
                    <Label>Upload Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, menuIndex)}
                    />
                    {loader && (
                      <LoaderIcon className="animate-spin w-4 h-4 ml-2" />
                    )}
                  </div>
                  {lunchData[menuIndex].photo_url && (
                    <img
                      src={lunchData[menuIndex].photo_url}
                      alt="Menu Preview"
                      className="w-16 h-16 rounded-lg border"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={lunchData[menuIndex].price}
                    onChange={(e) =>
                      handleInputChange(menuIndex, "price", e.target.value)
                    }
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
                </div>

                <div className="flex-1">
                  <Label>Status</Label>
                  <Select
                    value={lunchData[menuIndex].status}
                    onValueChange={(value) =>
                      handleInputChange(menuIndex, "status", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-red-500 text-sm">{errors.status}</p>
                  )}
                </div>
              </div>

              <Label>Menu Items</Label>
              {lunchData[menuIndex].menu_items.map(
                (menuItem, menuItemIndex) => (
                  <div
                    key={menuItemIndex}
                    className="flex items-center space-x-2"
                  >
                    <Input value={menuItem} readOnly className="flex-grow" />
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-600 border-red-600 hover:bg-red-100"
                      onClick={() =>
                        handleRemoveMenuItem(menuIndex, menuItemIndex)
                      }
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                )
              )}

              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add a new menu item"
                  value={newMenuItem}
                  onChange={(e) => setNewMenuItem(e.target.value)}
                />
                <Button
                  className="bg-green-500 text-white hover:bg-green-600"
                  onClick={() => handleAddMenuItem(menuIndex)}
                  disabled={!newMenuItem.trim()}
                >
                  <Plus size={16} />
                </Button>
              </div>

              <Separator className="my-4" />
              <div className="flex space-x-2">
                {RealeditingMenuId === null && (
                  <Button
                    className="bg-blue-500 text-white hover:bg-blue-600 flex items-center"
                    onClick={() => handleSaveChanges(menuIndex)}
                    disabled={loader} // Disable button when loading
                  >
                    {loader ? (
                      <LoaderIcon className="animate-spin w-4 h-4 mr-2" /> // Add spinner icon
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                )}
                {RealeditingMenuId !== null && (
                  <Button
                    className="bg-yellow-500 text-white hover:bg-yellow-600 flex items-center"
                    onClick={() => handleUpdateChanges(menuIndex)}
                    disabled={loader} // Disable button when loading
                  >
                    {loader ? (
                      <LoaderIcon className="animate-spin w-4 h-4 mr-2" /> // Add spinner icon
                    ) : (
                      "Update Changes"
                    )}
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="text-gray-600 border-gray-600 hover:bg-gray-100"
                  onClick={handleDiscardChanges}
                >
                  Discard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {selectedShift === "Dinner" && (
        <Card key={menuIndex} className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Add Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={dinnerData[menuIndex].date}
                    disabled
                  />
                </div>
                <div className="flex-1">
                  <Label>Shift</Label>
                  <Input value={selectedShift} disabled />
                </div>
                <div className="flex-1">
                  <Label>Variant</Label>
                  <Select
                    value={dinnerData[menuIndex].variant}
                    onValueChange={(value) =>
                      handleInputChange(menuIndex, "variant", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Variant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-Dish">Full-Dish</SelectItem>
                      <SelectItem value="Half-Dish">Half-Dish</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.variant && (
                    <p className="text-red-500 text-sm">{errors.variant}</p>
                  )}
                </div>
              </div>

              <Label>Description</Label>
              <textarea
                placeholder="Description"
                value={dinnerData[menuIndex].description}
                onChange={(e) =>
                  handleInputChange(menuIndex, "description", e.target.value)
                }
                className="w-full p-2 border rounded"
                rows={3}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}

              <div className="flex space-x-4">
                {/* Image Upload */}
                <div className="flex space-x-4 items-center">
                  <div className="flex-1">
                    <Label>Upload Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, menuIndex)}
                    />
                    {loader && (
                      <LoaderIcon className="animate-spin w-4 h-4 ml-2" />
                    )}
                  </div>
                  {dinnerData[menuIndex].photo_url && (
                    <img
                      src={dinnerData[menuIndex].photo_url}
                      alt="Menu Preview"
                      className="w-16 h-16 rounded-lg border"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={dinnerData[menuIndex].price}
                    onChange={(e) =>
                      handleInputChange(menuIndex, "price", e.target.value)
                    }
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
                </div>

                <div className="flex-1">
                  <Label>Status</Label>
                  <Select
                    value={dinnerData[menuIndex].status}
                    onValueChange={(value) =>
                      handleInputChange(menuIndex, "status", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-red-500 text-sm">{errors.status}</p>
                  )}
                </div>
              </div>

              <Label>Menu Items</Label>
              {dinnerData[menuIndex].menu_items.map(
                (menuItem, menuItemIndex) => (
                  <div
                    key={menuItemIndex}
                    className="flex items-center space-x-2"
                  >
                    <Input value={menuItem} readOnly className="flex-grow" />
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-600 border-red-600 hover:bg-red-100"
                      onClick={() =>
                        handleRemoveMenuItem(menuIndex, menuItemIndex)
                      }
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                )
              )}

              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add a new menu item"
                  value={newMenuItem}
                  onChange={(e) => setNewMenuItem(e.target.value)}
                />
                <Button
                  className="bg-green-500 text-white hover:bg-green-600"
                  onClick={() => handleAddMenuItem(menuIndex)}
                  disabled={!newMenuItem.trim()}
                >
                  <Plus size={16} />
                </Button>
              </div>

              <Separator className="my-4" />
              <div className="flex space-x-2">
                {RealeditingMenuId === null && (
                  <Button
                    className="bg-blue-500 text-white hover:bg-blue-600 flex items-center"
                    onClick={() => handleSaveChanges(menuIndex)}
                    disabled={loader} // Disable button when loading
                  >
                    {loader ? (
                      <LoaderIcon className="animate-spin w-4 h-4 mr-2" /> // Add spinner icon
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                )}
                {RealeditingMenuId !== null && (
                  <Button
                    className="bg-yellow-500 text-white hover:bg-yellow-600 flex items-center"
                    onClick={() => handleUpdateChanges(menuIndex)}
                    disabled={loader} // Disable button when loading
                  >
                    {loader ? (
                      <LoaderIcon className="animate-spin w-4 h-4 mr-2" /> // Add spinner icon
                    ) : (
                      "Update Changes"
                    )}
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="text-gray-600 border-gray-600 hover:bg-gray-100"
                  onClick={handleDiscardChanges}
                >
                  Discard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );

  const renderMenuCard = (item, index) => (
    <Card
      key={item.id}
      className="w-full max-w-2xl mx-auto mb-4 shadow-lg border border-gray-200 rounded-lg bg-white flex"
    >
      {/* Image Section */}
      <div className="w-1/3 p-4">
        <img
          src={item.photo_url}
          alt="Menu Item"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="w-2/3">
        <CardHeader className="p-4 border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-700">
            Menu for {formatDate(item.date)} - {item.shift}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <p>
            <span className="font-semibold text-gray-600">Variant:</span>{" "}
            {item.variant}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Description:</span>{" "}
            {item.description}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Price:</span> ₹
            {parseFloat(item.price).toFixed(2)}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Status:</span>{" "}
            {item.status}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Menu Items:</span>{" "}
            {item.menu_items.join(", ")}
          </p>
          <Separator className="my-4" />
          <div className="flex justify-end">
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition duration-200"
              onClick={() => {
                setEditingMenuId(item.id);
                setRealEditingMenuId(item.id);
              }}
            >
              Edit Menu
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );

  return (
    <div key={date} className="bg-white">
      <div className="flex flex-col gap-2 mb-4 p-4 h-full">
        <Label>Select Shift</Label>
        <Select
          value={selectedShift}
          onValueChange={(value) => {
            setSelectedShift(value);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Lunch">Lunch</SelectItem>
            <SelectItem value="Dinner">Dinner</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* {console.log(menuData)} */}
      {selectedShift === "Lunch" &&
        lunchData.length > 0 &&
        lunchData.map((item, index) =>
          editingMenuId === item.id
            ? renderMenuForm(index, selectedShift)
            : renderMenuCard(item, index)
        )}
      {selectedShift === "Dinner" &&
        dinnerData.length > 0 &&
        dinnerData.map((item, index) =>
          editingMenuId === item.id
            ? renderMenuForm(index, selectedShift)
            : renderMenuCard(item, index)
        )}
      <div className="w-full flex justify-center">
        <Button
          className="w-full max-w-3xl bg-neutral-900 text-white mt-4 mb-8"
          onClick={handleAddMenu}
          disabled={editingMenuId !== null} // Disable when in edit mode
        >
          Add Menu
        </Button>
      </div>
    </div>
  );
}
