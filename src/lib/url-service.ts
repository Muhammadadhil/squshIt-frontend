
import { UrlData, User } from "@/types";

// Mock URL shortening service
// In a real app, this would connect to a backend service
class UrlService {
  private static instance: UrlService;
  private urls: UrlData[] = [];

  private constructor() {
    // Load stored URLs from localStorage
    const storedUrls = localStorage.getItem('urls');
    if (storedUrls) {
      this.urls = JSON.parse(storedUrls);
    }
  }

  public static getInstance(): UrlService {
    if (!UrlService.instance) {
      UrlService.instance = new UrlService();
    }
    return UrlService.instance;
  }

  public async shortenUrl(originalUrl: string, user: User | null): Promise<UrlData> {
    // In a real app, this would call a backend API to generate and store the shortened URL
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a random short code
        const shortCode = Math.random().toString(36).substring(2, 8);
        
        const newUrl: UrlData = {
          id: `url_${Math.random().toString(36).substring(2, 9)}`,
          originalUrl,
          shortCode,
          clicks: 0,
          userId: user?.id || 'anonymous',
          createdAt: new Date()
        };

        this.urls.push(newUrl);
        localStorage.setItem('urls', JSON.stringify(this.urls));
        
        resolve(newUrl);
      }, 500); // Simulate network delay
    });
  }

  public async getUrlsByUser(userId: string): Promise<UrlData[]> {
    // In a real app, this would call a backend API to fetch user's URLs
    return new Promise((resolve) => {
      setTimeout(() => {
        const userUrls = this.urls.filter(url => url.userId === userId);
        resolve(userUrls);
      }, 200); // Simulate network delay
    });
  }

  public async trackUrlClick(shortCode: string): Promise<UrlData> {
    // In a real app, this would call a backend API to track the click
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const urlIndex = this.urls.findIndex(url => url.shortCode === shortCode);
        
        if (urlIndex !== -1) {
          this.urls[urlIndex] = {
            ...this.urls[urlIndex],
            clicks: this.urls[urlIndex].clicks + 1
          };
          
          localStorage.setItem('urls', JSON.stringify(this.urls));
          resolve(this.urls[urlIndex]);
        } else {
          reject(new Error("URL not found"));
        }
      }, 200);
    });
  }
}

export const urlService = UrlService.getInstance();
