import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostPreview } from "./PostPreview";
import { EvaluationCard } from "./EvaluationCard";
import { Evaluations } from "@/types/api";

interface ReviewViewProps {
  currentPost: string;
  evaluations: Evaluations;
  onApprove: () => void;
  onReject: (reason: string) => void;
  isSubmitting: boolean;
}

export function ReviewView({
  currentPost,
  evaluations,
  onApprove,
  onReject,
  isSubmitting,
}: ReviewViewProps) {
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState("");

  const handleRejectClick = () => {
    setShowFeedbackInput(true);
  };

  const handleSubmitFeedback = () => {
    if (feedbackReason.trim()) {
      onReject(feedbackReason);
      setFeedbackReason("");
      setShowFeedbackInput(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center mb-8 gradient-text"
      >
        Review Your Post
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Post Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Generated Post
          </h3>
          <PostPreview content={currentPost} />
        </div>

        {/* Evaluations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Expert Feedback
          </h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {Object.entries(evaluations).map(([evaluator, feedback], index) => (
              <EvaluationCard
                key={evaluator}
                evaluator={evaluator}
                feedback={feedback}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decision Dock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 glass-card-strong rounded-2xl p-6"
      >
        <AnimatePresence mode="wait">
          {!showFeedbackInput ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                variant="success"
                size="lg"
                onClick={onApprove}
                disabled={isSubmitting}
                className="min-w-[200px]"
              >
                <CheckCircle2 className="w-5 h-5" />
                Looks Perfect! (Finish)
              </Button>
              <Button
                variant="reject"
                size="lg"
                onClick={handleRejectClick}
                disabled={isSubmitting}
                className="min-w-[200px]"
              >
                <XCircle className="w-5 h-5" />
                Needs Changes
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setShowFeedbackInput(false)}
                  className="p-1 hover:bg-muted rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </button>
                <label className="text-foreground font-medium">
                  What should be improved?
                </label>
              </div>
              <textarea
                value={feedbackReason}
                onChange={(e) => setFeedbackReason(e.target.value)}
                placeholder="Be more specific about the technical details, add a call-to-action..."
                className="w-full h-28 px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                autoFocus
              />
              <div className="flex justify-end">
                <Button
                  variant="gradient"
                  onClick={handleSubmitFeedback}
                  disabled={!feedbackReason.trim() || isSubmitting}
                >
                  <Send className="w-4 h-4" />
                  Regenerate
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
