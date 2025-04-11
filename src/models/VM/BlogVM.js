import ComponentVM from "./ComponentVM.js";
import TypeVM from "./TypeVM.js";
export default class BlogVM{
    constructor(data = {}) {        
        this.id = data.id ||  null;
        this.title = data.title || "";
        this.conslution = data.conslution || "";
        this.slug = data.slug || "";
        this.typePosts = (data.typePosts || []).map(item => new TypeVM(item));
        this.components = (data.components || []).map(item => new ComponentVM(item));
    }
}
