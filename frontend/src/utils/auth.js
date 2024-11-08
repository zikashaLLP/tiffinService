// src/utils/auth.js

const token = () => localStorage.getItem("token");
let isAuthenticated = token() !== null;
let user = null;

export const login = (type) => {
  isAuthenticated = true;
  user=type;
};

export const logout = () => {
  isAuthenticated = false;
  localStorage.removeItem("token");
  user=null;
};

export const isLoggedIn = () => isAuthenticated || token() !== null;

export const isAdmin = () => user === "admin";
export const isDeliveryBoy = () => user === "deliveryBoy";
