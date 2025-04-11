<template>
    <div class="admin-create-post-container">
      <h1>Tạo Bài Viết Mới</h1>
  
      <form @submit.prevent="createPost" class="post-form">
        <div class="form-section">
          <h2>Thông tin chung</h2>
          <div class="form-group">
            <label for="post-title">Tiêu đề bài viết</label>
            <input type="text" id="post-title" v-model.trim="postData.title" required />
          </div>
          <div class="form-group">
            <label for="post-conclusion">Kết luận (Conslution)</label>
            <textarea id="post-conclusion" v-model.trim="postData.conslution" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="post-slug">Slug (Đường dẫn)</label>
            <input type="text" id="post-slug" v-model.trim="postData.slug" placeholder="Để trống sẽ tự tạo từ tiêu đề"/>
             <small>Phần hiển thị trên URL, không dấu, nối bằng gạch ngang.</small>
          </div>
        </div>
  
        <div class="form-section">
          <h2>Chọn Loại/Chủ đề</h2>
          <div v-if="isLoadingTypes" class="loading">Đang tải loại...</div>
          <div v-else-if="allTypes.length === 0" class="no-data">Không có loại nào. Hãy tạo loại trước.</div>
          <div v-else class="type-selection-grid">
            <div v-for="type in allTypes" :key="type.id" class="type-item">
              <input
                type="checkbox"
                :id="'type-' + type.id"
                :value="type.id"
                v-model="selectedTypeIds"
              />
              <label :for="'type-' + type.id">{{ type.title }}</label>
            </div>
          </div>
           <p v-if="typeSelectionError" class="error-message">{{ typeSelectionError }}</p>
        </div>
  
        <div class="form-section">
          <h2>Nội dung bài viết (Components)</h2>
  
          <div class="component-list" v-if="addedComponents.length > 0">
            <h3>Các thành phần đã thêm:</h3>
            <ul>
              <li v-for="(component, index) in addedComponents" :key="component.id || index">
                <span>{{ index + 1 }}.</span>
                <span v-if="component.content"> [Text] {{ component.content.substring(0, 50) }}... </span>
                <span v-if="component.imageUrl"> [Image] {{ component.imageUrl.split('/').pop() }} </span>
                <span>(ID: {{ component.id }})</span>
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
               <input type="file" id="new-image-file" @change="handleFileChange" accept="image/*" required/>
               <div v-if="newComponent.previewUrl" class="image-preview">
                  <img :src="newComponent.previewUrl" alt="Xem trước ảnh">
               </div>
               <div class="component-actions">
                 <button type="button" @click="saveComponent" :disabled="isSavingComponent || !newComponent.imageFile">
                   {{ isSavingComponent ? 'Đang lưu...' : 'Lưu Thành Phần Ảnh' }}
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
           <small v-if="addedComponents.length === 0" class="error-message"> (Cần thêm ít nhất 1 thành phần)</small>
        </div>
  
         <p v-if="postCreateSuccessMessage" class="success-message">{{ postCreateSuccessMessage }}</p>
          <p v-if="postCreateErrorMessage" class="error-message">{{ postCreateErrorMessage }}</p>
  
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router'; // Nếu muốn điều hướng sau khi tạo
  
  // --- GIẢ LẬP API SERVICES ---
  // Thay thế bằng import thật từ các file service của bạn
  const TypeService = {
    getAllTypes: async () => {
      console.log("Fetching all types...");
      await new Promise(resolve => setTimeout(resolve, 500));
      // return []; // Test trường hợp không có type
      return [
        { id: 1, title: "Tự chuyện", slug: "tu-chuyen", description: "..." },
        { id: 2, title: "Lập trình", slug: "lap-trinh", description: "..." },
        { id: 3, title: "Du lịch", slug: "du-lich", description: "..." },
        { id: 4, title: "Nấu ăn", slug: "nau-an", description: "..." },
      ];
    }
  };
  
  const ComponentService = {
    createComponent: async (data) => {
      console.log("Saving component:", data);
      await new Promise(resolve => setTimeout(resolve, 1200));
  
      // Nếu data là FormData (có file ảnh)
      if (data instanceof FormData) {
          // Giả lập upload file và trả về imageUrl
          const file = data.get('image'); // Lấy file từ FormData
          const fakeImageUrl = `uploads/image_${Date.now()}_${file.name}`;
          console.log(`Simulated image upload: ${fakeImageUrl}`);
          // Trong API thật, bạn sẽ upload lên server và lấy URL thật
          return { success: true, data: { id: Date.now(), imageUrl: fakeImageUrl, content: null, index: -1 } }; // Index sẽ được set lại sau
      }
      // Nếu data là object (chỉ có content text)
      else {
          return { success: true, data: { id: Date.now(), content: data.content, imageUrl: null, index: -1 } };
      }
      // Test lỗi
      // throw new Error("Lỗi khi lưu component!");
    }
  };
  
  const PostService = {
    createPost: async (payload) => {
       console.log("Creating post with payload:", payload);
       await new Promise(resolve => setTimeout(resolve, 1500));
       // Giả sử userId được lấy từ auth state/token ở backend
       const fakeAuthorId = 1; // Lấy từ state quản lý user đăng nhập
       if (!payload.title || payload.typePosts.length === 0 || payload.components.length === 0) {
           throw new Error("Thiếu thông tin cần thiết để tạo bài viết.");
       }
       return { success: true, data: { ...payload, id: Date.now() + 1000, author: { id: fakeAuthorId } } };
       // Test lỗi
       // throw new Error("Không thể tạo bài viết trên server.");
    }
  };
  // --------------------------
  
  const router = useRouter();
  
  // --- State cho Form chính ---
  const postData = reactive({
    title: '',
    conslution: '',
    slug: ''
  });
  const isCreatingPost = ref(false);
  const postCreateSuccessMessage = ref('');
  const postCreateErrorMessage = ref('');
  
  // --- State cho Type Selection ---
  const allTypes = ref([]);
  const selectedTypeIds = ref([]);
  const isLoadingTypes = ref(false);
  const typeSelectionError = ref('');
  
  // --- State cho Component Management ---
  const addedComponents = ref([]); // Lưu trữ các component đã được LƯU và có ID
  const newComponent = reactive({ // Dùng để tạo component mới
    type: null, // 'text' | 'image' | null
    content: '',
    imageFile: null,
    previewUrl: null,
  });
  const isSavingComponent = ref(false);
  const componentSaveError = ref('');
  
  // --- Hàm Fetch Types ---
  const fetchTypes = async () => {
    isLoadingTypes.value = true;
    typeSelectionError.value = '';
    try {
      allTypes.value = await TypeService.getAllTypes();
    } catch (error) {
      console.error("Error fetching types:", error);
      typeSelectionError.value = "Không thể tải danh sách loại.";
    } finally {
      isLoadingTypes.value = false;
    }
  };
  
  // --- Hàm quản lý Component ---
  const selectComponentType = (type) => {
    cancelAddComponent(); // Reset trước khi chọn loại mới
    newComponent.type = type;
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      newComponent.imageFile = file;
      // Tạo URL tạm để xem trước ảnh
      newComponent.previewUrl = URL.createObjectURL(file);
    } else {
      newComponent.imageFile = null;
      newComponent.previewUrl = null;
    }
  };
  
  const cancelAddComponent = () => {
    newComponent.type = null;
    newComponent.content = '';
    newComponent.imageFile = null;
    if (newComponent.previewUrl) {
        URL.revokeObjectURL(newComponent.previewUrl); // Giải phóng bộ nhớ URL tạm
    }
    newComponent.previewUrl = null;
    componentSaveError.value = '';
    isSavingComponent.value = false; // Đảm bảo reset trạng thái loading component
  };
  
  const saveComponent = async () => {
    componentSaveError.value = '';
    isSavingComponent.value = true;
    let componentDataToSend;
  
    try {
      if (newComponent.type === 'text' && newComponent.content) {
        componentDataToSend = { content: newComponent.content };
      } else if (newComponent.type === 'image' && newComponent.imageFile) {
        // Khi gửi file, dùng FormData
        componentDataToSend = new FormData();
        componentDataToSend.append('image', newComponent.imageFile);
        // Có thể thêm content nếu API cho phép gửi cả text và image cho 1 component
        // formData.append('content', 'Mô tả cho ảnh này');
      } else {
        throw new Error("Dữ liệu thành phần không hợp lệ.");
      }
  
      const response = await ComponentService.createComponent(componentDataToSend);
  
      if (response && response.success && response.data?.id) {
        // Thêm component đã lưu (có ID) vào danh sách
        addedComponents.value.push(response.data);
        cancelAddComponent(); // Reset form thêm component
      } else {
        throw new Error("API không trả về ID cho component đã lưu.");
      }
  
    } catch (error) {
      console.error("Error saving component:", error);
      componentSaveError.value = error.message || "Lỗi khi lưu thành phần.";
    } finally {
      isSavingComponent.value = false;
    }
  };
  
  // --- Hàm Tạo Post Chính ---
  const createPost = async () => {
      postCreateSuccessMessage.value = '';
      postCreateErrorMessage.value = '';
  
      // Validation cơ bản
      if (!postData.title) {
          postCreateErrorMessage.value = "Vui lòng nhập tiêu đề bài viết.";
          return;
      }
       if (selectedTypeIds.value.length === 0) {
          postCreateErrorMessage.value = "Vui lòng chọn ít nhất một loại/chủ đề.";
          return;
      }
      if (addedComponents.value.length === 0) {
          postCreateErrorMessage.value = "Vui lòng thêm ít nhất một thành phần nội dung.";
          return;
      }
  
      isCreatingPost.value = true;
  
      // Lấy danh sách ID component đã lưu
      const componentIds = addedComponents.value.map(comp => comp.id);
  
      // Tạo slug nếu để trống
      let finalSlug = postData.slug;
      if (!finalSlug && postData.title) {
          finalSlug = postData.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
      }
  
      const payload = {
          title: postData.title,
          conslution: postData.conslution,
          slug: finalSlug,
          typePosts: selectedTypeIds.value, // Mảng các ID
          components: componentIds,        // Mảng các ID
          // userId sẽ được lấy từ token ở backend
      };
  
      try {
          const response = await PostService.createPost(payload);
          if (response && response.success && response.data?.id) {
              postCreateSuccessMessage.value = `Bài viết "${response.data.title}" đã được tạo thành công! (ID: ${response.data.id})`;
              // Reset toàn bộ form sau khi thành công
              postData.title = '';
              postData.conslution = '';
              postData.slug = '';
              selectedTypeIds.value = [];
              addedComponents.value = [];
              cancelAddComponent(); // Reset cả khu vực thêm component
  
              // Tùy chọn: Điều hướng đến trang xem bài viết hoặc danh sách bài viết
              // router.push({ name: 'AdminPostList' });
  
          } else {
               throw new Error("API tạo bài viết không thành công hoặc không trả về dữ liệu.");
          }
      } catch (error) {
          console.error("Error creating post:", error);
          postCreateErrorMessage.value = error.message || "Đã có lỗi xảy ra khi tạo bài viết.";
      } finally {
          isCreatingPost.value = false;
      }
  };
  
  
  // --- Lifecycle Hook ---
  onMounted(() => {
    fetchTypes();
  });
  
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
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Responsive grid */
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
      margin-bottom: 0; /* Reset margin */
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
  .component-list li span:first-child { /* Số thứ tự */
      font-weight: bold;
      color: #3498db;
  }
  .component-list li span:nth-child(2) { /* Nội dung preview */
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  .component-list li span:last-child { /* ID */
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
      margin-bottom: 15px; /* Thêm khoảng cách dưới input file */
  }
  .image-preview {
      margin-top: 10px;
      max-width: 200px; /* Giới hạn chiều rộng ảnh preview */
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
      gap: 10px; /* Khoảng cách giữa các nút */
  }
  .component-actions button {
      padding: 8px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9em;
      transition: background-color 0.2s ease, opacity 0.2s ease;
  }
  .component-actions button[type="button"]:not(.cancel-btn) { /* Nút Lưu */
      background-color: #2ecc71; /* Màu xanh lá */
      color: white;
      border: none;
  }
  .component-actions button[type="button"]:not(.cancel-btn):hover:not(:disabled) {
      background-color: #27ae60;
  }
  .component-actions button.cancel-btn { /* Nút Hủy */
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
    text-align: center; /* Căn giữa nút submit chính */
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
  .loading, .no-data {
      padding: 15px;
      text-align: center;
      color: #7f8c8d;
      background-color: #f8f9f9;
      border-radius: 4px;
      margin-top: 10px;
  }
  
  /* Thông báo lỗi/thành công */
  .success-message, .error-message {
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