// // src/utils/auth.js

// const token = () => localStorage.getItem("token");
// let isAuthenticated = token() !== null;
// let user = null;

// export const login = (type) => {
//   isAuthenticated = true;
//   user=type;
// };

// export const logout = () => {
//   isAuthenticated = false;
//   localStorage.removeItem("token");
//   user=null;
// };

// export const isLoggedIn = () => isAuthenticated || token() !== null;

// export const isAdmin = () => user === "admin";
// export const isDeliveryBoy = () => user === "deliveryBoy";

// src/utils/auth.js
const token = () => localStorage.getItem("token");
const role = () => localStorage.getItem("role");

const isAuthenticated = () => token() !== null;
export const isAuthorized = (allowedRoles) => isAuthenticated() && allowedRoles.includes(role());

export const login = (token, userRole) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", userRole);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const isLoggedIn = () => isAuthenticated();
export const isRole = (roleName) => isAuthenticated() && role() === roleName;

