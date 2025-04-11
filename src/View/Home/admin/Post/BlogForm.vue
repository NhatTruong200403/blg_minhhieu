<template>
  <div class="admin-create-post-container">
    <h1>Tạo Bài Viết Mới</h1>

    <form @submit.prevent="createPost" class="post-form">
      <div class="form-section">
        <h2>Thông tin chung</h2>
        <div class="form-group">
          <label for="post-title">Tiêu đề bài viết</label>
          <input type="text" id="post-title" v-model.trim="blogDto.title" required />
        </div>
        <div class="form-group">
          <label for="post-conclusion">Kết luận (Conslution)</label> <textarea id="post-conclusion"
            v-model.trim="blogDto.conslution" rows="3"></textarea>
        </div>
      </div>

      <div class="form-section">
        <h2>Chọn Loại/Chủ đề</h2>
        <div v-if="isLoadingTypes" class="loading">Đang tải loại...</div>
        <div v-else-if="!types || types.length === 0" class="no-data">Không có loại nào. Hãy tạo loại trước.
        </div>
        <div v-else class="type-selection-grid">
          <div v-for="type in types" :key="type.id" class="type-item">
            <input type="checkbox" :id="'type-' + type.id" :value="type.id" v-model="blogDto.typePosts" />
            <label :for="'type-' + type.id">{{ type.title }}</label>

          </div>
        </div>
        <p v-if="typeSelectionError" class="error-message">{{ typeSelectionError }}</p>
      </div>

      <div class="form-section">
        <h2>Nội dung bài viết (Components)</h2>

        <div class="component-list" v-if="addedComponents.length > 0">
          <h3>Các thành phần đã thêm:</h3>
          <ul class="added-items-list">
            <li v-for="component in addedComponents" :key="component.id || `comp-${component.index}`">
              <span class="item-index">{{ component.index }}.</span>
              <div v-if="component.content" class="item-details">
                <span class="item-type">[Text]</span>
                <p class="item-content">{{ component.content }}</p>
              </div>
              <div v-if="component.imageUrl" class="item-details">
                <span class="item-type">[Image]</span>
                <img v-if="component.imageUrl" :src="component.imageUrl" alt="Ảnh đã thêm" class="item-image-preview">
                <span v-else> (URL ảnh không có) </span>
              </div>
              <span class="item-id">(ID: {{ component.id }})</span>

            </li>
          </ul>
        </div>
        <p v-else class="no-data">Chưa có thành phần nào được thêm.</p>

        <div class="add-component-area">
          <h3>Thêm thành phần mới:</h3>
          <div v-if="!newComponent.type" class="component-type-selector">
            <button type="button" @click="selectComponentType('text')">Thêm Chữ (Text)</button>
            <button type="button" @click="selectComponentType('image')">Thêm Ảnh (Image)</button>
          </div>

          <div v-if="newComponent.type === 'text'" class="new-component-form">
            <label for="new-text-content">Nội dung chữ:</label>
            <textarea id="new-text-content" v-model.trim="newComponent.content" rows="4" required></textarea>
            <div class="component-actions">
              <button type="button" @click="saveComponent" :disabled="isSavingComponent || !newComponent.content">
                {{ isSavingComponent ? 'Đang lưu...' : 'Lưu Thành Phần Chữ' }}
              </button>
              <button type="button" @click="cancelAddComponent" class="cancel-btn">Hủy</button>
            </div>
          </div>

          <div v-if="newComponent.type === 'image'" class="new-component-form">
            <label for="new-image-file">Chọn file ảnh:</label>
            <input type="file" id="new-image-file" @change="handleFileChange" accept="image/*" required />
            <div v-if="newComponent.previewUrl" class="image-preview">
              <img :src="newComponent.previewUrl" alt="Xem trước ảnh">
            </div>
            <div class="component-actions">
              <button type="button" @click="saveComponent" :disabled="isSavingComponent || !newComponent.imageFile">
                {{ isSavingComponent ? 'Đang tải lên & lưu...' : 'Lưu Thành Phần Ảnh' }}
              </button>
              <button type="button" @click="cancelAddComponent" class="cancel-btn">Hủy</button>
            </div>
          </div>
          <p v-if="componentSaveError" class="error-message">{{ componentSaveError }}</p>
        </div>
      </div>

      <div class="form-actions main-submit">
        <button type="submit" class="submit-button" :disabled="isCreatingPost || addedComponents.length === 0">
          {{ isCreatingPost ? 'Đang tạo bài viết...' : 'Tạo Bài Viết' }}
        </button>
        <small v-if="addedComponents.length === 0" class="error-message"> (Cần thêm ít nhất 1 thành
          phần)</small>
      </div>

      <p v-if="postCreateSuccessMessage" class="success-message">{{ postCreateSuccessMessage }}</p>
      <p v-if="postCreateErrorMessage" class="error-message">{{ postCreateErrorMessage }}</p>

    </form>
  </div>
