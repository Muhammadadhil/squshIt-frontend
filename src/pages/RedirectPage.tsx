
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { urlService } from "@/services/urlService";

const RedirectPage = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToUrl = async () => {
      if (!shortCode) {
        setError("Invalid URL");
        return;
      }

      try {
        const urlData = await urlService.trackUrlClick(shortCode);
        window.location.href = urlData.originalUrl;
      } catch (err) {
        console.log('error in redirecting:',err)
        setError("This URL does not exist or has been removed");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };

    redirectToUrl();
  }, [shortCode, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <p className="text-sm">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center animate-pulse">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-muted-foreground">Please wait while we redirect you to your destination.</p>
      </div>
    </div>
  );
};

export default RedirectPage;
