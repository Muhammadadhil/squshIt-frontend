
import { User } from "@/types";

// Mock authentication service
// In a real app, this would connect to a backend service
class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private users: User[] = [];
  private isAuthenticated: boolean = false;

  private constructor() {
    // Load stored user from localStorage on initialization
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.isAuthenticated = true;
    }
    
    // Load stored users
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(email: string, password: string): Promise<User> {
    // In a real app, this would validate credentials against a server
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email);
        if (user) {
          this.currentUser = user;
          this.isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500); // Simulate network delay
    });
  }

  public async signup(email: string, password: string): Promise<User> {
    // In a real app, this would create a new user on the server
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.users.some(u => u.email === email)) {
          reject(new Error("Email already in use"));
          return;
        }

        const newUser: User = {
          id: `user_${Math.random().toString(36).substring(2, 9)}`,
          email,
          createdAt: new Date()
        };

        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        this.currentUser = newUser;
        this.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(newUser));
        
        resolve(newUser);
      }, 500); // Simulate network delay
    });
  }

  public logout(): void {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem('user');
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}

export const authService = AuthService.getInstance();