</template>

<script>
import BlogDTO from '../../../../models/blogDto';
//   import TypeVM from '../../../../models/VM/TypeVM'; // Có thể không cần nếu API trả về đúng dạng
import TypeService from '../../../../service/api/TypeService';
// --- GIẢ ĐỊNH BẠN CÓ CÁC SERVICE SAU ---
import ComponentService from '../../../../service/api/ComponentService'; // Service để xử lý component
import BlogService from '../../../../service/api/BlogService';       // Service để xử lý bài viết

export default {
  name: 'AdminCreatePost', // Đặt name ở đầu hoặc cuối cùng
  data() {
    return {
      User: null,
      blogDto: new BlogDTO(), // DTO chính cho bài viết
      types: [],              // Danh sách các loại/chủ đề từ API
      selectedTypeIds: [],    // Mảng ID các loại được chọn **QUAN TRỌNG: Khởi tạo mảng rỗng**
      isLoadingTypes: false,
      typeSelectionError: null,
      index:0,
      addedComponents: [], // Mảng chứa các component đã thêm thành công (object từ server)

      // Quản lý việc thêm component mới
      newComponent: this.resetNewComponentData(), // Object cho component đang tạo
      isSavingComponent: false,
      componentSaveError: null,

      // Quản lý việc tạo bài viết chính
      isCreatingPost: false,
      postCreateSuccessMessage: null,
      postCreateErrorMessage: null,

      // Biến tạm lưu trữ file input element để reset
      imageInputElement: null,
    }
  },
  methods: {
    // --- Xử lý Loại/Chủ đề ---
    async getAllTypes() {
      this.isLoadingTypes = true;
      this.typeSelectionError = null;
      try {
        const res = await TypeService.getAllTypies();
        this.types = res.data;
        console.log("Types loaded:", this.types);
      } catch (error) {
        console.error("Error fetching types:", error);
        this.typeSelectionError = "Không thể tải danh sách loại.";
        this.types = []; // Đảm bảo types là mảng khi lỗi
      } finally {
        this.isLoadingTypes = false;
      }
    },

    // --- Xử lý Thêm Component ---
    resetNewComponentData() {
      // Hàm tiện ích để reset form thêm component
      // Quan trọng: revoke URL cũ nếu có trước khi reset
      if (this.newComponent && this.newComponent.previewUrl) {
        URL.revokeObjectURL(this.newComponent.previewUrl);
      }
      return {
        type: null,       // 'text' or 'image'
        content: '',      // for text
        imageFile: null,  // for image upload (File object)
        previewUrl: null, // for image preview
      };
    },

    selectComponentType(type) {
      this.newComponent = this.resetNewComponentData(); // Reset trước khi chọn loại mới
      this.newComponent.type = type;
      this.componentSaveError = null; // Xóa lỗi cũ
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      this.imageInputElement = event.target; // Lưu lại input element

      if (file) {
        this.newComponent.imageFile = file;
        // Tạo URL xem trước
        if (this.newComponent.previewUrl) {
          URL.revokeObjectURL(this.newComponent.previewUrl); // Thu hồi URL cũ nếu có
        }
        this.newComponent.previewUrl = URL.createObjectURL(file);
      } else {
        // Nếu người dùng hủy chọn file
        this.newComponent.imageFile = null;
        if (this.newComponent.previewUrl) {
          URL.revokeObjectURL(this.newComponent.previewUrl);
          this.newComponent.previewUrl = null;
        }
      }
    },

    async saveComponent() {
      this.isSavingComponent = true;
      this.componentSaveError = null;
      let savedComponentData = null; // Biến để lưu data trả về từ API

      try {
        let response;
        if (this.newComponent.type === 'text') {
          // --- Gọi API lưu text component ---
          const formData = new FormData();
          formData.append('index', this.index+1); // Đặt tên key là 'imageFile' hoặc theo yêu cầu API
          formData.append('content', this.newComponent.content);
          response = await ComponentService.AddComponent(formData);
          console.log('API Text Component Response:', response); // Log response gốc
        } else if (this.newComponent.type === 'image' && this.newComponent.imageFile) {
          const formData = new FormData();
          formData.append('file', this.newComponent.imageFile); // Đặt tên key là 'imageFile' hoặc theo yêu cầu API
          formData.append('index', this.index+1);
          response = await ComponentService.AddComponent(formData);
          console.log('API Image Component Response:', response); // Log response gốc
        } else {
          throw new Error("Loại component không hợp lệ hoặc thiếu dữ liệu.");
        }

        if (response.statusCode === 201) {
          savedComponentData = response.data; // Lấy object component đã lưu
          // 1. Thêm component đã lưu vào danh sách hiển thị
          this.addedComponents.push(savedComponentData);
          console.log('Updated addedComponents:', this.addedComponents);
          // 2. Thêm ID của component vào DTO chính
          if (!this.blogDto.components) {
            this.blogDto.components = []; // Khởi tạo nếu chưa có
          }
          this.blogDto.components.push(savedComponentData.id);
          console.log('Updated blogDto components:', this.blogDto.components);
          this.index=this.index+1;
          // 3. Reset form thêm component
          this.newComponent = this.resetNewComponentData();
          // Reset input file để có thể chọn lại file giống hệt
          if (this.imageInputElement) {
            this.imageInputElement.value = null;
            this.imageInputElement = null;
          }
          console.log("Blog: ", this.blogDto);

        } else {
          console.error("Lỗi từ API hoặc định dạng response không đúng:", response.data);
          throw new Error(response.data?.message || "Lưu thành phần thất bại.");
        }

      } catch (error) {
        console.error("Lỗi khi lưu component:", error);
        this.componentSaveError = error.message || "Đã xảy ra lỗi không mong muốn khi lưu thành phần.";
        // Không reset form ở đây để người dùng có thể thử lại
      } finally {
        this.isSavingComponent = false;
      }
    },

    cancelAddComponent() {
      // Reset input file nếu đang thêm ảnh
      if (this.newComponent.type === 'image' && this.imageInputElement) {
        this.imageInputElement.value = null;
        this.imageInputElement = null;
      }
      this.newComponent = this.resetNewComponentData(); // Reset data và revoke URL
      this.componentSaveError = null; // Xóa thông báo lỗi
    },

    // --- Xử lý Tạo Bài Viết Chính ---
    async createPost() {
      this.isCreatingPost = true;
      this.postCreateErrorMessage = null;
      this.postCreateSuccessMessage = null;

      // Chuẩn bị payload cuối cùng

      console.log("Payload gửi đi để tạo bài viết:", this.blogDto);
      try {
        // **THAY THẾ BẰNG HÀM API TẠO BLOG THỰC TẾ CỦA BẠN**
        const response = await BlogService.AddBlog(this.blogDto);
        console.log("API Create Blog Response:", response);


        // Giả định API trả về thành công { statusCode: 201, message: '...', data: { ... } }
        if (response.data && response.statusCode === 201 ) {
          this.postCreateSuccessMessage = response.data.message || "Tạo bài viết thành công!";
          // Optional: Reset toàn bộ form hoặc điều hướng người dùng
          // this.resetForm();
          this.$router.push('/admin/listBlogs');
        } else {
          console.error("Lỗi tạo bài viết từ API:", response.data);
          throw new Error(response.data?.message || "Tạo bài viết thất bại.");
        }

      } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error);
        this.postCreateErrorMessage = error.message || "Đã xảy ra lỗi không mong muốn khi tạo bài viết.";
      } finally {
        this.isCreatingPost = false;
      }
    },

    // Optional: Hàm reset toàn bộ form sau khi thành công
    // resetForm() {
    //    this.blogDto = new BlogDTO();
    //    this.selectedTypeIds = [];
    //    this.addedComponents = [];
    //    this.newComponent = this.resetNewComponentData();
    //    this.postCreateSuccessMessage = null;
    //    this.postCreateErrorMessage = null;
    //    // Reset các trạng thái khác nếu cần
    // }
  },
  created() {
    this.getAllTypes();
    const user = sessionStorage.getItem('User');
    let users = JSON.parse(user);
    this.User = users[0];
    this.blogDto.user = this.User.id;
    // Đảm bảo components là mảng khi component được tạo
    if (!this.blogDto.components) {
      this.blogDto.components = [];
    }
  },
  // Nên đặt hook beforeUnmount hoặc unmounted để revoke URL cuối cùng nếu component bị hủy mà chưa lưu
  beforeUnmount() {
    if (this.newComponent && this.newComponent.previewUrl) {
      URL.revokeObjectURL(this.newComponent.previewUrl);
    }
  }
};
</script>

