import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const getMenu = async () => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };
  return axios
    .get(url + `/api/admin/menu`, config)
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

export const addMenu = async (menu) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };
  return axios
    .post(url + `/api/admin/menu`, menu, config)
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

export const updateMenu = async (menu, id) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };
  return axios
    .put(url + `/api/admin/menu/${id}`, menu, config)
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

