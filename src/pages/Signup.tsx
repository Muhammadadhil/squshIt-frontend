
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { authService } from "@/services/authService";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await authService.register(name,email, password);
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 container flex items-center justify-center py-12">
              <Card className="w-full max-w-md">
                  <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                      <CardDescription>Enter your email and create a password to get started</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                              <Label htmlFor="email">Name</Label>
                              <Input id="name" type="text" placeholder="alex doe" required value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
                          </div>

                          <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" placeholder="email@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="password">Password</Label>
                              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="confirmPassword">Confirm Password</Label>
                              <Input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading} />
                          </div>
                          <Button type="submit" className="w-full" disabled={isLoading}>
                              {isLoading ? "Creating account..." : "Create Account"}
                          </Button>
                      </form>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                      <p className="text-sm text-muted-foreground">
                          Already have an account?{" "}
                          <Link to="/login" className="text-primary hover:underline">
                              Login
                          </Link>
                      </p>
                  </CardFooter>
              </Card>
          </main>
      </div>
  );
};

export default Signup;
