<template>
  hehe
</template>

<script>
export default {

}
</script>

<style>

</style>

<!-- 

<template>
    <div class="product-list-container">
        <h1>Quản lý Sản phẩm</h1>

        <div class="actions">
            <router-link :to="{ name: 'admin-product-add', params: { productId: 0 } }" class="btn btn-add">
                <i class="fas fa-plus"></i> Thêm Sản phẩm mới
            </router-link>
        </div>

        <div v-if="isLoading" class="loading-indicator">
            <p>Đang tải dữ liệu sản phẩm...</p>
        </div>

        <div v-if="error" class="error-message">
            {{ error }}
        </div>

        <div v-if="!isLoading && !error" class="product-table-container">
            <table class="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Sản phẩm</th>
                        <th>Giá (VNĐ)</th>
                        <th>Thương hiệu</th>
                        <th>Ngày tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="products.length === 0">
                        <td colspan="7" class="no-data">Không có dữ liệu sản phẩm.</td>
                    </tr>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.id }}</td>
                        <td>{{ product.productName }}</td>
                        <td>{{ formatPrice(product.productPrice) }}</td>
                        <td>{{ product.brand?.brandName || 'N/A' }}</td>
                        <td>{{ formatDate(product.created_at) }}</td>
                        <td>
                            <router-link :to="{ name: 'admin-product-edit', params: { productId: product.productId } }"
                                class="btn btn-edit" title="Sửa">
                                <i class="fas fa-edit"></i>
                            </router-link>
                            <button @click="confirmDelete(product.productId)" class="btn btn-delete" title="Xóa">
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
import ProductService from '../../../../services/ProductService';
import ProductVM from '@/models/Enities/ProductVM'
export default {

    data() {
        return {
            products: [new ProductVM()],
            isLoading: false,
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0,
            error: null
        }
    },

    methods: {
        totalPages() {
            return Math.ceil(totalItems.value / itemsPerPage.value);
        },
        formatPrice(price) {
            if (price === null || price === undefined) return 'N/A';
            return price.toLocaleString('vi-VN'); // Định dạng số theo kiểu Việt Nam
        },


        // Hàm định dạng ngày tháng
        formatDate(dateString) {
            if (!dateString) return 'N/A';
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
            } catch (e) { return 'Invalid Date'; }
        },
        async fetchProducts() {
            this.isLoading = true;
            this.error = null;
            this.products = [];

            const params = {
                page: this.currentPage,
                limit: this.itemsPerPage,
                // brandId: filterBrand.value || null, // Thêm filter nếu có
                // sort: sortOption.value || null,    // Thêm sort nếu có
            };
            try {
                const response = await ProductService.GetAllProducts();
                // Giả sử API trả về cấu trúc: { data: [products], meta: { total, current_page, last_page } }
                if (response) {
                    this.products = response || []; // Lấy mảng sản phẩm
                    if (response.meta) { // Lấy thông tin phân trang nếu API trả về
                        this.totalItems = response.meta.total || 0;
                        this.currentPage = response.meta.current_page || 1;
                        // itemsPerPage.value có thể set lại từ response.meta.per_page nếu cần
                    } else {
                        // Nếu API không trả về meta, tự tính toán dựa trên dữ liệu trả về (ít chính xác hơn)
                        this.totalItems = this.products.length; // Chỉ đúng nếu API trả hết dữ liệu
                    }

                    // Đảm bảo products luôn là mảng
                    if (!Array.isArray(this.products)) {
                        console.warn("Dữ liệu sản phẩm trả về không phải mảng:", response.data);
                        this.products = [];
                        this.totalItems = 0;
                    }

                } else {
                    this.products = [];
                    this.totalItems = 0;
                }
            } catch (err) {
                console.error('Lỗi khi tải danh sách sản phẩm:', err);
                this.error = `Không thể tải danh sách sản phẩm. Lỗi: ${err.message || err}`;
                this.products = [];
                this.totalItems = 0;
            } finally {
                this.isLoading = false;
            }
        },


        // --- Delete Product ---
        confirmDelete(id) {
            if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm có ID ${id}?`)) {
                this.deleteProduct(id);
            }
        },

        async deleteProduct(id) {
            const originalError = this.error; // Lưu lỗi cũ
            this.error = null;
            try {
                await ProductService.DeleteProduct(id);
                alert(`Đã xóa thành công sản phẩm ID ${id}.`);
                this.fetchProducts();
            } catch (err) {
                if (originalError && !this.error) {
                    this.error = originalError;
                }
            }
        },
    },
    async created() {
        await this.fetchProducts();
    },

}
</script> -->