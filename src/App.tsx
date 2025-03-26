
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

// Auth components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PasswordReset from "./components/auth/PasswordReset";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/reports" element={<Reports />} />
            
            {/* For future implementation */}
            <Route path="/devotees" element={<Dashboard />} />
            <Route path="/donations" element={<Dashboard />} />
            <Route path="/bookings" element={<Dashboard />} />
            <Route path="/analytics" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