<style scoped>
.admin-create-post-container {
  padding: 20px 30px;
  max-width: 900px;
  margin: 20px auto;
  background-color: #fdfdfd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

h2 {
  color: #34495e;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 10px;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.4em;
}

h3 {
  color: #34495e;
  margin-bottom: 15px;
  font-size: 1.1em;
  font-weight: 600;
}

.post-form .form-section {
  background-color: #fff;
  padding: 25px;
  border-radius: 6px;
  margin-bottom: 30px;
  border: 1px solid #ecf0f1;
}

.post-form .form-group {
  margin-bottom: 20px;
}

.post-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.post-form input[type="text"],
.post-form textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1em;
  transition: border-color 0.2s ease-in-out;
}

.post-form textarea {
  min-height: 80px;
  resize: vertical;
}

.post-form input[type="text"]:focus,
.post-form textarea:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.post-form small {
  display: block;
  margin-top: 5px;
  font-size: 0.85em;
  color: #7f8c8d;
}

/* Type Selection */
.type-selection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  /* Responsive grid */
  gap: 15px;
}

.type-item {
  display: flex;
  align-items: center;
  background-color: #f8f9f9;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ecf0f1;
}

.type-item input[type="checkbox"] {
  margin-right: 8px;
  cursor: pointer;
}

