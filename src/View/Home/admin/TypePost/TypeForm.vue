<template>
  <div class="admin-type-form-container">
    <h1>{{ isEditMode ? 'Cập nhật Loại/Chủ đề' : 'Tạo Loại/Chủ đề Mới' }}</h1>

    <div v-if="isLoadingData" class="loading-indicator">Đang tải dữ liệu...</div>

    <div class="form-wrapper" v-else>
      <form @submit.prevent="handleSubmit" class="create-type-form">
        <div class="form-group">
          <label for="type-title">Tiêu đề (Title)</label>
          <input type="text" id="type-title" v-model.trim="typeDto.title" placeholder="Ví dụ: Tự chuyện" required />
        </div>
        <div class="form-group">
          <label for="type-description">Mô tả (Description)</label>
          <textarea id="type-description" v-model.trim="typeDto.description"
            placeholder="Ví dụ: Kể về những trải nghiệm đã qua" rows="3" required></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="submit-button" :disabled="isSubmitting || isLoadingData">
            {{ isSubmitting ? 'Đang xử lý...' : (isEditMode ? 'Cập nhật' : 'Tạo Mới') }}
          </button>
          <router-link :to="{ name: 'ListTypies' }" class="btn-cancel">
            Hủy bỏ
          </router-link>
        </div>

        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import TypeService from '../../../../service/api/TypeService';
// import TypeVM from '../../../../models/VM/TypeVM';
import TypeDTO from '../../../../models/typeDto';
export default {

  data() {
    return {
      typeDto: new TypeDTO(),
      error: ""
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: false,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async handleSubmit() {
      try {
        console.log(this.isEditMode);
        if (this.isEditMode == false) {
          console.log("1");
          const res = await TypeService.AddType(this.typeDto);
          if (res.statusCode === 201) {
            this.$router.push({ name: 'ListTypies' });
          }
          else if (res.statusCode === 400) {
            this.error = res.message;
          }
        }
        else {
          console.log("2");
          const res = await TypeService.UpdateType(this.typeDto);
          console.log(res);
        }
      }
      catch (error) {
        this.error = error;
      }
    },
    async getData(id) {
      try {
        const res = await TypeService.getTypeById(id);
        this.typeDto = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    let id = this.$route.params.id;
    if (id) {
      await this.getData(id);
    }
  },
}


</script>


<style scoped>
/* Giữ nguyên hoặc cập nhật CSS nếu cần */
.admin-type-form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.loading-indicator {
  text-align: center;
  padding: 2rem;
  color: #555;
  font-style: italic;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-wrapper {
  background-color: #fff;
  padding: 2rem;
  border-radius: 6px;
}

.create-type-form .form-group {
  margin-bottom: 1.5rem;
}

.create-type-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
  font-size: 0.9rem;
}

.create-type-form input[type="text"],
.create-type-form textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;
}

.create-type-form textarea {
  resize: vertical;
  min-height: 80px;
}

.create-type-form input[type="text"]:focus,
.create-type-form textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

.create-type-form small {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.85em;
  color: #777;
}

.form-group button {
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
  vertical-align: middle;
  font-size: 0.8em;
  margin-top: 5px;
}

.form-group button:hover {
  background-color: #ddd;
}

.form-actions {
  margin-top: 2rem;
  text-align: right;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  vertical-align: middle;
}

.submit-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-cancel {
  margin-left: 10px;
  text-decoration: none;
  padding: 0.8rem 1rem;
  background-color: #6c757d;
  color: white;
  border-radius: 5px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  vertical-align: middle;
  display: inline-block;
}

.btn-cancel:hover {
  background-color: #5a6268;
}

.success-message,
.error-message {
  margin-top: 1rem;
  text-align: center;
  padding: 0.8rem;
  border-radius: 4px;
  font-size: 0.9em;
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
</style> -->