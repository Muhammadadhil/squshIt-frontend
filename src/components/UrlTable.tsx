
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urlService } from "@/services/urlService";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UrlData } from "@/types";
import { copyToClipboard } from "@/lib/utils";

interface UrlTableProps {
  refreshTrigger?: number;
}


const UrlTable = ({ refreshTrigger = 0 }: UrlTableProps) => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUrls = async () => {
      setIsLoading(true);
      try {
        const userUrls = await urlService.getUrlsByUser();
        console.log('userUrls:',userUrls);
        setUrls(userUrls.urls);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch your URLs",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUrls();
  }, [refreshTrigger, toast]);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString();
  };

  const BACKEND_API = import.meta.env.VITE_API_URL;


  if (isLoading) {
    return <div className="text-center py-8">Loading your URLs...</div>;
  }

  if (urls.length === 0) {
    return (
      <Card className="w-full mt-8">
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">
            You haven't created any short URLs yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
      <Card className="w-full mt-8">
          <CardHeader>
              <CardTitle>Your URLs</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="overflow-x-auto">
                  <Table>
                      <TableHeader>
                          <TableRow>
                              <TableHead>Original URL</TableHead>
                              <TableHead>Short URL</TableHead>
                              <TableHead className="text-center">Clicks</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {urls?.map((url) => (
                              <TableRow key={url.id}>
                                  <TableCell className="max-w-[200px] truncate">{url.originalUrl}</TableCell>
                                  <TableCell>
                                      <span className="font-mono text-sm">{`${BACKEND_API}/urls/${url.shortcode}`}</span>
                                  </TableCell>
                                  <TableCell className="text-center">{url.clickCount}</TableCell>
                                  <TableCell>{formatDate(url.createdAt)}</TableCell>
                                  <TableCell className="text-right space-x-2">
                                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(url)}>
                                          <Copy className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon" onClick={() => window.open(url.originalUrl, "_blank")}>
                                          <ExternalLink className="h-4 w-4" />
                                      </Button>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>
          </CardContent>
      </Card>
  );
};

export default UrlTable;
