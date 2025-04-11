// src/services/AmenityService.js
import ComponentDTO from "../../models/componentDto";
import axiosInstance from "./axiosInstance";
const TypeService = {
  async getComponentById(id) {
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.get(
      `/component-post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  },
  async AddComponent(componentDto) {
    console.log(componentDto);
    // let component = new ComponentDTO(componentDto).toFormData();
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.post(
      `/component-post`,
      componentDto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  },
  async UpdateComponent(id,componentDto) {
    let component = new ComponentDTO(componentDto).toJSON();
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.put(
        component,
      `/component-post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  },
  async DeleteComponent(id) {
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.delete(
      `/component-post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  },

  
};
export default TypeService;
