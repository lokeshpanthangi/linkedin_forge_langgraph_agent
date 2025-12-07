import { motion } from "framer-motion";
import { Check, Linkedin, Server, Brain, Database, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin,
  Server,
  Brain,
  Database,
  Users,
};

interface EvaluatorChipProps {
  id: string;
  label: string;
  icon: string;
  isSelected: boolean;
  onToggle: () => void;
}

export function EvaluatorChip({
  id,
  label,
  icon,
  isSelected,
  onToggle,
}: EvaluatorChipProps) {
  const Icon = iconMap[icon] || Users;

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onToggle}
      className={cn(
        "relative flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 transition-all duration-200",
        isSelected
          ? "border-primary bg-primary/10 text-primary shadow-md"
          : "border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:bg-card"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      
      <motion.div
        initial={false}
        animate={{
          scale: isSelected ? 1 : 0,
          opacity: isSelected ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
      >
        <Check className="w-3 h-3 text-primary-foreground" />
      </motion.div>
    </motion.button>
  );
}
