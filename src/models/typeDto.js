class TypeDTO {
    constructor(data = {}) {
        this.title = data.title || "";
        this.description = data.description || "";
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
        };
    }
}
export default TypeDTO; 
