import axios from "axios";

const url = import.meta.env.VITE_API_URL;
// console.log(url);

export const loginService = async (login) => {
  console.log(url);
  return axios
    .post(url + "/api/admin/login", login)
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during login:", error);
      throw error; // Throw error for further handling if needed
    });
};

export const deliveryLoginService = async (login) => {
  return axios
    .post(url + "/api/deliveryboy/login", login)
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during login:", error);
      throw error; // Throw error for further handling if needed
    });
};
