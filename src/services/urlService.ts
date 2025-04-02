import axios from "axios";
import { UrlData, UrlResponse, UrlShortenResponse } from "@/types";
import { authService } from "./authService";

const API_URL = `${import.meta.env.VITE_API_URL}`;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Add interceptor to include auth token in requests
api.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const urlService = {
    shortenUrl: async (originalUrl: string): Promise<UrlShortenResponse> => {
        const response = await api.post<UrlShortenResponse>("/urls/shorten-url", {
            originalUrl,
        });
        return response.data;
    },

    getUrlsByUser: async (): Promise<UrlResponse> => {
        const response = await api.get<UrlResponse>("/urls/urls");
        return response.data;
    },

    trackUrlClick: async (shortCode: string): Promise<UrlData> => {
        const response = await api.get<UrlData>(`/urls/${shortCode}`);
        return response.data;
    },
};
