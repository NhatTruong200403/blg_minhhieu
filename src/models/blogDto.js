class BlogDTO {
    constructor(data = {}) {
        this.title = data.title || "";
        this.conslution = data.conslution || "";
        this.components = data.components || [];
        this.user = data.user || null; // Lưu ID user (ví dụ: 1)
        this.typePosts = data.typePosts || [];
    }

    toJSON() { // Có thể cân nhắc đổi tên thành toJSON()
        return {
            title: this.title,
            conslution: this.conslution,
            components: this.components || [], // OK - trả về mảng ID
            user: this.user,                 // SỬA Ở ĐÂY: Trả về ID user trực tiếp
            typePosts: this.typePosts || [],  // OK - trả về mảng ID
        };
    }
}
export default BlogDTO;