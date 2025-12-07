import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Loader2, Sparkles, MessageSquare, CheckCircle2, Users } from "lucide-react";

const loadingSteps = [
  { message: "Drafting initial content...", icon: MessageSquare },
  { message: "Consulting LinkedIn Expert...", icon: Sparkles },
  { message: "Reviewing technical accuracy...", icon: CheckCircle2 },
  { message: "Gathering expert feedback...", icon: Users },
  { message: "Preparing for human review...", icon: Sparkles },
];

export function LoadingView() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <motion.div
        className="glass-card-strong rounded-3xl p-12 text-center pulse-glow"
        animate={{
          boxShadow: [
            "0 0 30px hsl(175 77% 35% / 0.2)",
            "0 0 60px hsl(175 77% 35% / 0.4)",
            "0 0 30px hsl(175 77% 35% / 0.2)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Main Loader */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-3 rounded-full bg-card flex items-center justify-center">
            <motion.div
              key={currentStep}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentIcon className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
        </motion.div>

        {/* Status Message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {loadingSteps[currentStep].message}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {loadingSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "bg-primary w-6"
                  : index < currentStep
                  ? "bg-primary/60"
                  : "bg-primary/20"
              }`}
            />
          ))}
        </div>

        <p className="text-muted-foreground text-sm mt-6">
          Your AI committee is hard at work...
        </p>
      </motion.div>
    </motion.div>
  );
}
