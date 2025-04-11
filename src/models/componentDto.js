class ComponentDTO {
    constructor(data = {}) {
        this.content = data.content || "";
        this.index = typeof data.index === 'number' ? data.index : null;
        this.file = data.file || null;
    }

    toFormData() {
        const formData = new FormData();
        formData.append('content', this.content);
        if (this.index === null || typeof this.index !== 'number' || this.index < 0) {
            throw new Error("Component 'index' is required and must be a non-negative number.");
        }
        formData.append('index', this.index.toString());
        if (this.file instanceof File) {
            formData.append('file', this.file, this.file.name);
        }
        return formData;
    }
}
export default ComponentDTO;