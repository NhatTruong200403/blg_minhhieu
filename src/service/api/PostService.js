// src/services/AmenityService.js
import axiosInstance from "./axiosInstance";
const AmenityService = {
  
  async getAllTypePost() {
    console.log('chạy ok');
    const response = await axiosInstance.get(
      'type-post'
    );
    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    return response.data.data;
  },
  async getPostById(id) {
    const token = sessionStorage.getItem("authToken");
    console.log(id);
    // Sử dụng fetch để đồng bộ với phương thức addAmenity
    const response = await axiosInstance.get(
      `/api/admin/Amenity/GetById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json", // Thêm Accept header nếu cần
        },
      }
    );
    console.log(response.data);
    return response.data;
  },
  async getAllPost() {
    const token = sessionStorage.getItem("authToken");
    console.log(id);
    // Sử dụng fetch để đồng bộ với phương thức addAmenity
    const response = await axiosInstance.get(
      `/api/admin/Amenity/GetById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json", // Thêm Accept header nếu cần
        },
      }
    );
    console.log(response.data);
    return response.data;
  },
  
};
export default AmenityService;
