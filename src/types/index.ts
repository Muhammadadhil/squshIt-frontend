export interface User {
    id: string;
    email: string;
    createdAt: Date;
}

export interface UrlData {
    id: string;
    originalUrl: string;
    shortcode: string;
    clickCount: number;
    userId: string;
    createdAt: Date;
}

export interface UrlResponse {
    success: boolean;
    urls: UrlData[];
}

export interface UrlShortenResponse {
    success: boolean;
    shortUrl: UrlData;
}