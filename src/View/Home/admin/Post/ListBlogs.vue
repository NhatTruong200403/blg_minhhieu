<template>
    <div class="product-list-container">
        <h1>Quản lý Blog</h1>

        <div class="actions">
            <router-link :to="{ name: 'CreateBlog'}" class="btn btn-add">
                <i class="fas fa-plus"></i> Thêm Blog mới
            </router-link>
        </div>

        <div v-if="isLoading" class="loading-indicator">
            <p>Đang tải dữ liệu blogs...</p>
        </div>

        <div v-if="error" class="error-message">
            {{ error }}
        </div>

        <div v-if="!isLoading && !error" class="product-table-container">
            <table class="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Kết luận</th>
                        <th>Ngày tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="blogs.length === 0">
                        <td colspan="7" class="no-data">Không có dữ liệu sản phẩm.</td>
                    </tr>
                    <tr v-for="item in blogs" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.conslution || 'N/A' }}</td>
                        <td>{{ formatDate(item.createdAt) }}</td>
                        <td>
                            <router-link :to="{ name: 'UpdateBlog', params: { id: item.id } }"
                                class="btn btn-edit" title="Sửa">
                                <i class="fas fa-edit"></i>
                            </router-link>
                            <button @click="confirmDelete(item.id)" class="btn btn-delete" title="Xóa">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="!isLoading && totalPages > 1" class="pagination">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">
                &laquo; Trước
            </button>
            <span>Trang {{ currentPage }} / {{ totalPages }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">
                Sau &raquo;
            </button>
        </div>

    </div>
</template>
<script>
import BlogService from '../../../../service/api/BlogService';
import BlogVM from '../../../../models/VM/BlogVM'
export default {

    data() {
        return {
            blogs: [new BlogVM()],
            isLoading: false,
            error: null
        }
    },

    methods: {
        // Hàm định dạng ngày tháng
        formatDate(dateString) {
            if (!dateString) return 'N/A';
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
            } catch (e) { return 'Invalid Date'; }
        },
        async fetchBlogs() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await BlogService.getAllBlogs();
                this.blogs = response;
                this.isLoading = false;
            } catch (err) {
                console.error('Lỗi khi tải danh sách sản phẩm:', err);
                this.error = `Không thể tải danh sách sản phẩm. Lỗi: ${err.message || err}`;
            } finally {
                this.isLoading = false;
            }
        },


        // --- Delete Product ---
        confirmDelete(id) {
            if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm có ID ${id}?`)) {
                this.deleteBlogs(id);
            }
        },

        async deleteBlogs(id) {
            const originalError = this.error; // Lưu lỗi cũ
            this.error = null;
            try {
                await BlogService.DeleteBlog(id);
                alert(`Đã xóa thành công blog ID ${id}.`);
                this.fetchBlogs();
            } catch (err) {
                if (originalError && !this.error) {
                    this.error = originalError;
                }
            }
        },
    },
    async created() {
        await this.fetchBlogs();
    },

}
</script>
