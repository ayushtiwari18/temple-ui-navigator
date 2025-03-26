
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Invalid input",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await resetPassword(email);
      
      if (success) {
        setIsSubmitted(true);
        toast({
          title: "Reset link sent",
          description: "If your email exists in our system, you'll receive a password reset link.",
        });
      } else {
        // For security reasons, we still show success message even if email doesn't exist
        setIsSubmitted(true);
        toast({
          title: "Reset link sent",
          description: "If your email exists in our system, you'll receive a password reset link.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-temple-50 p-4">
      <div className="w-full max-w-md animate-fade-in opacity-0">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-temple-900">Dutt Mandir</h1>
          <p className="text-temple-600 mt-2">Temple Management System</p>
        </div>
        
        <Card className="border-temple-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              {!isSubmitted 
                ? "Enter your email to receive a password reset link" 
                : "Check your email for reset instructions"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="mb-4 text-temple-600">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Didn't receive an email? Check your spam folder or try again.
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center border-t border-temple-100 pt-4">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Back to Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PasswordReset;
