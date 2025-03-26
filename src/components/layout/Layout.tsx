
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  if (!isLoading && !isAuthenticated) {
    navigate("/login");
    toast({
      title: "Authentication required",
      description: "Please log in to access this page.",
      variant: "destructive",
    });
    return null;
  }

  // Show loading indicator if auth state is still loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-32 bg-muted rounded-md mx-auto mb-4"></div>
          <div className="h-4 w-48 bg-muted rounded-md mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Header />
        
        <div className="flex flex-1">
          <Sidebar />
          
          <main className="flex-1 overflow-auto">
            <div className="container py-8">{children}</div>
          </main>
        </div>
        
        <Footer />
      </div>
    </SidebarProvider>
  );
};
