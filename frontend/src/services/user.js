import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const getMenu = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return axios
    .get(url + `/api/user/menus`, config)
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

export const getAddress = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return axios
    .get(url + `/api/user/addresses`, config)
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

export const addOrder = async (order) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return axios
    .post(url + `/api/user/order`, order, config)
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during adding Menus:", error);
      throw error; // Throw error for further handling if needed
    });
};