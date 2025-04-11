<template>
  <router-view style="width: 100%;"></router-view>
</template>
<script>
import AuthDTO from './models/authDto';
import AuthService from './service/api/AuthService';
import { provide, ref, onMounted, onUnmounted } from "vue";
export default {
  data() {
    return {
      path: 'Trang chủ',
      // titles: [],
      isclick: false,
      width: window.innerWidth,
      user: new AuthDTO(),
            showSuccessMessage: false,
            showLogin: false,
    }
  },
  methods: {
    updateWidth() {
      this.width = window.innerWidth;
    },
    async handleSubmit() {
            const res = await AuthService.Login(this.user);
            console.log(res);
            this.showSuccessMessage = true;
            setTimeout(() => {
                this.showSuccessMessage = false;
            }, 3000);
            sessionStorage.setItem('authToken', res.data);
            this.$emit("GetInfoUser");
        },
  },
  async created() {
  },
  computed: {
    isMobile() {
      return this.width <= 768; // Mobile: Dưới 768px
    },
    isTablet() {
      return this.width > 768 && this.width <= 1024; // Tablet: 768px - 1024px
    }
  },
  mounted() {
    window.addEventListener("resize", this.updateWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  },

}
</script>
<!-- // const res = await axios.get('http://54.179.35.186:3000/type-post');
    // console.log("Console: ",res); -->
<style>
.login-overlay {
  position: fixed; /* Đặt lên trên cùng và cố định khi cuộn */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Nền mờ đen */
  display: flex; /* Sử dụng flexbox để căn giữa */
  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center; /* Căn giữa theo chiều dọc */
  z-index: 1000; /* Đảm bảo nó nằm trên các phần tử khác */
  padding: 20px; /* Thêm padding để tránh form chạm sát viền màn hình nhỏ */
  box-sizing: border-box;
}

/* Container chỉ để chứa form-box, có thể không cần style đặc biệt */
.form-container { 
  width: 100%; /* Chiếm toàn bộ chiều rộng của overlay */
  max-width: 500px; /* Giới hạn chiều rộng tối đa */
  margin: auto; /* Căn giữa trong overlay */
}

.form-box {
  background-color: #ffffff; /* Nền trắng cho form */
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
  width: 100%; /* Chiếm toàn bộ chiều rộng của container */
  max-width: 600px; /* Giới hạn chiều rộng tối đa */
  position: relative; /* Quan trọng để định vị nút đóng */
  box-sizing: border-box;
}

.form-box h2 {
  margin-top: 0; /* Bỏ margin trên của tiêu đề */
  margin-bottom: 25px;
  text-align: center;
  color: #333;
}

/* --- CSS cho Nút Đóng (X) --- */
.close-login-btn {
  position: absolute; /* Định vị tuyệt đối so với .form-box */
  top: 10px;
  right: 15px;
  background: none; /* Không nền */
  border: none; /* Không viền */
  font-size: 28px; /* Kích thước chữ X */
  font-weight: bold;
  color: #888; /* Màu xám */
  cursor: pointer;
  padding: 0;
  line-height: 1; /* Đảm bảo không bị lệch dòng */
  transition: color 0.2s ease;
}

.close-login-btn:hover {
  color: #333; /* Đậm hơn khi hover */
}

/* --- CSS cho các thành phần bên trong form (giữ lại hoặc điều chỉnh nếu cần) --- */
.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333 !important;
}

.input-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #deebff;
  font-size: 16px;
  color: #333 !important;
}

.input-group input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.submit-btn {
  margin-top: 25px;
  text-align: center;
}

.submit-btn button {
  background-color: #3498db; /* Màu nút chính */
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.submit-btn button:hover {
  background-color: #2980b9; /* Màu đậm hơn khi hover */
}

/* --- CSS cho Toast Message (giữ nguyên hoặc sửa) --- */
.success-toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4CAF50; /* Màu xanh lá cây */
    color: white;
    padding: 15px 25px;
    border-radius: 5px;
    z-index: 1001; /* Nằm trên overlay */
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    opacity: 1;
    transition: opacity 0.5s ease-out;
}
</style>
