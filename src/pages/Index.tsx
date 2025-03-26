
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-temple-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-temple-100">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-temple-800">Dutt Mandir</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Create Account</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="container max-w-4xl text-center animate-fade-in opacity-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-temple-900 mb-6">
              Dutt Mandir Management System
            </h1>
            <p className="text-xl text-temple-700 mb-8 max-w-2xl mx-auto">
              A comprehensive system for temple operations, accommodations, donations, and reporting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Access Dashboard
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white px-4">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">
              System Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border border-temple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-semibold mb-2">Accommodation Management</h3>
                <p className="text-muted-foreground">
                  Manage room bookings, check availability, and handle guest accommodations.
                </p>
              </div>
              
              <div className="p-6 border border-temple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-semibold mb-2">Donation Tracking</h3>
                <p className="text-muted-foreground">
                  Record and track donations, generate receipts, and maintain donor relationships.
                </p>
              </div>
              
              <div className="p-6 border border-temple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-semibold mb-2">Financial Reporting</h3>
                <p className="text-muted-foreground">
                  Generate detailed reports on donations, expenses, and temple operations.
                </p>
              </div>
              
              <div className="p-6 border border-temple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-semibold mb-2">User Management</h3>
                <p className="text-muted-foreground">
                  Manage system users with different roles and permissions.
                </p>
              </div>
              
              <div className="p-6 border border-temple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-semibold mb-2">Event Calendar</h3>
                <p className="text-muted-foreground">
                  Schedule and manage temple events, festivals, and special ceremonies.
                </p>
              </div>
              
              <div className="p-6 border border-temple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-semibold mb-2">Data Export</h3>
                <p className="text-muted-foreground">
                  Export data in various formats for record-keeping and external use.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-temple-900 text-white py-8 px-4">
        <div className="container">
          <div className="text-center">
            <h2 className="text-xl font-serif font-semibold mb-2">Dutt Mandir</h2>
            <p className="text-temple-200 mb-4">Temple Management System</p>
            <p className="text-sm text-temple-300">
              © {new Date().getFullYear()} Dutt Mandir. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
