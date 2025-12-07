import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle2, Sparkles, RotateCcw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessViewProps {
  onReset: () => void;
}

export function SuccessView({ onReset }: SuccessViewProps) {
  useEffect(() => {
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#0d9488", "#10b981", "#14b8a6", "#34d399"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="w-full max-w-lg mx-auto text-center"
    >
      <motion.div
        className="glass-card-strong rounded-3xl p-12 glow-primary"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 relative"
        >
          <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" />
          <div className="relative w-full h-full rounded-full gradient-bg flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold gradient-text mb-3">
            Post Finalized!
          </h2>
          <p className="text-muted-foreground mb-8">
            Your LinkedIn post has been refined and approved by your expert committee.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="gradient" size="lg" className="w-full">
              <ExternalLink className="w-5 h-5" />
              Open LinkedIn
            </Button>
          </a>
          <Button variant="ghost" size="lg" onClick={onReset} className="w-full">
            <RotateCcw className="w-5 h-5" />
            Create Another Post
          </Button>
        </motion.div>

        {/* Floating sparkles */}
        <motion.div
          className="absolute -top-4 -right-4"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-8 h-8 text-accent" />
        </motion.div>
        <motion.div
          className="absolute -bottom-4 -left-4"
          animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
