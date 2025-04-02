
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import UrlShortener from "@/components/UrlShortener";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 container">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="brand-text">Simplify Your Links</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
              Transform long, complex URLs into short, memorable links with Sqush.it. 
              Simple, fast, and reliable URL shortening for everyone.
            </p>
            <div className="w-full max-w-2xl">
              <UrlShortener />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Sqush.it?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Simple & Fast</h3>
                <p className="text-muted-foreground">
                  Create shortened URLs in seconds with our easy-to-use interface. No complicated steps or technical knowledge required.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Track Performance</h3>
                <p className="text-muted-foreground">
                  Monitor link clicks and engagement to understand how your content performs and optimize your sharing strategy.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
                <p className="text-muted-foreground">
                  Your links are always available when you need them, ensuring consistent access for you and your audience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to start shortening?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Create an account to manage your shortened URLs and track performance.
            </p>
            <Link to="/signup">
              <Button size="lg" className="px-8 py-6 text-lg">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="py-8 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold brand-text">Sqush.it</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sqush.it | All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
