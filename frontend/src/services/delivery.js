import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const getOrders = async (mobile, params) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
    params
  };
  return axios
    .get(url + `/api/deliveryboy/${mobile}/orders`, config)
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during Fetching Menus:", error);
      throw error; // Throw error for further handling if needed
    });
};

export const markAsDelivered = async (orderId, updatedStatus) => {
    const t = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${t}`,
      }
    };
    return axios
      .put(url + `/api/deliveryboy/order/status`,{orderId, status:updatedStatus}, config)
      .then((response) => {
        // Handle successful response
        return response.data; // Return data if needed
      })
      .catch((error) => {
        // Handle error
        console.error("Error occurred during Fetching Menus:", error);
        throw error; // Throw error for further handling if needed
      });
  };