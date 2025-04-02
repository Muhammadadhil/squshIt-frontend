
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import UrlShortener from "@/components/UrlShortener";
import UrlTable from "@/components/UrlTable";

const Dashboard = () => {
  const [refreshTable, setRefreshTable] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in by checking for token
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleNewUrl = () => {
    setRefreshTable(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        <div className="mb-8">
          <UrlShortener />
        </div>
        
        <UrlTable refreshTrigger={refreshTable} />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        &copy; {new Date().getFullYear()} Sqush.it | URL Shortener
      </footer>
    </div>
  );
};

export default Dashboard;
