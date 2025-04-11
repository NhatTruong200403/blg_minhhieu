// src/services/AmenityService.js
import TypeDTO from "../../models/typeDto";
import axiosInstance from "./axiosInstance";
const TypeService = {
  async getAllTypies() {
    const response = await axiosInstance.get("type-post");
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  },
  async getTypeById(id) {
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.get(`/type-post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  },
  async AddType(typeDto) {
    let typedto = new TypeDTO(typeDto).toJSON();
    const token = sessionStorage.getItem("authToken");
    console.log(token);
    const response = await axiosInstance.post(`/type-post`, typedto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  },
  async UpdateType(id, typeDto) {
    let typedto = new TypeDTO(typeDto).toJSON();
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.put(typedto, `/type-post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  },
  async DeleteType(id) {
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.delete(`/type-post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  },
};
export default TypeService;
