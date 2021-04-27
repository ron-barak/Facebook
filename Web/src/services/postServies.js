import http from "./http";
import { apiUrl } from "../config.json";

//--- CREATE NEW POST---//
export const createPost = (post) => {
  return http.post(`${apiUrl}/posts`, post);
};

//--- ALL POSTS ---//
export const getAll = () => {
  return http.get(`${apiUrl}/posts/all`).then((resp) => resp.data);
};

//---MY POSTS---//
export const myPosts = () => {
  return http.get(`${apiUrl}/posts/my-posts`);
};

//--- DELETE---//
export const deletePost = (id) => {
  return http.delete(`${apiUrl}/posts/${id}`);
};

//---POST INFO---//
export const postInfo = (id) => {
  return http.get(`${apiUrl}/posts/${id}`);
};

//--- UPDATR POST---//
export const updatePost = (post) => {
  const postId = post._id;
  delete post._id;
  return http.put(`${apiUrl}/posts/${postId}`, post);
};

//--- TIME FUNCTIONS---//
export const timeConvert = (n) => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  var days = Math.floor(rhours / 24);
  var week = Math.floor(days / 7);
  return week
    ? week + "w "
    : days
    ? days + "d "
    : rhours
    ? rhours + " hrs "
    : rminutes + " mins ";
};
export const correctTime = (date) => {
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();
  date = dd + "/" + mm + "/" + yyyy;
  return date;
};

const service = {
  createPost,
  getAll,
  deletePost,
  updatePost,
  postInfo,
  myPosts,
  timeConvert,
  correctTime,
};

export default service;
