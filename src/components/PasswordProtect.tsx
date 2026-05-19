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
}: PasswordProtectProps) => {
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
    navigate("/");
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
            onClick={() => navigate("/")}
            className="mb-12 group pl-0 hover:pl-2 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Card className="p-8 shadow-lg">
            <CardContent className="p-0">
              <div className="flex flex-col items-center text-center mb-8">
                <motion.div
                  className="relative w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1,
                  }}
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-muted/40"
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2.2,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 0.4,
                    }}
                  />
                  <motion.div
                    animate={{
                      y: [0, -2, 0],
                      rotate: [0, -8, 8, -8, 8, 0, 0, 0, 0],
                    }}
                    transition={{
                      duration: 3.2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      times: [0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.5, 0.75, 1],
                    }}
                  >
                    <Lock className="h-8 w-8 text-muted-foreground relative z-10" />
                  </motion.div>
                </motion.div>
                <h1 className="text-xl font-semibold text-foreground">
                  Available on request
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      className="w-full pr-10 h-11 border-foreground/20 focus-visible:border-foreground/40"
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
                Need access?{" "}
                <a
                  href="https://www.linkedin.com/in/john-rodrigues4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium underline underline-offset-2"
                >
                  Contact John
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
