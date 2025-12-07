import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { InputView } from "@/components/InputView";
import { LoadingView } from "@/components/LoadingView";
import { ReviewView } from "@/components/ReviewView";
import { SuccessView } from "@/components/SuccessView";
import { useAppState } from "@/hooks/useAppState";
import { startGeneration, submitFeedback } from "@/lib/api";

const Index = () => {
  const {
    state,
    setStage,
    setUserInput,
    toggleEvaluator,
    setGeneratorCategory,
    setGenerationResult,
    updateReviewData,
    setSuccess,
    reset,
    availableEvaluators,
    generatorCategories,
  } = useAppState();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerate = async () => {
    if (!state.userInput.trim()) {
      toast.error("Please enter what you want to post about");
      return;
    }
    if (state.selectedEvaluators.length === 0) {
      toast.error("Please select at least one evaluator");
      return;
    }

    setStage("loading");

    try {
      const response = await startGeneration({
        user_input: state.userInput,
        evaluators: state.selectedEvaluators,
        generator: state.generatorCategory,
      });

      setGenerationResult(
        response.thread_id,
        response.current_post,
        response.evaluations
      );
      toast.success("Draft generated! Review the feedback from your experts.");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate post. Please check your connection and try again.");
      setStage("input");
    }
  };

  const handleApprove = async () => {
    if (!state.threadId) return;

    setIsSubmitting(true);

    try {
      const response = await submitFeedback({
        thread_id: state.threadId,
        action: "approve",
      });

      if (response.status === "finished") {
        setSuccess();
        toast.success("Your post has been finalized!");
      } else {
        updateReviewData(response.current_post, response.evaluations);
      }
    } catch (error) {
      console.error("Approval error:", error);
      toast.error("Failed to submit approval. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async (reason: string) => {
    if (!state.threadId) return;

    setIsSubmitting(true);

    try {
      const response = await submitFeedback({
        thread_id: state.threadId,
        action: "reject",
        reason,
      });

      if (response.status === "finished") {
        setSuccess();
      } else {
        updateReviewData(response.current_post, response.evaluations);
        toast.success("Regenerating with your feedback...");
      }
    } catch (error) {
      console.error("Rejection error:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center py-8">
          <AnimatePresence mode="wait">
            {state.stage === "input" && (
              <InputView
                key="input"
                userInput={state.userInput}
                selectedEvaluators={state.selectedEvaluators}
                availableEvaluators={availableEvaluators}
                generatorCategory={state.generatorCategory}
                generatorCategories={generatorCategories}
                onInputChange={setUserInput}
                onToggleEvaluator={toggleEvaluator}
                onGeneratorChange={setGeneratorCategory}
                onGenerate={handleGenerate}
                isLoading={false}
              />
            )}

            {state.stage === "loading" && <LoadingView key="loading" />}

            {state.stage === "review" && (
              <ReviewView
                key="review"
                currentPost={state.currentPost}
                evaluations={state.evaluations}
                onApprove={handleApprove}
                onReject={handleReject}
                isSubmitting={isSubmitting}
              />
            )}

            {state.stage === "success" && (
              <SuccessView key="success" onReset={reset} />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Index;
