<template>
    <div class="brand-list-container">
        <h1>Quản lý thể loại</h1>

        <div class="actions">
            <router-link :to="{ name: 'CreateType' }" class="btn btn-add">
                <i class="fas fa-plus"></i> Thêm thể loại mới
            </router-link>
        </div>

        <div v-if="isLoading" class="loading-indicator">
            <p>Đang tải dữ liệu...</p>
        </div>

        <div v-if="error" class="error-message">
            {{ error }}
        </div>

        <div v-if="!isLoading && !error" class="brand-table-container">
            <table class="brand-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên thể loại</th>
                        <th>Mô tả</th>
                        <th>Ngày tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="type.length === 0">
                        <td colspan="5" class="no-data">Không có dữ liệu thương hiệu.</td>
                    </tr>
                    <tr v-for="item in type" :key="item.id">
                        <td>{{ item.id }}</td>
                        <!-- <td>
                             <img v-if="brand.logo" :src="getImageUrl(brand.logo)" alt="Logo" class="brand-logo" /> 
                             <span v-else>N/A</span> 
                        </td> -->
                        <td>{{ item.title }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ formatDate(item.createdAt) }}</td>
                        <td>
                            <router-link :to="{ name: 'UpdateType', params: { id: item.id } }" class="btn btn-edit"
                                title="Sửa">
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
    </div>
</template>

<script>
import TypeVM from '../../../../models/VM/TypeVM';
import TypeService from '../../../../service/api/TypeService';
export default {
    data() {
        return {
            type: [new TypeVM()],
            isLoading: false,
            error: null
        }
    },

    methods: {
        formatDate(dateString) {
            if (!dateString) return 'N/A';
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
            } catch (e) { return 'Invalid Date'; }
        },
        async fetchTypies() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await TypeService.getAllTypies();
                if (response.statusCode === 200) {
                    this.type = response.data;
                    console.log("Response: ", this.type);
                    this.isLoading = false;
                }
            } catch (err) {
                console.error('Lỗi khi tải danh sách thể loại:', err);
                this.error = `Không thể tải danh sách thể loại. Lỗi: ${err.message || err}`;
            } finally {
                this.isLoading = false;
            }
        },


        // --- Delete Product ---
        confirmDelete(id) {
            if (window.confirm(`Bạn có chắc chắn muốn xóa thể loại có ID ${id}?`)) {
                this.deleteType(id);
            }
        },

        async deleteType(id) {
            const originalError = this.error; // Lưu lỗi cũ
            this.error = null;
            try {
                await TypeService.DeleteType(id);
                alert(`Đã xóa thành công thể loại ID ${id}.`);
                this.fetchTypies();
            } catch (err) {
                if (originalError && !this.error) {
                    this.error = originalError;
                }
            }
        },
    },
    async created() {
        await this.fetchTypies();
    },
}
</script>

<style scoped>
/* Responsive (Tùy chọn) */
@media (max-width: 768px) {

    .brand-table th,
    .brand-table td {
        padding: 8px;
        font-size: 0.9em;
    }

    .btn {
        padding: 6px 10px;
        font-size: 0.8rem;
    }

    .brand-logo {
        max-width: 40px;
    }
}
</style>