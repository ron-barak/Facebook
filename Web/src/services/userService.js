import http from "./http";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

//---USER INFO BY ID---//
export const userInfoById = (userId) => {
  return http
    .get(`${apiUrl}/users/userParam/${userId}`)
    .then((resp) => resp.data);
};

//--- user info---//
export const userInfo = () => {
  return http.get(`${apiUrl}/users/me`).then((resp) => resp.data);
};

//--- UPDATR USER---//
export const updateUser = (user) => {
  const userId = user._id;
  delete user._id;
  return http.put(`${apiUrl}/users/${userId}`, user);
};

//--- ALL USERS---//
export const getAll = () => {
  return http.get(`${apiUrl}/users/all`).then((resp) => resp.data);
};

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch {
    return null;
  }
};

//--- LOGIN ---//
export const login = async (email, password) => {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
};

const service = {
  login,
  getCurrentUser,
  logout,
  getJwt,
  userInfo,
  getAll,
  updateUser,
  userInfoById,
};

export default service;
