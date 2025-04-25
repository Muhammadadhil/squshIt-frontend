import axios from "axios";

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
    };
}

interface RegisterResponse {
    token: string;
    user: {
        id: string;
        email: string;
    };
}

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const authService = {
    login: async (email: string, password: string) => {
        const response = await axios.post<LoginResponse>(
            `${API_URL}/auth/login`,
            {
                email,
                password,
            },
            { withCredentials: true }
        );
        console.log(response.data);

        localStorage.setItem("token", response.data.token);

        return response.data;
    },

    register: async (name: string, email: string, password: string) => {
        const response = await axios.post<RegisterResponse>(
            `${API_URL}/auth/register`,
            {
                name,
                email,
                password,
            },
            { withCredentials: true }
        );
        localStorage.setItem("token", response.data.token);
        return response.data;
    },

    logout: async () => {
        try {
            await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error("Error during logout:", error);
            throw error;
        }
    },

    isLoggedIn: () => {
        return Boolean(localStorage.getItem("token"));
    },

    getToken: () => {
        return localStorage.getItem("token");
    },
};
