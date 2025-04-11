class AuthDTO {
    constructor(data = {}) {
        this.email = data.email || "";
        this.password = data.password || "";
    }

    toJSONLogin() {
        return {
            email: this.email,
            password: this.password,
        };
    }
}

export default AuthDTO; 
