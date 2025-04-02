import { useToast } from "@/hooks/use-toast";
import { UrlData } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// const { toast } = useToast();


export const copyToClipboard = (shortenedUrl: UrlData) => {
    const BACKEND_API = import.meta.env.VITE_API_URL;

    if (!shortenedUrl) return;

    const shortUrl = `${BACKEND_API}/urls/${shortenedUrl.shortcode}`;

    navigator.clipboard.writeText(shortUrl);

    // toast({
    //     title: "Copied!",
    //     description: "Short URL copied to clipboard",
    // });
};
