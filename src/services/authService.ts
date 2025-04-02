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

    register: async (email: string, password: string) => {
        const response = await axios.post<RegisterResponse>(`${API_URL}/auth/register`, {
            email,
            password,
        });

        localStorage.setItem("token", response.data.token);

        return response.data;
    },

    logout: () => {
        localStorage.removeItem("token");
    },

    isLoggedIn: () => {
        return Boolean(localStorage.getItem("token"));
    },

    getToken: () => {
        return localStorage.getItem("token");
    },
};
