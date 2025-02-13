
const AuthService = {
    login: (username: string, password: string) => {
        if (username === "admin" && password === "password") {
            localStorage.setItem("auth", "true");
            localStorage.setItem("role", "admin");
            return true;
        } if (username === "user" && password === "password") {
            localStorage.setItem("auth", "true");
            localStorage.setItem("role", "user");
            return true;
        }
        return false;
    },

    logout: () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("role");
    },

    isAuthenticated: () => localStorage.getItem("auth") === "true",

    getRole: () => localStorage.getItem("role")

}

export default AuthService;

