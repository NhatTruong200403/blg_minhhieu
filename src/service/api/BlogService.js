// src/services/AmenityService.js
import BlogDTO from "../../models/blogDto";
import axiosInstance from "./axiosInstance";
const BlogService = {
  async getAllBlogs() {
    const response = await axiosInstance.get(
      'post'
    );
    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    return response.data.data;
  },
  async getBlogById(id) {
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.get(
      `/post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  },
  async AddBlog(blogDto) {
    let blogdto = new BlogDTO(blogDto).toJSON();
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.post(
      `/post`,blogdto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  },
  async DeleteBlog(id) {
    const token = sessionStorage.getItem("authToken");
    const response = await axiosInstance.delete(
      `/post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      return response.data;
  },
};
export default BlogService;
