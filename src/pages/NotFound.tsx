
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-temple-50 px-4">
      <div className="text-center animate-fade-in opacity-0">
        <h1 className="text-6xl font-serif font-bold text-temple-800 mb-4">404</h1>
        <p className="text-xl text-temple-600 mb-6">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link to={isAuthenticated ? "/dashboard" : "/"}>
          <Button size="lg">
            Return to {isAuthenticated ? "Dashboard" : "Home"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
