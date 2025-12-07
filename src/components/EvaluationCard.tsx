import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Linkedin, Server, Brain, Database, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin_expert: Linkedin,
  devops_engineer: Server,
  genai_engineer: Brain,
  backend_engineer: Database,
  hiring_manager: Users,
};

const colorMap: Record<string, string> = {
  linkedin_expert: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  devops_engineer: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
  genai_engineer: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  backend_engineer: "from-green-500/20 to-green-600/10 border-green-500/30",
  hiring_manager: "from-pink-500/20 to-pink-600/10 border-pink-500/30",
};

const labelMap: Record<string, string> = {
  linkedin_expert: "LinkedIn Expert",
  devops_engineer: "DevOps Engineer",
  genai_engineer: "GenAI Engineer",
  backend_engineer: "Backend Engineer",
  hiring_manager: "Hiring Manager",
};

interface EvaluationCardProps {
  evaluator: string;
  feedback: string;
  index: number;
}

export function EvaluationCard({ evaluator, feedback, index }: EvaluationCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const Icon = iconMap[evaluator] || Users;
  const colors = colorMap[evaluator] || "from-primary/20 to-primary/10 border-primary/30";
  const label = labelMap[evaluator] || evaluator;

  const shouldTruncate = feedback.length > 200;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={cn(
        "rounded-xl border bg-gradient-to-br p-4 transition-all duration-200",
        colors
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-background/50">
            <Icon className="w-5 h-5 text-foreground" />
          </div>
          <span className="font-semibold text-foreground">{label}</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {feedback}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
