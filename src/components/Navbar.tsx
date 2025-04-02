
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import axios from "axios";

const Navbar = () => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    // Remove auth token from localStorage
    localStorage.removeItem("token");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <nav className="py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold brand-text">Sqush.it</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
