import { ILoginPayload, ILoginResponse, ISignupPayload } from "../types/auth.types";
import { post } from "./network";

const signup = async (params: ISignupPayload) => {
    try {
        await post("/auth/register", params);
    } catch (error) {
        return error;
    }
}

const login = async ({email, password}: ILoginPayload) => {
    try {
        const response: ILoginResponse = await post("/auth/login", { email, password });
        localStorage.setItem("token", response.token);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("name", response.name);
        return response;
    } catch (error) {
        return error;
    }
}

const getRefreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            const response: ILoginResponse = await post("/auth/refresh", { refreshToken });
            localStorage.setItem("token", response.token);
            localStorage.setItem("refreshToken", response.refreshToken);
            return response;
        }
    } catch (error) {
        return error;
    }
}

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
}

export { signup, login, logout, getRefreshToken }