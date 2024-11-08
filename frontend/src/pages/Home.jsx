import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { getMenu } from "@/services/user";
import { ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [todayMenus, setTodayMenus] = useState([]);
  const [tomorrowMenus, setTomorrowMenus] = useState([]);
  const [dayAfterTomorrowMenus, setDayAfterTomorrowMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("Today");
  const [isLunch, setIsLunch] = useState(true); // State for controlling Lunch/Dinner switch
  const navigate = useNavigate();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  useEffect(() => {
    getMenu()
      .then((res) => {
        setMenus(res.menus);
        setTodayMenus(
          res.menus.filter(
            (menu) => formatDate(menu.date) === formatDate(today)
          )
        );
        setTomorrowMenus(
          res.menus.filter(
            (menu) => formatDate(menu.date) === formatDate(tomorrow)
          )
        );
        setDayAfterTomorrowMenus(
          res.menus.filter(
            (menu) => formatDate(menu.date) === formatDate(dayAfterTomorrow)
          )
        );
      })
      .catch((err) => console.error("Error fetching menus:", err));
  }, []);

  useEffect(() => {
    setCart([]); // Reset cart when activeTab changes
  }, [activeTab]);

  const formatDate = (date) => format(new Date(date), "MMMM dd, yyyy");

  const handleAddToCart = (menuId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.menu_id === menuId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.menu_id === menuId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { menu_id: menuId, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (menuId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.menu_id === menuId);
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.menu_id !== menuId);
      } else {
        return prevCart.map((item) =>
          item.menu_id === menuId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const getQuantity = (menuId) => {
    const cartItem = cart.find((item) => item.menu_id === menuId);
    return cartItem ? cartItem.quantity : 0;
  };

  const renderMenuSection = (menus) => (
    <section className="mb-8">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {menus.map(
          (menu) =>
            ((isLunch && menu.shift === "Lunch") ||
              (!isLunch && menu.shift === "Dinner")) ? (
              <Card
                key={menu.id}
                className="min-w-[250px] shadow-md hover:shadow-lg transition-shadow flex flex-col relative"
              >
                <div
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    menu.shift === "Lunch" ? "bg-green-500" : "bg-blue-500"
                  }`}
                >
                  {menu.shift}
                </div>

                {menu.photo_url ? (
                  <img
                    src={menu.photo_url}
                    alt={menu.variant}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-lg">
                    <span className="text-gray-500">Image Unavailable</span>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    {menu.variant}
                  </CardTitle>
                  <p
                    className={`text-sm font-semibold ${
                      menu.status === "Available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {menu.status}
                  </p>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-gray-600 text-xs">{menu.description}</p>
                  <Separator />
                  <p className="font-semibold">Items:</p>
                  <p className="text-gray-700">
                    {menu.menu_items.join(", ")}
                    <span className="font-semibold mt-2 block">
                      ₹{parseFloat(menu.price).toFixed(2)}
                    </span>
                  </p>
                </CardContent>

                <CardFooter className="pt-4">
                  {getQuantity(menu.id) > 0 ? (
                    <div className="flex items-center justify-between w-full">
                      <Button
                        className="bg-red-500 text-white w-8 h-8 flex items-center justify-center"
                        onClick={() => handleRemoveFromCart(menu.id)}
                      >
                        -
                      </Button>
                      <span className="text-lg font-semibold">
                        {getQuantity(menu.id)}
                      </span>
                      <Button
                        className="bg-green-500 text-white w-8 h-8 flex items-center justify-center"
                        onClick={() => handleAddToCart(menu.id)}
                      >
                        +
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-teal-500 text-white hover:bg-teal-600"
                      onClick={() => handleAddToCart(menu.id)}
                    >
                      Add
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ) : <p className=" w-full text-center">No Menu Available</p>
        )}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-2xl font-bold mb-6 text-center">Available Menus</h2>

        {/* Tabs for Today, Tomorrow, and Day After Tomorrow */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            className={`${
              activeTab === "Today" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("Today")}
          >
            Today
          </Button>
          <Button
            className={`${
              activeTab === "Tomorrow"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("Tomorrow")}
          >
            Tomorrow
          </Button>
          <Button
            className={`${
              activeTab === "DayAfterTomorrow"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("DayAfterTomorrow")}
          >
            Day After Tomorrow
          </Button>
        </div>

        {/* Lunch/Dinner Switch */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Label className="text-lg font-semibold">Lunch</Label>
          <div
            className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors duration-300 ${
              isLunch ? "bg-gray-300" : "bg-blue-500"
            }`}
          >
            <Switch
              checked={!isLunch}
              onCheckedChange={(checked) => setIsLunch(!checked)}
              className="opacity-0 absolute inset-0" // Hide the default switch input
            />
            <span
              className={`absolute left-1 transform rounded-full bg-white w-5 h-5 transition-transform duration-300 ease-in-out ${
                isLunch ? "translate-x-0" : "translate-x-6"
              }`}
            />
          </div>
          <Label className="text-lg font-semibold">Dinner</Label>
        </div>

        {/* Render Menus Based on Active Tab */}
        {activeTab === "Today" && renderMenuSection(todayMenus)}
        {activeTab === "Tomorrow" && renderMenuSection(tomorrowMenus)}
        {activeTab === "DayAfterTomorrow" &&
          renderMenuSection(dayAfterTomorrowMenus)}
      </main>

      {/* Floating Button for Checkout */}
      {cart.length > 0 && (
        <Button
          className="fixed bottom-8 right-8 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 p-4"
          onClick={() => navigate("/checkout", { state: { cart } })}
        >
          <ShoppingCart className="w-6 h-6" /> Order Now
        </Button>
      )}

      <Footer />
    </div>
  );
};

export default Home;
