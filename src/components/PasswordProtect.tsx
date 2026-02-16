import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";

interface PasswordProtectProps {
  children: React.ReactNode;
  password: string;
  storageKey: string;
  title?: string;
}

export const PasswordProtect = ({
  children,
  password,
  storageKey,
  title = "Protected Content"
}: PasswordProtectProps) => {
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already authenticated
    const storedAuth = sessionStorage.getItem(storageKey);
    if (storedAuth === "authenticated") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [storageKey]);

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

  const handleTabChange = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <Header activeTab={undefined} onTabChange={handleTabChange} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <Header activeTab={undefined} onTabChange={handleTabChange} />
      <div className="py-16 px-6 lg:px-16">
        <div className="max-w-md mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-12 group pl-0 hover:pl-2 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Card className="p-8 shadow-lg">
            <CardContent className="p-0">
              <div className="flex flex-col items-center text-center mb-8">
                <motion.div
                  className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 10, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <Lock className="h-8 w-8 text-muted-foreground" />
                  </motion.div>
                </motion.div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Case Study Available on Request
                </h1>
                <p className="text-muted-foreground">
                  Case studies available on request. Please enter the password to view.
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
                      className="w-full pr-10"
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
                  Access Case Study
                </Button>
              </form>

              <p className="text-sm text-muted-foreground text-center mt-6">
                If you do not have the password, contact{" "}
                <a
                  href="mailto:john@john-rodrigues.com"
                  className="text-foreground font-medium hover:underline"
                >
                  John
                </a>.
              </p>

              <p className="text-xs text-muted-foreground/60 text-center mt-4">
                More in-depth case studies and walk-throughs are available on request.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
