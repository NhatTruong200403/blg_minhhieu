// src/services/AmenityService.js
import TypeDTO from "../../models/typeDto";
import axiosInstance from "./axiosInstance";
const TypeService = {
  async getAllComments() {
    const response = await axiosInstance.get("type-post");
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  },

};
export default TypeService;
