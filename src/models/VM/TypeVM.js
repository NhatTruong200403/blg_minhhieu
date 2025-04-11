export default class TypeVM{
    constructor(data = {}) {        
        this.id = data.id ||  null;
        this.title = data.title || "";
        this.slug = data.slug || "";
        this.description = data.description || "";
    }
}
