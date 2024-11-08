import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { getMenu } from "@/services/admin";
import Menu from "./Menu";
import { useToast } from "@/hooks/use-toast";

export default function MenuDetails() {
  // Get today's date and calculate the next two days
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const [availableMenus, setAvailableMenus] = useState([]);
  const [todayMenu, setTodayMenu] = useState([]);
  const [tomorrowMenus, setTomorrowMenus] = useState([]);
  const [dayAfterTomorrowMenus, setDayAfterTomorrowMenus] = useState([]);

  const [flag, setFlag] = useState(false);

  const { toast } = useToast();

  // Format the dates as needed (e.g., "MM/dd/yyyy")
  const formatDate = (date) => format(date, "MMMM dd, yyyy");

  useEffect(() => {
    // You can add any additional logic here if needed
    setIsLoading(true);
    getMenu()
      .then((res) => {
        //   console.log(res);
        setAvailableMenus(res.menus);
        setTodayMenu(
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
      .catch((err) => {
        //   console.log(err);
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          toast({
            title: "Session Expired",
            description: "Please Login Again.",
            variant: "destructive",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [flag]);

  return (
    <div className="container mx-auto p-10 h-screen overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Menu Details</h1>
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="flex gap-4">
          <TabsTrigger
            value="today"
            className="flex-1 text-center p-3 border hover:bg-gray-100 data-[state=active]:bg-gray-800 data-[state=active]:text-white"
          >
            {formatDate(today)}
            <span className="ms-2 text-xs font-semibold text-red-500">
              (Today)
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="tomorrow"
            className="flex-1 text-center p-3 border hover:bg-gray-100 data-[state=active]:bg-gray-800 data-[state=active]:text-white"
          >
            {formatDate(tomorrow)}{" "}
            <span className="ms-2 text-xs font-semibold text-red-500">
              (Tomorrow)
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="dayAfterTomorrow"
            className="flex-1 text-center p-3 border hover:bg-gray-100 data-[state=active]:bg-gray-800 data-[state=active]:text-white"
          >
            {formatDate(dayAfterTomorrow)}
            <span className="ms-2 text-xs font-semibold text-red-500">
              (Day after tomorrow)
            </span>
          </TabsTrigger>
        </TabsList>
        {/* <hr/> */}
        <TabsContent value="today" className="mt-4">
          {isLoading ? (
            <p>Loading today's menu...</p>
          ) : (
            <Menu menu={todayMenu} date={today} setFlag={setFlag} />
          )}
        </TabsContent>
        <TabsContent value="tomorrow" className="mt-4">
          {isLoading ? (
            <p>Loading tomorrow's menu...</p>
          ) : (
            <Menu menu={tomorrowMenus} date={tomorrow} setFlag={setFlag} />
          )}
        </TabsContent>
        <TabsContent value="dayAfterTomorrow" className="mt-4">
          {isLoading ? (
            <p>Loading day after tomorrow's menu...</p>
          ) : (
            <Menu
              menu={dayAfterTomorrowMenus}
              date={dayAfterTomorrow}
              setFlag={setFlag}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
