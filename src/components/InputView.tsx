import { motion } from "framer-motion";
import { Wand2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EvaluatorChip } from "./EvaluatorChip";
import { GeneratorCategory } from "@/types/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Evaluator {
  id: string;
  label: string;
  icon: string;
}

interface InputViewProps {
  userInput: string;
  selectedEvaluators: string[];
  availableEvaluators: readonly Evaluator[];
  generatorCategory: GeneratorCategory;
  generatorCategories: GeneratorCategory[];
  onInputChange: (value: string) => void;
  onToggleEvaluator: (id: string) => void;
  onGeneratorChange: (value: GeneratorCategory) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export function InputView({
  userInput,
  selectedEvaluators,
  availableEvaluators,
  generatorCategory,
  generatorCategories,
  onInputChange,
  onToggleEvaluator,
  onGeneratorChange,
  onGenerate,
  isLoading,
}: InputViewProps) {
  const canGenerate = userInput.trim().length > 0 && selectedEvaluators.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto space-y-8"
    >
      {/* Main Input Card */}
      <motion.div
        className="glass-card-strong rounded-2xl p-8"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <label className="block text-lg font-semibold text-foreground mb-4">
          What do you want to post about today?
        </label>
        <textarea
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="The future of AI in healthcare, my journey learning Kubernetes, thoughts on remote work culture..."
          className="w-full h-40 px-5 py-4 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none text-foreground placeholder:text-muted-foreground"
        />
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-foreground">Generator:</label>
            <Select value={generatorCategory} onValueChange={onGeneratorChange}>
              <SelectTrigger className="w-40 bg-background/50 border-border">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {generatorCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground">
            {userInput.length} characters
          </span>
        </div>
      </motion.div>

      {/* Evaluator Selection */}
      <motion.div
        className="glass-card rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Select Your Expert Committee
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          Choose the AI experts that will review and refine your post
        </p>
        
        <div className="flex flex-wrap gap-3">
          {availableEvaluators.map((evaluator, index) => (
            <motion.div
              key={evaluator.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <EvaluatorChip
                {...evaluator}
                isSelected={selectedEvaluators.includes(evaluator.id)}
                onToggle={() => onToggleEvaluator(evaluator.id)}
              />
            </motion.div>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          {selectedEvaluators.length} expert{selectedEvaluators.length !== 1 ? 's' : ''} selected
        </p>
      </motion.div>

      {/* Generate Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex justify-center"
      >
        <Button
          variant="gradient"
          size="xl"
          onClick={onGenerate}
          disabled={!canGenerate || isLoading}
          className="group min-w-[250px]"
        >
          <Wand2 className="w-5 h-5 transition-transform group-hover:rotate-12" />
          <span>Generate Draft</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
