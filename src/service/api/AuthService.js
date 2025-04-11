// src/services/AmenityService.js
import axiosInstance from "./axiosInstance";
import AuthDTO from "../../models/authDto";
const AuthService = {
  
  async Login(authDto) {
    let authdto = new AuthDTO(authDto).toJSONLogin();
    const response = await axiosInstance.post(
      'auth/login',authdto
    );
    console.log(response);
    if (response.status !== 201) {
      throw new Error('Failed to fetch data');
    }
    return response.data;
  },
  async Logout() {
    // Chưa làm hàm logout
    return true;
  },
  async GetInfor() {
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.get(
      'user',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    return response.data.data;
  },
  async GetInforUserById(id) {
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.get(
      `user/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    return response.data.data;
  },
};
export default AuthService;