.type-item label {
  margin-bottom: 0;
  /* Reset margin */
  cursor: pointer;
  flex-grow: 1;
  color: #34495e;
}

/* Component Management */
.component-list ul {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
}

.component-list li {
  background-color: #f8f9f9;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ecf0f1;
  font-size: 0.9em;
  color: #555;
  display: flex;
  align-items: center;
  gap: 10px;
}

.component-list li span:first-child {
  /* Số thứ tự */
  font-weight: bold;
  color: #3498db;
}

.component-list li span:nth-child(2) {
  /* Nội dung preview */
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.component-list li span:last-child {
  /* ID */
  font-size: 0.8em;
  color: #95a5a6;
}


.add-component-area {
  border: 1px dashed #bdc3c7;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
  background-color: #fcfcfc;
}

.component-type-selector button {
  margin-right: 10px;
  padding: 8px 15px;
  cursor: pointer;
  border: 1px solid #3498db;
  background-color: #fff;
  color: #3498db;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.component-type-selector button:hover {
  background-color: #3498db;
  color: #fff;
}

.new-component-form {
  margin-top: 15px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ecf0f1;
  border-radius: 4px;
}

.new-component-form label {
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}

.new-component-form input[type="file"] {
  display: block;
  margin-top: 5px;
  margin-bottom: 15px;
  /* Thêm khoảng cách dưới input file */
}

.image-preview {
  margin-top: 10px;
  max-width: 200px;
  /* Giới hạn chiều rộng ảnh preview */
  border: 1px solid #eee;
  padding: 5px;
}

.image-preview img {
  max-width: 100%;
  display: block;
}

.component-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  /* Khoảng cách giữa các nút */
}

.component-actions button {
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9em;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.component-actions button[type="button"]:not(.cancel-btn) {
  /* Nút Lưu */
  background-color: #2ecc71;
  /* Màu xanh lá */
  color: white;
  border: none;
}

.component-actions button[type="button"]:not(.cancel-btn):hover:not(:disabled) {
  background-color: #27ae60;
}

.component-actions button.cancel-btn {
  /* Nút Hủy */
  background-color: #f1f1f1;
  color: #555;
  border: 1px solid #ccc;
}

.component-actions button.cancel-btn:hover {
  background-color: #e0e0e0;
}

.component-actions button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


/* Submit chính */
.form-actions.main-submit {
  margin-top: 30px;
  text-align: center;
  /* Căn giữa nút submit chính */
  border-top: 1px solid #eee;
  padding-top: 25px;
}

.submit-button {
  background-color: #3498db;
  color: white;
  padding: 12px 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: background-color 0.3s ease, opacity 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  background-color: #2980b9;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Loading/No Data Placeholders */
.loading,
.no-data {
  padding: 15px;
  text-align: center;
  color: #7f8c8d;
  background-color: #f8f9f9;
  border-radius: 4px;
  margin-top: 10px;
}

/* Thông báo lỗi/thành công */
.success-message,
.error-message {
  margin-top: 15px;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 0.9em;
  text-align: center;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}

.error-message {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}
</style>