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

export const getMyOrder = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return axios
    .post(url + `/api/user/orders/details`, data, config)
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during fetching orders:", error);
      throw error; // Throw error for further handling if needed
    });
};

export const initiatePayment = async (paymentInfo) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return axios
    .post(url + `/api/user/payment/initiate`, paymentInfo, config)
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during fetching orders:", error);
      throw error; // Throw error for further handling if needed
    });
};

export const verifyPayment = async (merchantTransactionId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return axios
    .post(url + `/api/user/payment/status`, { merchantTransactionId }, config)
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during fetching orders:", error);
      throw error; // Throw error for further handling if needed
    });
};
