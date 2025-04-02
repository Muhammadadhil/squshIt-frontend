
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urlService } from "@/services/urlService";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UrlData } from "@/types";
import { copyToClipboard } from "@/lib/utils";

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<UrlData | null>(null);
  const { toast } = useToast();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const validateUrl = (url: string): boolean => {
    const pattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return pattern.test(url);
  };

  const BACKEND_API=import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }
    
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please login to shorten URLs",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Add https:// if it's missing
      const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
      const result = await urlService.shortenUrl(formattedUrl);
      console.log('result:',result)
      setShortenedUrl(result.shortUrl);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to shorten URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">Shorten Your URL</CardTitle>
          </CardHeader>
          <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                      <Input type="text" placeholder="Enter your long URL" value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1" disabled={isLoading} />
                      <Button type="submit" disabled={isLoading} className="whitespace-nowrap">
                          {isLoading ? "Shortening..." : "Shorten URL"}
                      </Button>
                  </div>
              </form>

              {shortenedUrl && (
                  <div className="mt-6">
                      <div className="text-sm text-muted-foreground mb-2">Your shortened URL:</div>
                      <div className="flex items-center gap-2">
                          <div className="flex-1 p-2 bg-secondary rounded-md font-mono text-sm truncate">{`${BACKEND_API}/urls/${shortenedUrl.shortcode}`}</div>
                          <Button variant="outline" size="icon" onClick={() => copyToClipboard(shortenedUrl)}>
                              <Copy className="h-4 w-4" />
                          </Button>
                      </div>
                  </div>
              )}
          </CardContent>
      </Card>
  );
};

export default UrlShortener;
