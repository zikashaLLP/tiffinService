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
      
      <Tabs defaultValue="today" className="max-w-xll">
        <TabsList className="grid w-full grid-cols-3 gap-3 bg-white h-auto p-2">
          <TabsTrigger
            value="today"
            className="py-2 px-2 d-flex flex-wrap hover:bg-gray-100 data-[state=active]:bg-black data-[state=active]:text-white"
          >
            {formatDate(today)}
            <span className="ms-2 text-xs">
              (Today)
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="tomorrow"
            className="py-2 px-2 d-flex flex-wrap hover:bg-gray-100 data-[state=active]:bg-black data-[state=active]:text-white"
          >
            {formatDate(tomorrow)}{" "}
            <span className="ms-2 text-xs">
              (Tomorrow)
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="dayAfterTomorrow"
            className="py-2 px-2 d-flex flex-wrap hover:bg-gray-100 data-[state=active]:bg-black data-[state=active]:text-white"
          >
            {formatDate(dayAfterTomorrow)}
            <span className="ms-2 text-xs">
              (Day after tomorrow)
            </span>
          </TabsTrigger>
        </TabsList>
        {/* <hr/> */}
        <TabsContent value="today">
          {isLoading ? (
            <p>Loading today's menu...</p>
          ) : (
            <Menu menu={todayMenu} date={today} setFlag={setFlag} />
          )}
        </TabsContent>
        <TabsContent value="tomorrow">
          {isLoading ? (
            <p>Loading tomorrow's menu...</p>
          ) : (
            <Menu menu={tomorrowMenus} date={tomorrow} setFlag={setFlag} />
          )}
        </TabsContent>
        <TabsContent value="dayAfterTomorrow">
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
