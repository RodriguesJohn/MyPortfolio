import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PortfolioPasswordProtectProps {
  children: React.ReactNode;
  password: string;
}

export const PortfolioPasswordProtect = ({
  children,
  password,
}: PortfolioPasswordProtectProps) => {
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const storageKey = "portfolio-auth";

  useEffect(() => {
    // Check if user has already authenticated
    const storedAuth = sessionStorage.getItem(storageKey);
    if (storedAuth === "authenticated") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (inputPassword.toLowerCase() === password.toLowerCase()) {
      sessionStorage.setItem(storageKey, "authenticated");
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password. Please try again.");
      setInputPassword("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg">
          <CardContent className="p-0">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6 animate-pulse">
                <Lock className="h-8 w-8 text-muted-foreground animate-bounce" style={{ animationDuration: '2s' }} />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                John Rodrigues
              </h1>
              <p className="text-muted-foreground">
                Please enter the password to access my portfolio.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    className="w-full pr-10 focus:ring-0 focus:ring-offset-0 focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-sm text-red-500 mt-2">{error}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Enter Portfolio
              </Button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">
              To request password, write to{" "}
              <a
                href="mailto:john@john-rodrigues.com"
                className="text-primary font-medium underline hover:text-primary/80 cursor-pointer transition-colors"
              >
                john@john-rodrigues.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
