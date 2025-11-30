import { useState, useEffect, useRef } from "react";
import { Send, X, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SideChatProps {
  isOpen: boolean;
  onClose: () => void;
}

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export function SideChat({ isOpen, onClose }: SideChatProps) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [
      ...messages,
      { role: "user" as const, content: input },
      { role: "assistant" as const, content: "I'm here to help! This is a placeholder response." }
    ];
    setMessages(newMessages);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleVoiceMode = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsListening(false);
      }
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div 
        className={`fixed right-0 top-0 h-full w-[28rem] bg-card border-l border-primary/20 shadow-2xl z-[101] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card">
          <h3 className="font-semibold text-foreground">Chat with John.ai</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 hover:bg-primary/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-card">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground mt-8">
              <p>Start a conversation</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted border border-border/50"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 border-t border-border/50 bg-card">
          <div className="flex gap-2">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 ease-out pointer-events-none overflow-hidden" style={{
                background: 'linear-gradient(90deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.5), hsl(var(--primary) / 0.3))',
                backgroundSize: '200% 100%',
                animation: 'gradient 3s ease infinite',
                padding: '1.5px',
              }}>
                <div className="w-full h-full rounded-lg bg-background" />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? "Listening..." : "Type a message..."}
                className={`w-full px-4 py-2 rounded-lg border-[0.5px] border-white/10 bg-background focus:outline-none focus:ring-0 relative z-10 transition-all duration-300 ${
                  input ? 'shadow-[0_0_20px_hsl(var(--primary)/0.3)]' : ''
                } focus:shadow-[0_0_20px_hsl(var(--primary)/0.3)] focus:border-transparent`}
                disabled={isListening}
              />
            </div>
            <Button 
              onClick={toggleVoiceMode} 
              size="icon" 
              variant={isListening ? "default" : "outline"}
              className={`rounded-lg ${isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : ""}`}
              title={isListening ? "Stop recording" : "Start voice input"}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Button onClick={handleSend} size="icon" className="rounded-lg bg-primary hover:bg-primary/90" disabled={isListening}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {isListening && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Listening...
            </p>
          )}
        </div>
      </div>
    </>
  );
}

