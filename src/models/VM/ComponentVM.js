export default class ComponentVM{
    constructor(data = {}) {        
        this.id = data.id ||  null;
        this.content = data.content || "";
        this.imageUrl = data.imageUrl || "";
        this.index = data.index || 0;
        // this.items = (data.items || []).map(item => new CartItemVM(item));
    }
}